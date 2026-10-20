
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const CLAVE_CARRITO = "granopuerto-carrito";

const CATALOG0 = [
  {
    id: "pacifico-colombia-250",
    nombre: "PACÍFICO",
    origen: "Colombia",
    formato: "Café en grano · 250 g",
    precio: 15990,
    imagen: "/bolsa-colombia.png",
    descripcion: "Un café de origen colombiano para disfrutar cada día.",
  },
  {
    id: "andina-peru-250",
    nombre: "ANDINA",
    origen: "Perú",
    formato: "Café en grano · 250 g",
    precio: 12990,
    imagen: "/bolsa-peru.png",
    descripcion: "Un café de origen peruano para tus momentos especiales.",
  },
  {
    id: "bahia-brasil-250",
    nombre: "BAHÍA",
    origen: "Brasil",
    formato: "Café en grano · 250 g",
    precio: 13990,
    imagen: "/bolsa-brasil.png",
    descripcion: "Un café de origen brasileño para acompañar tu día.",
  },
];

export default function Cafes() {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    actualizarContador();

    window.addEventListener("storage", actualizarContador);
    window.addEventListener("carrito-actualizado", actualizarContador);

    return () => {
      window.removeEventListener("storage", actualizarContador);
      window.removeEventListener("carrito-actualizado", actualizarContador);
    };
  }, []);

  function actualizarContador() {
    try {
      const carrito = JSON.parse(
        localStorage.getItem(CLAVE_CARRITO) || "[]"
      );

      const total = Array.isArray(carrito)
        ? carrito.reduce(
            (suma, producto) => suma + Number(producto.cantidad || 1),
            0
          )
        : 0;

      setCantidadCarrito(total);
    } catch {
      setCantidadCarrito(0);
    }
  }

  function agregarAlCarrito(cafe) {
    try {
      const carrito = JSON.parse(
        localStorage.getItem(CLAVE_CARRITO) || "[]"
      );

      const productos = Array.isArray(carrito) ? carrito : [];

      const existente = productos.find(
        (producto) => producto.id === cafe.id
      );

      let carritoActualizado;

      if (existente) {
        carritoActualizado = productos.map((producto) =>
          producto.id === cafe.id
            ? {
                ...producto,
                cantidad: Number(producto.cantidad || 1) + 1,
              }
            : producto
        );
      } else {
        carritoActualizado = [
          ...productos,
          {
            id: cafe.id,
            nombre: cafe.nombre,
            origen: cafe.origen,
            formato: cafe.formato,
            precio: cafe.precio,
            imagen: cafe.imagen,
            cantidad: 1,
          },
        ];
      }

      localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(carritoActualizado)
      );

      actualizarContador();
      window.dispatchEvent(new Event("carrito-actualizado"));

      setMensaje(`${cafe.nombre} · ${cafe.origen} agregado al carrito`);

      window.setTimeout(() => setMensaje(""), 3000);
    } catch {
      setMensaje("No se pudo agregar el producto. Intenta nuevamente.");
    }
  }

  function formatoPrecio(precio) {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(precio);
  }

  return (
    <>
      <Head>
        <title>Nuestros cafés | GRANOPUERTO</title>
        <meta
          name="description"
          content="Descubre los cafés de origen de GRANOPUERTO. Café de Colombia, Perú y Brasil, desde Valparaíso, Chile."
        />
      </Head>

      <div className="pagina-cafes">
        <header className="encabezado">
          <Link href="/" className="logo" aria-label="GRANOPUERTO, inicio">
            <img src="/logo.png" alt="GRANOPUERTO" />
          </Link>

          <nav className="menu">
            <Link href="/">INICIO</Link>
            <Link href="/cafes" className="activo">
              CAFÉS
            </Link>
            <Link href="/nosotros">NOSOTROS</Link>
            <Link href="/contacto">CONTACTO</Link>
          </nav>

          <Link
            href="/carrito"
            className="enlace-carrito"
            aria-label={`Ver carrito, ${cantidadCarrito} unidades`}
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

            {cantidadCarrito > 0 && (
              <span className="contador">{cantidadCarrito}</span>
            )}
          </Link>
        </header>

        <main>
          <section className="presentacion">
            <p className="sobre-titulo">GRANOPUERTO · VALPARAÍSO, CHILE</p>
            <h1>Nuestros cafés</h1>
            <p className="descripcion-principal">
              Café de origen, seleccionado para disfrutar cada taza.
            </p>
            <span className="linea-dorada" />
          </section>

          <section className="catalogo" aria-label="Catálogo de cafés">
            {CATALOG0.map((cafe) => (
              <article className="tarjeta-cafe" key={cafe.id}>
                <Link
                  href="/carrito"
                  className="imagen-cafe"
                  aria-label={`Ver carrito después de seleccionar ${cafe.nombre}`}
                  onClick={(event) => event.preventDefault()}
                >
                  <img
                    src={cafe.imagen}
                    alt={`${cafe.nombre} ${cafe.origen}, café GRANOPUERTO`}
                    loading="lazy"
                  />
                </Link>

                <div className="informacion-cafe">
                  <p className="origen">ORIGEN {cafe.origen.toUpperCase()}</p>
                  <h2>{cafe.nombre}</h2>
                  <p className="formato">{cafe.formato}</p>
                  <p className="descripcion-cafe">{cafe.descripcion}</p>

                  <div className="pie-tarjeta">
                    <span className="precio">
                      {formatoPrecio(cafe.precio)}
                    </span>

                    <button
                      type="button"
                      className="boton-agregar"
                      onClick={() => agregarAlCarrito(cafe)}
                    >
                      AGREGAR +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <section className="mensaje-carrito" aria-live="polite">
            {mensaje && (
              <div className="aviso">
                <span>{mensaje}</span>
                <Link href="/carrito">VER CARRITO →</Link>
              </div>
            )}
          </section>

          <section className="nota-origen">
            <span className="linea-dorada" />
            <p>
              GRANOPUERTO
              <span> Café de origen · Valparaíso, Chile</span>
            </p>
          </section>
        </main>

        <footer className="pie">
          <p>GRANOPUERTO</p>
          <span>VALPARAÍSO, CHILE</span>
        </footer>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .pagina-cafes {
          min-height: 100vh;
          background: #090909;
          color: #f4f0e8;
          font-family: Arial, Helvetica, sans-serif;
        }

        .encabezado {
          height: 70px;
          width: 100%;
          padding-left: clamp(24px, 6vw, 90px);
          padding-right: clamp(16px, 2.5vw, 38px);
          display: flex;
          align-items: center;
          gap: 0;
          border-bottom: 1px solid rgba(213, 180, 119, 0.12);
        }

        .logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
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
          gap: clamp(30px, 4vw, 55px);
          margin-left: clamp(30px, 4vw, 58px);
        }

        .menu a {
          color: #e7e0d5;
          font-family: Arial, Helvetica, sans-serif;
          font-size: clamp(9px, 0.75vw, 12px);
          letter-spacing: clamp(0.6px, 0.08vw, 1.2px);
          text-decoration: none;
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        .menu a:hover,
        .menu a.activo {
          color: #d5b477;
        }

        .enlace-carrito {
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #f4f0e8;
          text-decoration: none;
          flex-shrink: 0;
        }

        .contador {
          color: #d5b477;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 12px;
          line-height: 1;
        }

        .presentacion {
          text-align: center;
          padding: 76px 20px 35px;
        }

        .sobre-titulo {
          margin: 0 0 20px;
          color: #d5b477;
          font-size: 10px;
          letter-spacing: 3px;
        }

        .presentacion h1 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(40px, 5vw, 62px);
          line-height: 1.15;
          font-weight: 400;
        }

        .descripcion-principal {
          margin: 20px auto 25px;
          color: #aaa49a;
          font-size: 14px;
          line-height: 1.7;
        }

        .linea-dorada {
          display: block;
          width: 48px;
          height: 1px;
          margin: 0 auto;
          background: #c5a56a;
        }

        .catalogo {
          width: min(1160px, 88%);
          margin: 40px auto 0;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(20px, 3vw, 42px);
          align-items: stretch;
        }

        .tarjeta-cafe {
          min-width: 0;
          display: flex;
          flex-direction: column;
          border: 1px solid #292621;
          background: #0d0d0c;
        }

        .imagen-cafe {
          height: 330px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #10100f;
          overflow: hidden;
        }

        .imagen-cafe img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.35s ease;
        }

        .tarjeta-cafe:hover .imagen-cafe img {
          transform: scale(1.035);
        }

        .informacion-cafe {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 25px 23px 22px;
        }

        .origen {
          margin: 0 0 13px;
          color: #c5a56a;
          font-size: 9px;
          letter-spacing: 2px;
        }

        .informacion-cafe h2 {
          margin: 0;
          color: #f1ece3;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 30px;
          line-height: 1.2;
          font-weight: 400;
        }

        .formato {
          margin: 12px 0 0;
          color: #d5b477;
          font-size: 12px;
        }

        .descripcion-cafe {
          min-height: 43px;
          margin: 15px 0 25px;
          color: #a9a39a;
          font-size: 12px;
          line-height: 1.7;
        }

        .pie-tarjeta {
          margin-top: auto;
          padding-top: 18px;
          border-top: 1px solid #292621;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 17px;
        }

        .precio {
          color: #f4f0e8;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 23px;
        }

        .boton-agregar {
          width: 100%;
          min-height: 44px;
          padding: 12px 16px;
          border: 1px solid #c5a56a;
          background: transparent;
          color: #d5b477;
          font-size: 10px;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition:
            background 0.2s ease,
            color 0.2s ease;
        }

        .boton-agregar:hover {
          background: #c5a56a;
          color: #090909;
        }

        .boton-agregar:focus-visible,
        .menu a:focus-visible,
        .enlace-carrito:focus-visible {
          outline: 2px solid #d5b477;
          outline-offset: 4px;
        }

        .mensaje-carrito {
          width: min(1160px, 88%);
          margin: 25px auto 0;
        }

        .aviso {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 15px 18px;
          border: 1px solid #39342c;
          color: #e7e0d5;
          font-size: 12px;
          line-height: 1.6;
        }

        .aviso a {
          color: #d5b477;
          text-decoration: none;
          white-space: nowrap;
          font-size: 10px;
          letter-spacing: 1px;
        }

        .nota-origen {
          padding: 65px 20px 70px;
          text-align: center;
        }

        .nota-origen p {
          margin: 22px 0 0;
          color: #d5b477;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          letter-spacing: 1px;
        }

        .nota-origen p span {
          display: block;
          margin-top: 10px;
          color: #969087;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 10px;
          letter-spacing: 1.5px;
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
            gap: 22px;
            margin-left: 25px;
          }

          .catalogo {
            width: 92%;
            gap: 18px;
          }

          .imagen-cafe {
            height: 280px;
            padding: 18px;
          }

          .informacion-cafe {
            padding: 22px 17px;
          }
        }

        @media (max-width: 768px) {
          .encabezado {
            height: auto;
            min-height: 70px;
            flex-wrap: wrap;
            padding: 15px 24px;
            row-gap: 17px;
          }

          .logo img {
            width: 145px;
          }

          .menu {
            order: 3;
            width: 100%;
            margin-left: 0;
            justify-content: space-between;
            gap: 12px;
          }

          .enlace-carrito svg {
            width: 30px;
            height: 30px;
          }

          .catalogo {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 20px;
          }

          .imagen-cafe {
            height: 290px;
          }
        }

        @media (max-width: 600px) {
          .presentacion {
            padding-top: 55px;
          }

          .catalogo {
            width: 90%;
            grid-template-columns: 1fr;
            max-width: 420px;
            gap: 25px;
          }

          .imagen-cafe {
            height: 350px;
          }

          .informacion-cafe {
            padding: 24px;
          }

          .mensaje-carrito {
            width: 90%;
            max-width: 420px;
          }

          .aviso {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .encabezado {
            padding: 14px 18px;
          }

          .logo img {
            width: 130px;
          }

          .menu {
            gap: 10px;
          }

          .menu a {
            font-size: 9px;
            letter-spacing: 0.5px;
          }

          .presentacion h1 {
            font-size: 42px;
          }

          .sobre-titulo {
            font-size: 9px;
            letter-spacing: 2px;
          }

          .imagen-cafe {
            height: 320px;
          }
        }

        @media (max-width: 360px) {
          .logo img {
            width: 115px;
          }

          .menu a {
            font-size: 8px;
          }

          .imagen-cafe {
            height: 280px;
          }

          .informacion-cafe {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
}
