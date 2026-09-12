// ELEMENTOS DEL FORMULARIO
const formulario = document.querySelector("#form-recomendacion");
const botonEnviar = formulario.querySelector('button[type="submit"]');
const estadoFormulario = document.querySelector("#estado-formulario");

const textoBotonInicial = botonEnviar.textContent;
const formularioAbiertoEn = Date.now();

function mostrarEstado(mensaje, tipo) {
  estadoFormulario.textContent = mensaje;
  estadoFormulario.className = `estado-formulario ${tipo}`;
}

function obtenerDatosFormulario() {
  return {
    nombre: document.querySelector("#nombre-recom").value.trim(),
    email: document.querySelector("#email-recom").value.trim(),
    titulo: document.querySelector("#titulo-recom").value.trim(),
    autor: document.querySelector("#autor-recom").value.trim(),
    comentario: document.querySelector("#comentario-recom").value.trim(),
    consentimiento: document.querySelector("#consentimiento-recom").checked,
    web: document.querySelector("#web-recom").value,
    tiempoFormulario: Date.now() - formularioAbiertoEn,
  };
}

async function enviarRecomendacion(datos) {
  const respuesta = await fetch("/api/recomendaciones", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(resultado.error || "No se pudo enviar la recomendación.");
  }
}

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  if (!formulario.reportValidity()) {
    return;
  }

  botonEnviar.disabled = true;
  botonEnviar.textContent = "Enviando…";
  mostrarEstado("Enviando tu recomendación…", "informacion");

  try {
    await enviarRecomendacion(obtenerDatosFormulario());

    formulario.reset();
    mostrarEstado(
      "¡Gracias! Tu recomendación se ha enviado correctamente.",
      "exito",
    );
  } catch (error) {
    mostrarEstado(error.message, "error");
  } finally {
    botonEnviar.disabled = false;
    botonEnviar.textContent = textoBotonInicial;
  }
});
