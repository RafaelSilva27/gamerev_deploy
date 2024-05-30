// Carrito
document.addEventListener("DOMContentLoaded", function () {
  const carritoIcon = document.getElementById("carrito_icon");
  const carritoOverlay = document.getElementById("carrito_overlay");
  const carritoContent = document.querySelector(".carrito-content");

  function abrirCarrito() {
    carritoOverlay.classList.remove("hidden");

    document.addEventListener("click", cerrarCarritoOutside);
  }

  function cerrarCarrito() {
    carritoOverlay.classList.add("hidden");

    document.removeEventListener("click", cerrarCarritoOutside);
  }

  function cerrarCarritoOutside(event) {
    if (!carritoContent.contains(event.target) && event.target !== carritoIcon) {
      cerrarCarrito();
    }
  }

  carritoIcon.addEventListener("click", abrirCarrito);

  const botonesComprar = document.querySelectorAll(".btn-comprar");
  botonesComprar.forEach(function (boton) {
    boton.addEventListener("click", function () {
      // Obtener el nombre del producto
      const producto = this.parentElement;
      const nombre = producto.querySelector("span:nth-child(2)").textContent;

      agregarAlCarrito(nombre);
    });
  });

  function agregarAlCarrito(nombre) {
    const productosEnCarrito = document.querySelectorAll(".producto");
    let productoExistente = null;
    productosEnCarrito.forEach(function (producto) {
      if (producto.querySelector("span:first-child").textContent === nombre) {
        productoExistente = producto;
      }
    });

    if (productoExistente) {
      const cantidadElemento = productoExistente.querySelector(".cantidad-numero");
      let cantidad = parseInt(cantidadElemento.textContent);
      cantidadElemento.textContent = cantidad + 1;
    } else {
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
      carritoContenedor.appendChild(nuevoProducto);
    }
  }

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-menos")) {
      const cantidadElemento = event.target.nextElementSibling;
      let cantidad = parseInt(cantidadElemento.textContent);
      if (cantidad > 1) {
        cantidadElemento.textContent = cantidad - 1;
      }
    } else if (event.target.classList.contains("btn-mas")) {
      const cantidadElemento = event.target.previousElementSibling;
      let cantidad = parseInt(cantidadElemento.textContent);
      cantidadElemento.textContent = cantidad + 1;
    } else if (event.target.classList.contains("btn-borrar")) {
      const producto = event.target.parentElement.parentElement;
      producto.remove();
    }
  });
});
