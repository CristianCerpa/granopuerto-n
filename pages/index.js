
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const coffeeBags = [
    "/bolsa-colombia.png",
    "/bolsa-peru.png",
    "/bolsa-brasil.png",
  ];

  const [currentBag, setCurrentBag] = useState(0);
  const [nextBag, setNextBag] = useState(1);
  const [isSliding, setIsSliding] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function updateCartCount() {
      try {
        const savedCart = JSON.parse(
          localStorage.getItem("granopuerto-carrito") || "[]"
        );

        if (Array.isArray(savedCart)) {
          setCartCount(
            savedCart.reduce(
              (total, item) =>
                total + (Number(item.cantidad) || 0),
              0
            )
          );
        } else {
          setCartCount(0);
        }
      } catch {
        setCartCount(0);
      }
    }

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("carrito-actualizado", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("carrito-actualizado", updateCartCount);
    };
  }, []);

  useEffect(() => {
    let slideTimer;

    const waitTimer = setTimeout(() => {
      const next = (currentBag + 1) % coffeeBags.length;

      setNextBag(next);
      setIsSliding(true);

      slideTimer = setTimeout(() => {
        setCurrentBag(next);
        setIsSliding(false);
      }, 1000);
    }, 3000);

    return () => {
      clearTimeout(waitTimer);
      clearTimeout(slideTimer);
    };
  }, [currentBag]);

  return (
    <>
      <Head>
        <title>Granopuerto | Café de origen</title>
        <meta
          name="description"
          content="Descubre los cafés de origen de GRANOPUERTO. Carácter, calidad y esencia porteña."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta name="theme-color" content="#0e0d0b" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="hero">
        <div className="hero-background" aria-hidden="true" />

        <header className="navbar">
          <nav className="navigation" aria-label="Navegación principal">
            <ul className="nav-menu">
              <li>
                <a href="/" className="active" aria-current="page">
                  INICIO
                </a>
              </li>
              <li>
                <a href="/cafes">CAFÉS</a>
              </li>
              <li>
                <a href="/nosotros">NOSOTROS</a>
              </li>
              <li>
                <a href="/contacto">CONTACTO</a>
              </li>
            </ul>
          </nav>

          <a
            className="cart"
            href="/carrito"
            aria-label={`Ver carrito, ${cartCount} productos`}
          >
            <svg
              className="cart-icon"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
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
            <span>{cartCount}</span>
          </a>
        </header>

        <div className="hero-logo">
          <a href="/" aria-label="Granopuerto, inicio">
            <img
              src="/logo.png"
              alt="Granopuerto Coffee Roasters"
            />
          </a>
        </div>

        <section className="hero-content">
          <h1>No es solo café.</h1>

          <p className="hero-subtitle">
            Es historia, viaje y carácter porteño en cada sorbo.
          </p>

          <p className="hero-description">
            Granos seleccionados del mundo, transformados en una experiencia única.
          </p>

          <a href="/cafes" className="hero-button">
            DESCUBRIR NUESTROS CAFÉS
            <span aria-hidden="true">→</span>
          </a>
        </section>

        <div
          className={`coffee-carousel ${
            isSliding ? "is-sliding" : ""
          }`}
          aria-label="Nuestros cafés de origen"
        >
          <img
            key={coffeeBags[currentBag]}
            className="coffee-bag coffee-bag-current"
            src={coffeeBags[currentBag]}
            alt="Bolsa de café GRANOPUERTO"
          />

          {isSliding && (
            <img
              className="coffee-bag coffee-bag-next"
              src={coffeeBags[nextBag]}
              alt="Siguiente café de origen GRANOPUERTO"
            />
          )}
        </div>

        <style jsx>{`
          * {
            box-sizing: border-box;
          }

          .hero {
            position: relative;
            isolation: isolate;
            width: 100%;
            min-height: 650px;
            height: 100vh;
            height: 100svh;
            overflow: hidden;
            background: #0e0d0b;
            color: #f7f5f1;
            font-family: "Inter", Arial, sans-serif;
          }

          .hero-background {
            position: absolute;
            z-index: -1;
            inset: 0;
            background-image:
              linear-gradient(
                90deg,
                rgba(14, 13, 11, 0.97) 0%,
                rgba(14, 13, 11, 0.89) 35%,
                rgba(14, 13, 11, 0.5) 68%,
                rgba(14, 13, 11, 0.28) 100%
              ),
              url("/fondo-cafe.png");
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
          }

          .navbar {
            position: absolute;
            z-index: 50;
            top: 0;
            left: 0;
            width: 100%;
            height: 76px;
            display: flex;
            align-items: center;
            padding: 0 clamp(24px, 5.5vw, 84px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.07);
            font-family: "Inter", Arial, sans-serif;
          }

          .navigation {
            min-width: 0;
          }

          .nav-menu {
            display: flex;
            align-items: center;
            gap: clamp(24px, 3.5vw, 52px);
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .nav-menu a {
            position: relative;
            display: inline-block;
            padding: 10px 0;
            color: rgba(255, 255, 255, 0.88);
            text-decoration: none;
            font-size: 10px;
            font-weight: 400;
            letter-spacing: 1.1px;
            white-space: nowrap;
            transition: color 0.2s ease;
          }

          .nav-menu a:hover {
            color: #d7b574;
          }

          .nav-menu .active::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: 1px;
            height: 1px;
            background: #c9a66b;
          }

          .cart {
            position: absolute;
            top: 50%;
            right: clamp(20px, 4vw, 60px);
            transform: translateY(-50%);
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #f7f5f1;
            text-decoration: none;
            font-size: 12px;
            font-weight: 400;
          }

          .cart:hover {
            color: #d7b574;
          }

          .cart-icon {
            display: block;
            width: 29px;
            height: 29px;
          }

          .hero-logo {
            position: absolute;
            z-index: 10;
            top: 100px;
            left: 50%;
            width: clamp(180px, 18vw, 245px);
            transform: translateX(-50%);
          }

          .hero-logo a,
          .hero-logo img {
            display: block;
            width: 100%;
            height: auto;
          }

          .hero-content {
            position: absolute;
            z-index: 30;
            top: 50%;
            left: clamp(38px, 9vw, 138px);
            width: min(44%, 540px);
            transform: translateY(-35%);
            text-align: left;
          }

          .hero-content h1 {
            margin: 0;
            color: #f6f1e8;
            font-family: "Cormorant Garamond", Georgia, serif;
            font-size: clamp(49px, 5.4vw, 78px);
            font-weight: 500;
            line-height: 0.99;
            letter-spacing: -1.3px;
          }

          .hero-subtitle {
            margin: 21px 0 12px;
            color: #d2b177;
            font-family: "Cormorant Garamond", Georgia, serif;
            font-size: clamp(23px, 2.2vw, 30px);
            font-weight: 500;
            line-height: 1.2;
          }

          .hero-description {
            margin: 0 0 30px;
            color: rgba(247, 245, 241, 0.82);
            font-family: "Inter", Arial, sans-serif;
            font-size: clamp(13px, 1.15vw, 16px);
            font-weight: 400;
            line-height: 1.7;
            max-width: 460px;
          }

          .hero-button {
            min-height: 49px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 23px;
            padding: 0 23px;
            border: 1px solid #c9a66b;
            background: #c9a66b;
            color: #15120d;
            text-decoration: none;
            font-family: "Inter", Arial, sans-serif;
            font-size: 10px;
            font-weight: 600;
            letter-spacing: 1.1px;
            white-space: nowrap;
            transition:
              background-color 0.2s ease,
              border-color 0.2s ease;
          }

          .hero-button:hover {
            border-color: #dfc18a;
            background: #dfc18a;
          }

          .hero-button span {
            font-size: 17px;
            line-height: 1;
          }

          .coffee-carousel {
            position: absolute;
            z-index: 20;
            right: clamp(5%, 11vw, 170px);
            bottom: -1%;
            width: clamp(260px, 30vw, 440px);
            height: min(70vh, 690px);
            overflow: visible;
          }

          .coffee-bag {
            position: absolute;
            right: 0;
            bottom: 0;
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center bottom;
            filter: drop-shadow(0 22px 32px rgba(0, 0, 0, 0.52));
            pointer-events: none;
          }

          .coffee-bag-current {
            transform: translateX(0);
          }

          .coffee-bag-next {
            transform: translateX(100vw);
          }

          .coffee-carousel.is-sliding .coffee-bag-current {
            animation: coffeeBagExit 1s ease-in-out forwards;
          }

          .coffee-carousel.is-sliding .coffee-bag-next {
            animation: coffeeBagEnter 1s ease-in-out forwards;
          }

          @keyframes coffeeBagExit {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-100vw);
            }
          }

          @keyframes coffeeBagEnter {
            from {
              transform: translateX(100vw);
            }

            to {
              transform: translateX(0);
            }
          }

          @media (min-width: 1500px) {
            .hero-content {
              left: max(9vw, calc((100vw - 1400px) / 2));
            }

            .coffee-carousel {
              right: max(10vw, calc((100vw - 1400px) / 2));
              width: min(32vw, 470px);
            }
          }

          @media (max-width: 1100px) and (min-width: 769px) {
            .navbar {
              padding-left: 30px;
            }

            .nav-menu {
              gap: 27px;
            }

            .nav-menu a {
              font-size: 9px;
              letter-spacing: 0.8px;
            }

            .hero-logo {
              top: 95px;
              width: 185px;
            }

            .hero-content {
              left: 6%;
              width: 45%;
            }

            .hero-content h1 {
              font-size: clamp(46px, 5.5vw, 62px);
            }

            .hero-description {
              font-size: 21px;
            }

            .hero-button {
              min-height: 46px;
              gap: 12px;
              padding: 0 15px;
              font-size: 9px;
              letter-spacing: 0.7px;
            }

            .coffee-carousel {
              right: 5%;
              width: 37vw;
              height: 61vh;
            }
          }

          @media (max-width: 768px) {
            .hero {
              height: auto;
              min-height: 740px;
              height: 100svh;
              min-height: max(740px, 100svh);
            }

            .hero-background {
              background-image:
                linear-gradient(
                  180deg,
                  rgba(14, 13, 11, 0.95) 0%,
                  rgba(14, 13, 11, 0.83) 40%,
                  rgba(14, 13, 11, 0.48) 100%
                ),
                url("/fondo-cafe.png");
              background-size: cover;
              background-position: center center;
            }

            .navbar {
              height: 58px;
              padding: 0 14px;
            }

            .nav-menu {
              gap: clamp(10px, 3.1vw, 22px);
            }

            .nav-menu a {
              font-size: clamp(7px, 1.35vw, 9px);
              letter-spacing: 0.4px;
            }

            .cart {
              right: 13px;
              gap: 4px;
              font-size: 10px;
            }

            .cart-icon {
              width: 24px;
              height: 24px;
            }

            .hero-logo {
              top: 75px;
              width: 175px;
              max-width: 46vw;
            }

            .hero-content {
              top: 238px;
              left: 5%;
              width: 90%;
              max-width: 480px;
              transform: none;
              margin: 0;
              text-align: center;
            }

            .hero-content h1 {
              font-size: clamp(37px, 7.5vw, 51px);
              line-height: 1;
              letter-spacing: -0.5px;
            }

            .hero-subtitle {
              margin: 12px 0 8px;
              font-size: clamp(20px, 4.7vw, 25px);
              line-height: 1.18;
            }

            .hero-description {
              margin: 0 auto 17px;
              max-width: 420px;
              font-size: clamp(12px, 3.2vw, 14px);
              line-height: 1.55;
            }

            .hero-button {
              min-height: 43px;
              gap: 13px;
              padding: 0 17px;
              font-size: 9px;
              letter-spacing: 0.8px;
            }

            .coffee-carousel {
              right: auto;
              left: 50%;
              bottom: -5px;
              width: clamp(205px, 47vw, 285px);
              height: clamp(300px, 42vh, 390px);
              transform: translateX(-50%);
            }

            .coffee-bag {
              object-position: center bottom;
            }
          }

          @media (max-width: 480px) {
            .hero {
              min-height: 720px;
              min-height: max(720px, 100svh);
            }

            .navbar {
              height: 52px;
              padding: 0 9px;
            }

            .nav-menu {
              gap: clamp(8px, 2.5vw, 12px);
            }

            .nav-menu a {
              font-size: clamp(6.5px, 1.8vw, 8px);
              letter-spacing: 0.15px;
            }

            .cart {
              right: 8px;
              gap: 3px;
              font-size: 9px;
            }

            .cart-icon {
              width: 21px;
              height: 21px;
            }

            .hero-logo {
              top: 68px;
              width: 155px;
            }

            .hero-content {
              top: 210px;
              left: 4%;
              width: 92%;
            }

            .hero-content h1 {
              font-size: clamp(34px, 8.4vw, 43px);
              line-height: 1.04;
            }

            .hero-subtitle {
              margin: 10px 0 7px;
              font-size: clamp(19px, 5vw, 23px);
            }

            .hero-description {
              margin: 0 auto 15px;
              font-size: clamp(11px, 3.4vw, 13px);
              line-height: 1.5;
            }

            .hero-button {
              min-height: 42px;
              gap: 9px;
              padding: 0 13px;
              font-size: 8px;
              letter-spacing: 0.5px;
            }

            .coffee-carousel {
              bottom: 0;
              width: clamp(190px, 55vw, 245px);
              height: 300px;
            }
          }

          @media (max-width: 360px) {
            .navbar {
              padding: 0 7px;
            }

            .nav-menu {
              gap: 7px;
            }

            .nav-menu a {
              font-size: 6.5px;
              letter-spacing: 0;
            }

            .cart {
              right: 6px;
              gap: 2px;
              font-size: 8px;
            }

            .cart-icon {
              width: 19px;
              height: 19px;
            }

            .hero-logo {
              top: 65px;
              width: 140px;
            }

            .hero-content {
              top: 196px;
            }

            .hero-content h1 {
              font-size: 33px;
            }

            .hero-subtitle {
              font-size: 18px;
            }

            .hero-description {
              font-size: 11px;
            }

            .hero-button {
              min-height: 40px;
              padding: 0 10px;
              font-size: 7px;
            }

            .coffee-carousel {
              width: 185px;
              height: 280px;
            }
          }

          @media (max-height: 700px) and (min-width: 769px) {
            .hero {
              min-height: 620px;
            }

            .hero-logo {
              top: 82px;
              width: 155px;
            }

            .hero-content {
              transform: translateY(-25%);
            }

            .coffee-carousel {
              height: 65vh;
            }
          }
        `}</style>
      </main>
    </>
  );
}
