
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    mensaje: "",
  });

  const [enviado, setEnviado] = useState(false);
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

  function actualizarCampo(event) {
    const { name, value } = event.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));

    setEnviado(false);
  }

  function manejarEnvio(event) {
    event.preventDefault();

    // El servicio de envío de correos se conectará más adelante.
    setEnviado(true);
  }

  return (
    <>
      <Head>
        <title>Contacto | GRANOPUERTO</title>
        <meta
          name="description"
          content="Contacta con GRANOPUERTO para consultas sobre nuestros cafés de origen y pedidos."
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

      <main className="contacto">
        {/* ENCABEZADO IGUAL A CAFES.JS */}
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
            <a href="/nosotros" onClick={() => setMenuOpen(false)}>
              NOSOTROS
            </a>
            <a
              className="activo"
              href="/contacto"
              onClick={() => setMenuOpen(false)}
            >
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

        {/* CONTENIDO ORIGINAL DE CONTACTO */}
        <section className="contenido">
          <h1>Hablemos de café.</h1>

          <p className="introduccion">
            ¿Tienes alguna consulta sobre nuestros cafés o pedidos?
            Escríbenos. Nos encantará ayudarte.
          </p>

          <form className="formulario" onSubmit={manejarEnvio}>
            <div className="campo">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Tu nombre"
                value={formulario.nombre}
                onChange={actualizarCampo}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="correo">Correo electrónico</label>
              <input
                id="correo"
                name="correo"
                type="email"
                placeholder="tu@correo.com"
                value={formulario.correo}
                onChange={actualizarCampo}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="asunto">Asunto</label>
              <input
                id="asunto"
                name="asunto"
                type="text"
                placeholder="Motivo de tu consulta"
                value={formulario.asunto}
                onChange={actualizarCampo}
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                placeholder="Cuéntanos cómo podemos ayudarte..."
                rows={5}
                value={formulario.mensaje}
                onChange={actualizarCampo}
                required
              />
            </div>

            <button className="boton" type="submit">
              ENVIAR MENSAJE
            </button>

            {enviado && (
              <p className="aviso" role="status">
                El formulario está preparado, pero el envío de correos
                todavía no está habilitado. Pronto podrás contactarnos
                directamente desde aquí.
              </p>
            )}
          </form>
        </section>

        <footer className="pie">
          © 2026 Granopuerto · todos los derechos reservados
        </footer>
      </main>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .contacto {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #0e0d0b;
          color: #f7f5f1;
          font-family: "Cormorant Garamond", Georgia, serif;
        }

        /* ENCABEZADO: MISMAS MEDIDAS QUE CAFES.JS */
        .encabezado {
          min-height: 82px;
          padding: 14px 5%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          position: relative;
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
          transition: color 0.2s ease;
        }

        .menu a:hover,
        .menu .activo {
          color: #d9a33f;
        }

        .menu-toggle {
          display: none;
          border: 0;
          padding: 8px;
          background: transparent;
          color: #d7b574;
          cursor: pointer;
        }

        .menu-toggle span {
          display: block;
          width: 25px;
          height: 2px;
          background: #d7b574;
          border-radius: 2px;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }

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
          flex-shrink: 0;
        }

        .carrito-link span {
          font-family: "Inter", Arial, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1;
        }

        /* CONTENIDO ORIGINAL */
        .contenido {
          flex: 1;
          width: min(620px, 88%);
          margin: 0 auto;
          padding: 65px 0 80px;
        }

        .sobretitulo {
          margin: 0 0 14px;
          color: #d9a33f;
          font-family: "Inter", Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-align: center;
        }

        h1 {
          margin: 0 0 16px;
          font-size: clamp(38px, 5vw, 54px);
          font-weight: 400;
          line-height: 1.15;
          text-align: center;
        }

        .introduccion {
          max-width: 500px;
          margin: 0 auto 34px;
          color: #d5d0c8;
          font-size: 19px;
          line-height: 1.6;
          text-align: center;
        }

        .formulario {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .campo {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .campo label {
          color: #e9e3d9;
          font-family: "Inter", Arial, sans-serif;
          font-size: 12px;
          letter-spacing: 0.4px;
        }

        .campo input,
        .campo textarea {
          width: 100%;
          padding: 13px 14px;
          border: 1px solid #39352e;
          border-radius: 0;
          outline: none;
          background: #171512;
          color: #f7f5f1;
          font-family: "Inter", Arial, sans-serif;
          font-size: 13px;
        }

        .campo input {
          min-height: 46px;
        }

        .campo textarea {
          min-height: 130px;
          resize: vertical;
          line-height: 1.6;
        }

        .campo input::placeholder,
        .campo textarea::placeholder {
          color: #8d877d;
        }

        .campo input:focus,
        .campo textarea:focus {
          border-color: #d9a33f;
        }

        .boton {
          width: 100%;
          min-height: 46px;
          padding: 14px 20px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          background: transparent;
          color: #fff;
          font-family: "Inter", Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 1.3px;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease;
        }

        .boton:hover {
          border-color: #d9a33f;
          background: #d9a33f;
          color: #0e0d0b;
        }

        .aviso {
          margin: 0;
          color: #d9a33f;
          font-family: "Inter", Arial, sans-serif;
          font-size: 12px;
          line-height: 1.6;
          text-align: center;
        }

        .pie {
          padding: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          color: #aaa49a;
          text-align: center;
          font-family: "Inter", Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 2px;
        }

        /* TABLET Y MÓVIL: MISMO MENÚ QUE CAFES.JS */
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

          .presentacion {
            padding: 42px 20px 28px;
          }

          .introduccion {
            font-size: 17px;
          }

          .contenido {
            padding: 48px 0 60px;
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

          .carrito-link span {
            font-size: 11px;
          }
        }

        @media (max-width: 360px) {
          .encabezado {
            gap: 8px;
          }

          .marca img {
            width: 105px;
          }

          .menu-toggle {
            margin-left: 0;
          }
        }
      `}</style>
    </>
  );
}
