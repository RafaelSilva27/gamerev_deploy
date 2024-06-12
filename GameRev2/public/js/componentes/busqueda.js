// Barra de búsqueda
document.addEventListener('DOMContentLoaded', function () {
  // Obtenemos las referencias a los elementos del DOM que necesitamos
  const lupaIcon = document.getElementById('lupa_icon'); // Ícono de la lupa
  const barraBusqueda = document.getElementById('barra_busqueda'); // Barra de búsqueda

  // Agregamos un event listener al hacer clic en el ícono de la lupa
  lupaIcon.addEventListener('click', function () {
    // Alternamos la clase 'hidden' en la barra de búsqueda, para mostrar u ocultar
    barraBusqueda.classList.toggle('hidden');

    // Si la barra de búsqueda no está oculta, enfocamos en el campo de entrada
    if (!barraBusqueda.classList.contains('hidden')) {
      // Buscamos el campo de entrada dentro de la barra de búsqueda
      const inputBusqueda = barraBusqueda.querySelector("input[type='text']");
      // Ponemos el foco en el campo de entrada
      inputBusqueda.focus();
    }
  });
});
