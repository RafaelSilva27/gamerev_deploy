// Menú desplegable
// Obtenemos las referencias a los elementos del DOM necesarios
const menuIcon = document.getElementById('menu_icon'); // Icono del menú
const nuevoNav = document.querySelector('.nuevo-nav'); // Menú desplegable

// Agregamos un event listener al hacer clic en el icono del menú
menuIcon.addEventListener('click', function () {
  // Alternamos la clase 'hidden' en el menú desplegable para mostrarlo u ocultarlo
  nuevoNav.classList.toggle('hidden');
});

// Esperamos a que se cargue el contenido antes de agregar event listeners
document.addEventListener('DOMContentLoaded', function () {
  // Seleccionamos todos los botones de género
  const generoBtns = document.querySelectorAll('.genero-btn');

  // Iteramos sobre cada botón de género
  generoBtns.forEach(btn => {
    btn.addEventListener('click', function (event) {
      event.preventDefault(); // Prevenimos el comportamiento predeterminado del enlace

      // Obtenemos el ID del objetivo al que se desplazará la página
      const targetId = btn.getAttribute('data-target');
      // Buscamos el elemento con el ID correspondiente
      const targetElement = document.getElementById(targetId);

      // Si encontramos el elemento, realizamos un desplazamiento suave hacia él
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
