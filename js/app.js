//*variables de los campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

//*Otros
const formulario = document.querySelector("form");
const mensajeError = document.createElement("p");
const er =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const btnEnviar = document.querySelector("#enviar");
const btnResetear = document.querySelector("#resetBtn");

eventListener();
function eventListener() {
    document.addEventListener("DOMContentLoaded", iniciarApp());
    email.addEventListener("input", validarFormulario);
    asunto.addEventListener("input", validarFormulario);
    mensaje.addEventListener("input", validarFormulario);

    //*Enviar Formulario
    btnEnviar.addEventListener("click", enviarForm);
    btnResetear.addEventListener("click", resetFormulario);
}

function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(e) {
    if (e.target.value.length > 0) {
        e.target.classList.remove("border", "border-red-500");
        e.target.classList.add("border", "border-green-500");

        //*Si entra aquí es porque el usuario a tenido que escribir algo.
        if (e.target.type === "email") {
            if (er.test(e.target.value)) {
                const error = document.querySelector("p.error");
                //*si la clase .error existe, se elimina
                if (error) {
                    error.remove();
                }
            } else {
                e.target.classList.remove("border", "border-green-500");
                e.target.classList.add("border", "border-red-500");
                mostrarError("email no valido");
            }
        }
    } else {
        e.target.classList.remove("border", "border-green-500");
        e.target.classList.add("border", "border-red-500");
        mostrarError("Todos los campos son obligatorios");
    }

    if (
        er.test(e.target.value) &&
        asunto.value !== "" &&
        mensaje.value !== ""
    ) {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
    } else {
        btnEnviar.disabled = true;
        btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
    }
}

function mostrarError(mensaje) {
    mensajeError.textContent = mensaje;
    mensajeError.classList.add(
        "border",
        "border-red-500",
        "background-red-100",
        "text-red-500",
        "p-2",
        "mt-5",
        "text-center",
        "error"
    );
    const errores = document.querySelectorAll(".error");
    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}

function enviarForm(e) {
    e.preventDefault();
    //*Mostrar El Spinner
    const spinner = document.querySelector("#spinner");
    spinner.style.display = "flex";

    setTimeout(() => {
        spinner.style.display = "none";

        const parrafo = document.createElement("P");
        parrafo.textContent = "Se envió correctamente";
        parrafo.classList.add(
            "text-center",
            "my-10",
            "p-2",
            "bg-green-500",
            "text-white",
            "font-bold",
            "uppercase"
        );
        formulario.insertBefore(parrafo, spinner);
        setTimeout(() => {
            parrafo.remove();
            formulario.reset();
        }, 3000);
    }, 3000);
}

function resetFormulario(e) {
    e.preventDefault();
    formulario.reset();
    iniciarApp();
}
