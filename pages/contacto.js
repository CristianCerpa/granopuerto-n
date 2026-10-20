
import Head from "next/head";
import { useState } from "react";

export default function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    mensaje: "",
  });

  const [enviado, setEnviado] = useState(false);

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
        <header className="encabezado">
          <a className="marca" href="/" aria-label="Volver al inicio">
            <img src="/logo.png" alt="GRANOPUERTO" />
          </a>

          <nav className="menu">
            <a href="/">INICIO</a>
            <a href="/cafes">CAFÉS</a>
            <a href="/nosotros">NOSOTROS</a>
            <a className="activo" href="/contacto">
              CONTACTO
            </a>
          </nav>

          <a
            className="carrito-link"
            href="/carrito"
            aria-label="Ver carrito"
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
          </a>
        </header>

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

        /* ENCABEZADO: alineación equivalente a cafes.js */
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

        .menu {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: clamp(30px, 4vw, 55px);
        }

        .menu a {
          color: #fff;
          text-decoration: none;
          font-family: Inter, Arial, sans-serif;
          font-size: clamp(9px, 0.75vw, 12px);
          letter-spacing: clamp(0.6px, 0.08vw, 1.2px);
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        .menu a:hover,
        .menu .activo {
          color: #d9a33f;
        }

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

        .contenido {
          flex: 1;
          width: min(620px, 88%);
          margin: 0 auto;
          padding: 65px 0 80px;
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
          font-family: Inter, Arial, sans-serif;
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
          font-family: Inter, Arial, sans-serif;
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
          font-family: Inter, Arial, sans-serif;
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
          font-family: Inter, Arial, sans-serif;
          font-size: 12px;
          line-height: 1.6;
          text-align: center;
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

        @media (max-width: 768px) {
          .encabezado {
            padding-left: 24px;
            padding-right: 90px;
            gap: 24px;
          }

          .marca img {
            width: 112px;
          }

          .menu {
            gap: 24px;
          }

          .menu a {
            font-size: 8px;
            letter-spacing: 0.7px;
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

          .contenido {
            padding: 48px 0 60px;
          }

          .introduccion {
            font-size: 17px;
          }
        }

        @media (max-width: 600px) {
          .encabezado {
            min-height: auto;
            flex-wrap: wrap;
            justify-content: flex-start;
            padding: 14px 60px 14px 5%;
            gap: 14px;
          }

          .marca img {
            width: 112px;
          }

          .menu {
            order: 3;
            width: 100%;
            gap: clamp(12px, 4vw, 22px);
          }

          .menu a {
            font-size: 8px;
            letter-spacing: 0.7px;
          }

          .carrito-link {
            right: 12px;
            top: 28px;
            transform: translateY(-50%);
          }
        }

        @media (max-width: 480px) {
          .encabezado {
            padding-left: 5%;
            padding-right: 48px;
          }

          .menu {
            gap: 18px;
          }

          .menu a {
            font-size: 7px;
            letter-spacing: 0.5px;
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
          .menu {
            gap: 14px;
          }

          .menu a {
            font-size: 6.5px;
          }
        }
      `}</style>
    </>
  );
}

