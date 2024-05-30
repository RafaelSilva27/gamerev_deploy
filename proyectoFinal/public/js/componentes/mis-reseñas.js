document.addEventListener('DOMContentLoaded', function () {
  const reseñasContenedor = document.getElementById('reseñas-contenedor');
  const modalError = document.getElementById('modal-error');
  const closeModal = document.querySelector('.close-modal');
  const redirectBtn = document.getElementById('redirect-btn');
  const modalEditar = document.getElementById('modal-editar');
  const closeModalEditar = document.querySelector('.close-modal-editar');
  const formEditar = document.getElementById('form-editar');
  const editTitulo = document.getElementById('edit-titulo');
  const editComentario = document.getElementById('edit-comentario');
  const editId = document.getElementById('edit-id');

  // Función para mostrar el modal de error
  function mostrarModalError() {
    modalError.classList.remove('hidden');
  }

  // Función para ocultar el modal de error
  function ocultarModalError() {
    modalError.classList.add('hidden');
  }

  // Función para redirigir al usuario a la página principal
  function redirigirAPaginaPrincipal() {
    window.location.href = '/';
  }

  // Función para mostrar el modal de editar
  function mostrarModalEditar(resena) {
    editId.value = resena.id;
    editTitulo.value = resena.titulo;
    editComentario.value = resena.comentario;
    modalEditar.classList.remove('hidden');
  }

  // Función para ocultar el modal de editar
  function ocultarModalEditar() {
    modalEditar.classList.add('hidden');
  }

  // Evento para cerrar el modal de error
  closeModal.addEventListener('click', ocultarModalError);

  // Evento para redirigir a la página principal
  redirectBtn.addEventListener('click', redirigirAPaginaPrincipal);

  // Evento para cerrar el modal de editar
  closeModalEditar.addEventListener('click', ocultarModalEditar);

  // Evento para actualizar la reseña
  formEditar.addEventListener('submit', function (event) {
    event.preventDefault();

    const resenaId = editId.value;
    const titulo = editTitulo.value;
    const comentario = editComentario.value;

    // Obtener el token de acceso
    const token = localStorage.getItem('token');

    if (token) {
      // Incluir el token de acceso en el encabezado de la solicitud
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.put(`/api/resenas/${resenaId}`, {
        titulo: titulo,
        comentario: comentario
      })
      .then(response => {
        console.log('Reseña actualizada:', response);
        // Volver a cargar las reseñas después de actualizar
        cargarReseñas();
        ocultarModalEditar();
      })
      .catch(error => {
        console.error('Error al actualizar la reseña:', error);
      });
    } else {
      console.error('El usuario no está autenticado');
      mostrarModalError();
    }
  });

  // Función para borrar una reseña
  function borrarReseña(resenaId) {
    console.log(`Borrando reseña con id: ${resenaId}`);

    // Obtener el token de acceso
    const token = localStorage.getItem('token');

    if (token) {
      // Incluir el token de acceso en el encabezado de la solicitud
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.delete(`/api/resenas/${resenaId}`)
        .then(response => {
          console.log('Reseña borrada:', response);
          // Volver a cargar las reseñas después de borrar
          cargarReseñas();
        })
        .catch(error => {
          console.error('Error al borrar la reseña:', error);
        });
    } else {
      console.error('El usuario no está autenticado');
      mostrarModalError();
    }
  }

  // Función para obtener y mostrar las reseñas del usuario logueado
  function cargarReseñas() {
    console.log('Cargando reseñas...');

    // Obtener el token de acceso y el userId almacenado en localStorage
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      // Incluir el token de acceso en el encabezado de la solicitud
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.get(`/api/resenas?user_id=${userId}`)
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
              <div class="iconos-acciones">
                  <img class="icono-borrar" src="/img/basura.svg" alt="Borrar" data-id="${resena.id}" />
                  <img class="icono-editar" src="/img/lapiz.svg" alt="Editar" data-id="${resena.id}" />
              </div>
            `;
            reseñasContenedor.appendChild(resenaElement);
          });

          // Añadir eventos de clic a los botones de borrar
          const iconosBorrar = document.querySelectorAll('.icono-borrar');
          iconosBorrar.forEach(icono => {
              icono.addEventListener('click', function () {
                  const resenaId = this.getAttribute('data-id');
                  borrarReseña(resenaId);
              });
          });

          // Añadir eventos de clic a los botones de editar
          const iconosEditar = document.querySelectorAll('.icono-editar');
          iconosEditar.forEach(icono => {
              icono.addEventListener('click', function () {
                  const resenaId = this.getAttribute('data-id');
                  const resena = reseñas.find(r => r.id == resenaId);
                  mostrarModalEditar(resena);
              });
          });
                  })
        .catch(error => {
          console.error('Error al obtener las reseñas:', error);
        });
    } else {
      console.error('El usuario no está autenticado');
      mostrarModalError();
    }
  }

  // Llamar a la función para cargar las reseñas cuando se cargue la página
  cargarReseñas();
});
