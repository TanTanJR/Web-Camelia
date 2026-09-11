// ============================================================
// 1. CATÁLOGO DE LIBROS
// Para añadir un libro nuevo, copia uno de estos objetos
// y cambia sus datos.
// ============================================================

const libros = [
  {
    titulo: "Alas de Sangre",
    autor: "Rebecca Yarros",
    categoria: "fantasia",
    etiqueta: "Fantasía",
    imagen: "img/alasdesangrewhite.jpeg",
    valoracion: 5,
    descripcion:
      "Violet Sorrengail es forzada a unirse al brutal Colegio de Guerra de Basgiath para entrenar como jinete de dragón.",
  },
  {
    titulo: "Alas de Hierro",
    autor: "Rebecca Yarros",
    categoria: "fantasia",
    etiqueta: "Fantasía",
    imagen: "img/alasdehierro.jpg",
    valoracion: 5,
    descripcion:
      "Continúan las pruebas de Violet para convertirse en jinete de dragón y su lucha contra los secretos del colegio.",
  },
  {
    titulo: "Alas de Ónix",
    autor: "Rebecca Yarros",
    categoria: "fantasia",
    etiqueta: "Fantasía",
    imagen: "img/alasdeonixwhite.jpg",
    valoracion: 5,
    descripcion:
      "Violet debe defender su nación, buscar alianzas para la guerra y encontrar una cura para la transformación de Xaden.",
  },
  {
    titulo: "Etéreo",
    autor: "Joana Marcús",
    categoria: "juveniles",
    etiqueta: "Juvenil",
    imagen: "img/etereo.jpg",
    valoracion: 3,
    descripcion:
      "Caleb no es un chico corriente. Sus habilidades especiales y una vida complicada lo han llevado a trabajar para gente de moral dudosa.",
  },
  {
    titulo: "Ciudades de Humo",
    autor: "Joana Marcús",
    categoria: "distopia",
    etiqueta: "Distopía",
    imagen: "img/ciudadesdehumo.jpg",
    valoracion: 4,
    descripcion:
      "Alice, una androide, debe aprender a vivir como humana después de escapar de una existencia controlada.",
  },
  {
    titulo: "Ciudades de Ceniza",
    autor: "Joana Marcús",
    categoria: "distopia",
    etiqueta: "Distopía",
    imagen: "img/ciudadesdeceniza.jpg",
    valoracion: 4,
    descripcion:
      "Alice busca venganza tras la destrucción de su ciudad en un mundo de acción, romance, androides y experimentos prohibidos.",
  },
  {
    titulo: "Powerless",
    autor: "Lauren Roberts",
    categoria: "fantasia",
    etiqueta: "Fantasía",
    imagen: "img/Powerless.webp",
    valoracion: 5,
    descripcion:
      "Paedyn finge ser psíquica para sobrevivir en Ilya y acaba participando en las peligrosas Pruebas de la Purga.",
  },
  {
    titulo: "Powerful",
    autor: "Lauren Roberts",
    categoria: "fantasia",
    etiqueta: "Fantasía",
    imagen: "img/powerful.webp",
    valoracion: 4.5,
    descripcion:
      "Adena y Mak afrontan peligrosos desafíos mientras desarrollan una relación marcada por la tensión, el romance y la lealtad.",
  },
  {
    titulo: "Reckless",
    autor: "Lauren Roberts",
    categoria: "fantasia",
    etiqueta: "Fantasía",
    imagen: "img/reckless.webp",
    valoracion: 4,
    descripcion:
      "Paedyn huye después de matar al rey. Kai debe perseguirla, aunque se debate entre la lealtad, el deber y el deseo.",
  },
  {
    titulo: "Fearless",
    autor: "Lauren Roberts",
    categoria: "fantasia",
    etiqueta: "Fantasía",
    imagen: "img/fearless.jpg",
    valoracion: 4,
    descripcion:
      "Paedyn y Kai se enfrentan a decisiones difíciles en una historia sobre el poder, el amor, el destino y la redención.",
  },
  {
    titulo: "Fearful",
    autor: "Lauren Roberts",
    categoria: "fantasia",
    etiqueta: "Fantasía",
    imagen: "img/fearful.jpg",
    valoracion: 4,
    descripcion:
      "Una decisión trascendental del rey lleva a Mara de vuelta a Ilya para tratar de comprender la mente de Kitt Azer.",
  },
  {
    titulo: "Blind Side",
    autor: "Kandi Steiner",
    categoria: "romance",
    etiqueta: "Romance",
    imagen: "img/blindside.jpg",
    valoracion: 3,
    descripcion:
      "Una coordinadora de relaciones públicas debe lidiar con Clay Johnson después de que una ruptura lo convierta en su mayor dolor de cabeza.",
  },
];

// ============================================================
// 2. ELEMENTOS DE LA PÁGINA
// ============================================================

const listaLibros = document.querySelector("#lista-libros");
const buscador = document.querySelector("#buscador-libros");
const botonLimpiar = document.querySelector("#limpiar-buscador");
const contadorResultados = document.querySelector("#contador-resultados");
const mensajeSinResultados = document.querySelector("#sin-resultados");
const botonesCategoria = document.querySelectorAll("[data-categoria]");

let categoriaActiva = "todas";

// ============================================================
// 3. FUNCIONES
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

          <button
            class="leer-mas"
            type="button"
            aria-expanded="false"
            aria-controls="descripcion-${numero}"
          >
            <span>Leer más</span>
            <span class="flecha" aria-hidden="true">⌄</span>
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

function alternarDescripcion(boton) {
  const idDescripcion = boton.getAttribute("aria-controls");
  const descripcion = document.getElementById(idDescripcion);
  const estaExpandida = descripcion.classList.toggle("expandida");

  boton.setAttribute("aria-expanded", estaExpandida);
  boton.querySelector("span").textContent = estaExpandida
    ? "Leer menos"
    : "Leer más";
}

// ============================================================
// 4. EVENTOS
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
  const botonLeerMas = evento.target.closest(".leer-mas");

  if (botonLeerMas) {
    alternarDescripcion(botonLeerMas);
  }
});

// ============================================================
// 5. INICIO
// ============================================================

document.querySelector("#anio").textContent = new Date().getFullYear();
mostrarLibros();
