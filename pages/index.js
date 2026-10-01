<!DOCTYPE html>
<html lang="es">
<head>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Granopuerto | Coffee Roasters</title>

  <!-- FUENTES -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">


  <style>

    /* =====================================================
       RESET
    ===================================================== */

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html,
    body {
      width: 100%;
      min-height: 100%;
    }

    body {
      background: #0e0d0b;
      color: #f2f2f2;
      font-family: "Cormorant Garamond", Georgia, serif;
      overflow-x: hidden;
    }


    /* =====================================================
       PORTADA
    ===================================================== */

    .hero {
      position: relative;
      width: 100%;
      min-height: 100vh;
      background: #0e0d0b;
      overflow: hidden;
    }


    /* =====================================================
       IMAGEN DE FONDO
       Ocupa aproximadamente los 3/4 inferiores
    ===================================================== */

    .hero-background {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;

      width: 100%;
      height: 72%;

      background-image: url("fondo-cafe.jpg");
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;

      z-index: 1;
    }


    /* Degradado para integrar la imagen con el fondo negro */

    .hero-background::before {
      content: "";

      position: absolute;

      top: 0;
      left: 0;
      right: 0;

      height: 32%;

      background: linear-gradient(
        to bottom,
        #0e0d0b 0%,
        rgba(14, 13, 11, 0.92) 45%,
        rgba(14, 13, 11, 0) 100%
      );
    }


    /* =====================================================
       NAVEGACIÓN
    ===================================================== */

    .navbar {
      position: relative;
      z-index: 20;

      width: 100%;
      height: 80px;

      display: flex;
      align-items: center;
      justify-content: center;

      padding: 0 45px;

      font-family: "Inter", Arial, sans-serif;
    }


    .nav-menu {
      display: flex;
      align-items: center;
      justify-content: center;

      gap: 54px;

      list-style: none;
    }


    .nav-menu a {
      position: relative;

      color: #f2f2f2;

      text-decoration: none;

      font-size: 13px;
      font-weight: 400;

      letter-spacing: 1px;

      padding: 10px 0;

      transition: color 0.3s ease;
    }


    .nav-menu a:hover {
      color: #d9a34a;
    }


    /* Línea dorada bajo INICIO */

    .nav-menu .active::after {
      content: "";

      position: absolute;

      left: 0;
      right: 0;

      bottom: -3px;

      height: 2px;

      background: #d9a34a;
    }


    /* =====================================================
       CARRITO
    ===================================================== */

    .cart {
      position: absolute;

      right: 45px;
      top: 50%;

      transform: translateY(-50%);

      display: flex;
      align-items: center;

      gap: 12px;

      color: #fff;

      font-family: "Inter", Arial, sans-serif;

      font-size: 14px;
    }


    .cart-icon {
      width: 30px;
      height: 30px;
      display: block;
    }


    /* =====================================================
       LOGO
    ===================================================== */

    .hero-logo {
      position: absolute;

      z-index: 10;

      top: 96px;
      left: 50%;

      transform: translateX(-50%);

      width: 370px;
      max-width: 45vw;
    }


    .hero-logo img {
      display: block;

      width: 100%;
      height: auto;
    }


    /* =====================================================
       TEXTO
       Este bloque queda flotando sobre el fondo
    ===================================================== */

    .hero-content {
      position: absolute;

      z-index: 12;

      top: 360px;
      left: 50%;

      transform: translateX(-50%);

      width: min(900px, 90%);

      text-align: center;
    }


    .hero-title {
      font-family: "Cormorant Garamond", Georgia, serif;

      font-size: clamp(38px, 4vw, 58px);

      line-height: 1;

      font-weight: 600;

      color: #f5f5f5;

      margin-bottom: 20px;
    }


    .hero-description {
      max-width: 700px;

      margin: 0 auto;

      font-family: "Cormorant Garamond", Georgia, serif;

      font-size: clamp(20px, 2vw, 27px);

      line-height: 1.35;

      font-weight: 400;

      color: #f0f0f0;
    }


    /* =====================================================
       BOLSA DE CAFÉ
       IMPORTANTE:
       La bolsa es independiente del fondo.
    ===================================================== */

    .coffee-bag {
      position: absolute;

      z-index: 15;

      left: 50%;

      bottom: 9%;

      transform: translateX(-50%);

      width: 390px;

      max-width: 42vw;

      height: auto;

      display: block;

      filter: drop-shadow(
        0 20px 30px rgba(0, 0, 0, 0.55)
      );
    }


    /* =====================================================
       BOTÓN
    ===================================================== */

    .hero-button {
      position: absolute;

      z-index: 18;

      left: 50%;

      bottom: 4%;

      transform: translateX(-50%);

      display: inline-flex;

      align-items: center;
      justify-content: center;

      min-width: 375px;

      padding: 17px 30px;

      border: 1px solid #f2f2f2;

      color: #fff;

      background: rgba(14, 13, 11, 0.35);

      text-decoration: none;

      font-family: "Inter", Arial, sans-serif;

      font-size: 13px;

      letter-spacing: 3px;

      transition:
        background 0.3s ease,
        color 0.3s ease;
    }


    .hero-button:hover {
      background: #fff;
      color: #0e0d0b;
    }


    /* =====================================================
       TABLET
    ===================================================== */

    @media (max-width: 900px) {

      .navbar {
        padding: 0 25px;
      }

      .nav-menu {
        gap: 30px;
      }

      .cart {
        right: 25px;
      }

      .hero-logo {
        width: 330px;
      }

      .hero-content {
        top: 345px;
      }

      .coffee-bag {
        width: 350px;
      }
    }


    /* =====================================================
       MÓVIL
    ===================================================== */

    @media (max-width: 767px) {

      .hero {
        min-height: 100svh;
      }


      /* Fondo */

      .hero-background {
        height: 70%;

        background-position: center center;
      }


      /* Navegación */

      .navbar {
        height: 70px;
        padding: 0 18px;
      }


      .nav-menu {
        gap: 19px;
      }


      .nav-menu a {
        font-size: 10px;
        letter-spacing: 0.7px;
      }


      /* Carrito */

      .cart {
        right: 17px;

        gap: 7px;

        font-size: 11px;
      }


      .cart-icon {
        width: 24px;
        height: 24px;
      }


      /* Logo */

      .hero-logo {
        top: 90px;

        width: 270px;

        max-width: 72vw;
      }


      /* Texto */

      .hero-content {
        top: 300px;

        width: 90%;
      }


      .hero-title {
        font-size: 34px;

        line-height: 1.05;

        margin-bottom: 14px;
      }


      .hero-description {
        font-size: 18px;

        line-height: 1.35;

        max-width: 350px;
      }


      /* Bolsa */

      .coffee-bag {
        width: 285px;

        max-width: 68vw;

        bottom: 11%;
      }


      /* Botón */

      .hero-button {
        bottom: 3%;

        min-width: 285px;

        padding: 14px 18px;

        font-size: 11px;

        letter-spacing: 2.5px;
      }
    }


    /* =====================================================
       MÓVIL PEQUEÑO
    ===================================================== */

    @media (max-width: 390px) {

      .nav-menu {
        gap: 12px;
      }


      .nav-menu a {
        font-size: 9px;
      }


      .hero-logo {
        width: 240px;
      }


      .hero-content {
        top: 275px;
      }


      .hero-title {
        font-size: 30px;
      }


      .hero-description {
        font-size: 16px;
      }


      .coffee-bag {
        width: 255px;
      }


      .hero-button {
        min-width: 255px;
      }
    }

  </style>

</head>


<body>


  <!-- ===================================================
       PORTADA GRANOPUERTO
  ==================================================== -->

  <main class="hero">


    <!-- ================================================
         FONDO
    ================================================= -->

    <div class="hero-background"></div>


    <!-- ================================================
         NAVEGACIÓN
    ================================================= -->

    <header class="navbar">

      <nav>

        <ul class="nav-menu">

          <li>
            <a href="#" class="active">
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


      <!-- ==============================================
           CARRITO
      =============================================== -->

      <div class="cart">

        <svg
          class="cart-icon"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >

          <path
            d="M3 5H7L10.2 20.5C10.5 22 11.8 23 13.4 23H24.5C26 23 27.3 22 27.7 20.6L30 12H9"
            stroke="white"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
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


    <!-- ================================================
         LOGO GRANOPUERTO
    ================================================= -->

    <div class="hero-logo">

      <img
        src="logo.png"
        alt="Granopuerto Coffee Roasters"
      >

    </div>


    <!-- ================================================
         TEXTO
    ================================================= -->

    <div class="hero-content">

      <h1 class="hero-title">
        Granopuerto no es solo café
      </h1>

      <p class="hero-description">
        Es historia, viaje y carácter porteño en cada sorbo.<br>
        Granos seleccionados del mundo, transformados en una
        experiencia única.
      </p>

    </div>


    <!-- ================================================
         BOLSA DE CAFÉ
         Elemento independiente del fondo
    ================================================= -->

    <img
      class="coffee-bag"
      src="bolsa-colombia.png"
      alt="Café GRANOPUERTO Colombia"
    >


    <!-- ================================================
         BOTÓN
    ================================================= -->

    <a
      href="#"
      class="hero-button"
    >
      VER NUESTROS CAFÉS&nbsp; →
    </a>


  </main>


</body>

</html>
