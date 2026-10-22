
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Nosotros() {
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function actualizarCarrito() {
      try {
        const carrito = JSON.parse(
          localStorage.getItem("granopuerto-carrito") || "[]"
        );

        const total = carrito.reduce(
          (suma, producto) =>
            suma + (Number(producto.cantidad) || 0),
          0
        );

        setCantidadCarrito(total);
      } catch {
        setCantidadCarrito(0);
      }
    }

    actualizarCarrito();
    window.addEventListener("storage", actualizarCarrito);
    window.addEventListener("carrito-actualizado", actualizarCarrito);

    return () => {
      window.removeEventListener("storage", actualizarCarrito);
      window.removeEventListener("carrito-actualizado", actualizarCarrito);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Nosotros | GRANOPUERTO</title>
        <meta
          name="description"
          content="Conoce la historia de GRANOPUERTO, una marca de café inspirada en Valparaíso. El mundo del café, con esencia porteña."
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
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="nosotros">
        <header className="encabezado">
          <a className="marca" href="/" aria-label="Volver al inicio">
            <img src="/logo.png" alt="GRANOPUERTO" />
          </a>

          <nav
            id="menu-principal"
            className={`menu ${menuOpen ? "menu-abierto" : ""}`}
            aria-label="Navegación principal"
          >
            <a href="/" onClick={() => setMenuOpen(false)}>
              INICIO
            </a>

            <a href="/cafes" onClick={() => setMenuOpen(false)}>
              CAFÉS
            </a>

            <a
              className="activo"
              href="/nosotros"
              onClick={() => setMenuOpen(false)}
            >
              NOSOTROS
            </a>

            <a href="/contacto" onClick={() => setMenuOpen(false)}>
              CONTACTO
            </a>
          </nav>

          <button
            type="button"
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <a
            className="carrito-link"
            href="/carrito"
            aria-label={`Carrito: ${cantidadCarrito} productos`}
          >
            <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path
                d="M3 5H7L10.2 20.5C10.5 22 11.8 23 13.4 23H24.5C26 23 27.3 22 27.7 20.6L30 12H9"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="13" cy="27" r="1.8" fill="currentColor" />
              <circle cx="24" cy="27" r="1.8" fill="currentColor" />
            </svg>
            <span>{cantidadCarrito}</span>
          </a>
        </header>

        <section className="historia">

                   <p>
    ¡Bienvenido a nuestra tienda!
  </p>

  <p>
    Nacimos inspirados en Valparaíso, un puerto histórico que conectó
    a Chile con el mundo a través del comercio y las culturas.
  </p>

  <p>
    Hoy, ese espíritu vive en nuestros cafés de distintos orígenes,
    que nos conectan con los aromas y sabores del mundo, desde
    nuestra esencia porteña.
  </p>

  <p>
    Gracias por visitarnos y ser parte de nuestra comunidad
  </p>

          <p className="frase">
            <strong>
              <br />
              El mundo del café, en un solo lugar
            </strong>
          </p>

          <a className="boton" href="/cafes">
            DESCUBRE NUESTROS CAFÉS
          </a>
        </section>

        <footer className="pie">
          © 2026 Granopuerto · todos los derechos reservados
        </footer>
      </main>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .nosotros {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #0e0d0b;
          color: #f7f5f1;
          font-family: "Cormorant Garamond", Georgia, serif;
        }

        /* ENCABEZADO: MISMAS MEDIDAS QUE cafes.js */

        .encabezado {
          min-height: 82px;
          padding: 14px 5%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }

        .marca {
          display: flex;
          flex-shrink: 0;
          align-items: center;
        }

        .marca img {
          display: block;
          width: 135px;
          height: auto;
        }

        /* MENÚ DE ESCRITORIO */

        .menu {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: clamp(22px, 3vw, 44px);
          margin-left: auto;
          position: relative;
          left: 0;
        }

        .menu a,
        .carrito-link {
          color: #fff;
          text-decoration: none;
          font-family: "Inter", Arial, sans-serif;
          white-space: nowrap;
        }

        .menu a {
          position: relative;
          display: inline-block;
          padding: 10px 0;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 1.25px;
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        .menu a:hover,
        .menu .activo {
          color: #d9a33f;
        }

        .menu .activo::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 1px;
          height: 1px;
          background: #d9a33f;
        }

        /* HAMBURGUESA: OCULTA EN ESCRITORIO */

        .menu-toggle {
          display: none;
          border: 0;
          padding: 8px;
          background: transparent;
          color: #d7b574;
          cursor: pointer;
        }

        /* CARRITO: MISMO ESTILO QUE cafes.js */

        .carrito-link {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: 0;
          font-size: 14px;
        }

        .carrito-link svg {
          display: block;
          width: 34px;
          height: 34px;
        }

        /* CONTENIDO ORIGINAL DE NOSOTROS */

.historia {
  flex: 1;
  width: min(760px, 88%);
  margin: 0 auto;
  padding: 100px 0 110px;
  text-align: center;
}

        .sobretitulo {
          margin: 0 0 22px;
          color: #d9a33f;
          font-family: Inter, Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
        }

        .historia h1 {
          margin: 0 auto 26px;
          font-size: clamp(38px, 5vw, 58px);
          font-weight: 400;
          line-height: 1.1;
        }

        .separador {
          display: flex;
          justify-content: center;
          margin: 0 0 32px;
        }

        .separador span {
          display: block;
          width: 55px;
          height: 1px;
          background: #d9a33f;
        }
.historia > p:not(.sobretitulo):not(.frase) {
  margin: 0 auto 28px;
  color: #d5d0c8;
  font-size: 20px;
  line-height: 1.8;
  letter-spacing: 0.3px;
}

.historia .frase {
  margin: 36px auto;
  color: #d9a33f;
  font-size: clamp(23px, 3vw, 30px);
  line-height: 1.45;
  letter-spacing: 1.5px;
}
        }

        .boton {
          display: inline-block;
          padding: 14px 24px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          color: #fff;
          text-decoration: none;
          font-family: Inter, Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 1px;
          transition: background 0.25s ease, color 0.25s ease;
        }

        .boton:hover {
          border-color: #d9a33f;
          background: #d9a33f;
          color: #0e0d0b;
        }

        .pie {
          padding: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          color: #aaa49a;
          text-align: center;
          font-family: Inter, Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 2px;
        }

        /* MÓVIL: MISMO COMPORTAMIENTO QUE cafes.js */

        @media (max-width: 768px) {
          .encabezado {
            position: relative;
          }

          .menu {
            display: none;
            position: absolute;
            z-index: 20;
            top: 100%;
            left: 0;
            width: 100%;
            padding: 12px 20px 20px;
            margin: 0;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: rgba(14, 13, 11, 0.98);
            border-bottom: 1px solid rgba(201, 166, 107, 0.35);
          }

          .menu.menu-abierto {
            display: flex;
          }

          .menu a {
            padding: 12px 10px;
            font-size: 12px;
            letter-spacing: 1.2px;
          }

          .menu-toggle {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 6px;
            width: 40px;
            height: 40px;
            flex: 0 0 40px;
            margin-left: 8px;
          }

          .menu-toggle span {
            display: block;
            width: 25px;
            height: 2px;
            background: #d7b574;
            border-radius: 2px;
            transition: transform 0.25s ease, opacity 0.25s ease;
          }

          .menu-toggle.is-open span:first-child {
            transform: translateY(8px) rotate(45deg);
          }

          .menu-toggle.is-open span:nth-child(2) {
            opacity: 0;
          }

          .menu-toggle.is-open span:last-child {
            transform: translateY(-8px) rotate(-45deg);
          }
        }

        @media (max-width: 600px) {
          .encabezado {
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 14px 5%;
            gap: 14px;
          }

          .marca img {
            width: 112px;
          }

          .historia {
            width: 88%;
            padding: 70px 0 80px;
          }

          .historia > p:not(.sobretitulo):not(.frase) {
            font-size: 18px;
          }
        }

        @media (max-width: 480px) {
          .carrito-link {
            gap: 5px;
            font-size: 11px;
          }

          .carrito-link svg {
            width: 25px;
            height: 25px;
          }
        }

        @media (max-width: 360px) {
          .menu-toggle {
            width: 36px;
            height: 40px;
            flex-basis: 36px;
            margin-left: 3px;
          }

          .menu-toggle span {
            width: 23px;
          }
        }
      `}</style>
    </>
  );
}
