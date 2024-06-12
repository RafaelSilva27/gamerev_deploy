<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GameRev</title>
  <meta name="description" content="Los precios más bajos del mercado aquí. Tus productos favoritos de videojuegos con ofertas y descuentos exclusivos. 
                                      Apartado de reviews para saber la opinion de otros jugadores." />
<!-- css -->
  <link rel="stylesheet" href="{{ asset('css/componentes/general.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/header.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/nav.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/carrusel.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/footer.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/auth.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/plataformas.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/categorias.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/busqueda.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/boton-reseña.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/menu.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/carrito.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/mensaje.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/media.css') }}"> 

  <!-- js -->
  <script src="{{ asset('js/componentes/carrusel.js') }}" defer></script>
  <script src="{{ asset('js/componentes/auth.js') }}" defer></script>
  <script src="{{ asset('js/componentes/busqueda.js') }}" defer></script>
  <script src="{{ asset('js/componentes/menu.js') }}" defer></script>
  <script src="{{ asset('js/componentes/carrito.js') }}" defer></script>


  <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Karla:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="icon" href="img/logo.png">
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>

<body class="body">
  <!-- Header -->
  <header class="header">
    <nav class="nav sticky">
      <img src="img/menu_hamburguesa.svg" alt="menu hamburguesa" class="nav_menu btn-icon" id="menu_icon" />
      <a href="{{ url('/reseñas') }}" class="btn-reseñas">Reseñas</a>
      <img src="img/logo.png" alt="logo" class="logo" id="logo_icon">
      <div class="busqueda">
        <img src="img/lupa.svg" alt="lupa" class="nav_busqueda" id="lupa_icon">
        <div class="barra-busqueda hidden" id="barra_busqueda">
          <input type="text" class="input-busqueda" placeholder="Buscar...">
          <button class="btn-busqueda">Buscar</button>
        </div>
      </div>

      <img src="img/carrito.svg" alt="carrito" class="carrito" id="carrito_icon">
      <div id="carrito_overlay" class="carrito-overlay hidden">
        <div class="carrito-content">
          <h2>Carrito de Compras</h2>
          <div id="carrito_contenedor" class="carrito-contenedor">
          </div>
        </div>
      </div>
      <a class="btn--show-modal" href="#">
        <img src="img/user.svg" alt="user" class="user" id="user_icon">
      </a>
    </nav>

    <nav class="nuevo-nav hidden">
      <a href="#" class="genero-btn" data-target="seccion-accion">Accion</a>
      <a href="#" class="genero-btn" data-target="seccion-deportes">Deportes</a>
      <a href="#" class="genero-btn">RPG</a>
      <a href="#" class="genero-btn">Aventuras</a>
    </nav>

  </header>

  <!-- Carrusel de novedades -->
  <div class="titulo-topVentas">
    <h1 class="titulo-carrusel">Top Ventas</h1>
  </div>
  <div class="carrusel">
    <div class="grande">
      <div class="slide">
        <img src="img/baldur.jpg" alt="baldur" class="imgCarrusel">
        <div class="titulo">Baldur gate 3</div>
      </div>
      <div class="slide">
        <img src="img/helldiver.jpg" alt="helldiver" class="imgCarrusel">
        <div class="titulo">Helldivers 2</div>
      </div>
    </div>


    <ul class="puntos">
      <li class="punto activo"></li>
      <li class="punto"></li>
    </ul>
  </div>

  <!-- Categoria Accion -->

  <div class="accion" id="seccion-accion">
    <div class="contenidoRecomendadosAccion">
      <div class="title--accion">
        <h2>Accion</h2>
      </div>
      <div class="text--accion">
        <p>Los mejores juegos de <strong>acción</strong></p>
      </div>
    </div>
    <div class="recomendados--categoriasAccion">
      <div class="categoriaAccion">
        <img src="img/dragon.jpg" alt="dragon">
        <span>Dragon Dogma II</span>
        <span>70€</span>
        <button class="btn-comprar">Comprar</button>
      </div>
      <div class="categoriaAccion">
        <img src="img/ciber.jpg" alt="ciberpunk">
        <span>Ciberpunk 2077</span>
        <span>50€</span>
        <button class="btn-comprar">Comprar</button>
      </div>
      <div class="categoriaAccion">
        <img src="img/honor.jpg" alt="for honor">
        <span>For Honor</span>
        <span>25€</span>
        <button class="btn-comprar">Comprar</button>
      </div>
    </div>
  </div>

  <!-- Categoria Deportes -->

  <div class="deporte" id="seccion-deportes">
    <div class="contenidoRecomendadosDeporte">
      <div class="title--deporte">
        <h2>Deportes</h2>
      </div>
      <div class="text--deporte">
        <p>Los mejores juegos de <strong>Deportes</strong></p>
      </div>
    </div>
    <div class="recomendados--categoriasDeporte">
      <div class="categoriaDeporte">
        <img src="img/fc.jpg" alt="fc24">
        <span>FC 24</span>
        <span>60€</span>
        <button class="btn-comprar">Comprar</button>
      </div>
      <div class="categoriaDeporte">
        <img src="img/nba.jpg" alt="2k24">
        <span>NBA 2K24</span>
        <span>55€</span>
        <button class="btn-comprar">Comprar</button>
      </div>
      <div class="categoriaDeporte">
        <img src="img/moto.jpg" alt="gp24">
        <span>Moto GP 2024</span>
        <span>50€</span>
        <button class="btn-comprar">Comprar</button>
      </div>
    </div>
  </div>

  <!-- Plataformas  -->
  <div class="Plataformas">
    <h2 class="titulo">Plataformas</h2>
    <div class="logos-arriba">
      <img src="img/playstation.png" class="logoPlay" alt="play">
      <img src="img/xbox.png" class="logoXbox" alt="xbox">
    </div>
    <div class="logos-abajo">
      <img src="img/steam.png" class="logoSteam" alt="steam">
      <img src="img/nintendo.png" class="logoNintendo" alt="nintendo">
    </div>
  </div>


  <!-- footer -->

  <footer class="footer">
    <div class="QYA">
      <h4 class="QYA--title">Conócenos</h4>
      <p class="pregunta">¿Qué vendemos?</p>
      <p class="pregunta">¿Quienes somos?</p>
      <p class="pregunta">¿Por qué comprar?</p>
      <p class="pregunta">Más preguntas aquí</p>
    </div>
    <div class="logo-footer">
      <img src="img/logo.png" alt="logo">
    </div>
    <div class="contactos">
      <h4 class="contactos--title">Contáctanos</h4>
      <div class="contactos--content">
        <div class="contacto_icon">
          <div class="contacto_item">
            <img src="img/email.svg" alt="email">
            <p class="contacto1">Email</p>
          </div>
        </div>
        <div class="contacto_icon">
          <div class="contacto_item">
            <img src="img/facebook.svg" alt="facebook">
            <p class="contacto1">Facebook</p>
          </div>
        </div>
        <div class="contacto_icon">
          <div class="contacto_item">
            <img src="img/twitter.svg" alt="twitter">
            <p class="contacto1">Twitter</p>
          </div>
        </div>
        <div class="contacto_icon">
          <div class="contacto_item">
            <img src="img/instagram.svg" alt="instagram">
            <p class="contacto1">Instagram</p>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!-- Login -->

  <div class="modal hidden">
    <button class="btn--close-modal">&times;</button>
    <h2 class="modal__header">
      Iniciar Sesión <br />
    </h2>
    <form class="modal__form" name="modal__form">
      <label>Email</label>
      <input type="text" name="email" />
      <label>Contraseña</label>
      <input type="password" name="password" />
      <button type="submit" class="btn-login">Iniciar Sesión</button>
      <span class="register-text">¿No tienes una cuenta? <a href="#" class="open-register-modal">Registrarse</a></span>
      <a href="#" class="btn--logout">Cerrar Sesión</a>
    </form>
  </div>


  <div class="overlay hidden"></div>

  <!-- Registro -->
  <div class="modal-register hidden">
    <button class="btn--close-modal btn--close-modal-register">&times;</button>
    <h2 class="modal__header">
      Registrarse <br />
    </h2>
    <form class="modal__form-register" name="modal__form-register">
      <label>Usuario</label>
      <input type="text" name="name" />
      <label>Email</label>
      <input type="text" name="email" />
      <label>Contraseña</label>
      <input type="password" name="password" />
      <label>Repetir Contraseña</label>
      <input type="password" name="password_confirmation" />
      <input type="hidden" name="rol" value="2" />
      <button type="submit" class="btn-register">Registrarse</button>
    </form>
  </div>
  <div class="overlay-register hidden"></div>


  <!-- Mensaje Modal -->
  <div class="message-modal hidden">
    <div class="message-content">
      <button class="btn--close-message-modal">&times;</button>
      <p class="message-text"></p>
    </div>
  </div>
  <div class="overlay-message hidden"></div>

  

</body>

</html>