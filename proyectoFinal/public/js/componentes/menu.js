// Menú desplegable
const menuIcon = document.getElementById('menu_icon');
const nuevoNav = document.querySelector('.nuevo-nav');

menuIcon.addEventListener('click', function () {
  nuevoNav.classList.toggle('hidden');
});

document.addEventListener('DOMContentLoaded', function () {
  const generoBtns = document.querySelectorAll('.genero-btn');

  generoBtns.forEach(btn => {
    btn.addEventListener('click', function (event) {
      event.preventDefault();

      const targetId = btn.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
