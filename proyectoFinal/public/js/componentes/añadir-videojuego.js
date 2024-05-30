// Función para enviar el formulario al agregar un nuevo videojuego
// Evento para abrir el modal de agregar videojuegos
document.getElementById('btn-add-game-modal').addEventListener('click', () => {
  document.getElementById('modal-add-game').classList.remove('hidden');
  
  // Cerrar el modal de añadir reseña si está abierto
  document.getElementById('modal-add-review').classList.add('hidden');
});

document.querySelector('#modal-add-game .btn--close-modal').addEventListener('click', () => {
  document.getElementById('modal-add-game').classList.add('hidden');
});

const formAddGame = document.getElementById('form-add-game');

formAddGame.addEventListener('submit', (event) => {
  event.preventDefault();

  const nombreElement = document.getElementById('nombre-videojuego');
  const precioElement = document.getElementById('precio-videojuego');
  const generoCheckboxes = document.querySelectorAll('input[name="genero"]:checked');

  if (nombreElement && precioElement && generoCheckboxes.length > 0) {
    const nombre = nombreElement.value;
    const precio = precioElement.value;
    const generos = [];

    generoCheckboxes.forEach(checkbox => {
      generos.push(checkbox.value);
    });

    console.log('Nombre:', nombre);
    console.log('Precio:', precio);
    console.log('Géneros:', generos);

    // Crear el objeto de datos del formulario
    const formData = {
      nombre: nombre,
      precio: precio,
      genero: generos
    };

    // Enviar los datos del nuevo videojuego al servidor
    axios.post('/api/videojuegos', formData)
      .then(response => {
        console.log('Videojuego añadido correctamente:', response.data);
        // Aquí puedes agregar cualquier lógica adicional, como cerrar el modal o mostrar un mensaje de éxito
        document.getElementById('modal-add-game').classList.add('hidden');
        formAddGame.reset(); // Resetear el formulario después de enviarlo
        cargarVideojuegos();
      })
      .catch(error => {
        console.error('Error al añadir el videojuego:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje de error al usuario
      });
  } else {
    console.error('Error: Alguno de los elementos del formulario no existe o no se han seleccionado géneros.');
  }
});


// Función para cargar las opciones de género como checkboxes en el formulario de agregar videojuego
function cargarGeneros() {
  const checkboxGenero = document.getElementById('checkbox-genero');

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

// Llamar a la función para cargar las opciones de género cuando se cargue la página
document.addEventListener('DOMContentLoaded', cargarGeneros);

