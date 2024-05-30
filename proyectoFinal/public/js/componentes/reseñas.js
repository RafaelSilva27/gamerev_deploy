document.addEventListener('DOMContentLoaded', function () {
  const reseñasContenedor = document.getElementById('reseñas-contenedor');

  // Función para obtener y mostrar las reseñas
  function cargarReseñas() {
    console.log('Cargando reseñas...');
    axios.get('/api/resenas')
      .then(response => {
        console.log('Respuesta de la API:', response);
        const reseñas = response.data.data; // Asegúrate de que la estructura de la respuesta sea correcta
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
      })
      .catch(error => {
        console.error('Error al obtener las reseñas:', error);
      });
  }

  // Llamar a la función para cargar las reseñas cuando se cargue la página
  cargarReseñas();

  // Función para abrir el modal
  document.getElementById('icono_mas').addEventListener('click', () => {
    document.getElementById('modal-add-review').classList.remove('hidden');
  });

  // Función para cerrar el modal
  document.querySelector('.btn--close-modal').addEventListener('click', () => {
    document.getElementById('modal-add-review').classList.add('hidden');
  });

  // Función para cargar las opciones de videojuegos en el campo de selección
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
      })
      .catch(error => {
          console.error('Error al cargar los videojuegos:', error);
      });

  // Función para agregar una reseña
  function agregarReseña(formData) {
    axios.post('/api/resenas', formData)
      .then(response => {
        console.log('Reseña añadida correctamente:', response.data);
        
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

        // Aquí puedes agregar cualquier lógica adicional, como cerrar el modal o mostrar un mensaje de éxito
        document.getElementById('modal-add-review').classList.add('hidden');
        formAddReview.reset(); // Resetear el formulario después de enviarlo
      })
      .catch(error => {
        console.error('Error al añadir la reseña:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
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

      console.log('Videojuego ID:', videojuegoId);
      console.log('Título:', titulo);
      console.log('Comentario:', comentario);

      // Crear el objeto de datos del formulario
      const formData = {
        videojuego: { id: videojuegoId },
        titulo: titulo,
        comentario: comentario
      };

      // Obtener el token de acceso y el userId almacenado en localStorage
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      console.log('Token:', token);
      console.log('User ID:', userId);

      if (token && userId) {
        formData.user = { id: userId };

        console.log('Form Data:', formData);

        // Incluir el token de acceso en el encabezado de la solicitud
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // Agregar la reseña
        agregarReseña(formData);
      } else {
        console.error('El usuario no está autenticado');
      }
    } else {
      console.error('Error: Alguno de los elementos del formulario no existe.');
    }
  });
});
