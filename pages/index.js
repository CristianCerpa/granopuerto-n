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
                <a href="#" className="active">
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

        {/* TEXTO */}
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

          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;
          }

          .hero {
            position: relative;
            width: 100%;
            min-height: 100vh;
            min-height: 100svh;

            background: #0e0d0b;
            color: #f2f2f2;

            overflow: hidden;

            font-family:
              "Cormorant Garamond",
              Georgia,
              serif;
          }


          /* ================================
             FONDO
          ================================= */

          .hero-background {
            position: absolute;

            left: 0;
            right: 0;
            bottom: 0;

            width: 100%;
            height: 68%;

            background-image: url("/fondo-cafe.png");

            background-size: cover;
            background-position: center bottom;
            background-repeat: no-repeat;

            z-index: 1;
          }

          .hero-background::before {
            content: "";

            position: absolute;

            top: 0;
            left: 0;
            right: 0;

            height: 42%;

            background:
              linear-gradient(
                to bottom,
                #0e0d0b 0%,
                rgba(14, 13, 11, 0.98) 25%,
                rgba(14, 13, 11, 0.75) 55%,
                rgba(14, 13, 11, 0) 100%
              );
          }


          /* ================================
             NAVEGACIÓN
          ================================= */

          .navbar {
            position: absolute;

            top: 0;
            left: 0;

            width: 100%;
            height: 54px;

            display: flex;
            justify-content: center;
            align-items: center;

            z-index: 30;

            font-family:
              "Inter",
              Arial,
              sans-serif;
          }

          .nav-menu {
            display: flex;
            align-items: center;

            gap: 43px;

            list-style: none;

            margin: 0;
            padding: 0;
          }

          .nav-menu a {
            position: relative;

            color: #f2f2f2;

            text-decoration: none;

            font-size: 10px;
            font-weight: 400;

            letter-spacing: 0.8px;

            padding: 7px 0;
          }

          .nav-menu .active::after {
            content: "";

            position: absolute;

            left: 0;
            right: 0;

            bottom: -1px;

            height: 2px;

            background: #d9a34a;
          }

          .nav-menu a:hover {
            color: #d9a34a;
          }


          /* ================================
             CARRITO
          ================================= */

          .cart {
            position: absolute;

            right: 24px;
            top: 50%;

            transform: translateY(-50%);

            display: flex;
            align-items: center;

            gap: 8px;

            color: white;

            font-family:
              "Inter",
              Arial,
              sans-serif;

            font-size: 12px;
          }

          .cart-icon {
            width: 25px;
            height: 25px;
          }


          /* ================================
             LOGO
          ================================= */

          .hero-logo {
            position: absolute;

            z-index: 20;

            top: 73px;
            left: 50%;

            transform: translateX(-50%);

            width: clamp(165px, 22vw, 330px);

            text-align: center;
          }

          .hero-logo img {
            display: block;

            width: 100%;
            height: auto;
          }


          /* ================================
             TEXTO CENTRAL
          ================================= */

          .hero-content {
            position: absolute;

            z-index: 12;

            top: clamp(210px, 28vh, 300px);

            left: 50%;

            transform: translateX(-50%);

            width: min(850px, 90%);

            text-align: center;
          }

          .hero-content h1 {
            margin: 0 0 12px;

            font-family:
              "Cormorant Garamond",
              Georgia,
              serif;

            font-size: clamp(30px, 3.2vw, 52px);

            line-height: 1.05;

            font-weight: 600;

            color: #f5f5f5;
          }

          .hero-content p {
            margin: 0 auto;

            max-width: 700px;

            font-family:
              "Cormorant Garamond",
              Georgia,
              serif;

            font-size: clamp(16px, 1.45vw, 23px);

            line-height: 1.25;

            font-weight: 400;

            color: #f0f0f0;
          }


          /* ================================
             BOLSA
          ================================= */

          .coffee-bag {
            position: absolute;

            z-index: 15;

            left: 50%;
            bottom: 7%;

            transform: translateX(-50%);

            width: clamp(
              205px,
              24vw,
              360px
            );

            height: auto;

            display: block;

            filter:
              drop-shadow(
                0 18px 28px rgba(0, 0, 0, 0.6)
              );
          }


          /* ================================
             BOTÓN
          ================================= */

          .hero-button {
            position: absolute;

            z-index: 25;

            left: 50%;
            bottom: 1.5%;

            transform: translateX(-50%);

            display: flex;

            align-items: center;
            justify-content: center;

            width: clamp(205px, 22vw, 310px);

            height: 31px;

            border: 1px solid #f2f2f2;

            color: #fff;

            background:
              rgba(14, 13, 11, 0.25);

            text-decoration: none;

            font-family:
              "Inter",
              Arial,
              sans-serif;

            font-size: 10px;

            letter-spacing: 2.5px;

            white-space: nowrap;
          }

          .hero-button:hover {
            background: #fff;
            color: #0e0d0b;
          }


          /* ================================
             TABLET
          ================================= */

          @media (max-width: 900px) {

            .navbar {
              height: 48px;
            }

            .nav-menu {
              gap: 30px;
            }

            .cart {
              right: 18px;
            }

            .hero-logo {
              top: 58px;
              width: 205px;
            }

            .hero-content {
              top: 185px;
              width: 92%;
            }

            .hero-content h1 {
              font-size: 34px;
            }

            .hero-content p {
              font-size: 17px;
            }

            .coffee-bag {
              width: 245px;
              bottom: 7%;
            }

            .hero-button {
              bottom: 1.5%;
              width: 245px;
            }
          }


          /* ================================
             MÓVIL
          ================================= */

          @media (max-width: 600px) {

            .hero {
              min-height: 100svh;
              height: 100svh;
            }

            .hero-background {
              height: 66%;

              background-position:
                center bottom;
            }

            .navbar {
              height: 38px;
            }

            .nav-menu {
              gap: 25px;
            }

            .nav-menu a {
              font-size: 8px;
              letter-spacing: 0.5px;
            }

            .cart {
              right: 12px;
              gap: 5px;
              font-size: 10px;
            }

            .cart-icon {
              width: 22px;
              height: 22px;
            }

            .hero-logo {
              top: 47px;

              width: 165px;
            }

            .hero-content {
              top: 168px;

              width: 92%;
            }

            .hero-content h1 {
              margin-bottom: 10px;

              font-size: 28px;

              line-height: 1.02;
            }

            .hero-content p {
              font-size: 14px;

              line-height: 1.25;
            }

            .desktop-break {
              display: none;
            }

            .coffee-bag {
              width: 205px;

              max-width: none;

              bottom: 7%;
            }

            .hero-button {
              bottom: 0.8%;

              width: 205px;

              height: 28px;

              font-size: 8px;

              letter-spacing: 2px;
            }
          }


          /* ================================
             MÓVIL PEQUEÑO
          ================================= */

          @media (max-width: 390px) {

            .nav-menu {
              gap: 17px;
            }

            .nav-menu a {
              font-size: 7.5px;
            }

            .cart {
              right: 8px;
            }

            .hero-logo {
              top: 44px;

              width: 150px;
            }

            .hero-content {
              top: 160px;
            }

            .hero-content h1 {
              font-size: 25px;
            }

            .hero-content p {
              font-size: 13px;
            }

            .coffee-bag {
              width: 190px;
            }

            .hero-button {
              width: 190px;
            }
          }

        `}</style>
      </main>
    </>
  );
}
