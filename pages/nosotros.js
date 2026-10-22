
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
            suma + Number(producto.cantidad || 1),
          0
        );

        setCantidadCarrito(total);
      } catch {
        setCantidadCarrito(0);
      }
    }

    actualizarCarrito();
    window.addEventListener("storage", actualizarCarrito);

    return () => {
      window.removeEventListener("storage", actualizarCarrito);
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
            aria-label={`Ver carrito, ${cantidadCarrito} productos`}
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

            {cantidadCarrito > 0 && (
              <span className="contador-carrito">
                {cantidadCarrito}
              </span>
            )}
          </a>
        </header>

        <section className="historia">
          <p>
            ¡Bienvenido a nuestra tienda!

            Este es un espacio para conocernos mejor y descubrir lo que
            tenemos para ti. Gracias por visitarnos y ser parte de nuestra
            comunidad.
          </p>

          <p>
            Nacimos inspirados en Valparaíso, puerto histórico que conectó
            a Chile con el mundo a través del comercio y las culturas.
          </p>

          <p>
            Hoy, ese espíritu vive en nuestros cafés de distintos orígenes,
            tostados y envasados en Valparaíso, donde cada grano encuentra
            una nueva historia.
          </p>

          <p className="frase">
            <strong>
              <br />
              El mundo del café, con esencia porteña.
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

        /* ENCABEZADO */
        .encabezado {
          position: relative;
          min-height: 70px;
          padding: 0 0 0 clamp(24px, 6vw, 90px);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: clamp(30px, 4vw, 55px);
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

        /* MENÚ DE ESCRITORIO: estilo de index.js */
        .menu {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: clamp(22px, 3vw, 44px);
          margin-left: auto;
          margin-right: clamp(60px, 7vw, 100px);
        }

        .menu a {
          position: relative;
          display: inline-block;
          padding: 10px 0;
          color: rgba(255, 255, 255, 0.88);
          text-decoration: none;
          font-family: Inter, Arial, sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 1.25px;
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        .menu a:hover {
          color: #d7b574;
        }

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
          background: #c9a66b;
        }

        /* HAMBURGUESA: oculta en escritorio */
        .menu-toggle {
          display: none;
          border: 0;
          padding: 8px;
          background: transparent;
          color: #d7b574;
          cursor: pointer;
        }

        /* CARRITO: se conserva su posición y estilo */
        .carrito-link {
          position: absolute;
          right: clamp(16px, 2.5vw, 38px);
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          font-family: Inter, Arial, sans-serif;
          font-size: 14px;
          gap: 10px;
        }

        .carrito-link svg {
          display: block;
          width: 34px;
          height: 34px;
          flex-shrink: 0;
        }

        .contador-carrito {
          font-family: Inter, Arial, sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: inherit;
          line-height: 1;
        }

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
          margin: 0 auto 22px;
          color: #d5d0c8;
          font-size: 20px;
          line-height: 1.7;
        }

        .historia .frase {
          margin: 36px auto;
          color: #d9a33f;
          font-size: clamp(23px, 3vw, 30px);
          line-height: 1.45;
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

        /* MÓVIL: hamburguesa igual a index.js */
        @media (max-width: 768px) {
          .encabezado {
            position: relative;
            padding-left: 24px;
            padding-right: 90px;
            gap: 24px;
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
            order: 2;
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

          .marca img {
            width: 112px;
          }

          .carrito-link {
            right: 12px;
            gap: 7px;
            font-size: 12px;
          }

          .carrito-link svg {
            width: 28px;
            height: 28px;
          }
        }

        @media (max-width: 600px) {
          .encabezado {
            min-height: auto;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 14px 60px 14px 5%;
            gap: 14px;
          }

          .marca img {
            width: 112px;
          }

          .carrito-link {
            right: 12px;
            top: 28px;
            transform: translateY(-50%);
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
          .encabezado {
            padding-left: 5%;
            padding-right: 48px;
          }

          .carrito-link {
            right: 8px;
            font-size: 11px;
            gap: 5px;
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
