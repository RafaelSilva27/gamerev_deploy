document.addEventListener('DOMContentLoaded', function () {
  const reseñasContenedor = document.getElementById('reseñas-contenedor');

  // Función para obtener y mostrar las reseñas
  function cargarReseñas() {
    axios.get('/api/resenas')
      .then(response => {
        const reseñas = response.data.data; 
        reseñasContenedor.innerHTML = ''; // Limpiar cualquier contenido existente

        reseñas.forEach(resena => {
          const resenaElement = document.createElement('div');
          resenaElement.classList.add('resena');
          resenaElement.innerHTML = `
            <h3>${resena.titulo}</h3>
            <p>${resena.comentario}</p>
            <p><strong>Videojuego:</strong> ${resena.videojuego}</p>
            <p><strong>Usuario:</strong> ${resena.user}</p>
          `;
          reseñasContenedor.appendChild(resenaElement);
        });
      });
  }

  // Llamar a la función para cargar las reseñas cuando se cargue la página
  cargarReseñas();

  // Función para abrir el modal
  document.getElementById('icono_mas').addEventListener('click', () => {
    document.getElementById('modal-add-review').classList.remove('hidden');
    document.getElementById('overlay-reseñas').classList.remove('hidden');
  });

  // Función para cerrar el modal
  document.querySelector('.btn--close-modal').addEventListener('click', () => {
    document.getElementById('modal-add-review').classList.add('hidden');
    document.getElementById('overlay-reseñas').classList.add('hidden');
  });

  // Función para cargar las opciones de videojuegos en el campo de selección
  function cargarVideojuegos() {
    axios.get('/api/videojuegos')
      .then(response => {
        const selectVideojuego = document.getElementById('select-videojuego');
        const videojuegos = response.data.data; // Ajustamos para acceder a la propiedad "data" del objeto de respuesta

        // Limpiar las opciones existentes en el campo de selección
        selectVideojuego.innerHTML = '';

        // Agregar las nuevas opciones al campo de selección
        videojuegos.forEach(videojuego => {
          const option = document.createElement('option');
          option.value = videojuego.id; // Usar el ID del videojuego como valor
          option.textContent = videojuego.nombre;
          selectVideojuego.appendChild(option);
        });
      });
  }

  // Llamar a la función para cargar los videojuegos al cargar la página
  cargarVideojuegos();

  // Función para agregar una reseña
  function agregarReseña(formData) {
    axios.post('/api/resenas', formData)
      .then(response => {
        
        // Añadir la nueva reseña al contenedor sin recargar la página
        const nuevaResena = response.data.data; // Asegúrate de que la estructura de la respuesta sea correcta

        const resenaElement = document.createElement('div');
        resenaElement.classList.add('resena');
        resenaElement.innerHTML = `
          <h3>${nuevaResena.titulo}</h3>
          <p>${nuevaResena.comentario}</p>
          <p><strong>Videojuego:</strong> ${nuevaResena.videojuego}</p>
          <p><strong>Usuario:</strong> ${nuevaResena.user}</p>
        `;

        reseñasContenedor.appendChild(resenaElement);

        // Cargar las opciones de videojuegos nuevamente
        cargarVideojuegos();

        // Aquí puedes agregar cualquier lógica adicional, como cerrar el modal o mostrar un mensaje de éxito
        document.getElementById('modal-add-review').classList.add('hidden');
        document.getElementById('overlay-reseñas').classList.add('hidden');
        formAddReview.reset(); // Resetear el formulario después de enviarlo
      });
  }

  // Evento para enviar el formulario al hacer clic en el botón de añadir reseña
  const formAddReview = document.getElementById('form-add-review');

  formAddReview.addEventListener('submit', (event) => {
    event.preventDefault();

    const videojuegoElement = document.getElementById('select-videojuego');
    const tituloElement = document.getElementById('titulo');
    const comentarioElement = document.getElementById('comentario');

    if (videojuegoElement && tituloElement && comentarioElement) {
      const videojuegoId = videojuegoElement.value;
      const titulo = tituloElement.value;
      const comentario = comentarioElement.value;

      // Crear el objeto de datos del formulario
      const formData = {
        videojuego: { id: videojuegoId },
        titulo: titulo,
        comentario: comentario
      };

      // Obtener el token de acceso y el userId almacenado en localStorage
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (token && userId) {
        formData.user = { id: userId };

        // Incluir el token de acceso en el encabezado de la solicitud
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // Agregar la reseña
        agregarReseña(formData);
      } else {
        document.getElementById('modal-warning').classList.remove('hidden');
        document.getElementById('modal-add-review').classList.add('hidden');
      }
    }
  });

  // Manejar el botón de iniciar sesión en el modal de advertencia
  document.getElementById('btn-login').addEventListener('click', () => {
    window.location.href = '/'; // Redirigir a la página de inicio de sesión
  });

  // Manejar el cierre del modal de advertencia
  document.getElementById('close-warning-modal').addEventListener('click', () => {
    document.getElementById('modal-warning').classList.add('hidden');
    document.getElementById('overlay-reseñas').classList.add('hidden');
  });

});
