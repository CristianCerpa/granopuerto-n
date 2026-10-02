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

        {/* =========================================
            FONDO DE CAFÉ
        ========================================== */}

        <div className="hero-background" />


        {/* =========================================
            MENÚ
        ========================================== */}

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


        {/* =========================================
            LOGO
        ========================================== */}

        <div className="hero-logo">

          <img
            src="/logo.png"
            alt="Granopuerto Coffee Roasters"
          />

        </div>


        {/* =========================================
            TEXTO PRINCIPAL
        ========================================== */}

        <section className="hero-content">

          <h1>
            Granopuerto no es solo café
          </h1>

          <p>
            Es historia, viaje y carácter porteño en cada sorbo.
            <br className="desktop-break" />
            Granos seleccionados del mundo, transformados en una
            <br className="desktop-break" />
            experiencia única.
          </p>

        </section>


        {/* =========================================
            BOLSA
        ========================================== */}

        <img
          className="coffee-bag"
          src="/bolsa-colombia.png"
          alt="Café Granopuerto Colombia"
        />


        {/* =========================================
            BOTÓN
        ========================================== */}

        <a
          href="#"
          className="hero-button"
        >
          VER NUESTROS CAFÉS&nbsp; →
        </a>


        <style jsx>{`

          /* =========================================
             BASE
          ========================================== */

          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;
          }


          /* =========================================
             HERO
          ========================================== */

          .hero {

            position: relative;

            width: 100%;

            height: 100vh;

            height: 100svh;

            min-height: 620px;

            overflow: hidden;

            background: #0e0d0b;

            color: #ffffff;

            font-family:
              "Cormorant Garamond",
              Georgia,
              serif;
          }


          /* =========================================
             FONDO DE CAFÉ
          ========================================== */

          .hero-background {

            position: absolute;

            left: 0;
            right: 0;
            bottom: 0;

            width: 100%;

            height: 65%;

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

            left: 0;
            right: 0;
            top: 0;

            height: 45%;

            background:
              linear-gradient(
                to bottom,
                #0e0d0b 0%,
                rgba(14, 13, 11, 0.96) 25%,
                rgba(14, 13, 11, 0.55) 70%,
                rgba(14, 13, 11, 0) 100%
              );
          }


          /* =========================================
             NAVBAR
          ========================================== */

          .navbar {

            position: absolute;

            top: 0;
            left: 0;

            width: 100%;

            height: 70px;

            display: flex;

            justify-content: center;

            align-items: center;

            z-index: 50;

            font-family:
              "Inter",
              Arial,
              sans-serif;
          }


          .nav-menu {

            display: flex;

            align-items: center;

            justify-content: center;

            gap:
              clamp(
                30px,
                4vw,
                55px
              );

            list-style: none;

            margin: 0;

            padding: 0;
          }


          .nav-menu a {

            position: relative;

            color: #ffffff;

            text-decoration: none;

            font-family:
              "Inter",
              Arial,
              sans-serif;

            font-size:
              clamp(
                9px,
                0.75vw,
                12px
              );

            font-weight: 400;

            letter-spacing:
              clamp(
                0.6px,
                0.08vw,
                1.2px
              );

            padding: 8px 0;

            white-space: nowrap;

            transition:
              color 0.25s ease;
          }


          .nav-menu a:hover {
            color: #d9a33f;
          }


          .nav-menu .active::after {

            content: "";

            position: absolute;

            left: 0;
            right: 0;

            bottom: -3px;

            height: 2px;

            background: #d9a33f;
          }


          /* =========================================
             CARRITO
          ========================================== */

          .cart {

            position: absolute;

            right:
              clamp(
                16px,
                2.5vw,
                38px
              );

            top: 50%;

            transform:
              translateY(-50%);

            display: flex;

            align-items: center;

            gap: 8px;

            font-family:
              "Inter",
              Arial,
              sans-serif;

            font-size:
              clamp(
                10px,
                0.8vw,
                13px
              );

            color: #ffffff;
          }


          .cart-icon {

            width:
              clamp(
                22px,
                1.8vw,
                28px
              );

            height:
              clamp(
                22px,
                1.8vw,
                28px
              );

            display: block;
          }


          /* =========================================
             LOGO
          ========================================== */

          .hero-logo {

            position: absolute;

            z-index: 30;

            top:
              clamp(
                72px,
                8vh,
                100px
              );

            left: 50%;

            transform:
              translateX(-50%);

            width:
              clamp(
                180px,
                23vw,
                285px
              );
          }


          .hero-logo img {

            display: block;

            width: 100%;

            height: auto;
          }


          /* =========================================
             TEXTO
          ========================================== */

          .hero-content {

            position: absolute;

            z-index: 40;

            top:
              clamp(
                255px,
                36vh,
                350px
              );

            left: 50%;

            transform:
              translateX(-50%);

            width:
              min(
                900px,
                88%
              );

            text-align: center;
          }


          .hero-content h1 {

            margin:
              0 0 14px;

            color: #f7f5f1;

            font-family:
              "Cormorant Garamond",
              Georgia,
              serif;

            font-size:
              clamp(
                31px,
                3.5vw,
                50px
              );

            line-height: 1.05;

            font-weight: 600;
          }


          .hero-content p {

            margin:
              0 auto;

            max-width: 720px;

            color: #f3f1ed;

            font-family:
              "Cormorant Garamond",
              Georgia,
              serif;

            font-size:
              clamp(
                15px,
                1.45vw,
                21px
              );

            line-height: 1.3;

            font-weight: 400;
          }


          /* =========================================
             BOLSA - COMPUTADOR
          ========================================== */

          .coffee-bag {

            position: absolute;

            z-index: 20;

            left: 50%;

            transform:
              translateX(-50%);

            bottom: -1%;

            width:
              clamp(
                145px,
                20vw,
                225px
              );

            height: auto;

            display: block;

            filter:
              drop-shadow(
                0 18px 30px
                rgba(0, 0, 0, 0.65)
              );
          }


          /* =========================================
             BOTÓN - COMPUTADOR
          ========================================== */

          .hero-button {

            position: absolute;

            z-index: 60;

            left: 50%;

            transform:
              translateX(-50%);

            bottom:
              clamp(
                115px,
                17vh,
                150px
              );

            width:
              clamp(
                210px,
                25vw,
                320px
              );

            height:
              clamp(
                34px,
                4vh,
                44px
              );

            display: flex;

            align-items: center;

            justify-content: center;

            border:
              1px solid
              rgba(
                255,
                255,
                255,
                0.85
              );

            background:
              rgba(
                14,
                13,
                11,
                0.38
              );

            color: #ffffff;

            text-decoration: none;

            font-family:
              "Inter",
              Arial,
              sans-serif;

            font-size:
              clamp(
                8px,
                0.7vw,
                10px
              );

            letter-spacing:
              clamp(
                1.8px,
                0.22vw,
                3px
              );

            white-space: nowrap;

            transition:
              background 0.25s ease,
              color 0.25s ease;
          }


          .hero-button:hover {

            background: #ffffff;

            color: #0e0d0b;
          }


          /* =========================================
             TABLET / PANTALLAS MEDIANAS
          ========================================== */

          @media (max-width: 1100px) {

            .hero-logo {

              top: 75px;

              width: 230px;
            }


            .hero-content {

              top: 260px;
            }


            .hero-content h1 {

              font-size: 42px;
            }


            .hero-content p {

              font-size: 18px;
            }


            .coffee-bag {

              width: 190px;

              bottom: -1%;
            }


            .hero-button {

              bottom: 125px;
            }
          }


          /* =========================================
             CELULAR
             
             DISEÑO SEGÚN LA REFERENCIA
          ========================================== */

          @media (max-width: 768px) {

            .hero {

              min-height: 560px;
            }


            /* MENÚ */

            .navbar {

              height: 55px;
            }


            .nav-menu {

              gap: 24px;
            }


            .nav-menu a {

              font-size: 8px;

              letter-spacing: 0.7px;
            }


            .cart {

              right: 12px;

              gap: 5px;

              font-size: 9px;
            }


            .cart-icon {

              width: 21px;

              height: 21px;
            }


            /* FONDO */

            .hero-background {

              height: 64%;

              bottom: 0;

              background-size: cover;

              background-position:
                center bottom;
            }


            .hero-background::before {

              height: 42%;

              background:
                linear-gradient(
                  to bottom,
                  #0e0d0b 0%,
                  rgba(14, 13, 11, 0.95) 20%,
                  rgba(14, 13, 11, 0.55) 55%,
                  rgba(14, 13, 11, 0) 100%
                );
            }


            /* LOGO */

            .hero-logo {

              top: 58px;

              width: 175px;

              max-width: 45vw;
            }


            /* TEXTO */

            .hero-content {

              top: 178px;

              width: 92%;
            }


            .hero-content h1 {

              margin:
                0 0 8px;

              font-size: 28px;

              line-height: 1.05;
            }


            .hero-content p {

              max-width: 360px;

              font-size: 13px;

              line-height: 1.25;
            }


            .desktop-break {

              display: none;
            }


            /* =====================================
               BOTÓN CELULAR
               
               POSICIÓN DE LA REFERENCIA
            ====================================== */

            .hero-button {

              bottom: 285px;

              width: 205px;

              height: 32px;

              font-size: 8px;

              letter-spacing: 2px;
            }


            /* =====================================
               BOLSA CELULAR
               
               GRANDE Y ABAJO
            ====================================== */

            .coffee-bag {

              width: 125px;

              bottom: 5px;
            }
          }


          /* =========================================
             CELULAR PEQUEÑO
          ========================================== */

          @media (max-width: 480px) {

            .hero {

              min-height: 500px;
            }


            /* MENÚ */

            .navbar {

              height: 45px;
            }


            .nav-menu {

              gap: 18px;
            }


            .nav-menu a {

              font-size: 7px;

              letter-spacing: 0.5px;
            }


            .cart {

              right: 8px;

              font-size: 8px;

              gap: 4px;
            }


            .cart-icon {

              width: 18px;

              height: 18px;
            }


            /* FONDO */

            .hero-background {

              height: 65%;

              background-position:
                center bottom;
            }


            .hero-background::before {

              height: 38%;

              background:
                linear-gradient(
                  to bottom,
                  #0e0d0b 0%,
                  rgba(14, 13, 11, 0.94) 18%,
                  rgba(14, 13, 11, 0.48) 52%,
                  rgba(14, 13, 11, 0) 100%
                );
            }


            /* LOGO */

            .hero-logo {

              top: 83px;

              width: 150px;
            }


            /* TEXTO */

            .hero-content {

              top: 166px;

              width: 94%;
            }


            .hero-content h1 {

              margin-bottom: 7px;

              font-size: 23px;

              line-height: 1.05;
            }


            .hero-content p {

              max-width: 310px;

              font-size: 11px;

              line-height: 1.25;
            }


            /* =====================================
               BOTÓN
               
               EXACTAMENTE ARRIBA DE LA ZONA
               DEL FONDO / BOLSA
            ====================================== */

            .hero-button {

              bottom: 285px;

              width: 190px;

              height: 29px;

              font-size: 7px;

              letter-spacing: 1.8px;
            }


            /* =====================================
               BOLSA
               
               GRANDE Y CENTRADA
            ====================================== */

            .coffee-bag {

              width: 125px;

              bottom: 5px;
            }
          }


          /* =========================================
             CELULAR MUY PEQUEÑO
          ========================================== */

          @media (max-width: 360px) {

            .nav-menu {

              gap: 14px;
            }


            .nav-menu a {

              font-size: 6.5px;
            }


            .hero-logo {

              top: 50px;

              width: 140px;
            }


            .hero-content {

              top: 126px;
            }


            .hero-content h1 {

              font-size: 21px;
            }


            .hero-content p {

              font-size: 10px;

              max-width: 285px;
            }


            /* BOTÓN */

            .hero-button {

              bottom: 270px;

              width: 180px;

              height: 27px;

              font-size: 6.5px;
            }


            /* BOLSA */

            .coffee-bag {

              width: 115px;

              bottom: 5px;
            }
          }

        `}</style>

      </main>
    </>
  );
}
