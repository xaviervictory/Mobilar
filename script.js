

// ELEMENTOS DEL DOM


const buscador =
    document.getElementById("buscador-productos");

const productos =
    document.querySelectorAll(".producto");

const botonesCategoria =
    document.querySelectorAll(".filtro-categoria");

const mensajeSinResultados =
    document.getElementById("sin-resultados");


// Categoría seleccionada actualmente

let categoriaActual = "todos";



// FUNCIÓN PRINCIPAL DE FILTRADO


function filtrarProductos() {

    const textoBuscado =
        buscador.value
            .toLowerCase()
            .trim();


    let productosEncontrados = 0;


    productos.forEach(function (producto) {

        const nombreProducto =
            producto
                .querySelector(".card-title")
                .textContent
                .toLowerCase();


        const categoriaProducto =
            producto.dataset.categoria;


        const coincideNombre =
            nombreProducto.includes(textoBuscado);


        const coincideCategoria =
            categoriaActual === "todos" ||
            categoriaProducto === categoriaActual;


        if (
            coincideNombre &&
            coincideCategoria
        ) {

            producto.classList.remove("d-none");

            productosEncontrados++;

        } else {

            producto.classList.add("d-none");

        }

    });


    // Mostrar u ocultar mensaje

    if (productosEncontrados === 0) {

        mensajeSinResultados.classList.remove("d-none");

    } else {

        mensajeSinResultados.classList.add("d-none");

    }

}



// EVENTO DEL BUSCADOR


buscador.addEventListener("input", function () {

    filtrarProductos();

});



// EVENTOS DE CATEGORÍAS


botonesCategoria.forEach(function (boton) {

    boton.addEventListener("click", function () {

        categoriaActual =
            boton.dataset.categoria;


        // Cambiar botón activo

        botonesCategoria.forEach(function (otroBoton) {

            otroBoton.classList.remove("activo");

        });


        boton.classList.add("activo");


        // Aplicar filtros

        filtrarProductos();

    });

});


// CARRITO DE COMPRAS


const carrito = [];


const botonesAgregar =
    document.querySelectorAll(".agregar-carrito");


const contadorCarrito =
    document.getElementById("contador-carrito");


const listaCarrito =
    document.getElementById("lista-carrito");


const totalCarrito =
    document.getElementById("total-carrito");


const carritoVacio =
    document.getElementById("carrito-vacio");


const botonCarrito =
    document.getElementById("boton-carrito");

    botonesAgregar.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const producto =
            boton.closest(".producto");


        const nombre =
            producto.dataset.nombre;


        const precio =
            Number(producto.dataset.precio);


        const productoExistente =
            carrito.find(function (item) {

                return item.nombre === nombre;

            });


        if (productoExistente) {

            productoExistente.cantidad++;

        } else {

            carrito.push({

                nombre: nombre,

                precio: precio,

                cantidad: 1

            });

        }


        actualizarCarrito();

    });

});

function actualizarCarrito() {

    listaCarrito.innerHTML = "";


    if (carrito.length === 0) {

        carritoVacio.classList.remove("d-none");

        totalCarrito.textContent = "$0";

        contadorCarrito.textContent = "0";

        return;

    }


    carritoVacio.classList.add("d-none");


    let cantidadTotal = 0;


    let precioTotal = 0;


    carrito.forEach(function (producto, indice) {

        cantidadTotal += producto.cantidad;


        precioTotal +=
            producto.precio * producto.cantidad;


        const item =
            document.createElement("div");


        item.classList.add(
            "d-flex",
            "justify-content-between",
            "align-items-center",
            "border-bottom",
            "py-3"
        );


        item.innerHTML = `

            <div>

                <h3 class="h6 mb-1">
                    ${producto.nombre}
                </h3>

                <small class="text-secondary">
                    ${producto.cantidad} x
                    $${producto.precio.toLocaleString("es-AR")}
                </small>

            </div>


            <div class="text-end">

                <strong>
                    $${(
                        producto.precio *
                        producto.cantidad
                    ).toLocaleString("es-AR")}
                </strong>

                <br>

                <button
                    type="button"
                    class="btn btn-sm btn-outline-danger eliminar-producto"
                    data-indice="${indice}"
                >
                    Eliminar
                </button>

            </div>

        `;


        listaCarrito.appendChild(item);

    });


    contadorCarrito.textContent =
        cantidadTotal;


    totalCarrito.textContent =
        `$${precioTotal.toLocaleString("es-AR")}`;


    agregarEventosEliminar();

}

function agregarEventosEliminar() {

    const botonesEliminar =
        document.querySelectorAll(".eliminar-producto");


    botonesEliminar.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const indice =
                Number(boton.dataset.indice);


            carrito.splice(indice, 1);


            actualizarCarrito();

        });

    });

}

botonCarrito.addEventListener("click", function () {

    const modal =
        new bootstrap.Modal(
            document.getElementById("modal-carrito")
        );


    modal.show();

});

const finalizarCompra =
    document.getElementById("finalizar-compra");


finalizarCompra.addEventListener("click", function () {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío.");

        return;

    }


    alert(
        "¡Gracias por elegir Mobilar! " +
        "Tu pedido fue registrado correctamente."
    );


    carrito.length = 0;


    actualizarCarrito();

});