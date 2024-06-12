document.addEventListener('DOMContentLoaded', function () {
  // Función para abrir el modal de agregar videojuegos
  document.getElementById('btn-add-game-modal').addEventListener('click', () => {
    document.getElementById('modal-add-game').classList.remove('hidden'); // Mostrar el modal de añadir videojuego
    document.getElementById('overlay-reseñas').classList.add('hidden'); // Ocultar el overlay de reseñas
    document.getElementById('overlay-videojuegos').classList.remove('hidden'); // Mostrar el overlay de videojuegos

    // Cerrar el modal de añadir reseña si está abierto
    document.getElementById('modal-add-review').classList.add('hidden'); // Ocultar el modal de añadir reseña
  });

  // Función para cerrar el modal de agregar videojuegos
  document.querySelector('#modal-add-game .btn--close-modal').addEventListener('click', () => {
    document.getElementById('modal-add-game').classList.add('hidden'); // Ocultar el modal de añadir videojuego
    document.getElementById('overlay-videojuegos').classList.add('hidden'); // Ocultar el overlay de videojuegos
  });

  const formAddGame = document.getElementById('form-add-game');

  formAddGame.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    const nombreElement = document.getElementById('nombre-videojuego');
    const precioElement = document.getElementById('precio-videojuego');
    const generoCheckboxes = document.querySelectorAll('input[name="genero"]:checked');

    // Verificar que todos los elementos requeridos están presentes y se ha seleccionado al menos un género
    if (nombreElement && precioElement && generoCheckboxes.length > 0) {
      const nombre = nombreElement.value;
      const precio = precioElement.value;
      const generos = [];

      generoCheckboxes.forEach(checkbox => {
        generos.push(checkbox.value); // Obtener los valores de los géneros seleccionados
      });

      // Crear el objeto de datos del formulario
      const formData = {
        nombre: nombre,
        precio: precio,
        genero: generos
      };

      // Obtener el token de acceso almacenado en localStorage
      const token = localStorage.getItem('token');

      if (token) {
        // Incluir el token de acceso en el encabezado de la solicitud
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Enviar los datos del nuevo videojuego al servidor
        axios.post('/api/videojuegos', formData)
          .then(response => {
            // Ocultar el modal y el overlay de videojuegos
            document.getElementById('modal-add-game').classList.add('hidden');
            document.getElementById('overlay-videojuegos').classList.add('hidden');
            formAddGame.reset(); // Resetear el formulario después de enviarlo
            cargarVideojuegos(); // Recargar la lista de videojuegos
          });
      } else {
        // Mostrar el modal de advertencia
        document.getElementById('modal-warning').classList.remove('hidden');
        document.getElementById('modal-add-game').classList.add('hidden');
      }
    } 
  });

  // Función para cargar las opciones de videojuegos en el campo de selección
  function cargarVideojuegos() {
    axios.get('/api/videojuegos')
      .then(response => {
        const selectVideojuego = document.getElementById('select-videojuego');
        const videojuegos = response.data.data;

        selectVideojuego.innerHTML = ''; // Limpiar las opciones existentes

        videojuegos.forEach(videojuego => {
          const option = document.createElement('option');
          option.value = videojuego.id;
          option.textContent = videojuego.nombre;
          selectVideojuego.appendChild(option);
        });
      });
  }

  // Función para cargar las opciones de género como checkboxes en el formulario de agregar videojuego
  function cargarGeneros() {
    const checkboxGenero = document.getElementById('checkbox-genero');

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

  // Llamar a la función para cargar las opciones de género cuando se cargue la página
  cargarGeneros();

  // Manejar el botón de iniciar sesión en el modal de advertencia
  document.getElementById('btn-login').addEventListener('click', () => {
    window.location.href = '/'; // Redirigir a la página de inicio de sesión
  });

  // Manejar el cierre del modal de advertencia
  document.getElementById('close-warning-modal').addEventListener('click', () => {
    document.getElementById('modal-warning').classList.add('hidden'); // Ocultar el modal de advertencia
    document.getElementById('overlay-videojuegos').classList.add('hidden'); // Ocultar el overlay de videojuegos
  });
});
