
 


 
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


 
// USUARIOS GUARDADOS
 

let usuarios =
    JSON.parse(
        localStorage.getItem("mobilarUsuarios")
    ) || [];


 
// MOSTRAR / OCULTAR REGISTRO
 

mostrarRegistro.addEventListener("click", function () {

    formularioRegistro.classList.toggle("d-none");

    if (formularioRegistro.classList.contains("d-none")) {

        mostrarRegistro.textContent =
            "Crear cuenta";

    } else {

        mostrarRegistro.textContent =
            "Ocultar registro";

        registroNombre.focus();
    }

});


 
// REGISTRO
 

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


         
        // VALIDAR NOMBRE
         

        if (nombre.length < 3) {

            mostrarMensajeRegistro(
                "El nombre debe tener al menos 3 caracteres.",
                "danger"
            );

            return;
        }


         
        // VALIDAR EMAIL
         

        const formatoEmail =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formatoEmail.test(email)) {

            mostrarMensajeRegistro(
                "Ingresá un correo electrónico válido.",
                "danger"
            );

            return;
        }


         
        // VALIDAR CONTRASEÑA
         

        if (password.length < 6) {

            mostrarMensajeRegistro(
                "La contraseña debe tener al menos 6 caracteres.",
                "danger"
            );

            return;
        }


         
        // COMPROBAR USUARIO
         

        const usuarioExistente =
            usuarios.find(function (usuario) {

                return usuario.email === email;

            });


        if (usuarioExistente) {

            mostrarMensajeRegistro(
                "Ya existe una cuenta con ese correo.",
                "danger"
            );

            return;
        }


         
        // CREAR USUARIO
         

        const nuevoUsuario = {

            nombre: nombre,
            email: email,
            password: password

        };


        usuarios.push(nuevoUsuario);


        // Guardar en localStorage

        localStorage.setItem(
            "mobilarUsuarios",
            JSON.stringify(usuarios)
        );


         
        // MOSTRAR ÉXITO
         

        mostrarMensajeRegistro(
            "✅ Cuenta creada correctamente. Ahora podés iniciar sesión.",
            "success"
        );


        // Colocar email automáticamente
        // en el formulario de login

        loginEmail.value = email;


        // Limpiar registro

        registroNombre.value = "";
        registroEmail.value = "";
        registroPassword.value = "";


        // Ocultar registro después de 2 segundos

        setTimeout(function () {

            formularioRegistro.classList.add("d-none");

            mostrarRegistro.textContent =
                "Crear cuenta";

        }, 2000);

    }
);


 
// MENSAJE DE REGISTRO


function mostrarMensajeRegistro(
    mensaje,
    tipo
) {

    mensajeRegistro.textContent =
        mensaje;

    mensajeRegistro.className =
        "alert alert-" + tipo + " mt-3";

}


 
// INICIAR SESIÓN
 

formularioLogin.addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();


        // Limpiar mensajes

        errorLoginEmail.textContent = "";
        errorLoginPassword.textContent = "";

        mensajeLogin.className =
            "alert d-none mt-4";


        const email =
            loginEmail.value.trim().toLowerCase();

        const password =
            loginPassword.value;


         
        // VALIDAR EMAIL
         

        const formatoEmail =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!formatoEmail.test(email)) {

            errorLoginEmail.textContent =
                "Ingresá un correo electrónico válido.";

            return;
        }


         
        // VALIDAR CONTRASEÑA
         

        if (password.length === 0) {

            errorLoginPassword.textContent =
                "Ingresá tu contraseña.";

            return;
        }


         
        // BUSCAR USUARIO
         

        const usuarioEncontrado =
            usuarios.find(function (usuario) {

                return (
                    usuario.email === email &&
                    usuario.password === password
                );

            });


         
        // USUARIO INCORRECTO
         

        if (!usuarioEncontrado) {

            mensajeLogin.textContent =
                "❌ El correo o la contraseña son incorrectos.";

            mensajeLogin.className =
                "alert alert-danger mt-4";

            return;
        }


         
        // CREAR SESIÓN
         

        const sesion = {

            nombre: usuarioEncontrado.nombre,

            email: usuarioEncontrado.email

        };


        localStorage.setItem(
            "mobilarSesion",
            JSON.stringify(sesion)
        );


         
        // RECORDAR EMAIL
         

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


        
        // MENSAJE DE ÉXITO
       

        mensajeLogin.textContent =
            "✅ ¡Bienvenido/a " +
            usuarioEncontrado.nombre +
            "!";

        mensajeLogin.className =
            "alert alert-success mt-4";


 
        // REDIRECCIÓN
        
        setTimeout(function () {

            window.location.href =
                "index.html";

        }, 1000);

    }
);



// CARGAR EMAIL RECORDADO


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




