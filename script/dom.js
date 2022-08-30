class Gomitas {
  iniciar() {
    fetch(url)
      .then((respuesta) => respuesta.json())
      .then((resultado) => {
        productos = resultado.productos;

        this.cargarProductos(productos);
      });

    this.actualizarCarrito();

    this.actualizarContador();
  }

  storage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  cargarProductos(productos) {
    const divProductos = document.querySelector("#productos");

    divProductos.innerHTML = "";

    if (productos.length > 0) {
      productos.forEach((producto) => {
        let prod = document.createElement("div");
        prod.setAttribute("id", "row_" + producto.id);

        prod.innerHTML = `
                <div class="objeto">
                <h3>${producto.nombre}</h3>
                <img src="./img/${producto.img}" alt="" class="imgProd-${producto.id}}">
                <p class="marcaProducto">Marca: ${producto.marca}</p>
                <p>${producto.descripcion}</p>
                <p class="precio">$${producto.precio}</p>
                <a href="javascript:addCarrito(${producto.id})"><button id="botonCarrito">Añadir al carrito</button></a>
                </div>
                `;

        divProductos.appendChild(prod);
      });
    }
  }

  agregaCarrito(prodI) {
    const prodEx = carrito.some((producto) => producto.id === prodI.id);

    if (prodEx) {
      const articulos = carrito.map((producto) => {
        if (producto.id === prodI.id) {
          producto.cantidad++;

          return producto;
        } else {
          return producto;
        }

        carrito = articulos;
      });

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Agregado Nuevamente.",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      carrito.push(prodI);

      Toastify({
        text: "Producto Agregado.",
        offset: {
          x: 80,
          y: 20,
        },
      }).showToast();
    }

    this.actualizarCarrito();
  }

  contarProductos() {
    let contadorProductos = 0;

    carrito.forEach((producto) => {
      contadorProductos = contadorProductos + parseInt(producto.cantidad);
    });

    return contadorProductos;
  }

  actualizarCarrito() {
    this.actualizarContador();

    this.mostrarCarrito();

    this.storage();
  }

  actualizarContador() {
    let totalArticulos = this.contarProductos();

    let countCarrito = document.querySelector("#badgeCarrito");

    countCarrito.innerHTML = totalArticulos;
  }

  mostrarCarrito() {
    let detalleCarrito = document.querySelector("#idCarrito");

    detalleCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach((producto) => {
      const row = document.createElement("div");
      row.classList.add("row");

      total = total + parseInt(producto.precio) * producto.cantidad;

      row.innerHTML = `
                        <div class="col-3 d-flex align-items-center p-2 border-bottom">
                            <img src="${producto.img}" width="80"/>
                        </div>
                        <div class="col-3 d-flex align-items-center p-2 border-bottom">
                            ${producto.nombre}
                        </div>
                        <div class="col-3 d-flex align-items-center justify-content-start p-2 border-bottom">
                            $ ${producto.precio}
                        </div>
                        <div class="col-1 d-flex align-items-center justify-content-end p-2 border-bottom">
                            ${producto.cantidad}
                        </div>
                        <div class="col-2 d-flex align-items-center justify-content-center p-2 border-bottom">
                            <a href="javascript:eliminar(${producto.id})">
                            <i class="fa-solid fa-trash" id="botonEliminar"></i>
                            </a>
                        </div>`;

      detalleCarrito.appendChild(row);
    });

    let row = document.createElement("div");
    row.classList.add("row");

    row.innerHTML = `   
                        <div class="col-4 d-flex align-items-center justify-content-start p-2 border-bottom">
                            Total:
                        </div>

                        <div class="col-8 d-flex align-items-center justify-content-end p-2 border-bottom">
                            <b>$ ${total}</b>
                        </div>`;

    detalleCarrito.appendChild(row);
  }

  eliminarArticulo(id) {
    Swal.fire({
      title: '"Esta seguro de eliminar el producto ?"',
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      confirmButtonColor: "pink",
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        carrito = carrito.filter((articulo) => articulo.id != id);
        this.actualizarCarrito();
        Toastify({
          text: "Producto eliminado",
          offset: {
            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 10, // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        }).showToast();
      } else {
    
      }
    });
  }
}
