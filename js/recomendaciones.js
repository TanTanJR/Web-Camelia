// Elementos de la página
const formulario = document.querySelector("#form-recomendacion");
const listaRecomendaciones = document.querySelector("#lista-recomendaciones");
const mensajeListaVacia = document.querySelector("#lista-vacia");
const contadorRecomendaciones = document.querySelector(
  "#total-recomendaciones",
);

const CLAVE_ALMACENAMIENTO = "camelia-recomendaciones";

// Recupera las recomendaciones guardadas en el navegador.
function cargarRecomendaciones() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_ALMACENAMIENTO)) || [];
  } catch {
    return [];
  }
}

let recomendaciones = cargarRecomendaciones();

// Evita que un texto introducido por el usuario se interprete como HTML.
function escaparHTML(texto) {
  const elementoTemporal = document.createElement("div");
  elementoTemporal.textContent = texto;
  return elementoTemporal.innerHTML;
}

function guardarRecomendaciones() {
  const datosEnTexto = JSON.stringify(recomendaciones);
  localStorage.setItem(CLAVE_ALMACENAMIENTO, datosEnTexto);
}

function crearRecomendacionHTML(recomendacion) {
  const tituloSeguro = escaparHTML(recomendacion.titulo);
  const autorSeguro = escaparHTML(recomendacion.autor);

  return `
    <li class="recomendacion-item">
      <span>
        <strong>${tituloSeguro}</strong>
        <small>${autorSeguro}</small>
      </span>

      <button
        type="button"
        data-id="${recomendacion.id}"
        aria-label="Eliminar ${tituloSeguro}"
      >
        Eliminar
      </button>
    </li>
  `;
}

function mostrarRecomendaciones() {
  listaRecomendaciones.innerHTML = recomendaciones
    .map(crearRecomendacionHTML)
    .join("");

  mensajeListaVacia.hidden = recomendaciones.length > 0;

  const palabraLibro = recomendaciones.length === 1 ? "libro" : "libros";
  contadorRecomendaciones.textContent = `${recomendaciones.length} ${palabraLibro}`;
}

function añadirRecomendacion() {
  const campoTitulo = document.querySelector("#titulo-recom");
  const campoAutor = document.querySelector("#autor-recom");

  const titulo = campoTitulo.value.trim();
  const autor = campoAutor.value.trim();

  if (!titulo || !autor) {
    return;
  }

  const nuevaRecomendacion = {
    id: crypto.randomUUID(),
    titulo: titulo,
    autor: autor,
  };

  recomendaciones.unshift(nuevaRecomendacion);
  guardarRecomendaciones();
  mostrarRecomendaciones();

  formulario.reset();
  campoTitulo.focus();
}

function eliminarRecomendacion(id) {
  recomendaciones = recomendaciones.filter(
    (recomendacion) => recomendacion.id !== id,
  );

  guardarRecomendaciones();
  mostrarRecomendaciones();
}

// Eventos
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  añadirRecomendacion();
});

listaRecomendaciones.addEventListener("click", (evento) => {
  const botonEliminar = evento.target.closest("[data-id]");

  if (botonEliminar) {
    eliminarRecomendacion(botonEliminar.dataset.id);
  }
});

// Muestra la lista cuando se abre la página.
mostrarRecomendaciones();
