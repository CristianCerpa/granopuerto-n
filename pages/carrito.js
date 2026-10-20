
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const CLAVE_CARRITO = "granopuerto-carrito";

const regiones = [
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

function formatoPrecio(precio) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(precio);
}

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [direccion, setDireccion] = useState("");
  const [referencia, setReferencia] = useState("");
  const [metodoPago, setMetodoPago] = useState("mercadopago");
  const [costoEnvio, setCostoEnvio] = useState(null);
  const [consultandoEnvio, setConsultandoEnvio] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    try {
      const guardado = JSON.parse(
        localStorage.getItem(CLAVE_CARRITO) || "[]"
      );

      setCarrito(Array.isArray(guardado) ? guardado : []);
    } catch {
      setCarrito([]);
    }

    setCargando(false);
  }, []);

  function guardarCarrito(actualizado) {
    setCarrito(actualizado);

    try {
      localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(actualizado)
      );
      window.dispatchEvent(new Event("carrito-actualizado"));
    } catch {
      setMensaje("No se pudo guardar el carrito en este navegador.");
    }
  }

  function cambiarCantidad(id, cambio) {
    const actualizado = carrito.map((producto) => {
      if (producto.id !== id) return producto;

      return {
        ...producto,
        cantidad: Math.max(
          1,
          Number(producto.cantidad || 1) + cambio
        ),
      };
    });

    guardarCarrito(actualizado);
    setCostoEnvio(null);
  }

  function eliminarProducto(id) {
    guardarCarrito(
      carrito.filter((producto) => producto.id !== id)
    );
    setCostoEnvio(null);
  }

  const cantidadTotal = carrito.reduce(
    (total, producto) =>
      total + Number(producto.cantidad || 1),
    0
  );

  const subtotal = carrito.reduce(
    (total, producto) =>
      total +
      Number(producto.precio || 0) *
        Number(producto.cantidad || 1),
    0
  );

  const total =
    subtotal + (costoEnvio === null ? 0 : costoEnvio);

  async function consultarEnvio() {
    if (!region || !comuna.trim()) {
      setMensaje("Selecciona una región e ingresa tu comuna.");
      return;
    }

    setConsultandoEnvio(true);
    setMensaje("");

    try {
      const respuesta = await fetch("/api/shipping/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          region,
          comuna,
          direccion,
          productos: carrito.map((producto) => ({
            id: producto.id,
            cantidad: Number(producto.cantidad || 1),
          })),
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok || typeof datos.costo !== "number") {
        throw new Error(
          datos.message || "No se pudo calcular el despacho."
        );
      }

      setCostoEnvio(datos.costo);
      setMensaje("Costo de despacho calculado correctamente.");
    } catch (error) {
      setMensaje(
        error.message ||
          "No fue posible calcular el despacho. Intenta nuevamente."
      );
    } finally {
      setConsultandoEnvio(false);
    }
  }

  async function iniciarPago(event) {
    event.preventDefault();
    setMensaje("");

    if (carrito.length === 0) {
      setMensaje("Tu carrito está vacío.");
      return;
    }

    if (
      !nombre.trim() ||
      !email.trim() ||
      !telefono.trim() ||
      !region ||
      !comuna.trim() ||
      !direccion.trim()
    ) {
      setMensaje("Completa tus datos de contacto y despacho.");
      return;
    }

    if (costoEnvio === null) {
      setMensaje(
        "Primero calcula el costo de despacho para continuar."
      );
      return;
    }

    try {
      const endpoint =
        metodoPago === "mercadopago"
          ? "/api/payments/mercadopago"
          : "/api/payments/webpay";

      const respuesta = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente: { nombre, email, telefono },
          despacho: {
            region,
            comuna,
            direccion,
            referencia,
            costo: costoEnvio,
          },
          productos: carrito.map((producto) => ({
            id: producto.id,
            cantidad: Number(producto.cantidad || 1),
          })),
          metodoPago,
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.message || "No se pudo iniciar el pago."
        );
      }

      const urlPago =
        metodoPago === "mercadopago"
          ? datos.url
          : datos.urlWebpay;

      if (!urlPago) {
        throw new Error(
          "El servicio de pago no entregó una dirección válida."
        );
      }

      window.location.href = urlPago;
    } catch (error) {
      setMensaje(
        error.message || "Ocurrió un error al iniciar el pago."
      );
    }
  }

  return (
    <>
      <Head>
        <title>Tu carrito | GRANOPUERTO</title>
        <meta
          name="description"
          content="Revisa tu pedido de café GRANOPUERTO y completa tus datos de despacho."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="pagina-carrito">
        <main className="contenido">
          <section className="encabezado">
            <h1>Tu carrito</h1>
            <p className="subtitulo">
              Tu próximo café favorito está a un paso.
            </p>
          </section>

          {mensaje && (
            <div className="mensaje" role="status">
              {mensaje}
            </div>
          )}

          {cargando ? (
            <p className="estado">Cargando tu carrito...</p>
          ) : carrito.length === 0 ? (
            <section className="vacio">
              <span className="icono-vacio">◇</span>
              <h2>Tu carrito está vacío</h2>
              <p>
                Descubre nuestros cafés de origen y encuentra el
                ideal para ti.
              </p>
              <Link href="/cafes" className="boton-seguir">
                EXPLORAR NUESTROS CAFÉS
              </Link>
            </section>
          ) : (
            <div className="columnas">
              <section className="productos">
                <div className="titulo-seccion">
                  <h2>Tu selección</h2>
                  <span>
                    {cantidadTotal}{" "}
                    {cantidadTotal === 1 ? "producto" : "productos"}
                  </span>
                </div>

                {carrito.map((producto) => (
                  <article className="producto" key={producto.id}>
                    <div className="imagen-producto">
                      <img
                        src={producto.imagen || "/bolsa-colombia.png"}
                        alt={`${producto.nombre} ${producto.origen || ""}`}
                      />
                    </div>

                    <div className="detalle-producto">
                      <p className="origen">
                        ORIGEN {producto.origen || ""}
                      </p>
                      <h3>{producto.nombre}</h3>
                      <p className="formato">
                        {producto.formato || "Café en grano · 250 g"}
                      </p>

                      <div className="controles">
                        <div className="cantidad">
                          <button
                            type="button"
                            onClick={() =>
                              cambiarCantidad(producto.id, -1)
                            }
                            aria-label={`Disminuir cantidad de ${producto.nombre}`}
                          >
                            −
                          </button>
                          <span>
                            {Number(producto.cantidad || 1)}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              cambiarCantidad(producto.id, 1)
                            }
                            aria-label={`Aumentar cantidad de ${producto.nombre}`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="eliminar"
                          onClick={() =>
                            eliminarProducto(producto.id)
                          }
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>

                    <p className="precio-producto">
                      {formatoPrecio(
                        Number(producto.precio || 0) *
                          Number(producto.cantidad || 1)
                      )}
                    </p>
                  </article>
                ))}

                <Link href="/cafes" className="boton-seguir">
                  ← SEGUIR COMPRANDO
                </Link>

                <section className="despacho">
                  <h2>Datos de despacho</h2>
                  <p className="texto-seccion">
                    Completa tus datos para preparar tu pedido.
                  </p>

                  <div className="formulario">
                    <label>
                      Nombre completo
                      <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        autoComplete="name"
                        required
                      />
                    </label>

                    <div className="dos-columnas">
                      <label>
                        Correo electrónico
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          required
                        />
                      </label>

                      <label>
                        Teléfono
                        <input
                          type="tel"
                          value={telefono}
                          onChange={(e) => setTelefono(e.target.value)}
                          autoComplete="tel"
                          required
                        />
                      </label>
                    </div>

                    <label>
                      Región
                      <select
                        value={region}
                        onChange={(e) => {
                          setRegion(e.target.value);
                          setCostoEnvio(null);
                        }}
                        required
                      >
                        <option value="">Selecciona tu región</option>
                        {regiones.map((nombreRegion) => (
                          <option
                            key={nombreRegion}
                            value={nombreRegion}
                          >
                            {nombreRegion}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Comuna
                      <input
                        value={comuna}
                        onChange={(e) => {
                          setComuna(e.target.value);
                          setCostoEnvio(null);
                        }}
                        autoComplete="address-level2"
                        required
                      />
                    </label>

                    <label>
                      Dirección
                      <input
                        value={direccion}
                        onChange={(e) => {
                          setDireccion(e.target.value);
                          setCostoEnvio(null);
                        }}
                        autoComplete="street-address"
                        placeholder="Calle, número y departamento"
                        required
                      />
                    </label>

                    <label>
                      Referencia (opcional)
                      <input
                        value={referencia}
                        onChange={(e) => setReferencia(e.target.value)}
                        placeholder="Indicaciones para la entrega"
                      />
                    </label>

                    <button
                      type="button"
                      className="boton-despacho"
                      onClick={consultarEnvio}
                      disabled={consultandoEnvio}
                    >
                      {consultandoEnvio
                        ? "CALCULANDO DESPACHO..."
                        : "CALCULAR DESPACHO"}
                    </button>

                    <p className="proveedor">
                      Despacho mediante Blue Express, sujeto a
                      disponibilidad y cobertura.
                    </p>
                  </div>
                </section>
              </section>

              <aside className="resumen">
                <h2>Resumen de compra</h2>

                <div className="fila-resumen">
                  <span>Productos ({cantidadTotal})</span>
                  <span>{formatoPrecio(subtotal)}</span>
                </div>

                <div className="fila-resumen">
                  <span>Despacho</span>
                  <span>
                    {costoEnvio === null
                      ? "Por calcular"
                      : formatoPrecio(costoEnvio)}
                  </span>
                </div>

                <div className="total">
                  <span>Total</span>
                  <strong>{formatoPrecio(total)}</strong>
                </div>

                <form onSubmit={iniciarPago}>
                  <h3>Método de pago</h3>

                  <label className="opcion-pago">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="mercadopago"
                      checked={metodoPago === "mercadopago"}
                      onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    <span>Mercado Pago</span>
                  </label>

                  <label className="opcion-pago">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="webpay"
                      checked={metodoPago === "webpay"}
                      onChange={(e) => setMetodoPago(e.target.value)}
                    />
                    <span>Webpay Plus · Transbank</span>
                  </label>

                  <button type="submit" className="boton-pagar">
                    CONTINUAR AL PAGO
                    <span>→</span>
                  </button>
                </form>

                <p className="nota-seguridad">
                  El pago se realizará en la plataforma del proveedor
                  seleccionado.
                </p>
              </aside>
            </div>
          )}
        </main>

        <footer className="pie">
          <p>© 2026 Granopuerto · todos los derechos reservados</p>
        </footer>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .pagina-carrito {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #090909;
          color: #f4f0e8;
          font-family: "Inter", Arial, sans-serif;
        }

        .contenido {
          width: min(1120px, 88%);
          margin: 0 auto;
          flex: 1;
        }

        .encabezado {
          text-align: center;
          padding: 68px 0 48px;
        }

        .encabezado h1 {
          margin: 0;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(44px, 6vw, 65px);
          font-weight: 400;
          line-height: 1.1;
        }

        .subtitulo {
          margin: 17px 0 0;
          color: #a9a39a;
          font-size: 13px;
          line-height: 1.7;
        }

        .mensaje {
          margin: 0 0 24px;
          padding: 15px 18px;
          border: 1px solid #4b402d;
          color: #d5b477;
          font-size: 13px;
          line-height: 1.6;
        }

        .columnas {
          display: grid;
          grid-template-columns: minmax(0, 1.65fr) minmax(290px, 0.85fr);
          align-items: start;
          gap: 54px;
          padding-bottom: 75px;
        }

        .titulo-seccion {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding-bottom: 18px;
          border-bottom: 1px solid #302d27;
        }

        .titulo-seccion h2,
        .despacho h2,
        .resumen h2 {
          margin: 0;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 29px;
          font-weight: 400;
        }

        .titulo-seccion span {
          color: #a9a39a;
          font-size: 11px;
        }

        .producto {
          display: grid;
          grid-template-columns: 112px minmax(0, 1fr) auto;
          gap: 22px;
          align-items: center;
          padding: 25px 0;
          border-bottom: 1px solid #302d27;
        }

        .imagen-producto {
          width: 112px;
          height: 132px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          background: #11110f;
          border: 1px solid #25231f;
        }

        .imagen-producto img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .detalle-producto {
          min-width: 0;
        }

        .origen {
          margin: 0 0 8px;
          color: #c5a56a;
          font-size: 9px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .detalle-producto h3 {
          margin: 0;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 27px;
          font-weight: 400;
        }

        .formato {
          margin: 7px 0 15px;
          color: #aaa49a;
          font-size: 11px;
        }

        .controles {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .cantidad {
          display: inline-flex;
          align-items: center;
          border: 1px solid #39352e;
        }

        .cantidad button {
          width: 31px;
          height: 31px;
          border: 0;
          background: transparent;
          color: #d5b477;
          font-size: 18px;
          cursor: pointer;
        }

        .cantidad span {
          min-width: 24px;
          text-align: center;
          color: #f4f0e8;
          font-size: 12px;
        }

        .eliminar {
          padding: 5px 0;
          border: 0;
          background: transparent;
          color: #969087;
          font-size: 11px;
          text-decoration: underline;
          cursor: pointer;
        }

        .eliminar:hover {
          color: #f4f0e8;
        }

        .precio-producto {
          margin: 0;
          align-self: start;
          padding-top: 4px;
          color: #f4f0e8;
          font-size: 13px;
          white-space: nowrap;
        }

        .boton-seguir {
          min-height: 45px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 24px;
          padding: 0 24px;
          border: 1px solid #c5a56a;
          background: #c5a56a;
          color: #090909;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-decoration: none;
          transition:
            background 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease;
        }

        .boton-seguir:hover {
          border-color: #e0c58f;
          background: #e0c58f;
          color: #090909;
        }

        .despacho {
          margin-top: 54px;
          padding-top: 30px;
          border-top: 1px solid #302d27;
        }

        .texto-seccion {
          margin: 10px 0 25px;
          color: #a9a39a;
          font-size: 12px;
          line-height: 1.7;
        }

        .formulario {
          display: flex;
          flex-direction: column;
          gap: 17px;
        }

        .formulario label {
          display: flex;
          flex-direction: column;
          gap: 9px;
          color: #d5cec2;
          font-size: 11px;
        }

        .dos-columnas {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
        }

        .formulario input,
        .formulario select {
          width: 100%;
          min-width: 0;
          height: 44px;
          padding: 0 12px;
          border: 1px solid #38342d;
          border-radius: 0;
          outline: none;
          background: #10100f;
          color: #f4f0e8;
          font-family: "Inter", Arial, sans-serif;
          font-size: 12px;
        }

        .formulario input:focus,
        .formulario select:focus {
          border-color: #c5a56a;
        }

        .formulario input::placeholder {
          color: #716c63;
        }

        .boton-despacho {
          min-height: 43px;
          margin-top: 3px;
          border: 1px solid #c5a56a;
          background: transparent;
          color: #d5b477;
          font-size: 10px;
          letter-spacing: 1.1px;
          cursor: pointer;
        }

        .boton-despacho:hover {
          background: #c5a56a;
          color: #090909;
        }

        .boton-despacho:disabled {
          opacity: 0.6;
          cursor: wait;
        }

        .proveedor {
          margin: -5px 0 0;
          color: #817b72;
          font-size: 10px;
          line-height: 1.7;
        }

        .resumen {
          padding: 30px 27px;
          border: 1px solid #343027;
          background: #0e0e0d;
        }

        .resumen h2 {
          margin-bottom: 27px;
          font-size: 30px;
        }

        .fila-resumen {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          margin: 17px 0;
          color: #aaa49a;
          font-size: 12px;
          line-height: 1.5;
        }

        .fila-resumen span:last-child {
          color: #f4f0e8;
          text-align: right;
          white-space: nowrap;
        }

        .total {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin: 25px 0 30px;
          padding-top: 22px;
          border-top: 1px solid #39352e;
        }

        .total span {
          color: #f4f0e8;
          font-size: 13px;
        }

        .total strong {
          color: #d5b477;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 28px;
          font-weight: 500;
          white-space: nowrap;
        }

        .resumen form h3 {
          margin: 0 0 17px;
          color: #f4f0e8;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 22px;
          font-weight: 400;
        }

        .opcion-pago {
          display: flex;
          align-items: center;
          gap: 11px;
          min-height: 44px;
          padding: 10px 0;
          border-bottom: 1px solid #292621;
          color: #d5cec2;
          font-size: 11px;
          cursor: pointer;
        }

        .opcion-pago input {
          accent-color: #c5a56a;
        }

        .boton-pagar {
          width: 100%;
          min-height: 49px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-top: 25px;
          padding: 0 18px;
          border: 1px solid #c5a56a;
          background: #c5a56a;
          color: #090909;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .boton-pagar:hover {
          background: #e0c58f;
        }

        .boton-pagar span {
          font-size: 18px;
        }

        .nota-seguridad {
          margin: 17px 0 0;
          color: #817b72;
          font-size: 10px;
          line-height: 1.7;
          text-align: center;
        }

        .vacio {
          max-width: 530px;
          margin: 0 auto 90px;
          padding: 45px 25px;
          border: 1px solid #302d27;
          text-align: center;
        }

        .icono-vacio {
          color: #c5a56a;
          font-size: 32px;
        }

        .vacio h2 {
          margin: 18px 0 10px;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 34px;
          font-weight: 400;
        }

        .vacio p {
          margin: 0 auto;
          max-width: 330px;
          color: #a9a39a;
          font-size: 12px;
          line-height: 1.8;
        }

        .estado {
          padding: 35px 0 80px;
          color: #a9a39a;
          text-align: center;
        }

        .pie {
          min-height: 76px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          border-top: 1px solid #292621;
          text-align: center;
        }

        .pie p {
          margin: 0;
          color: #969087;
          font-size: 10px;
          letter-spacing: 0.4px;
        }

        @media (max-width: 850px) {
          .columnas {
            grid-template-columns: 1fr;
            gap: 42px;
          }

          .resumen {
            width: 100%;
          }
        }

        @media (max-width: 520px) {
          .contenido {
            width: 90%;
          }

          .encabezado {
            padding: 52px 0 35px;
          }

          .subtitulo {
            font-size: 12px;
          }

          .producto {
            grid-template-columns: 84px minmax(0, 1fr);
            gap: 14px;
            position: relative;
            padding: 22px 0 52px;
          }

          .imagen-producto {
            width: 84px;
            height: 110px;
          }

          .detalle-producto h3 {
            font-size: 24px;
          }

          .formato {
            line-height: 1.5;
          }

          .precio-producto {
            position: absolute;
            right: 0;
            bottom: 17px;
            font-size: 12px;
          }

          .controles {
            gap: 10px;
          }

          .dos-columnas {
            grid-template-columns: 1fr;
          }

          .resumen {
            padding: 25px 20px;
          }

          .total strong {
            font-size: 25px;
          }

          .boton-seguir {
            width: 100%;
            padding: 0 12px;
            font-size: 9px;
          }

          .pie p {
            font-size: 9px;
          }
        }
      `}</style>
    </>
  );
}
