// Mostrar/ocultar contraseña
const inputClave = document.getElementById("inputClave");
const botonVerClave = document.getElementById("botonVerClave");
botonVerClave.addEventListener("click", () => {
    const oculta = inputClave.type === "password";
    inputClave.type = oculta ? "text" : "password";
    botonVerClave.textContent = oculta ? "Ocultar" : "Ver";
    botonVerClave.setAttribute("aria-label", oculta ? "Ocultar contraseña" : "Mostrar contraseña");
});

// Validación e inicio de sesión 
const formLogin = document.getElementById("formLogin");
const mensajeErrorLogin = document.getElementById("mensajeErrorLogin");
const inputCorreo = document.querySelector('input[name="correo"]');

[inputCorreo, inputClave].forEach((campo) => {
    campo.addEventListener("input", () => {
        campo.classList.remove("campo-invalido");
        if (mensajeErrorLogin) mensajeErrorLogin.textContent = "";
    });
});

formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!formLogin.checkValidity()) {
        formLogin.reportValidity();
        return;
    }

    const correo = document.querySelector('input[name="correo"]').value.trim().toLowerCase();
    const clave = inputClave.value;

    // Buscar la cuenta entre los usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");
    const usuario = usuarios.find((u) => u.correo === correo);

    if (!usuario) {
        // No existe ninguna cuenta con ese correo
        if (mensajeErrorLogin) {
            mensajeErrorLogin.textContent = "No existe una cuenta registrada con ese correo. Regístrate primero.";
        } else {
            alert("No existe una cuenta registrada con ese correo. Regístrate primero.");
        }
        document.querySelector('input[name="correo"]').classList.add("campo-invalido");
        return;
    }

    if (usuario.clave !== clave) {
        // Correo correcto pero contraseña incorrecta
        if (mensajeErrorLogin) {
            mensajeErrorLogin.textContent = "Contraseña incorrecta";
        } else {
            alert("Contraseña incorrecta");
        }
        inputClave.classList.add("campo-invalido");
        return;
    }

    // Credenciales correctas = iniciar sesión
    if (mensajeErrorLogin) mensajeErrorLogin.textContent = "";
    localStorage.setItem("sesionActiva", "true");
    localStorage.setItem("usuarioNombre", usuario.nombre);

    window.location.href = "../index.html";
});