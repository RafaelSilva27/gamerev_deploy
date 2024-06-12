// Carrito
document.addEventListener("DOMContentLoaded", function () {
  // Obtenemos referencias a los elementos del DOM necesarios para el carrito
  const carritoIcon = document.getElementById("carrito_icon"); // Icono del carrito
  const carritoOverlay = document.getElementById("carrito_overlay"); // Overlay del carrito
  const carritoContent = document.querySelector(".carrito-content"); // Contenido del carrito

  // Función para abrir el carrito
  function abrirCarrito() {
    carritoOverlay.classList.remove("hidden"); // Quitamos la clase 'hidden' para mostrar el carrito
    // Agregamos un event listener para cerrar el carrito si se hace clic fuera de él
    document.addEventListener("click", cerrarCarritoOutside);
  }

  // Función para cerrar el carrito
  function cerrarCarrito() {
    carritoOverlay.classList.add("hidden"); // Agregamos la clase 'hidden' para ocultar el carrito
    // Removemos el event listener para cerrar el carrito al hacer clic fuera de él
    document.removeEventListener("click", cerrarCarritoOutside);
  }

  // Función para cerrar el carrito si se hace clic fuera de él
  function cerrarCarritoOutside(event) {
    // Verificamos si el clic fue fuera del contenido del carrito y no en el icono del carrito
    if (!carritoContent.contains(event.target) && event.target !== carritoIcon) {
      cerrarCarrito(); // Cerramos el carrito
    }
  }

  // Agregamos un event listener para abrir el carrito al hacer clic en el icono del carrito
  carritoIcon.addEventListener("click", abrirCarrito);

  // Seleccionamos todos los botones de compra y agregamos un event listener a cada uno
  const botonesComprar = document.querySelectorAll(".btn-comprar");
  botonesComprar.forEach(function (boton) {
    boton.addEventListener("click", function () {
      // Obtenemos el nombre del producto al hacer clic en el botón de compra
      const producto = this.parentElement;
      const nombre = producto.querySelector("span:nth-child(2)").textContent;

      agregarAlCarrito(nombre); // Llamamos a la función para agregar el producto al carrito
    });
  });

  // Función para agregar un producto al carrito
  function agregarAlCarrito(nombre) {
    // Buscamos si el producto ya está en el carrito
    const productosEnCarrito = document.querySelectorAll(".producto");
    let productoExistente = null;
    productosEnCarrito.forEach(function (producto) {
      if (producto.querySelector("span:first-child").textContent === nombre) {
        productoExistente = producto;
      }
    });

    // Si el producto ya está en el carrito, incrementamos su cantidad
    if (productoExistente) {
      const cantidadElemento = productoExistente.querySelector(".cantidad-numero");
      let cantidad = parseInt(cantidadElemento.textContent);
      cantidadElemento.textContent = cantidad + 1;
    } else { // Si el producto no está en el carrito, lo añadimos
      const nuevoProducto = document.createElement("div");
      nuevoProducto.classList.add("producto");
      nuevoProducto.innerHTML = `
        <span>${nombre}</span>
        <div class="acciones">
          <div class="cantidad">
            <img class="btn-menos" src="img/boton-menos.svg" alt="boton menos">
            <span class="cantidad-numero">1</span>
            <img class="btn-mas" src="img/boton-mas.svg" alt="boton mas"> 
          </div>
          <img class="btn-borrar" src="img/basura.svg" alt="basura">
        </div>
      `;
      const carritoContenedor = document.getElementById("carrito_contenedor");
      carritoContenedor.appendChild(nuevoProducto); // Agregamos el nuevo producto al carrito
    }
  }

  // Event listener general para los botones de modificar el carrito (disminuir, aumentar, borrar)
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-menos")) { // Botón de disminuir cantidad
      const cantidadElemento = event.target.nextElementSibling;
      let cantidad = parseInt(cantidadElemento.textContent);
      if (cantidad > 1) {
        cantidadElemento.textContent = cantidad - 1;
      }
    } else if (event.target.classList.contains("btn-mas")) { // Botón de aumentar cantidad
      const cantidadElemento = event.target.previousElementSibling;
      let cantidad = parseInt(cantidadElemento.textContent);
      cantidadElemento.textContent = cantidad + 1;
    } else if (event.target.classList.contains("btn-borrar")) { // Botón de borrar producto
      const producto = event.target.parentElement.parentElement;
      producto.remove(); // Eliminamos el producto del carrito
    }
  });
});
