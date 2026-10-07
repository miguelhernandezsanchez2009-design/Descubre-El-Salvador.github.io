// Mostrar/ocultar contraseña
const inputClave = document.getElementById("inputClave");
const botonVerClave = document.getElementById("botonVerClave");
botonVerClave.addEventListener("click", () => {
    const oculta = inputClave.type === "password";
    inputClave.type = oculta ? "text" : "password";
    botonVerClave.textContent = oculta ? "Ocultar" : "Ver";
    botonVerClave.setAttribute("aria-label", oculta ? "Ocultar contraseña" : "Mostrar contraseña");
});

const inputClave2 = document.getElementById("inputClave2");
const botonVerClave2 = document.getElementById("botonVerClave2");
botonVerClave2.addEventListener("click", () => {
    const oculta = inputClave2.type === "password";
    inputClave2.type = oculta ? "text" : "password";
    botonVerClave2.textContent = oculta ? "Ocultar" : "Ver";
    botonVerClave2.setAttribute("aria-label", oculta ? "Ocultar contraseña" : "Mostrar contraseña");
});

const formLogin = document.getElementById("formLogin");
const mensajeError = document.getElementById("mensajeError");

// Coincidencia de contraseñas 
let contraseñasCoinciden = true;

function validarContraseñas() {
    contraseñasCoinciden = inputClave.value === inputClave2.value;

    if (!contraseñasCoinciden) {
        mensajeError.textContent = "Las contraseñas no coinciden";
        inputClave2.classList.add("campo-invalido");
    } else {
        mensajeError.textContent = "";
        inputClave2.classList.remove("campo-invalido");
    }
}

inputClave.addEventListener("input", validarContraseñas);
inputClave2.addEventListener("input", validarContraseñas);

// Validación y envío del formulario 
formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();
    validarContraseñas();

    // Campos vacíos, correo inválido, etc
    if (!formLogin.checkValidity()) {
        formLogin.reportValidity();
        return;
    }

    // Contraseñas distintas  se queda en el mensaje rojo, sin avanzar
    if (!contraseñasCoinciden) {
        inputClave2.focus();
        return;
    }

    const nombre = document.querySelector('input[name="nombre"]').value;
    const correo = document.querySelector('input[name="correo"]').value.trim().toLowerCase();
    const clave = inputClave.value;

    // Obtener lista de usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem("usuariosRegistrados") || "[]");

    // Evitar registrar el mismo correo dos veces
    const yaExiste = usuarios.some((u) => u.correo === correo);
    if (yaExiste) {
        mensajeError.textContent = "Ya existe una cuenta registrada con ese correo";
        document.querySelector('input[name="correo"]').classList.add("campo-invalido");
        return;
    }

    // Guardar la nueva cuenta
    usuarios.push({ nombre, correo, clave });
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));

    // Iniciar sesión automáticamente tras registrarse
    localStorage.setItem("sesionActiva", "true");
    localStorage.setItem("usuarioNombre", nombre);

    alert("Registro exitoso. ¡Bienvenido/a, " + nombre + "!");
    window.location.href = "../index.html";
});