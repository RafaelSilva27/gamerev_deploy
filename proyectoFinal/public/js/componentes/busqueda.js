// Barra de búsqueda
document.addEventListener('DOMContentLoaded', function () {
  const lupaIcon = document.getElementById('lupa_icon');
  const barraBusqueda = document.getElementById('barra_busqueda');

  lupaIcon.addEventListener('click', function () {
    barraBusqueda.classList.toggle('hidden');
    if (!barraBusqueda.classList.contains('hidden')) {
      const inputBusqueda = barraBusqueda.querySelector("input[type='text']");
      inputBusqueda.focus();
    }
  });
});
