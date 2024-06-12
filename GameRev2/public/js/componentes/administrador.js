// Se ejecuta cuando el contenido del DOM ha sido completamente cargado
document.addEventListener('DOMContentLoaded', function () {
  
  // Obtención de elementos del DOM
  const adminButton = document.querySelector('.btn--admin');
  const adminModal = document.querySelector('.modal-admin');
  const adminOverlay = document.querySelector('.overlay-admin');
  const closeButton = adminModal.querySelector('.btn--close-modal-admin');

  // Función para abrir el modal de administración
  const openAdminModal = function () {
    adminModal.classList.remove('hidden');
    adminOverlay.classList.remove('hidden');
  };

  // Función para cerrar el modal de administración
  const closeAdminModal = function () {
    adminModal.classList.add('hidden');
    adminOverlay.classList.add('hidden');
  };

  // Eventos para abrir y cerrar el modal de administración
  adminButton.addEventListener('click', openAdminModal);
  closeButton.addEventListener('click', closeAdminModal);
  adminOverlay.addEventListener('click', closeAdminModal);

  // Cierra el modal de administración si se presiona la tecla Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !adminModal.classList.contains('hidden')) {
      closeAdminModal();
    }
  });

  // Verificación del rol del usuario para mostrar el botón de administración
  const userRole = localStorage.getItem('rol');
  if (userRole && parseInt(userRole) === 1) {
    adminButton.classList.remove('hidden');
  } else {
    adminButton.classList.add('hidden');
  }

  // Función para cargar la lista de videojuegos desde el servidor
  function cargarVideojuegos() {
    axios.get('/api/videojuegos')
      .then(response => {
        const selectVideojuego = document.getElementById('videojuego-select');
        const videojuegos = response.data.data;
        selectVideojuego.innerHTML = '';
        videojuegos.forEach(videojuego => {
          const option = document.createElement('option');
          option.value = videojuego.id;
          option.textContent = videojuego.nombre;
          selectVideojuego.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error al cargar los videojuegos:', error);
      });
  }

  // Función para cargar la lista de géneros desde el servidor
  function cargarGeneros(selectId = 'genero-select') {
    return axios.get('/api/generos')
      .then(response => {
        const selectGenero = document.getElementById(selectId);
        const generos = response.data.data;
        selectGenero.innerHTML = '';
        generos.forEach(genero => {
          const option = document.createElement('option');
          option.value = genero.id;
          option.textContent = genero.nombre;
          selectGenero.appendChild(option);
        });
        return generos; 
      })
      .catch(error => {
        console.error('Error al cargar los géneros:', error);
      });
  }

  // Función para borrar un videojuego seleccionado
  function borrarVideojuego() {
    const videojuegoId = document.getElementById('videojuego-select').value;
    const token = localStorage.getItem('token');
    axios.delete(`/api/videojuegos/${videojuegoId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      cargarVideojuegos();
      alert('Videojuego borrado con éxito.');
      location.reload();
    })
    .catch(error => {
      console.error('Error al borrar el videojuego:', error);
      alert('Se produjo un error al intentar borrar el videojuego.');
    });
  }

  // Evento para borrar un videojuego cuando se hace clic en el botón correspondiente
  document.querySelector('.btn-borrar-videojuego').addEventListener('click', borrarVideojuego);

  // Función para borrar un género seleccionado
  function borrarGenero() {
    const generoId = document.getElementById('genero-select').value;
    const token = localStorage.getItem('token');
    axios.delete(`/api/generos/${generoId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      cargarGeneros();
      alert('Género borrado con éxito.');
      location.reload();
    })
    .catch(error => {
      console.error('Error al borrar el género:', error);
      alert('Se produjo un error al intentar borrar el género.');
    });
  }

  // Evento para borrar un género cuando se hace clic en el botón correspondiente
  document.querySelector('.btn-borrar-genero').addEventListener('click', borrarGenero);

  // Función para abrir el modal de actualización de un videojuego
  function abrirModalActualizacionVideojuego() {
    const videojuegoId = document.getElementById('videojuego-select').value;
    axios.get(`/api/videojuegos/${videojuegoId}`)
      .then(response => {
        const videojuego = response.data.data; 
        const modalActualizacion = document.getElementById('modal-actualizacion-videojuego');
        const overlay = document.getElementById('overlay-actualizacion-videojuego');
        const nombreInput = document.getElementById('nombre-actualizacion-videojuego');
        const precioInput = document.getElementById('precio-actualizacion-videojuego');
        const generoInput = document.getElementById('checkbox-genero-actualizacion-videojuego');
        nombreInput.value = videojuego.nombre || ''; 
        precioInput.value = videojuego.precio || 0; 

        // Cargar géneros y marcarlos según los géneros del videojuego
        cargarGeneros('checkbox-genero-actualizacion-videojuego').then(generos => {
          generoInput.innerHTML = '';
          generos.forEach(genero => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'genero';
            checkbox.value = genero.id;
            if (Array.isArray(videojuego.generos)) {
              checkbox.checked = videojuego.generos.some(g => g.id === genero.id);
            }

            const label = document.createElement('label');
            label.textContent = genero.nombre;

            const div = document.createElement('div');
            div.appendChild(checkbox);
            div.appendChild(label);
            generoInput.appendChild(div);
          });
        });

        // Mostrar modal de actualización
        modalActualizacion.classList.remove('hidden');
        overlay.classList.remove('hidden');
      })
      .catch(error => {
        console.error('Error al obtener los datos del videojuego:', error);
        alert('Se produjo un error al intentar cargar los datos del videojuego para actualizar.');
      });
  }

  // Función para abrir el modal de actualización de un género
  function abrirModalActualizacionGenero() {
    const generoId = document.getElementById('genero-select').value;
    axios.get(`/api/generos/${generoId}`)
      .then(response => {
        const genero = response.data.data; 
        const modalActualizacion = document.getElementById('modal-actualizacion-genero');
        const overlay = document.getElementById('overlay-actualizacion-genero');
        const nombreInput = document.getElementById('nombre-actualizacion-genero');
        nombreInput.value = genero.nombre || ''; 
        modalActualizacion.classList.remove('hidden');
        overlay.classList.remove('hidden');
      })
      .catch(error => {
        console.error('Error al obtener los datos del género:', error);
        alert('Se produjo un error al intentar cargar los datos del género para actualizar.');
      });
  }

  // Eventos para abrir los modales de actualización cuando se hace clic en los botones correspondientes
  document.querySelector('.btn-actualizar-videojuego').addEventListener('click', abrirModalActualizacionVideojuego);
  document.querySelector('.btn-actualizar-genero').addEventListener('click', abrirModalActualizacionGenero);

  // Función para cerrar los modales de actualización
  function cerrarModalActualizacion(modalId, overlayId) {
    document.getElementById(modalId).classList.add('hidden');
    document.getElementById(overlayId).classList.add('hidden');
  }

  // Eventos para cerrar los modales de actualización cuando se hace clic en los botones de cerrar
  document.querySelectorAll('.btn--close-modal-actualizacion').forEach(btn => {
    btn.addEventListener('click', () => {
      cerrarModalActualizacion('modal-actualizacion-videojuego', 'overlay-actualizacion-videojuego');
      cerrarModalActualizacion('modal-actualizacion-genero', 'overlay-actualizacion-genero');
    });
  });

  // Eventos para cerrar los modales de actualización cuando se hace clic fuera del modal
  document.getElementById('overlay-actualizacion-videojuego').addEventListener('click', () => {
    cerrarModalActualizacion('modal-actualizacion-videojuego', 'overlay-actualizacion-videojuego');
  });

  document.getElementById('overlay-actualizacion-genero').addEventListener('click', () => {
    cerrarModalActualizacion('modal-actualizacion-genero', 'overlay-actualizacion-genero');
  });

  // Evento para actualizar un videojuego cuando se envía el formulario
  document.getElementById('form-actualizacion-videojuego').addEventListener('submit', function (e) {
    e.preventDefault();
    const videojuegoId = document.getElementById('videojuego-select').value;
    const nombre = document.getElementById('nombre-actualizacion-videojuego').value;
    const precio = document.getElementById('precio-actualizacion-videojuego').value;
    const generos = Array.from(document.querySelectorAll('#checkbox-genero-actualizacion-videojuego input:checked')).map(checkbox => checkbox.value);
    const token = localStorage.getItem('token');
    axios.put(`/api/videojuegos/${videojuegoId}`, {
      nombre: nombre,
      precio: precio,
      generos: generos
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      alert('Videojuego actualizado con éxito.');
      cerrarModalActualizacion('modal-actualizacion-videojuego', 'overlay-actualizacion-videojuego');
      cargarVideojuegos();
    })
    .catch(error => {
      console.error('Error al actualizar el videojuego:', error);
      alert('Se produjo un error al intentar actualizar el videojuego.');
    });
  });

  // Evento para actualizar un género cuando se envía el formulario
  document.getElementById('form-actualizacion-genero').addEventListener('submit', function (e) {
    e.preventDefault();
    const generoId = document.getElementById('genero-select').value;
    const nombre = document.getElementById('nombre-actualizacion-genero').value;
    const token = localStorage.getItem('token');
    axios.put(`/api/generos/${generoId}`, {
      nombre: nombre,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      alert('Genero actualizado con éxito.');
      cerrarModalActualizacion('modal-actualizacion-genero', 'overlay-actualizacion-genero');
      cargarGeneros();
    })
    .catch(error => {
      console.error('Error al actualizar el genero:', error);
      alert('Se produjo un error al intentar actualizar el genero.');
    });
  });

  // Cargar listas de videojuegos y géneros al cargar la página
  cargarVideojuegos();
  cargarGeneros();
});