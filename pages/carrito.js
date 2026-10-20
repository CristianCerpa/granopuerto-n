
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const CLAVE_CARRITO = "granopuerto-carrito";

const REGIONES = [
  "Región de Arica y Parinacota",
  "Región de Tarapacá",
  "Región de Antofagasta",
  "Región de Atacama",
  "Región de Coquimbo",
  "Región de Valparaíso",
  "Región Metropolitana de Santiago",
  "Región del Libertador General Bernardo O'Higgins",
  "Región del Maule",
  "Región de Ñuble",
  "Región del Biobío",
  "Región de La Araucanía",
  "Región de Los Ríos",
  "Región de Los Lagos",
  "Región de Aysén",
  "Región de Magallanes y de la Antártica Chilena",
];

export default function Carrito() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [direccion, setDireccion] = useState("");
  const [referencia, setReferencia] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [medioPago, setMedioPago] = useState("mercadopago");
  const [costoEnvio, setCostoEnvio] = useState(null);
  const [estadoEnvio, setEstadoEnvio] = useState("");
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarCarrito();

    function sincronizar() {
      cargarCarrito();
    }

    window.addEventListener("storage", sincronizar);
    window.addEventListener("carrito-actualizado", sincronizar);

    return () => {
      window.removeEventListener("storage", sincronizar);
      window.removeEventListener("carrito-actualizado", sincronizar);
    };
  }, []);

  function cargarCarrito() {
    try {
      const datos = JSON.parse(
        localStorage.getItem(CLAVE_CARRITO) || "[]"
      );

      setProductos(Array.isArray(datos) ? datos : []);
    } catch {
      setProductos([]);
      setError("No fue posible leer el carrito guardado.");
    } finally {
      setCargando(false);
    }
  }

  function guardarCarrito(nuevosProductos) {
    setProductos(nuevosProductos);

    try {
      localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(nuevosProductos)
      );

      window.dispatchEvent(new Event("carrito-actualizado"));
    } catch {
      setError("No fue posible guardar los cambios del carrito.");
    }
  }

  function cambiarCantidad(id, cambio) {
    const actualizados = productos
      .map((producto) => {
        if (producto.id !== id) return producto;

        return {
          ...producto,
          cantidad: Number(producto.cantidad || 1) + cambio,
        };
      })
      .filter((producto) => Number(producto.cantidad) > 0);

    guardarCarrito(actualizados);
    setCostoEnvio(null);
    setEstadoEnvio("");
  }

  function eliminarProducto(id) {
    guardarCarrito(productos.filter((producto) => producto.id !== id));
    setCostoEnvio(null);
    setEstadoEnvio("");
  }

  function vaciarCarrito() {
    guardarCarrito([]);
    setCostoEnvio(null);
    setEstadoEnvio("");
    setError("");
  }

  function precioProducto(producto) {
    return Number(
      producto.precio ?? producto.price ?? producto.valor ?? 0
    );
  }

  function nombreProducto(producto) {
    return producto.nombre || producto.name || "Café GRANOPUERTO";
  }

  function formatoPrecio(valor) {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(valor);
  }

  const cantidadTotal = productos.reduce(
    (total, producto) =>
      total + Math.max(1, Number(producto.cantidad || 1)),
    0
  );

  const subtotal = productos.reduce(
    (total, producto) =>
      total +
      precioProducto(producto) *
        Math.max(1, Number(producto.cantidad || 1)),
    0
  );

  const totalCompra =
    subtotal + (costoEnvio === null ? 0 : costoEnvio);

  async function cotizarDespacho(event) {
    event.preventDefault();
    setError("");

    if (!productos.length) {
      setError("Agrega al menos un café antes de cotizar el despacho.");
      return;
    }

    if (!region || !comuna.trim() || !direccion.trim()) {
      setError("Completa la región, comuna y dirección de entrega.");
      return;
    }

    setProcesando(true);
    setCostoEnvio(null);
    setEstadoEnvio("Consultando tarifa de despacho...");

    try {
      const respuesta = await fetch("/api/shipping/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proveedor: "blue-express",
          destino: {
            region,
            comuna: comuna.trim(),
            direccion: direccion.trim(),
          },
          productos: productos.map((producto) => ({
            id: producto.id,
            cantidad: Number(producto.cantidad || 1),
          })),
          subtotal,
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok || typeof datos.costo !== "number") {
        throw new Error(
          datos.error ||
            "No se pudo obtener la tarifa. Verifica la integración de Blue Express."
        );
      }

      setCostoEnvio(datos.costo);
      setEstadoEnvio("Tarifa de despacho recibida.");
    } catch (err) {
      setEstadoEnvio("");
      setError(
        err.message ||
          "No se pudo cotizar el despacho. Intenta nuevamente."
      );
    } finally {
      setProcesando(false);
    }
  }

  async function iniciarPago(event) {
    event.preventDefault();
    setError("");

    if (!productos.length) {
      setError("Tu carrito está vacío.");
      return;
    }

    if (
      !nombre.trim() ||
      !apellido.trim() ||
      !correo.trim() ||
      !telefono.trim() ||
      !region ||
      !comuna.trim() ||
      !direccion.trim()
    ) {
      setError("Completa todos los datos del cliente y de entrega.");
      return;
    }

    if (costoEnvio === null) {
      setError("Primero debes obtener la tarifa de despacho.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setError("Ingresa un correo electrónico válido.");
      return;
    }

    setProcesando(true);

    try {
      const endpoint =
        medioPago === "mercadopago"
          ? "/api/payments/mercadopago"
          : "/api/payments/webpay";

      const respuesta = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          medioPago,
          cliente: {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            correo: correo.trim(),
            telefono: telefono.trim(),
          },
          despacho: {
            proveedor: "blue-express",
            region,
            comuna: comuna.trim(),
            direccion: direccion.trim(),
            referencia: referencia.trim(),
            costo: costoEnvio,
          },
          productos: productos.map((producto) => ({
            id: producto.id,
            cantidad: Number(producto.cantidad || 1),
          })),
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.error ||
            "No fue posible iniciar el pago. Intenta nuevamente."
        );
      }

      if (datos.url) {
        window.location.assign(datos.url);
        return;
      }

      if (datos.token && datos.urlWebpay) {
        const formulario = document.createElement("form");
        formulario.method = "POST";
        formulario.action = datos.urlWebpay;

        const campo = document.createElement("input");
        campo.type = "hidden";
        campo.name = "token_ws";
        campo.value = datos.token;

        formulario.appendChild(campo);
        document.body.appendChild(formulario);
        formulario.submit();
        return;
      }

      throw new Error("La respuesta del medio de pago no es válida.");
    } catch (err) {
      setError(
        err.message ||
          "No fue posible conectar con el medio de pago."
      );
    } finally {
      setProcesando(false);
    }
  }

  return (
    <>
      <Head>
        <title>Mi carrito | GRANOPUERTO</title>
        <meta
          name="description"
          content="Compra cafés de origen GRANOPUERTO con despacho y pago online."
        />
      </Head>

      <div className="pagina">
        <header className="encabezado">
          <Link href="/" className="logo" aria-label="GRANOPUERTO, inicio">
            <img src="/logo.png" alt="GRANOPUERTO" />
          </Link>

          <nav className="menu">
            <Link href="/">INICIO</Link>
            <Link href="/cafes">CAFÉS</Link>
            <Link href="/nosotros">NOSOTROS</Link>
            <Link href="/contacto">CONTACTO</Link>
          </nav>

          <Link
            href="/carrito"
            className="icono-carrito"
            aria-label={`Carrito, ${cantidadTotal} unidades`}
          >
            <svg
              viewBox="0 0 24 24"
              width="34"
              height="34"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cantidadTotal > 0 && (
              <span className="contador">{cantidadTotal}</span>
            )}
          </Link>
        </header>

        <main className="contenido">
          <div className="titulo">
            <p className="sobre-titulo">GRANOPUERTO · VALPARAÍSO, CHILE</p>
            <h1>Tu carrito</h1>
            <p className="subtitulo">
              Café de origen, preparado para llegar a tu puerta.
            </p>
          </div>

          {error && (
            <div className="mensaje-error" role="alert">
              {error}
            </div>
          )}

          {cargando ? (
            <p className="estado">Cargando tu carrito...</p>
          ) : productos.length === 0 ? (
            <section className="vacio">
              <div className="icono-vacio">
                <svg
                  viewBox="0 0 24 24"
                  width="48"
                  height="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path d="M4 7h16l-1.5 14h-13L4 7Z" />
                  <path d="M9 7a3 3 0 0 1 6 0" />
                </svg>
              </div>
              <h2>Tu carrito está vacío</h2>
              <p>
                Descubre nuestros cafés de Colombia, Perú y Brasil.
              </p>
              <Link href="/cafes" className="boton-principal">
                DESCUBRIR CAFÉS
              </Link>
            </section>
          ) : (
            <>
              <div className="barra-lista">
                <span>
                  {cantidadTotal} {cantidadTotal === 1 ? "producto" : "productos"}
                </span>
                <button
                  type="button"
                  className="limpiar"
                  onClick={vaciarCarrito}
                >
                  Vaciar carrito
                </button>
              </div>

              <div className="columnas">
                <section className="lista">
                  {productos.map((producto, indice) => {
                    const cantidad = Math.max(
                      1,
                      Number(producto.cantidad || 1)
                    );
                    const precio = precioProducto(producto);

                    return (
                      <article
                        className="producto"
                        key={producto.id || `${nombreProducto(producto)}-${indice}`}
                      >
                        <div className="imagen-producto">
                          {producto.imagen ? (
                            <img
                              src={producto.imagen}
                              alt={nombreProducto(producto)}
                            />
                          ) : (
                            <span>GRANOPUERTO</span>
                          )}
                        </div>

                        <div className="datos-producto">
                          <p className="origen">
                            {(producto.origen || "CAFÉ DE ORIGEN").toUpperCase()}
                          </p>
                          <h2>{nombreProducto(producto)}</h2>
                          <p className="formato">
                            {producto.formato ||
                              producto.presentacion ||
                              "Café"}
                          </p>
                          <p className="precio-unitario">
                            {formatoPrecio(precio)} / unidad
                          </p>

                          <div className="acciones-producto">
                            <div className="cantidad">
                              <button
                                type="button"
                                onClick={() =>
                                  cambiarCantidad(producto.id, -1)
                                }
                                aria-label={`Disminuir ${nombreProducto(producto)}`}
                              >
                                −
                              </button>
                              <span>{cantidad}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  cambiarCantidad(producto.id, 1)
                                }
                                aria-label={`Aumentar ${nombreProducto(producto)}`}
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              className="eliminar"
                              onClick={() => eliminarProducto(producto.id)}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>

                        <div className="subtotal-producto">
                          {formatoPrecio(precio * cantidad)}
                        </div>
                      </article>
                    );
                  })}

                  <Link href="/cafes" className="seguir">
                    ← Seguir comprando
                  </Link>
                </section>

                <aside className="resumen">
                  <h2>Resumen de compra</h2>

                  <div className="fila">
                    <span>Subtotal ({cantidadTotal} unidades)</span>
                    <strong>{formatoPrecio(subtotal)}</strong>
                  </div>

                  <div className="fila">
                    <span>Despacho Blue Express</span>
                    <strong>
                      {costoEnvio === null
                        ? "Por cotizar"
                        : formatoPrecio(costoEnvio)}
                    </strong>
                  </div>

                  <div className="fila total">
                    <span>Total</span>
                    <strong>
                      {formatoPrecio(totalCompra)}
                    </strong>
                  </div>

                  {costoEnvio === null && (
                    <p className="nota">
                      El total final se confirmará al calcular el despacho.
                    </p>
                  )}

                  <div className="separador" />

                  <h3>Datos de contacto</h3>

                  <form onSubmit={cotizarDespacho}>
                    <div className="dos-columnas">
                      <label>
                        Nombre *
                        <input
                          required
                          autoComplete="given-name"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                        />
                      </label>

                      <label>
                        Apellido *
                        <input
                          required
                          autoComplete="family-name"
                          value={apellido}
                          onChange={(e) => setApellido(e.target.value)}
                        />
                      </label>
                    </div>

                    <label>
                      Correo electrónico *
                      <input
                        required
                        type="email"
                        autoComplete="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                      />
                    </label>

                    <label>
                      Teléfono *
                      <input
                        required
                        type="tel"
                        autoComplete="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                      />
                    </label>

                    <div className="separador" />

                    <h3>Dirección de despacho</h3>

                    <label>
                      Región *
                      <select
                        required
                        value={region}
                        onChange={(e) => {
                          setRegion(e.target.value);
                          setCostoEnvio(null);
                          setEstadoEnvio("");
                        }}
                      >
                        <option value="">Selecciona una región</option>
                        {REGIONES.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Comuna *
                      <input
                        required
                        value={comuna}
                        onChange={(e) => {
                          setComuna(e.target.value);
                          setCostoEnvio(null);
                          setEstadoEnvio("");
                        }}
                        placeholder="Ej. Viña del Mar"
                      />
                    </label>

                    <label>
                      Dirección *
                      <input
                        required
                        autoComplete="street-address"
                        value={direccion}
                        onChange={(e) => {
                          setDireccion(e.target.value);
                          setCostoEnvio(null);
                          setEstadoEnvio("");
                        }}
                        placeholder="Calle, número y departamento"
                      />
                    </label>

                    <label>
                      Referencia de entrega
                      <textarea
                        rows="2"
                        value={referencia}
                        onChange={(e) => setReferencia(e.target.value)}
                        placeholder="Casa, oficina u otra referencia (opcional)"
                      />
                    </label>

                    <button
                      type="submit"
                      className="boton-secundario"
                      disabled={procesando}
                    >
                      {procesando
                        ? "CONSULTANDO..."
                        : "CALCULAR DESPACHO"}
                    </button>
                  </form>

                  {estadoEnvio && (
                    <p className="estado-envio" aria-live="polite">
                      {estadoEnvio}
                    </p>
                  )}

                  <div className="separador" />

                  <h3>Medio de pago</h3>

                  <div className="opciones-pago">
                    <label className="opcion-pago">
                      <input
                        type="radio"
                        name="medioPago"
                        value="mercadopago"
                        checked={medioPago === "mercadopago"}
                        onChange={() => setMedioPago("mercadopago")}
                      />
                      <span className="marca-mercadopago">
                        Mercado Pago
                      </span>
                    </label>

                    <label className="opcion-pago">
                      <input
                        type="radio"
                        name="medioPago"
                        value="webpay"
                        checked={medioPago === "webpay"}
                        onChange={() => setMedioPago("webpay")}
                      />
                      <span className="marca-webpay">Webpay Plus</span>
                      <small>Transbank</small>
                    </label>
                  </div>

                  <button
                    type="button"
                    className="boton-principal boton-pagar"
                    disabled={
                      procesando ||
                      costoEnvio === null ||
                      !productos.length
                    }
                    onClick={iniciarPago}
                  >
                    {procesando
                      ? "PROCESANDO..."
                      : `CONTINUAR CON ${
                          medioPago === "mercadopago"
                            ? "MERCADO PAGO"
                            : "WEBPAY PLUS"
                        }`}
                  </button>

                  <p className="nota seguridad">
                    El pago solo se confirmará después de que el proveedor
                    valide la transacción. No ingreses datos de tarjeta
                    directamente en esta página.
                  </p>
                </aside>
              </div>
            </>
          )}
        </main>

        <footer className="pie">
          <p>GRANOPUERTO</p>
          <span>CAFÉ DE ORIGEN · VALPARAÍSO, CHILE</span>
        </footer>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .pagina {
          min-height: 100vh;
          background: #090909;
          color: #f4f0e8;
          font-family: Arial, Helvetica, sans-serif;
        }

        .encabezado {
          min-height: 70px;
          width: 100%;
          padding: 12px clamp(16px, 2.5vw, 38px) 12px
            clamp(24px, 6vw, 90px);
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(213, 180, 119, 0.12);
        }

        .logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .logo img {
          display: block;
          width: clamp(125px, 14vw, 190px);
          max-height: 48px;
          object-fit: contain;
          object-position: left center;
        }

        .menu {
          display: flex;
          align-items: center;
          gap: clamp(20px, 3vw, 42px);
          margin-left: clamp(25px, 4vw, 58px);
        }

        .menu a {
          color: #e7e0d5;
          text-decoration: none;
          font-size: clamp(9px, 0.75vw, 12px);
          letter-spacing: clamp(0.6px, 0.08vw, 1.2px);
          white-space: nowrap;
        }

        .menu a:hover {
          color: #d5b477;
        }

        .icono-carrito {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #f4f0e8;
          text-decoration: none;
          flex-shrink: 0;
        }

        .contador {
          color: #d5b477;
          font-size: 12px;
        }

        .contenido {
          width: min(1180px, 90%);
          margin: 0 auto;
          padding: 62px 0 90px;
        }

        .titulo {
          margin-bottom: 42px;
        }

        .sobre-titulo {
          margin: 0 0 17px;
          color: #d5b477;
          font-size: 10px;
          letter-spacing: 2.5px;
        }

        h1 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(40px, 5vw, 58px);
          font-weight: 400;
        }

        .subtitulo {
          margin: 15px 0 0;
          color: #aaa49a;
          font-size: 14px;
          line-height: 1.7;
        }

        .barra-lista {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 0 0 17px;
          border-bottom: 1px solid #39342c;
          color: #bdb5a8;
          font-size: 12px;
        }

        .limpiar {
          padding: 5px 0;
          border: 0;
          background: none;
          color: #bdb5a8;
          text-decoration: underline;
          cursor: pointer;
          font-size: 12px;
        }

        .limpiar:hover,
        .eliminar:hover,
        .seguir:hover {
          color: #d5b477;
        }

        .columnas {
          display: grid;
          grid-template-columns: minmax(0, 1.65fr) minmax(300px, 0.85fr);
          gap: clamp(28px, 5vw, 65px);
          align-items: start;
          margin-top: 10px;
        }

        .producto {
          display: grid;
          grid-template-columns: 112px minmax(0, 1fr) auto;
          gap: 20px;
          align-items: start;
          padding: 25px 0;
          border-bottom: 1px solid #302c26;
        }

        .imagen-producto {
          width: 112px;
          height: 132px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          background: #111110;
          border: 1px solid #292621;
          color: #d5b477;
          font-size: 10px;
          text-align: center;
        }

        .imagen-producto img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .origen {
          margin: 0 0 9px;
          color: #c5a56a;
          font-size: 9px;
          letter-spacing: 1.7px;
        }

        .datos-producto h2 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 25px;
          font-weight: 400;
        }

        .formato,
        .precio-unitario {
          color: #aaa49a;
          font-size: 12px;
          line-height: 1.6;
        }

        .formato {
          margin: 8px 0;
        }

        .precio-unitario {
          margin: 8px 0 14px;
          color: #d5b477;
        }

        .acciones-producto {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 15px;
        }

        .cantidad {
          min-height: 34px;
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 3px 9px;
          border: 1px solid #494238;
        }

        .cantidad button {
          border: 0;
          background: transparent;
          color: #f4f0e8;
          font-size: 19px;
          cursor: pointer;
        }

        .cantidad span {
          min-width: 12px;
          text-align: center;
          font-size: 12px;
        }

        .eliminar {
          padding: 5px 0;
          border: 0;
          background: transparent;
          color: #aaa49a;
          text-decoration: underline;
          font-size: 11px;
          cursor: pointer;
        }

        .subtotal-producto {
          padding-top: 2px;
          color: #f4f0e8;
          font-size: 13px;
          white-space: nowrap;
        }

        .seguir {
          display: inline-block;
          margin-top: 24px;
          color: #ddd5c8;
          text-decoration: none;
          font-size: 12px;
        }

        .resumen {
          padding: 27px;
          border: 1px solid #39342c;
          background: #0d0d0c;
        }

        .resumen h2 {
          margin: 0 0 24px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 24px;
          font-weight: 400;
        }

        .resumen h3 {
          margin: 0 0 17px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          font-weight: 400;
        }

        .fila {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          margin: 17px 0;
          color: #bdb5a8;
          font-size: 12px;
          line-height: 1.5;
        }

        .fila strong {
          color: #eee7db;
          font-weight: 400;
          text-align: right;
        }

        .fila.total {
          padding-top: 19px;
          border-top: 1px solid #39342c;
          color: #f4f0e8;
          font-size: 14px;
        }

        .fila.total strong {
          color: #d5b477;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 22px;
        }

        .nota {
          color: #999187;
          font-size: 11px;
          line-height: 1.7;
        }

        .separador {
          height: 1px;
          margin: 25px 0;
          background: #39342c;
        }

        .resumen form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .resumen label {
          display: flex;
          flex-direction: column;
          gap: 7px;
          color: #c7bfb2;
          font-size: 11px;
        }

        .dos-columnas {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .resumen input:not([type="radio"]),
        .resumen select,
        .resumen textarea {
          width: 100%;
          min-width: 0;
          padding: 12px;
          border: 1px solid #403a31;
          border-radius: 0;
          background: #090909;
          color: #f4f0e8;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 12px;
        }

        .resumen input:focus,
        .resumen select:focus,
        .resumen textarea:focus {
          outline: 1px solid #c5a56a;
          border-color: #c5a56a;
        }

        .resumen select option {
          background: #090909;
          color: #f4f0e8;
        }

        .resumen textarea {
          resize: vertical;
        }

        .boton-secundario,
        .boton-principal {
          width: 100%;
          min-height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 13px 16px;
          font-size: 10px;
          letter-spacing: 1.3px;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            opacity 0.2s ease;
        }

        .boton-secundario {
          border: 1px solid #c5a56a;
          background: transparent;
          color: #d5b477;
        }

        .boton-secundario:hover:not(:disabled) {
          background: #c5a56a;
          color: #090909;
        }

        .boton-principal {
          border: 1px solid #c5a56a;
          background: #c5a56a;
          color: #090909;
        }

        .boton-principal:hover:not(:disabled) {
          background: #e0c38d;
        }

        .boton-principal:disabled,
        .boton-secundario:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .opciones-pago {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .opcion-pago {
          display: grid !important;
          grid-template-columns: 18px 1fr auto;
          align-items: center;
          gap: 10px !important;
          min-height: 49px;
          padding: 12px;
          border: 1px solid #403a31;
          cursor: pointer;
        }

        .opcion-pago:has(input:checked) {
          border-color: #c5a56a;
        }

        .opcion-pago input[type="radio"] {
          accent-color: #c5a56a;
        }

        .marca-mercadopago {
          color: #9bd8ee;
          font-size: 12px;
          font-weight: 600;
        }

        .marca-webpay {
          color: #f4f0e8;
          font-size: 12px;
          font-weight: 600;
        }

        .opcion-pago small {
          color: #aaa49a;
          font-size: 10px;
        }

        .boton-pagar {
          margin-top: 4px;
        }

        .seguridad {
          margin-top: 15px;
        }

        .vacio {
          padding: 65px 20px;
          border-top: 1px solid #39342c;
          border-bottom: 1px solid #39342c;
          text-align: center;
        }

        .icono-vacio {
          color: #c5a56a;
        }

        .vacio h2 {
          margin: 20px 0 10px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 30px;
          font-weight: 400;
        }

        .vacio p {
          margin: 0 0 28px;
          color: #aaa49a;
          font-size: 13px;
          line-height: 1.7;
        }

        .vacio .boton-principal {
          width: auto;
          display: inline-flex;
          padding: 15px 25px;
        }

        .mensaje-error {
          margin-bottom: 24px;
          padding: 14px 16px;
          border: 1px solid #7d453c;
          color: #f0b9ad;
          background: #1b100f;
          font-size: 12px;
          line-height: 1.6;
        }

        .estado,
        .estado-envio {
          color: #d5b477;
          font-size: 12px;
          line-height: 1.6;
        }

        .pie {
          min-height: 85px;
          padding: 22px;
          border-top: 1px solid #292621;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 7px;
        }

        .pie p {
          margin: 0;
          color: #d5b477;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 13px;
          letter-spacing: 2px;
        }

        .pie span {
          color: #969087;
          font-size: 9px;
          letter-spacing: 2px;
        }

        @media (max-width: 900px) {
          .encabezado {
            padding-left: 24px;
          }

          .menu {
            gap: 18px;
            margin-left: 25px;
          }

          .columnas {
            grid-template-columns: minmax(0, 1fr) 310px;
            gap: 25px;
          }

          .producto {
            grid-template-columns: 90px minmax(0, 1fr);
            gap: 15px;
          }

          .imagen-producto {
            width: 90px;
            height: 115px;
          }

          .subtotal-producto {
            grid-column: 2;
            padding-top: 0;
          }
        }

        @media (max-width: 720px) {
          .encabezado {
            flex-wrap: wrap;
            gap: 16px;
            padding: 14px 22px;
          }

          .logo img {
            width: 145px;
          }

          .menu {
            order: 3;
            width: 100%;
            margin-left: 0;
            justify-content: space-between;
            gap: 10px;
          }

          .columnas {
            grid-template-columns: 1fr;
          }

          .resumen {
            padding: 24px;
          }
        }

        @media (max-width: 480px) {
          .contenido {
            width: 90%;
            padding-top: 42px;
          }

          .encabezado {
            padding: 14px 18px;
          }

          .logo img {
            width: 130px;
          }

          .menu a {
            font-size: 9px;
            letter-spacing: 0.4px;
          }

          .producto {
            grid-template-columns: 78px minmax(0, 1fr);
            gap: 12px;
            padding: 20px 0;
          }

          .imagen-producto {
            width: 78px;
            height: 100px;
          }

          .datos-producto h2 {
            font-size: 22px;
          }

          .subtotal-producto {
            grid-column: 2;
          }

          .acciones-producto {
            gap: 10px;
          }

          .resumen {
            padding: 19px;
          }

          .dos-columnas {
            grid-template-columns: 1fr;
          }

          .titulo {
            margin-bottom: 30px;
          }
        }
      `}</style>
    </>
  );
}
