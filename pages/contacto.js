
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

