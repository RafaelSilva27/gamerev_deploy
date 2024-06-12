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
  <link rel="stylesheet" href="{{ asset('css/componentes/footer.css') }}">
  <link rel="stylesheet" href="{{ asset('css/componentes/auth.css') }}">
  <link rel="stylesheet" href="{{ asset('css/componentes/busqueda.css') }}">
  <link rel="stylesheet" href="{{ asset('css/componentes/mensaje.css') }}">
  <link rel="stylesheet" href="{{ asset('css/componentes/reseñas.css') }}">
  <link rel="stylesheet" href="{{ asset('css/componentes/añadir-reseñas.css') }}">
  <link rel="stylesheet" href="{{ asset('css/componentes/añadir-videojuegos.css') }}">
  <link rel="stylesheet" href="{{ asset('css/componentes/añadir-genero.css') }}">
  <link rel="stylesheet" href="{{ asset('css/componentes/boton-misReseñas.css') }}">
  <link rel="stylesheet" href="{{ asset('css/componentes/modal-warning.css') }}">
  <link rel="stylesheet" href="{{ asset('css/componentes/modal-admin.css') }}">
  <link rel="stylesheet" href="{{ asset('css/componentes/modal-actualizacion.css') }}">
  <link rel="stylesheet" href="{{ asset('css/componentes/boton-administracion.css') }}">
  <link rel="stylesheet" href="{{ asset('css/componentes/media.css') }}"> 

  <!-- js -->
  <script src="{{ asset('js/componentes/reseñas.js') }}" defer></script>
  <script src="{{ asset('js/componentes/añadir-videojuego.js') }}" defer></script>
  <script src="{{ asset('js/componentes/añadir-genero.js') }}" defer></script>
  <script src="{{ asset('js/componentes/administrador.js') }}" defer></script>

  <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Karla:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="icon" href="img/logo.png">
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>

<body>

  <header class="header">
    <nav class="nav sticky">
      <img src="img/menu_hamburguesa.svg" alt="menu hamburguesa" class="nav_menu btn-icon" id="menu_icon" />
      <a href="{{ url('/') }}">
        <img src="img/logo.png" alt="logo" class="logo" id="logo_icon">
      </a>
      <div class="busqueda">
        <img src="img/lupa.svg" alt="lupa" class="nav_busqueda" id="lupa_icon">
        <div class="barra-busqueda hidden" id="barra_busqueda">
          <input type="text" class="input-busqueda" placeholder="Buscar...">
          <button class="btn-busqueda">Buscar</button>
        </div>
      </div>

      <a class="btn--admin hidden" href="#">Administrar</a>

      <img src="img/carrito.svg" alt="carrito" class="carrito" id="carrito_icon">
      <a class="btn--show-modal" href="#">
        <img src="img/user.svg" alt="user" class="user" id="user_icon">
      </a>
    </nav>
  </header>

  <div class="reseñas-section">
    <h2 class="reseñas-title">Reseñas</h2>
    <a href="{{ url('/misReseñas') }}" class="btn-reseñas"> Mis Reseñas</a>
    <img src="img/añadir-reseña.svg" alt="añadir reseña" class="icono-mas" id="icono_mas">
  </div>
  <div id="reseñas-contenedor">
    <!-- Aquí se cargarán las reseñas -->
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

  <!-- Modal para añadir una reseña -->
  <div class="modal-reseña hidden" id="modal-add-review">
    <button class="btn--close-modal">&times;</button>
    <h2 class="modal__header">Añadir Reseña</h2>
    <form class="modal__form" id="form-add-review">
      <label for="select-videojuego">Videojuego</label>
      <select id="select-videojuego" name="videojuego_id" required></select>

      <button id="btn-add-game-modal" class="btn-open-modal">Agregar Nuevo Videojuego</button>

      <label for="titulo">Título</label>
      <input type="text" id="titulo" name="titulo" required />

      <label for="comentario">Comentario</label>
      <textarea id="comentario" name="comentario" required></textarea>

      <button type="submit" class="btn-submit">Añadir Reseña</button>
    </form>
  </div>

  <div class="overlay-reseñas hidden" id="overlay-reseñas"></div>

  <!-- Modal para agregar nuevo videojuego -->
  <div class="modal-add-game hidden" id="modal-add-game">
    <button class="btn--close-modal">&times;</button>
    <h2 class="modal__header">Agregar Nuevo Videojuego</h2>
    <form class="modal__form" id="form-add-game">
      <label for="nombre-videojuego">Nombre</label>
      <input type="text" id="nombre-videojuego" name="nombre" required />

      <label for="precio-videojuego">Precio</label>
      <input type="number" id="precio-videojuego" name="precio" required />

      <label for="genero-videojuego">Género</label>
      <div id="checkbox-genero" class="checkbox-genero">
        <!-- Opciones de género cargadas dinámicamente como checkboxes -->
      </div>

      <button type="button" class="btn-add-genero">Agregar Nuevo Género</button>
      <button type="submit" class="btn-submit">Agregar Videojuego</button>
    </form>
  </div>

  <div class="overlay-videojuegos hidden" id="overlay-videojuegos"></div>

  <!-- Modal para agregar nuevo género -->
  <div class="modal-add-genero hidden" id="modal-add-genero">
    <button class="btn--close-modal">&times;</button>
    <h2 class="modal__header">Agregar Nuevo Género</h2>
    <form class="modal__form" id="form-add-genero">
      <label for="nombre-genero">Nombre del Género</label>
      <input type="text" id="nombre-genero" name="nombre" required />

      <button type="submit" class="btn-submit">Agregar Género</button>
    </form>
  </div>

  <div class="overlay-generos hidden" id="overlay-generos"></div>


  <!-- Modal de advertencia de reseña-->
  <div id="modal-warning" class="modal-warning hidden">
    <div class="modal-content">
      <span class="close" id="close-warning-modal">&times;</span>
      <p>Debes iniciar sesión para acceder a esta página.</p>
      <button id="btn-login">Iniciar Sesión</button>
    </div>
  </div>

<!-- Modal de administracion -->
<div class="modal-admin hidden">
  <div class="modal-content">
    <button class="btn--close-modal-admin">&times;</button>
    <h2>Administración</h2>
    <div class="admin-section">
      <h3>Videojuegos</h3>
      <label for="videojuego-select">Seleccionar Videojuego:</label>
      <select id="videojuego-select">
        <!-- Opciones de videojuegos cargadas dinámicamente desde la base de datos -->
      </select>
      <button class="btn-borrar-videojuego">Borrar</button>
      <button class="btn-actualizar-videojuego">Actualizar</button>
    </div>
    <div class="admin-section">
      <h3>Géneros</h3>
      <label for="genero-select">Seleccionar Género:</label>
      <select id="genero-select">
        <!-- Opciones de géneros cargadas dinámicamente desde la base de datos -->
      </select>
      <button class="btn-borrar-genero">Borrar</button>
      <button class="btn-actualizar-genero">Actualizar</button>
    </div>
  </div>
</div>
<div class="overlay-admin hidden"></div>

<!-- Modal de actualización de videojuego -->
<div id="modal-actualizacion-videojuego" class="modal hidden">
  <div class="modal-content">
    <button class="btn--close-modal-actualizacion">&times;</button>
    <h2>Actualizar Videojuego</h2>
    <form id="form-actualizacion-videojuego">
      <label for="nombre-actualizacion-videojuego">Nombre:</label>
      <input type="text" id="nombre-actualizacion-videojuego" required>
      <label for="precio-actualizacion-videojuego">Precio:</label>
      <input type="number" id="precio-actualizacion-videojuego" required>
      <label for="genero-actualizacion-videojuego">Géneros:</label>
      <div id="checkbox-genero-actualizacion-videojuego"></div>
      <button type="submit">Actualizar</button>
    </form>
  </div>
</div>
<div id="overlay-actualizacion-videojuego" class="overlay hidden"></div>

<!-- Modal de actualización de género -->
<div id="modal-actualizacion-genero" class="modal hidden">
  <div class="modal-content">
    <button class="btn--close-modal-actualizacion">&times;</button>
    <h2>Actualizar Género</h2>
    <form id="form-actualizacion-genero">
      <label for="nombre-actualizacion-genero">Nombre:</label>
      <input type="text" id="nombre-actualizacion-genero" required>
      <button type="submit">Actualizar</button>
    </form>
  </div>
</div>
<div id="overlay-actualizacion-genero" class="overlay hidden"></div>



</body>

</html>