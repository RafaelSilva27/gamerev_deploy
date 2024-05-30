<!DOCTYPE html>
<html lang="en">
<head>
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
  <link rel="stylesheet" href="{{ asset('css/componentes/boton-reseña.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/busqueda.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/reseñas.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/mensaje-misReseñas.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/mis-reseñas.css') }}"> 
  <link rel="stylesheet" href="{{ asset('css/componentes/update-reseñas.css') }}"> 



  <!-- js -->
  <script src="{{ asset('js/componentes/mis-reseñas.js') }}" defer></script>

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
      <a href="{{ url('/reseñas') }}" class="btn-reseñas">Reseñas</a>
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

      <img src="img/carrito.svg" alt="carrito" class="carrito" id="carrito_icon">
      <a class="btn--show-modal" href="#">
        <img src="img/user.svg" alt="user" class="user" id="user_icon">
      </a>
    </nav>
  </header>

    <!-- Contenedor de las reseñas -->
    <div id="reseñas-contenedor" class="reseñas-contenedor"></div>



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

  <!-- Modal para mostrar mensaje de error -->
<div id="modal-error" class="modal hidden">
  <div class="modal-content">
    <span class="close-modal">&times;</span>
    <p>No estás autenticado. Haz clic en el botón para volver a la página principal.</p>
    <button id="redirect-btn">Ir a la página principal</button>
  </div>
</div>

<!-- Modal para editar reseña -->
<div id="modal-editar" class="modal hidden">
    <div class="modal-content">
        <span class="close-modal-editar">&times;</span>
        <form id="form-editar" class="modal__form">
            <input type="hidden" id="edit-id">
            <label for="edit-titulo">Título:</label>
            <input type="text" id="edit-titulo" name="titulo">
            <label for="edit-comentario">Comentario:</label>
            <textarea id="edit-comentario" name="comentario"></textarea>
            <button type="submit">Actualizar</button>
        </form>
    </div>
</div>


  
</body>
</html>