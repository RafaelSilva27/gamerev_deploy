document.addEventListener('DOMContentLoaded', function () {
  const modal = document.querySelector('.modal');
  const overlay = document.querySelector('.overlay');
  const btnCloseModal = document.querySelector('.btn--close-modal');
  const btnOpenModal = document.querySelectorAll('.btn--show-modal');

  const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  };

  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  btnOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

  const loginModal = document.querySelector('.modal');
  const registerModal = document.querySelector('.modal-register');
  const registerOverlay = document.querySelector('.overlay-register');
  const openRegisterModalLinks = document.querySelectorAll('.open-register-modal');
  const closeModalButtons = document.querySelectorAll('.btn--close-modal, .btn--close-modal-register');
  const messageModal = document.querySelector('.message-modal');
  const messageText = document.querySelector('.message-text');
  const overlayMessage = document.querySelector('.overlay-message');
  const logoutButton = document.querySelector('.btn--logout');

  function openRegisterModal() {
    loginModal.classList.add('hidden');
    registerModal.classList.remove('hidden');
    registerOverlay.classList.remove('hidden');
  }

  function closeRegisterModal() {
    registerModal.classList.add('hidden');
    registerOverlay.classList.add('hidden');
  }

  function closeLoginModal() {
    loginModal.classList.add('hidden');
    overlay.classList.add('hidden');
  }

  openRegisterModalLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      openRegisterModal();
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener('click', function () {
      closeRegisterModal();
      closeLoginModal();
    });
  });

  function openMessageModal(message) {
    messageText.textContent = message;
    messageModal.classList.remove('hidden');
    overlayMessage.classList.remove('hidden');
  }

  function closeMessageModal() {
    messageModal.classList.add('hidden');
    overlayMessage.classList.add('hidden');
  }

  overlayMessage.addEventListener('click', closeMessageModal);

  const loginForm = document.querySelector('.modal__form');
  const registerForm = document.querySelector('.modal__form-register');

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
      const message = data.message;
    
      console.log(message); // Imprime el mensaje de bienvenida
      console.log(token); // Imprime el token de acceso
      console.log(userId); // Imprime el ID del usuario
    
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId); // Almacenamos el ID del usuario
    
      closeLoginModal();
      openMessageModal(message);
    })
    
    .catch(error => {
      if (error.response) {
        openMessageModal('Error: ' + error.response.data.message);
      }
    });
  });

  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = registerForm.querySelector('input[name="name"]').value;
    const email = registerForm.querySelector('input[name="email"]').value;
    const password = registerForm.querySelector('input[name="password"]').value;
    const confirmPassword = registerForm.querySelector('input[name="password_confirmation"]').value;

    axios.post('/api/register', {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword
    })
    .then(response => {
      const token = response.data.access_token;
      const userId = response.data.user.id;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      closeRegisterModal();
      openMessageModal('Usuario registrado con éxito');
    })
    .catch(error => {
      if (error.response) {
        openMessageModal('Error: ' + JSON.stringify(error.response.data.errors));
      }
    });
  });

  function getToken() {
    return localStorage.getItem('token');
  }

  axios.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  if (logoutButton) {
    logoutButton.addEventListener('click', function (event) {
      event.preventDefault();

      localStorage.removeItem('token');
      localStorage.removeItem('userId');

      window.location.href = '/';
    });
  }
});
