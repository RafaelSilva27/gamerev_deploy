// Carrusel novedades
// Seleccionamos el elemento principal del carrusel y los puntos de navegación
const grande = document.querySelector('.grande'); // Contenedor del carrusel
const punto = document.querySelectorAll('.punto'); // Puntos de navegación

// Agregamos un event listener a cada punto de navegación
punto.forEach((cadaPunto, i) => {
  punto[i].addEventListener('click', () => {
    // Cuando se hace clic en un punto de navegación, obtenemos su posición
    let posicion = i;
    // Calculamos la operación para desplazar el carrusel horizontalmente
    let operacion = posicion * -50; // Suponiendo que cada slide tiene un ancho del 50%

    // Movemos el carrusel al slide correspondiente utilizando transformaciones CSS
    grande.style.transform = `translateX(${operacion}%)`;

    // Quitamos la clase 'activo' de todos los puntos de navegación
    punto.forEach((cadaPunto, i) => {
      punto[i].classList.remove('activo');
    });
    // Agregamos la clase 'activo' al punto de navegación seleccionado
    punto[i].classList.add('activo');
  });
});
