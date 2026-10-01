import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Granopuerto | Coffee Roasters</title>

        <meta
          name="description"
          content="Granopuerto Coffee Roasters"
        />

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />

        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="hero">

        {/* FONDO */}
        <div className="hero-background" />

        {/* NAVEGACIÓN */}
        <header className="navbar">

          <nav>
            <ul className="nav-menu">

              <li>
                <a href="/" className="active">
                  INICIO
                </a>
              </li>

              <li>
                <a href="#">
                  CAFÉS
                </a>
              </li>

              <li>
                <a href="#">
                  NOSOTROS
                </a>
              </li>

              <li>
                <a href="#">
                  CONTACTO
                </a>
              </li>

            </ul>
          </nav>

          {/* CARRITO */}
          <div className="cart">

            <svg
              className="cart-icon"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >

              <path
                d="M3 5H7L10.2 20.5C10.5 22 11.8 23 13.4 23H24.5C26 23 27.3 22 27.7 20.6L30 12H9"
                stroke="white"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle
                cx="13"
                cy="27"
                r="1.8"
                fill="white"
              />

              <circle
                cx="24"
                cy="27"
                r="1.8"
                fill="white"
              />

            </svg>

            <span>0</span>

          </div>

        </header>

        {/* LOGO */}
        <div className="hero-logo">

          <img
            src="/logo.png"
            alt="Granopuerto Coffee Roasters"
          />

        </div>

        {/* TEXTO PRINCIPAL */}
        <div className="hero-content">

          <h1>
            Granopuerto no es solo café
          </h1>

          <p>
            Es historia, viaje y carácter porteño en cada sorbo.
            <br />
            Granos seleccionados del mundo, transformados en una
            <br className="desktop-break" />
            experiencia única.
          </p>

        </div>

        {/* BOLSA INDEPENDIENTE */}
        <img
          className="coffee-bag"
          src="/bolsa-colombia.png"
          alt="Café GRANOPUERTO Colombia"
        />

        {/* BOTÓN */}
        <a
          href="#"
          className="hero-button"
        >
          VER NUESTROS CAFÉS&nbsp; →
        </a>

        <style jsx>{`

          /* =========================================
             RESET
          ========================================= */

          * {
            box-sizing: border-box;
          }

          /* =========================================
             PORTADA
          ========================================= */

          .hero {
            position: relative;

            width: 100%;

            height: 100vh;
            height: 100svh;

            min-height: 650px;

            background: #0e0d0b;

            color: #f2f2f2;

            overflow: hidden;

            font-family:
              "Cormorant Garamond",
              Georgia,
              serif;
          }

          /* =========================================
             FONDO
          ========================================= */

          .hero-background {
            position: absolute;

            left: 0;
            right: 0;
            bottom: 0;

            width: 100%;
            height: 69%;

            background-image:
              url("/fondo-cafe.png");

            background-size: cover;

            background-position:
              center bottom;

            background-repeat: no-repeat;

            z-index: 1;
          }

          .hero-background::before {
            content: "";

            position: absolute;

            top: 0;
            left: 0;
            right: 0;

            height: 48%;

            background:
              linear-gradient(
                to bottom,
                #0e0d0b 0%,
                rgba(14, 13, 11, 0.98) 20%,
                rgba(14, 13, 11, 0.80) 55%,
                rgba(14, 13, 11, 0) 100%
              );
          }

          /* =========================================
             NAVEGACIÓN
          ========================================= */

          .navbar {
            position: absolute;

            top: 0;
            left: 0;

            width: 100%;
            height: 60px;

            display: flex;

            align-items: center;
            justify-content: center;

            z-index: 30;

            font-family:
              "Inter",
              Arial,
              sans-serif;
          }

          .nav-menu {
            display: flex;

            align-items: center;
            justify-content: center;

            gap: 48px;

            list-style: none;

            margin: 0;
            padding: 0;
          }

          .nav-menu a {
            position: relative;

            color: #f2f2f2;

            text-decoration: none;

            font-size: 11px;

            font-weight: 400;

            letter-spacing: 1px;

            padding: 8px 0;
          }

          .nav-menu a:hover {
            color: #d9a34a;
          }

          .nav-menu .active::after {
            content: "";

            position: absolute;

            left: 0;
            right: 0;

            bottom: -2px;

            height: 2px;

            background: #d9a34a;
          }

          /* =========================================
             CARRITO
          ========================================= */

          .cart {
            position: absolute;

            right: 32px;
            top: 50%;

            transform: translateY(-50%);

            display: flex;

            align-items: center;

            gap: 9px;

            color: #fff;

            font-family:
              "Inter",
              Arial,
              sans-serif;

            font-size: 13px;
          }

          .cart-icon {
            width: 27px;
            height: 27px;

            display: block;
          }

          /* =========================================
             LOGO
          ========================================= */

          .hero-logo {
            position: absolute;

            z-index: 20;

            top: 72px;

            left: 50%;

            transform: translateX(-50%);

            width: 260px;

            max-width: 32vw;
          }

          .hero-logo img {
            display: block;

            width: 100%;

            height: auto;
          }

          /* =========================================
             TEXTO PRINCIPAL
          ========================================= */

          .hero-content {
            position: absolute;

            z-index: 25;

            top: 295px;

            left: 50%;

            transform: translateX(-50%);

            width: min(900px, 90%);

            text-align: center;
          }

          .hero-content h1 {
            margin: 0 0 14px;

            font-family:
              "Cormorant Garamond",
              Georgia,
              serif;

            font-size:
              clamp(38px, 4vw, 58px);

            line-height: 1.05;

            font-weight: 600;

            color: #f5f5f5;
          }

          .hero-content p {
            margin: 0 auto;

            max-width: 760px;

            font-family:
              "Cormorant Garamond",
              Georgia,
              serif;

            font-size:
              clamp(18px, 1.65vw, 25px);

            line-height: 1.25;

            font-weight: 400;

            color: #f0f0f0;
          }

          /* =========================================
             BOLSA DE CAFÉ

             MÁS PEQUEÑA
             MÁS ABAJO
             DETRÁS DEL TEXTO
          ========================================= */

          .coffee-bag {
            position: absolute;

            z-index: 10;

            left: 50%;

            bottom: 6%;

            transform: translateX(-50%);

            width: 235px;

            max-width: 21vw;

            height: auto;

            display: block;

            filter:
              drop-shadow(
                0 20px 30px rgba(0, 0, 0, 0.65)
              );
          }

          /* =========================================
             BOTÓN
          ========================================= */

          .hero-button {
            position: absolute;

            z-index: 30;

            left: 50%;

            bottom: 2.5%;

            transform: translateX(-50%);

            display: flex;

            align-items: center;
            justify-content: center;

            width: 310px;

            height: 42px;

            border:
              1px solid rgba(255,255,255,0.85);

            color: #fff;

            background:
              rgba(14, 13, 11, 0.35);

            text-decoration: none;

            font-family:
              "Inter",
              Arial,
              sans-serif;

            font-size: 10px;

            letter-spacing: 3px;

            white-space: nowrap;

            transition:
              background 0.3s ease,
              color 0.3s ease;
          }

          .hero-button:hover {
            background: #fff;

            color: #0e0d0b;
          }

          /* =========================================
             TABLET
          ========================================= */

          @media (max-width: 900px) {

            .hero {
              min-height: 650px;
            }

            .nav-menu {
              gap: 32px;
            }

            .cart {
              right: 20px;
            }

            .hero-logo {
              top: 72px;

              width: 225px;

              max-width: 32vw;
            }

            .hero-content {
              top: 260px;
            }

            .hero-content h1 {
              font-size: 42px;
            }

            .hero-content p {
              font-size: 19px;
            }

            .coffee-bag {
              width: 215px;

              max-width: 25vw;

              bottom: 6%;
            }

            .hero-button {
              width: 275px;
            }
          }

          /* =========================================
             MÓVIL
          ========================================= */

          @media (max-width: 600px) {

            .hero {
              height: 100svh;

              min-height: 600px;
            }

            .hero-background {
              height: 67%;

              background-position:
                center bottom;
            }

            .navbar {
              height: 48px;
            }

            .nav-menu {
              gap: 22px;
            }

            .nav-menu a {
              font-size: 8px;

              letter-spacing: 0.6px;
            }

            .cart {
              right: 10px;

              gap: 5px;

              font-size: 10px;
            }

            .cart-icon {
              width: 22px;
              height: 22px;
            }

            .hero-logo {
              top: 62px;

              width: 175px;

              max-width: 48vw;
            }

            .hero-content {
              top: 205px;

              width: 92%;
            }

            .hero-content h1 {
              margin-bottom: 10px;

              font-size: 30px;
            }

            .hero-content p {
              font-size: 15px;

              line-height: 1.25;
            }

            .desktop-break {
              display: none;
            }

            .coffee-bag {
              width: 175px;

              max-width: none;

              bottom: 6%;
            }

            .hero-button {
              width: 220px;

              height: 34px;

              bottom: 1.5%;

              font-size: 8px;

              letter-spacing: 2px;
            }
          }

          /* =========================================
             MÓVIL PEQUEÑO
          ========================================= */

          @media (max-width: 390px) {

            .nav-menu {
              gap: 16px;
            }

            .nav-menu a {
              font-size: 7px;
            }

            .hero-logo {
              top: 57px;

              width: 155px;
            }

            .hero-content {
              top: 190px;
            }

            .hero-content h1 {
              font-size: 27px;
            }

            .hero-content p {
              font-size: 14px;
            }

            .coffee-bag {
              width: 160px;
            }

            .hero-button {
              width: 200px;
            }
          }

        `}</style>

      </main>
    </>
  );
}
