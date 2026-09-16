// 1. ELEMENTOS DE LA PÁGINA
// ============================================================

const listaLibros = document.querySelector("#lista-libros");
const buscador = document.querySelector("#buscador-libros");
const botonLimpiar = document.querySelector("#limpiar-buscador");
const contadorResultados = document.querySelector("#contador-resultados");
const mensajeSinResultados = document.querySelector("#sin-resultados");
const botonesCategoria = document.querySelectorAll("[data-categoria]");
const modalLibro = document.querySelector("#modal-libro");
const botonCerrarModal = document.querySelector("#cerrar-modal");

let categoriaActiva = "todas";
let libros = [...librosBase];

// ============================================================
// 2. FUNCIONES
// ============================================================

function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function crearEstrellas(valoracion) {
  const porcentaje = (valoracion / 5) * 100;

  return `
    <span
      class="estrellas"
      role="img"
      aria-label="${valoracion} de 5 estrellas"
    >
      <span aria-hidden="true">★★★★★</span>
      <span
        class="estrellas-relleno"
        style="width: ${porcentaje}%"
        aria-hidden="true"
      >
        ★★★★★
      </span>
    </span>
  `;
}

function crearTarjeta(libro, numero) {
  const numeroLectura = String(numero + 1).padStart(2, "0");

  return `
    <article class="libro-contenedor">
      <div class="libro-imagen">
        <img
          src="${libro.imagen}"
          alt="Portada de ${libro.titulo}"
          loading="lazy"
        >
        <span class="categoria">${libro.etiqueta}</span>
      </div>

      <div class="libro-info">
        <div>
          <p class="numero">Lectura ${numeroLectura}</p>
          <h3>${libro.titulo}</h3>
          <p class="autor">${libro.autor}</p>
          <p class="descripcion" id="descripcion-${numero}">
            ${libro.descripcion}
          </p>
        </div>

        <div class="valoracion">
          <div>
            <span class="valoracion-texto">Valoración</span>
            ${crearEstrellas(libro.valoracion)}
          </div>

          <button class="ver-ficha" type="button" data-indice="${numero}">
            Ver reseña
          </button>
        </div>
      </div>
    </article>
  `;
}

function libroCoincideConFiltros(libro, textoBuscado) {
  const coincideCategoria =
    categoriaActiva === "todas" || libro.categoria === categoriaActiva;

  const tituloYAutor = normalizarTexto(`${libro.titulo} ${libro.autor}`);
  const coincideTexto = tituloYAutor.includes(textoBuscado);

  return coincideCategoria && coincideTexto;
}

function mostrarLibros() {
  const textoBuscado = normalizarTexto(buscador.value.trim());

  const librosVisibles = libros.filter((libro) =>
    libroCoincideConFiltros(libro, textoBuscado),
  );

  listaLibros.innerHTML = librosVisibles
    .map((libro) => crearTarjeta(libro, libros.indexOf(libro)))
    .join("");

  const palabraLibro = librosVisibles.length === 1 ? "libro" : "libros";
  contadorResultados.textContent = `${librosVisibles.length} ${palabraLibro}`;

  mensajeSinResultados.hidden = librosVisibles.length !== 0;
  botonLimpiar.classList.toggle("visible", buscador.value.length > 0);
}

function cambiarCategoria(botonPulsado) {
  categoriaActiva = botonPulsado.dataset.categoria;

  botonesCategoria.forEach((boton) => {
    boton.classList.toggle("activo", boton === botonPulsado);
  });

  mostrarLibros();
}

function abrirFichaLibro(indice) {
  const libro = libros[indice];

  const imagenModal = document.querySelector("#modal-imagen");
  imagenModal.src = libro.imagen;
  imagenModal.alt = `Portada de ${libro.titulo}`;

  document.querySelector("#modal-categoria").textContent = libro.etiqueta;
  document.querySelector("#modal-titulo").textContent = libro.titulo;
  document.querySelector("#modal-autor").textContent = libro.autor;
  document.querySelector("#modal-saga").textContent = libro.saga;
  document.querySelector("#modal-valoracion").innerHTML = crearEstrellas(
    libro.valoracion,
  );
  document.querySelector("#modal-descripcion").textContent = libro.descripcion;
  document.querySelector("#modal-opinion").textContent = libro.opinion;

  const listaDestacados = document.querySelector("#modal-destacados");
  listaDestacados.innerHTML = libro.puntosDestacados
    .map((punto) => `<li>${punto}</li>`)
    .join("");

  const avisoSpoilers = document.querySelector("#modal-spoilers");
  avisoSpoilers.textContent = libro.contieneSpoilers
    ? "Contiene spoilers"
    : "Sin spoilers";
  avisoSpoilers.classList.toggle("con-spoilers", libro.contieneSpoilers);

  modalLibro.showModal();
}

function cerrarFichaLibro() {
  modalLibro.close();
}

async function cargarLibros() {
  try {
    const respuesta = await fetch("/api/libros");

    if (!respuesta.ok) {
      throw new Error("No se pudo cargar el catálogo desde la base de datos.");
    }

    const librosGuardados = await respuesta.json();

    if (librosGuardados.length > 0) {
      libros = librosGuardados;
    }
  } catch (error) {
    console.warn(`${error.message} Se utilizará el catálogo local.`);
  }

  mostrarLibros();
}

// ============================================================
// 3. EVENTOS
// ============================================================

botonesCategoria.forEach((boton) => {
  boton.addEventListener("click", () => cambiarCategoria(boton));
});

buscador.addEventListener("input", mostrarLibros);

botonLimpiar.addEventListener("click", () => {
  buscador.value = "";
  buscador.focus();
  mostrarLibros();
});

listaLibros.addEventListener("click", (evento) => {
  const botonVerFicha = evento.target.closest(".ver-ficha");

  if (botonVerFicha) {
    abrirFichaLibro(Number(botonVerFicha.dataset.indice));
  }
});

botonCerrarModal.addEventListener("click", cerrarFichaLibro);

modalLibro.addEventListener("click", (evento) => {
  if (evento.target === modalLibro) {
    cerrarFichaLibro();
  }
});

// ============================================================
// 4. INICIO
// ============================================================

document.querySelector("#anio").textContent = new Date().getFullYear();
cargarLibros();
