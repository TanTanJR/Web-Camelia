// 1. ELEMENTOS DE LA PÁGINA
// ============================================================

const listaLibros = document.querySelector("#lista-libros");
const buscador = document.querySelector("#buscador-libros");
const botonLimpiar = document.querySelector("#limpiar-buscador");
const contadorResultados = document.querySelector("#contador-resultados");
const mensajeSinResultados = document.querySelector("#sin-resultados");
const botonesCategoria = document.querySelectorAll("[data-categoria]");
const paginacion = document.querySelector("#paginacion");
const modalLibro = document.querySelector("#modal-libro");
const botonCerrarModal = document.querySelector("#cerrar-modal");

const LIBROS_POR_PAGINA = 8;

let categoriaActiva = "todas";
let libros = [...librosBase];
let paginaActual = 1;

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

function crearBotonPagina(numeroPagina) {
  const esPaginaActual = numeroPagina === paginaActual;

  return `
    <button
      type="button"
      data-pagina="${numeroPagina}"
      ${esPaginaActual ? 'class="activa" aria-current="page"' : ""}
      aria-label="Ir a la página ${numeroPagina}"
    >
      ${numeroPagina}
    </button>
  `;
}

function obtenerPaginasMostradas(totalPaginas) {
  if (totalPaginas <= 7) {
    return Array.from({ length: totalPaginas }, (_, indice) => indice + 1);
  }

  const paginas = new Set([
    1,
    totalPaginas,
    paginaActual - 1,
    paginaActual,
    paginaActual + 1,
  ]);

  const paginasValidas = [...paginas]
    .filter((pagina) => pagina >= 1 && pagina <= totalPaginas)
    .sort((paginaA, paginaB) => paginaA - paginaB);

  return paginasValidas.flatMap((pagina, indice) => {
    const paginaAnterior = paginasValidas[indice - 1];
    const haySalto = paginaAnterior && pagina - paginaAnterior > 1;

    return haySalto ? ["…", pagina] : [pagina];
  });
}

function mostrarPaginacion(totalPaginas) {
  paginacion.hidden = totalPaginas <= 1;

  if (totalPaginas <= 1) {
    paginacion.innerHTML = "";
    return;
  }

  const botonesNumerados = obtenerPaginasMostradas(totalPaginas)
    .map((pagina) =>
      pagina === "…"
        ? '<span class="paginacion-separador" aria-hidden="true">…</span>'
        : crearBotonPagina(pagina),
    )
    .join("");

  paginacion.innerHTML = `
    <button
      type="button"
      class="paginacion-anterior"
      data-pagina="${paginaActual - 1}"
      ${paginaActual === 1 ? "disabled" : ""}
    >
      Anterior
    </button>

    <div class="paginacion-numeros">
      ${botonesNumerados}
    </div>

    <button
      type="button"
      class="paginacion-siguiente"
      data-pagina="${paginaActual + 1}"
      ${paginaActual === totalPaginas ? "disabled" : ""}
    >
      Siguiente
    </button>
  `;
}

function mostrarLibros() {
  const textoBuscado = normalizarTexto(buscador.value.trim());

  const librosVisibles = libros.filter((libro) =>
    libroCoincideConFiltros(libro, textoBuscado),
  );

  const totalPaginas = Math.ceil(librosVisibles.length / LIBROS_POR_PAGINA);

  if (paginaActual > totalPaginas) {
    paginaActual = Math.max(totalPaginas, 1);
  }

  const primerLibro = (paginaActual - 1) * LIBROS_POR_PAGINA;
  const librosDeLaPagina = librosVisibles.slice(
    primerLibro,
    primerLibro + LIBROS_POR_PAGINA,
  );

  listaLibros.innerHTML = librosDeLaPagina
    .map((libro) => crearTarjeta(libro, libros.indexOf(libro)))
    .join("");

  const palabraLibro = librosVisibles.length === 1 ? "libro" : "libros";
  contadorResultados.textContent = `${librosVisibles.length} ${palabraLibro}`;

  mensajeSinResultados.hidden = librosVisibles.length !== 0;
  botonLimpiar.classList.toggle("visible", buscador.value.length > 0);
  mostrarPaginacion(totalPaginas);
}

function cambiarCategoria(botonPulsado) {
  categoriaActiva = botonPulsado.dataset.categoria;
  paginaActual = 1;

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

buscador.addEventListener("input", () => {
  paginaActual = 1;
  mostrarLibros();
});

botonLimpiar.addEventListener("click", () => {
  buscador.value = "";
  paginaActual = 1;
  buscador.focus();
  mostrarLibros();
});

paginacion.addEventListener("click", (evento) => {
  const botonPagina = evento.target.closest("[data-pagina]");

  if (!botonPagina || botonPagina.disabled) {
    return;
  }

  paginaActual = Number(botonPagina.dataset.pagina);
  mostrarLibros();
  document.querySelector("#titulo-catalogo").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
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
