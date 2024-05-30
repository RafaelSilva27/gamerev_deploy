document.addEventListener('DOMContentLoaded', () => {
  // Función para abrir el modal de añadir género
  document.querySelector('.btn-add-genero').addEventListener('click', () => {
    document.getElementById('modal-add-game').classList.add('hidden');
    document.getElementById('modal-add-genero').classList.remove('hidden');
  });

  // Función para cerrar el modal de añadir género
  document.querySelector('#modal-add-genero .btn--close-modal').addEventListener('click', () => {
    document.getElementById('modal-add-genero').classList.add('hidden');
    document.getElementById('modal-add-game').classList.remove('hidden');
  });

  // Función para cerrar el modal de añadir videojuego
  document.querySelector('#modal-add-game .btn--close-modal').addEventListener('click', () => {
    document.getElementById('modal-add-game').classList.add('hidden');
  });

  // Función para enviar el formulario de añadir género
  const formAddGenero = document.getElementById('form-add-genero');

  formAddGenero.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombreElement = document.getElementById('nombre-genero');

    if (nombreElement) {
      const nombre = nombreElement.value;

      console.log('Nombre del Género:', nombre);

      // Crear el objeto de datos del formulario
      const formData = {
        nombre: nombre
      };

      // Enviar los datos del nuevo género al servidor
      axios.post('/api/generos', formData)
        .then(response => {
          console.log('Género añadido correctamente:', response.data);
          // Aquí puedes agregar cualquier lógica adicional, como cerrar el modal o mostrar un mensaje de éxito
          document.getElementById('modal-add-genero').classList.add('hidden');
          formAddGenero.reset(); // Resetear el formulario después de enviarlo
          // Recargar los géneros en el formulario de añadir videojuegos
          cargarGeneros();
          document.getElementById('modal-add-game').classList.remove('hidden');
        })
        .catch(error => {
          console.error('Error al añadir el género:', error);
          // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
        });
    } else {
      console.error('Error: El campo de nombre del género no existe.');
    }
  });

  // Función para cargar las opciones de género como checkboxes en el formulario de agregar videojuego
  function cargarGeneros() {
    const checkboxGenero = document.getElementById('checkbox-genero');
    // Limpiar las opciones existentes en el campo de selección
    checkboxGenero.innerHTML = '';

    axios.get('/api/generos')
      .then(response => {
        const generos = response.data.data; // Ajustar si es necesario según la estructura de tu respuesta

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
      })
      .catch(error => {
        console.error('Error al cargar los géneros:', error);
      });
  }

});
