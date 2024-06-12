document.addEventListener('DOMContentLoaded', function () {
  // Selección de elementos del DOM
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const btnCloseModal = document.querySelector('.btn--close-modal');
  const btnOpenModal = document.querySelectorAll('.btn--show-modal');
  const loginModal = document.querySelector('.modal');
  const registerModal = document.querySelector('.modal-register');
  const registerOverlay = document.querySelector('.overlay-register');
  const openRegisterModalLinks = document.querySelectorAll('.open-register-modal');
  const closeModalButtons = document.querySelectorAll('.btn--close-modal, .btn--close-modal-register');
  const messageModal = document.querySelector('.message-modal');
  const messageText = document.querySelector('.message-text');
  const overlayMessage = document.querySelector('.overlay-message');
  const logoutButton = document.querySelector('.btn--logout');
  const loginForm = document.querySelector('.modal__form');
  const registerForm = document.querySelector('.modal__form-register');

  // Funciones para abrir y cerrar el modal de inicio de sesión
  const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  // Event listeners para abrir y cerrar el modal de inicio de sesión
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // Cerrar el modal con la tecla "Escape"
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Abrir el modal de inicio de sesión al hacer clic en los botones correspondientes
  btnOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

  // Funciones para abrir y cerrar el modal de registro
  function openRegisterModal() {
    loginModal.classList.add('hidden');
    registerModal.classList.remove('hidden');
    registerOverlay.classList.remove('hidden');
  }

  function closeRegisterModal() {
    registerModal.classList.add('hidden');
    registerOverlay.classList.add('hidden');
    overlay.classList.add('hidden');
  }

  function closeLoginModal() {
    loginModal.classList.add('hidden');
    overlay.classList.add('hidden');
  }

  // Abrir el modal de registro al hacer clic en los enlaces correspondientes
  openRegisterModalLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      openRegisterModal();
    });
  });

  // Cerrar los modales de inicio de sesión y registro
  closeModalButtons.forEach((button) => {
    button.addEventListener('click', function () {
      closeRegisterModal();
      closeLoginModal();
    });
  });

  // Función para abrir y cerrar el modal de mensajes
function openMessageModal(message) {
  messageText.textContent = message;
  messageModal.classList.remove('hidden');
  overlayMessage.classList.remove('hidden');
}

function closeMessageModal() {
  messageModal.classList.add('hidden');
  overlayMessage.classList.add('hidden');
}

// Cerrar el modal de mensajes al hacer clic en el overlay
overlayMessage.addEventListener('click', closeMessageModal);

// Cerrar el modal de mensajes al hacer clic en el botón de cierre del mensaje
document.querySelector('.btn--close-message-modal').addEventListener('click', closeMessageModal);

// Cerrar el modal de mensajes al hacer clic en el overlay del mensaje
overlayMessage.addEventListener('click', closeMessageModal);

// Cerrar el modal de mensajes al hacer clic en el botón de cierre del mensaje
document.querySelector('.btn--close-message-modal').addEventListener('click', closeMessageModal);


  // Manejo del formulario de inicio de sesión
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const email = loginForm.querySelector('input[name="email"]').value;
    const password = loginForm.querySelector('input[name="password"]').value;

    axios.post('/api/login', {
      email: email,
      password: password
    })
    .then(response => {
      const data = response.data;
      const token = data.access_token;
      const userId = data.user_id;
      const rol = data.rol;
      const message = data.message;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId); // Almacena el ID del usuario
      localStorage.setItem('rol', rol); 

      closeLoginModal();
      openMessageModal(message);
    })
    .catch(error => {
      if (error.response) {
        openMessageModal('Error: ' + error.response.data.message);
      }
    });
  });

  // Manejo del formulario de registro
  registerForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const name = registerForm.querySelector('input[name="name"]').value;
  const email = registerForm.querySelector('input[name="email"]').value;
  const password = registerForm.querySelector('input[name="password"]').value;
  const confirmPassword = registerForm.querySelector('input[name="password_confirmation"]').value;
  const rol = registerForm.querySelector('input[name="rol"]').value;


  axios.post('/api/register', {
    name: name,
    email: email,
    password: password,
    password_confirmation: confirmPassword,
    rol: rol,
  })
  .then(response => {
    const data = response.data;
    const message = data.message;

    localStorage.setItem('token', data.access_token);
    localStorage.setItem('userId', data.data.id);

    closeRegisterModal();
    openMessageModal(message);
  })
  .catch(error => {
    if (error.response) {
      openMessageModal('Error: ' + JSON.stringify(error.response.data.errors));
    }
  });
});


  // Función para obtener el token almacenado
  function getToken() {
    return localStorage.getItem('token');
  }

  // Interceptor de Axios para añadir el token a cada petición
  axios.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  // Manejo del botón de cierre de sesión
  if (logoutButton) {
    logoutButton.addEventListener('click', function (event) {
      event.preventDefault();

      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('rol');

      window.location.href = '/';
    });
  }
});
