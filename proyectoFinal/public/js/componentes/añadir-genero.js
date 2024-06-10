document.addEventListener('DOMContentLoaded', () => {
  // Función para abrir el modal de añadir género
  document.querySelector('.btn-add-genero').addEventListener('click', () => {
    document.getElementById('modal-add-game').classList.add('hidden'); // Ocultar el modal de añadir juego
    document.getElementById('modal-add-genero').classList.remove('hidden'); // Mostrar el modal de añadir género
    document.getElementById('overlay-videojuegos').classList.add('hidden'); // Ocultar el overlay de videojuegos
    document.getElementById('overlay-generos').classList.remove('hidden'); // Mostrar el overlay de géneros
  });

  // Función para cerrar el modal de añadir género
  document.querySelector('#modal-add-genero .btn--close-modal').addEventListener('click', () => {
    document.getElementById('modal-add-genero').classList.add('hidden'); // Ocultar el modal de añadir género
    document.getElementById('modal-add-game').classList.remove('hidden'); // Mostrar el modal de añadir juego
    document.getElementById('overlay-generos').classList.add('hidden'); // Ocultar el overlay de géneros
    document.getElementById('overlay-videojuegos').classList.remove('hidden'); // Mostrar el overlay de videojuegos
  });

  // Función para cerrar el modal de añadir videojuego
  document.querySelector('#modal-add-game .btn--close-modal').addEventListener('click', () => {
    document.getElementById('modal-add-game').classList.add('hidden'); // Ocultar el modal de añadir juego
  });

  // Función para enviar el formulario de añadir género
  const formAddGenero = document.getElementById('form-add-genero');

  formAddGenero.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const nombreElement = document.getElementById('nombre-genero');

    if (nombreElement) {
      const nombre = nombreElement.value; // Obtener el nombre del género

      // Crear el objeto de datos del formulario
      const formData = {
        nombre: nombre
      };

      // Obtener el token de acceso almacenado en localStorage
      const token = localStorage.getItem('token');

      if (token) {
        // Incluir el token de acceso en el encabezado de la solicitud
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Enviar los datos del nuevo género al servidor
        axios.post('/api/generos', formData)
          .then(response => {
            // Ocultar el modal y el overlay de géneros
            document.getElementById('modal-add-genero').classList.add('hidden');
            document.getElementById('overlay-generos').classList.add('hidden');
            formAddGenero.reset(); // Resetear el formulario después de enviarlo
            // Recargar los géneros en el formulario de añadir videojuegos
            cargarGeneros();
            // Mostrar el modal y el overlay de videojuegos
            document.getElementById('modal-add-game').classList.remove('hidden');
            document.getElementById('overlay-videojuegos').classList.remove('hidden');
          });
      } else {
        document.getElementById('modal-warning').classList.remove('hidden');
        document.getElementById('modal-add-genero').classList.add('hidden');
      }
    } 
  });

  // Función para cargar las opciones de género como checkboxes en el formulario de agregar videojuego
  function cargarGeneros() {
    const checkboxGenero = document.getElementById('checkbox-genero');
    // Limpiar las opciones existentes en el campo de selección
    checkboxGenero.innerHTML = '';

    axios.get('/api/generos')
      .then(response => {
        const generos = response.data.data; 

        generos.forEach(genero => {
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.name = 'genero';
          checkbox.value = genero.id; // Usar el ID del género como valor
          const label = document.createElement('label');
          label.textContent = genero.nombre; // Usar el nombre del género como etiqueta de opción
          const div = document.createElement('div');
          div.appendChild(checkbox);
          div.appendChild(label);
          checkboxGenero.appendChild(div);
        });
      });
  }

  // Manejar el botón de iniciar sesión en el modal de advertencia
  document.getElementById('btn-login').addEventListener('click', () => {
    window.location.href = '/'; // Redirigir a la página de inicio de sesión
  });

  // Manejar el cierre del modal de advertencia
  document.getElementById('close-warning-modal').addEventListener('click', () => {
    document.getElementById('modal-warning').classList.add('hidden'); // Ocultar el modal de advertencia
    document.getElementById('overlay-generos').classList.add('hidden'); // Ocultar el overlay de géneros
  });

});
