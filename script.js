

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


if (buscador) {

    buscador.addEventListener("input", function () {

        filtrarProductos();

    });

}



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


// ============================================
// CARRITO DE COMPRAS
// ============================================


// Obtener la clave del carrito según el usuario
function obtenerClaveCarrito() {

    const sesion = JSON.parse(
        localStorage.getItem("mobilarSesion")
    );

    // Si no hay usuario iniciado
    if (!sesion) {
        return "mobilarCarritoInvitado";
    }

    // Cada usuario tiene su propio carrito
    return "mobilarCarrito_" + sesion.email;
}


// Cargar el carrito del usuario actual
function cargarCarritoUsuario() {

    const clave = obtenerClaveCarrito();

    carrito = JSON.parse(
        localStorage.getItem(clave)
    ) || [];

    actualizarCarrito();
}


// Guardar el carrito del usuario actual
function guardarCarritoUsuario() {

    const clave = obtenerClaveCarrito();

    localStorage.setItem(
        clave,
        JSON.stringify(carrito)
    );
}


// ============================================
// ELEMENTOS DEL DOM
// ============================================

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

const finalizarCompra =
    document.getElementById("finalizar-compra");



// CARRITO ACTUAL


// Variable global del carrito
let carrito = [];


// Cargar inmediatamente el carrito correspondiente
// al usuario que tiene la sesión iniciada
cargarCarritoUsuario();


 
// AGREGAR PRODUCTOS
 

botonesAgregar.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const textoOriginal =
            boton.innerHTML;

        boton.innerHTML =
            "✓ Agregado";

        boton.classList.remove(
            "btn-warning"
        );

        boton.classList.add(
            "btn-success"
        );


        setTimeout(function () {

            boton.innerHTML =
                textoOriginal;

            boton.classList.remove(
                "btn-success"
            );

            boton.classList.add(
                "btn-warning"
            );

        }, 1200);


        // Obtener producto
        const producto =
            boton.closest(".producto");


        const nombre =
            producto.dataset.nombre;


        const precio =
            Number(producto.dataset.precio);


        // Buscar si ya existe
        const productoExistente =
            carrito.find(function (item) {

                return item.nombre === nombre;

            });


        // Si existe, aumentar cantidad
        if (productoExistente) {

            productoExistente.cantidad++;

        }

        // Si no existe, agregarlo
        else {

            carrito.push({

                nombre: nombre,

                precio: precio,

                cantidad: 1

            });

        }


        // Actualizar carrito
        actualizarCarrito();

    });

});


 
// ACTUALIZAR CARRITO

function actualizarCarrito() {

    // Guardar carrito del usuario actual
    guardarCarritoUsuario();


    // Si el carrito todavía no existe en esta página
    if (!listaCarrito) {
        return;
    }


    // Limpiar lista
    listaCarrito.innerHTML = "";


    // Carrito vacío
    if (carrito.length === 0) {

        if (carritoVacio) {

            carritoVacio.classList.remove(
                "d-none"
            );

        }

        if (totalCarrito) {

            totalCarrito.textContent =
                "$0";

        }

        if (contadorCarrito) {

            contadorCarrito.textContent =
                "0";

        }

        actualizarCantidadUsuario();

        return;
    }


    // Ocultar mensaje de carrito vacío
    if (carritoVacio) {

        carritoVacio.classList.add(
            "d-none"
        );

    }


    let cantidadTotal = 0;

    let precioTotal = 0;


    // Recorrer productos
    carrito.forEach(function (
        producto,
        indice
    ) {

        cantidadTotal +=
            producto.cantidad;


        precioTotal +=
            producto.precio *
            producto.cantidad;


        // Crear elemento
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


    // Actualizar contador principal
    if (contadorCarrito) {

        contadorCarrito.textContent =
            cantidadTotal;

    }


    // Actualizar contador dentro de "Mi cuenta"
    actualizarCantidadUsuario(
        cantidadTotal
    );


    // Actualizar precio total
    if (totalCarrito) {

        totalCarrito.textContent =
            `$${precioTotal.toLocaleString("es-AR")}`;

    }


    // Activar botones eliminar
    agregarEventosEliminar();

}


 
// ACTUALIZAR CANTIDAD EN MI CUENTA
 

function actualizarCantidadUsuario(
    cantidad = null
) {

    const elemento =
        document.getElementById(
            "cantidad-carrito-usuario"
        );


    if (!elemento) {
        return;
    }


    // Si no recibimos cantidad,
    // calcularla desde el carrito
    if (cantidad === null) {

        cantidad = 0;


        carrito.forEach(function (
            producto
        ) {

            cantidad +=
                producto.cantidad;

        });

    }


    elemento.textContent =
        cantidad;

}


 
// ELIMINAR PRODUCTOS
 

function agregarEventosEliminar() {

    const botonesEliminar =
        document.querySelectorAll(
            ".eliminar-producto"
        );


    botonesEliminar.forEach(
        function (boton) {

            boton.addEventListener(
                "click",
                function () {

                    const indice =
                        Number(
                            boton.dataset.indice
                        );


                    carrito.splice(
                        indice,
                        1
                    );


                    actualizarCarrito();

                }
            );

        }
    );

}


 
// ABRIR MODAL DEL CARRITO
 

if (botonCarrito) {

    botonCarrito.addEventListener(
        "click",
        function () {

            const modal =
                new bootstrap.Modal(
                    document.getElementById(
                        "modal-carrito"
                    )
                );


            modal.show();

        }
    );

}


 
// FINALIZAR COMPRA
 

if (finalizarCompra) {

    finalizarCompra.addEventListener(
        "click",
        function () {

            if (carrito.length === 0) {

                alert(
                    "Tu carrito está vacío."
                );

                return;

            }


            alert(
                "¡Gracias por elegir Mobilar! " +
                "Tu pedido fue registrado correctamente."
            );


            // Vaciar carrito
            carrito = [];


            // Actualizar y guardar
            actualizarCarrito();

        }
    );

}


const formularioContacto =
    document.getElementById("formulario-contacto");


const nombreInput =
    document.getElementById("nombre");


const emailInput =
    document.getElementById("email");


const asuntoInput =
    document.getElementById("asunto");


const mensajeInput =
    document.getElementById("mensaje");


const errorNombre =
    document.getElementById("error-nombre");


const errorEmail =
    document.getElementById("error-email");


const errorAsunto =
    document.getElementById("error-asunto");


const errorMensaje =
    document.getElementById("error-mensaje");


const mensajeExito =
    document.getElementById("mensaje-exito");



if (formularioContacto) {

    formularioContacto.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();

            let formularioValido = true;

            // VALIDAR NOMBRE

            const nombre =
                nombreInput.value.trim();

            if (nombre.length < 3) {

                errorNombre.textContent =
                    "El nombre debe tener al menos 3 caracteres.";

                nombreInput.classList.add("is-invalid");
                nombreInput.classList.remove("is-valid");

                formularioValido = false;

            } else {

                errorNombre.textContent = "";

                nombreInput.classList.remove("is-invalid");
                nombreInput.classList.add("is-valid");
            }

            // VALIDAR EMAIL

            const email =
                emailInput.value.trim();

            const formatoEmail =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!formatoEmail.test(email)) {

                errorEmail.textContent =
                    "Ingresá un correo electrónico válido.";

                emailInput.classList.add("is-invalid");
                emailInput.classList.remove("is-valid");

                formularioValido = false;

            } else {

                errorEmail.textContent = "";

                emailInput.classList.remove("is-invalid");
                emailInput.classList.add("is-valid");
            }

            // VALIDAR ASUNTO

            const asunto =
                asuntoInput.value;

            if (asunto === "") {

                errorAsunto.textContent =
                    "Seleccioná un asunto.";

                asuntoInput.classList.add("is-invalid");
                asuntoInput.classList.remove("is-valid");

                formularioValido = false;

            } else {

                errorAsunto.textContent = "";

                asuntoInput.classList.remove("is-invalid");
                asuntoInput.classList.add("is-valid");
            }

            // VALIDAR MENSAJE

            const mensaje =
                mensajeInput.value.trim();

            if (mensaje.length < 10) {

                errorMensaje.textContent =
                    "El mensaje debe tener al menos 10 caracteres.";

                mensajeInput.classList.add("is-invalid");
                mensajeInput.classList.remove("is-valid");

                formularioValido = false;

            } else {

                errorMensaje.textContent = "";

                mensajeInput.classList.remove("is-invalid");
                mensajeInput.classList.add("is-valid");
            }

            // RESULTADO

            if (formularioValido) {

                mensajeExito.textContent =
                    "✅ ¡Mensaje enviado correctamente! " +
                    "Gracias por comunicarte con Mobilar.";

                formularioContacto.reset();

                nombreInput.classList.remove("is-valid");
                emailInput.classList.remove("is-valid");
                asuntoInput.classList.remove("is-valid");
                mensajeInput.classList.remove("is-valid");

                setTimeout(function () {

                    mensajeExito.classList.add("d-none");

                }, 5000);
            }
        }
    );
}


const contadorCaracteres =
    document.getElementById(
        "contador-caracteres"
    );

if (mensajeInput && contadorCaracteres) 

if (mensajeInput) {

    mensajeInput.addEventListener(
        "input",
        function () {

            const cantidad =
                mensajeInput.value.length;

            contadorCaracteres.textContent =
                `${cantidad} / 500`;
        }
    );
}

// SISTEMA DE REGISTRO E INICIO DE SESIÓN - MOBILAR




// ELEMENTOS DEL LOGIN


const formularioLogin =
    document.getElementById("formulario-login");

const loginEmail =
    document.getElementById("login-email");

const loginPassword =
    document.getElementById("login-password");

const recordarUsuario =
    document.getElementById("recordar-usuario");

const errorLoginEmail =
    document.getElementById("error-login-email");

const errorLoginPassword =
    document.getElementById("error-login-password");

const mensajeLogin =
    document.getElementById("mensaje-login");



// ELEMENTOS DEL REGISTRO


const formularioRegistro =
    document.getElementById("formulario-registro");

const mostrarRegistro =
    document.getElementById("mostrar-registro");

const registroNombre =
    document.getElementById("registro-nombre");

const registroEmail =
    document.getElementById("registro-email");

const registroPassword =
    document.getElementById("registro-password");

const mensajeRegistro =
    document.getElementById("mensaje-registro");



// OBTENER USUARIOS GUARDADOS


let usuarios =
    JSON.parse(
        localStorage.getItem("mobilarUsuarios")
    ) || [];



// MOSTRAR / OCULTAR REGISTRO


if (mostrarRegistro) {

    mostrarRegistro.addEventListener("click", function () {

        formularioRegistro.classList.toggle("d-none");

        if (!formularioRegistro.classList.contains("d-none")) {

            mostrarRegistro.textContent =
                "Ocultar registro";

        } else {

            mostrarRegistro.textContent =
                "Crear cuenta";
        }

    });

}



// REGISTRO


if (formularioRegistro) {

    formularioRegistro.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const nombre =
                registroNombre.value.trim();

            const email =
                registroEmail.value.trim().toLowerCase();

            const password =
                registroPassword.value;


            // Validar nombre

            if (nombre.length < 3) {

                mostrarMensajeRegistro(
                    "El nombre debe tener al menos 3 caracteres.",
                    "danger"
                );

                return;
            }


            // Validar email

            const formatoEmail =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!formatoEmail.test(email)) {

                mostrarMensajeRegistro(
                    "Ingresá un correo electrónico válido.",
                    "danger"
                );

                return;
            }


            // Validar contraseña

            if (password.length < 6) {

                mostrarMensajeRegistro(
                    "La contraseña debe tener al menos 6 caracteres.",
                    "danger"
                );

                return;
            }


            // Comprobar si ya existe

            const usuarioExistente =
                usuarios.find(function (usuario) {

                    return usuario.email === email;

                });


            if (usuarioExistente) {

                mostrarMensajeRegistro(
                    "Ya existe una cuenta registrada con ese correo.",
                    "danger"
                );

                return;
            }


            // Crear usuario

            const nuevoUsuario = {

                nombre: nombre,

                email: email,

                password: password

            };


            usuarios.push(nuevoUsuario);


            // Guardar usuarios

            localStorage.setItem(
                "mobilarUsuarios",
                JSON.stringify(usuarios)
            );


            // Mostrar mensaje

            mostrarMensajeRegistro(
                "✅ Cuenta creada correctamente. Ahora podés iniciar sesión.",
                "success"
            );


            // Limpiar formulario

            formularioRegistro.reset();


            // Completar automáticamente el email del login

            loginEmail.value = email;


            // Ocultar registro después de unos segundos

            setTimeout(function () {

                formularioRegistro.classList.add("d-none");

                mostrarRegistro.textContent =
                    "Crear cuenta";

            }, 2000);

        }
    );

}



// FUNCIÓN PARA MOSTRAR MENSAJES DE REGISTRO


function mostrarMensajeRegistro(mensaje, tipo) {

    mensajeRegistro.textContent = mensaje;

    mensajeRegistro.className =
        "alert alert-" + tipo + " mt-3";

}



// LOGIN


if (formularioLogin) {

    formularioLogin.addEventListener(
        "submit",
        function (evento) {


            // Limpiar errores

            errorLoginEmail.textContent = "";
            errorLoginPassword.textContent = "";


            const email =
                loginEmail.value.trim().toLowerCase();

            const password =
                loginPassword.value;


            let formularioValido = true;


            // Validar email

            const formatoEmail =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!formatoEmail.test(email)) {

                errorLoginEmail.textContent =
                    "Ingresá un correo electrónico válido.";

                formularioValido = false;
            }


            // Validar contraseña

            if (password.length === 0) {

                errorLoginPassword.textContent =
                    "Ingresá tu contraseña.";

                formularioValido = false;
            }


            if (!formularioValido) {

                return;
            }


            // Buscar usuario

            const usuarioEncontrado =
                usuarios.find(function (usuario) {

                    return (
                        usuario.email === email &&
                        usuario.password === password
                    );

                });


            // Usuario incorrecto

            if (!usuarioEncontrado) {

                mensajeLogin.textContent =
                    "❌ El correo o la contraseña son incorrectos.";

                mensajeLogin.className =
                    "alert alert-danger mt-4";

                return;
            }


            // LOGIN CORRECTO
           
            const sesion = {

                nombre: usuarioEncontrado.nombre,

                email: usuarioEncontrado.email

            };


            localStorage.setItem(
                "mobilarSesion",
                JSON.stringify(sesion)
            );

            cargarCarritoUsuario();


            // Guardar email si marcó "Recordarme"

            if (recordarUsuario.checked) {

                localStorage.setItem(
                    "mobilarEmailRecordado",
                    email
                );

            } else {

                localStorage.removeItem(
                    "mobilarEmailRecordado"
                );

            }


            mensajeLogin.textContent =
                "✅ ¡Bienvenido/a " +
                usuarioEncontrado.nombre +
                "!";

            mensajeLogin.className =
                "alert alert-success mt-4";


            // Limpiar contraseña

            loginPassword.value = "";


            // Redirigir al inicio

            setTimeout(function () {

                window.location.href =
                    "index.html";

            }, 1200);

        }
    );

}



// CARGAR EMAIL RECORDADO


if (loginEmail) {

    const emailRecordado =
        localStorage.getItem(
            "mobilarEmailRecordado"
        );


    if (emailRecordado) {

        loginEmail.value =
            emailRecordado;

        recordarUsuario.checked =
            true;

    }

}

 
// SISTEMA DE USUARIO / SESIÓN MOBILAR
 


// ELEMENTO DEL NAVBAR

const zonaUsuario =
    document.getElementById("zona-usuario");


// ACTUALIZAR USUARIO

function actualizarUsuario() {

    // Si estamos en login.html no existe este elemento
    if (!zonaUsuario) {
        return;
    }


    // Buscar sesión activa

    const sesion =
        JSON.parse(
            localStorage.getItem("mobilarSesion")
        );


     
    // NO HAY SESIÓN
     

    if (!sesion) {

        zonaUsuario.innerHTML = `

            <a
                href="login.html"
                class="btn btn-outline-light"
            >
                👤 Iniciar sesión
            </a>

        `;

        return;
    }


     
    // HAY SESIÓN
     

    zonaUsuario.innerHTML = `

        <div class="dropdown">

            <button
                class="btn btn-outline-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >

                👋 Hola, ${sesion.nombre}

            </button>


           <ul class="dropdown-menu dropdown-menu-end">

    <li>
        <h6 class="dropdown-header">
            👤 Mi cuenta
        </h6>
    </li>

    <li>
        <div class="px-3 py-2">

            <strong>
                ${sesion.nombre}
            </strong>

            <br>

            <small class="text-secondary">
                ${sesion.email}
            </small>

        </div>
    </li>

    <li>
        <hr class="dropdown-divider">
    </li>

    <li>
        <div class="dropdown-item-text">

            🛒 Productos en carrito:
            <strong id="cantidad-carrito-usuario">
                0
            </strong>

        </div>
    </li>

    <li>
        <hr class="dropdown-divider">
    </li>

    <li>

        <button
            type="button"
            class="dropdown-item text-danger"
            id="cerrar-sesion"
        >
            🚪 Cerrar sesión
        </button>

    </li>

</ul>

        </div>

    `;


    
    // BOTÓN CERRAR SESIÓN
     

    const botonCerrarSesion =
        document.getElementById("cerrar-sesion");


    if (botonCerrarSesion) {

        botonCerrarSesion.addEventListener(
            "click",
            function () {

                // Eliminar solamente la sesión

                localStorage.removeItem(
                    "mobilarSesion"
                );


                // Actualizar navbar

                actualizarUsuario();


                // Avisar al usuario

                alert(
                    "Sesión cerrada correctamente."
                );

            }
        );

    }

}


// EJECUTAR AL CARGAR LA PÁGINA

actualizarUsuario();
cargarCarritoUsuario();



// SISTEMA DE MI CUENTA



// Elementos de la página cuenta.html

const saludoUsuario =
    document.getElementById("saludo-usuario");

const cuentaNombre =
    document.getElementById("cuenta-nombre");

const cuentaEmail =
    document.getElementById("cuenta-email");

const cuentaCantidadCarrito =
    document.getElementById(
        "cuenta-cantidad-carrito"
    );

const cuentaTotalCarrito =
    document.getElementById(
        "cuenta-total-carrito"
    );

const cuentaCerrarSesion =
    document.getElementById(
        "cuenta-cerrar-sesion"
    );

const mensajeCuenta =
    document.getElementById(
        "mensaje-cuenta"
    );



// CARGAR DATOS DE LA CUENTA


function cargarDatosCuenta() {

    // Buscar sesión actual

    const sesion =
        JSON.parse(
            localStorage.getItem(
                "mobilarSesion"
            )
        );


    // Si no hay sesión

    if (!sesion) {

        window.location.href =
            "login.html";

        return;
    }


    // Mostrar nombre

    if (saludoUsuario) {

        saludoUsuario.textContent =
            "Hola, " +
            sesion.nombre +
            ". ¡Bienvenido/a a Mobilar!";
    }


    // Mostrar datos

    if (cuentaNombre) {

        cuentaNombre.textContent =
            sesion.nombre;
    }


    if (cuentaEmail) {

        cuentaEmail.textContent =
            sesion.email;
    }


    // Obtener carrito del usuario

    const claveCarrito =
        "mobilarCarrito_" +
        sesion.email;


    const carritoUsuario =
        JSON.parse(
            localStorage.getItem(
                claveCarrito
            )
        ) || [];


    // Calcular cantidad

    let cantidadTotal = 0;

    let precioTotal = 0;


    carritoUsuario.forEach(
        function (producto) {

            cantidadTotal +=
                producto.cantidad;

            precioTotal +=
                producto.precio *
                producto.cantidad;
        }
    );


    // Mostrar cantidad

    if (cuentaCantidadCarrito) {

        cuentaCantidadCarrito.textContent =
            cantidadTotal;
    }


    // Mostrar total

    if (cuentaTotalCarrito) {

        cuentaTotalCarrito.textContent =
            "$" +
            precioTotal.toLocaleString(
                "es-AR"
            );
    }
}



// CERRAR SESIÓN DESDE MI CUENTA


if (cuentaCerrarSesion) {

    cuentaCerrarSesion.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "mobilarSesion"
            );


            if (mensajeCuenta) {

                mensajeCuenta.textContent =
                    "✅ Sesión cerrada correctamente.";

                mensajeCuenta.className =
                    "alert alert-success mt-4";
            }


            setTimeout(
                function () {

                    window.location.href =
                        "index.html";

                },
                800
            );

        }
    );
}



// EJECUTAR SISTEMA DE MI CUENTA


if (saludoUsuario) {

    cargarDatosCuenta();
}

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-contacto');
    const mensajeExito = document.getElementById('mensaje-exito');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // Ejemplo básico de validación (aquí iría tu lógica de validación)
        // ...

        // Muestra el mensaje de éxito quitando la clase 'd-none' de Bootstrap
        mensajeExito.classList.remove('d-none');

        // Opcional: Reinicia los campos del formulario
        formulario.reset();
    });
});