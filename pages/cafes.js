
import Head from "next/head";
import { useEffect, useState } from "react";

const cafes = [
  {
    id: "pacifico",
    nombre: "PACÍFICO",
    origen: "Colombia",
    imagen: "/bolsa-colombia.png",
    precio: 15990,
    descripcion:
      "Desde las montañas colombianas, PACÍFICO nos invita a descubrir un café que conecta el origen con cada taza.",
    variedad: "Castillo – Caturra",
    altitud: "1.700–1.900 msnm",
    proceso: "Lavado",
    tostado: "Medio",
    notas: "Caramelo, dulce de leche, azúcar morena y frutas maduras.",
  },
  {
    id: "andina",
    nombre: "ANDINA",
    origen: "Perú",
    imagen: "/bolsa-peru.png",
    precio: 12990,
    descripcion:
      "Desde las tierras peruanas, ANDINA nos invita a descubrir la riqueza de sus montañas y el carácter único de un café nacido en altura.",
    variedad: "Por confirmar",
    altitud: "Por confirmar",
    proceso: "Por confirmar",
    tostado: "Por confirmar",
    notas: "Por confirmar según las características del café.",
  },
  {
    id: "bahia",
    nombre: "BAHÍA",
    origen: "Brasil",
    imagen: "/bolsa-brasil.png",
    precio: 13990,
    descripcion:
      "Desde las tierras brasileñas, BAHÍA nos invita a descubrir los aromas y sabores de un origen lleno de tradición cafetera.",
    variedad: "Por confirmar",
    altitud: "Por confirmar",
    proceso: "Por confirmar",
    tostado: "Por confirmar",
    notas: "Por confirmar según las características del café.",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(price);

export default function Cafes() {
  const [carrito, setCarrito] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("granopuerto-carrito") || "[]"
      );

      if (Array.isArray(saved)) {
        setCarrito(saved);
      }
    } catch {
      setCarrito([]);
    }
  }, []);

  function agregarAlCarrito(cafe) {
    const existente = carrito.find((item) => item.id === cafe.id);

    const actualizado = existente
      ? carrito.map((item) =>
          item.id === cafe.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      : [
          ...carrito,
          {
            id: cafe.id,
            nombre: cafe.nombre,
            origen: cafe.origen,
            imagen: cafe.imagen,
            precio: cafe.precio,
            cantidad: 1,
          },
        ];

    setCarrito(actualizado);

    try {
      localStorage.setItem(
        "granopuerto-carrito",
        JSON.stringify(actualizado)
      );
    } catch {
      // El catálogo sigue disponible si el navegador bloquea el almacenamiento local.
    }

    setMensaje(`${cafe.nombre} se agregó al carrito.`);
  }

  const cantidadTotal = carrito.reduce(
    (total, item) => total + (Number(item.cantidad) || 0),
    0
  );

  return (
    <>
      <Head>
        <title>Nuestros cafés | GRANOPUERTO</title>
        <meta
          name="description"
          content="Descubre los cafés de origen de GRANOPUERTO."
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

      <main className="catalogo">
        <header className="encabezado">
          <a
            className="marca"
            href="/"
            aria-label="Volver al inicio"
          >
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
            <a
              className="activo"
              href="/cafes"
              onClick={() => setMenuOpen(false)}
            >
              CAFÉS
            </a>
            <a href="/nosotros" onClick={() => setMenuOpen(false)}>
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
            aria-label={`Carrito: ${cantidadTotal} productos`}
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
            <span>{cantidadTotal}</span>
          </a>
        </header>

        <section className="presentacion">
          <h1>Nuestros cafés</h1>
          <p className="introduccion">
            Desde distintos rincones del mundo, una experiencia única en cada taza.
          </p>
        </section>

        {mensaje && (
          <div className="mensaje" role="status">
            {mensaje}
            <button
              type="button"
              onClick={() => setMensaje("")}
              aria-label="Cerrar mensaje"
            >
              ×
            </button>
          </div>
        )}

        <section className="productos" aria-label="Catálogo de cafés">
          {cafes.map((cafe) => (
            <article className="producto" key={cafe.id}>
              <div className="imagen-producto">
                <img
                  src={cafe.imagen}
                  alt={`Bolsa de café ${cafe.nombre}, origen ${cafe.origen}`}
                />
              </div>

              <div className="detalle-producto">
                <p className="origen">
                  CAFÉ DE ORIGEN · {cafe.origen.toUpperCase()}
                </p>

                <h2>{cafe.nombre}</h2>
                <p className="descripcion">{cafe.descripcion}</p>

                <div className="caracteristicas">
                  <h3>Características del café</h3>
                  <p><strong>Variedad:</strong> {cafe.variedad}</p>
                  <p><strong>Altitud:</strong> {cafe.altitud}</p>
                  <p><strong>Proceso:</strong> {cafe.proceso}</p>
                  <p><strong>Tostado:</strong> {cafe.tostado}</p>
                </div>

                <div className="notas">
                  <h3>Notas de sabor</h3>
                  <p>{cafe.notas}</p>
                </div>

                <div className="informacion">
                  <p><strong>Ingredientes:</strong> 100% café tostado</p>
                  <p><strong>Contenido neto:</strong> 250 g</p>
                </div>

                <div className="compra">
                  <p className="precio">{formatPrice(cafe.precio)}</p>
                  <button
                    className="boton-agregar"
                    type="button"
                    onClick={() => agregarAlCarrito(cafe)}
                  >
                    AGREGAR AL CARRITO
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <footer className="pie">
          © 2026 Granopuerto · todos los derechos reservados
        </footer>
      </main>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .catalogo {
          min-height: 100vh;
          background: #0e0d0b;
          color: #f7f5f1;
          font-family: "Cormorant Garamond", Georgia, serif;
        }

        .encabezado {
          min-height: 82px;
          padding: 14px 5%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
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
          white-space: nowrap;
          transition: color 0.2s ease;
        }

        .menu-toggle {
          display: none;
          border: 0;
          padding: 8px;
          background: transparent;
          color: #d7b574;
          cursor: pointer;
        }

        .menu a:hover,
        .menu .activo {
          color: #d9a33f;
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
        }

        .presentacion {
          padding: 58px 20px 38px;
          text-align: center;
        }

        .sobretitulo,
        .origen {
          color: #d9a33f;
          font-family: Inter, Arial, sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
        }

        .presentacion h1 {
          margin: 12px 0;
          font-size: clamp(38px, 5vw, 58px);
          font-weight: 500;
        }

        .introduccion {
          max-width: 580px;
          margin: 0 auto;
          color: #d5d0c8;
          font-size: 19px;
          line-height: 1.5;
        }

        .mensaje {
          width: fit-content;
          max-width: 90%;
          margin: 0 auto 28px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 18px;
          border: 1px solid #d9a33f;
          font-family: Inter, Arial, sans-serif;
          font-size: 12px;
        }

        .mensaje button {
          padding: 0;
          border: 0;
          background: transparent;
          color: #d9a33f;
          font-size: 22px;
          cursor: pointer;
        }

        .productos {
          width: min(1200px, 94%);
          margin: 0 auto;
          padding: 10px 0 50px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          align-items: stretch;
          gap: 16px;
        }

        .producto {
          min-width: 0;
          display: flex;
          flex-direction: column;
          background: #171512;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .imagen-producto {
          height: 190px;
          padding: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #11100e;
        }

        .imagen-producto img {
          display: block;
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
        }

        .detalle-producto {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 16px 14px;
        }

        .origen {
          margin: 0 0 6px;
          font-size: 8px;
          line-height: 1.5;
        }

        .detalle-producto h2 {
          margin: 0 0 8px;
          font-size: 28px;
          font-weight: 500;
          letter-spacing: 1px;
        }

        .descripcion {
          margin: 0 0 14px;
          color: #d5d0c8;
          font-size: 14px;
          line-height: 1.4;
        }

        .caracteristicas,
        .notas,
        .informacion {
          width: 100%;
          margin-bottom: 12px;
        }

        .caracteristicas h3,
        .notas h3 {
          margin: 0 0 6px;
          color: #d9a33f;
          font-size: 16px;
          font-weight: 600;
        }

        .caracteristicas p,
        .notas p,
        .informacion p {
          margin: 4px 0;
          color: #d5d0c8;
          font-size: 13px;
          line-height: 1.35;
          overflow-wrap: anywhere;
        }

        .caracteristicas strong,
        .informacion strong {
          color: #f7f5f1;
          font-weight: 600;
        }

        .compra {
          width: 100%;
          margin-top: auto;
          padding-top: 10px;
        }

        .precio {
          margin: 0 0 12px;
          color: #d9a33f;
          font-family: Inter, Arial, sans-serif;
          font-size: 17px;
          font-weight: 500;
        }

        .boton-agregar {
          width: 100%;
          min-height: 36px;
          padding: 9px 6px;
          border: 1px solid rgba(255, 255, 255, 0.8);
          background: transparent;
          color: #fff;
          font-family: Inter, Arial, sans-serif;
          font-size: 9px;
          letter-spacing: 0.7px;
          cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease;
        }

        .boton-agregar:hover {
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

        @media (max-width: 900px) {
          .productos {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

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

          .presentacion {
            padding: 42px 20px 28px;
          }

          .introduccion {
            font-size: 17px;
          }

          .productos {
            width: min(380px, 90%);
            grid-template-columns: 1fr;
            gap: 22px;
          }

          .imagen-producto {
            height: 240px;
          }

          .detalle-producto {
            padding: 18px 16px;
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
        }
      `}</style>
    </>
  );
}
