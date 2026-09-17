const formularioLibro = document.querySelector("#form-libro");
const listaAdmin = document.querySelector("#lista-admin");
const estadoAdmin = document.querySelector("#estado-admin");
const botonGuardar = formularioLibro.querySelector('button[type="submit"]');
const botonCancelar = document.querySelector("#cancelar-edicion");
const selectorCategoria = document.querySelector("#categoria-libro");
const campoCategoriaPersonalizada = document.querySelector(
  "#campo-categoria-personalizada",
);
const categoriaPersonalizada = document.querySelector(
  "#categoria-personalizada",
);

let clienteSupabase;
let librosAdmin = [];

function mostrarEstado(mensaje, tipo = "informacion") {
  estadoAdmin.textContent = mensaje;
  estadoAdmin.className = `estado-formulario ${tipo}`;
}

function escaparHTML(texto = "") {
  return texto
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function rutaImagenAdmin(ruta) {
  const esRutaCompleta =
    ruta.startsWith("http://") ||
    ruta.startsWith("https://") ||
    ruta.startsWith("/") ||
    ruta.startsWith("data:") ||
    ruta.startsWith("blob:");

  return esRutaCompleta ? ruta : `../${ruta.replace(/^\.\//, "")}`;
}

function mostrarCategoriaPersonalizada(mostrar) {
  campoCategoriaPersonalizada.hidden = !mostrar;
  categoriaPersonalizada.required = mostrar;

  if (!mostrar) {
    categoriaPersonalizada.value = "";
  }
}

function crearIdentificadorCategoria(nombre) {
  return nombre
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function iniciarPanel() {
  const respuesta = await fetch("/api/configuracion-supabase");
  const configuracion = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(configuracion.error);
  }

  clienteSupabase = window.supabase.createClient(
    configuracion.url,
    configuracion.clavePublica,
  );

  const { data: sesion } = await clienteSupabase.auth.getSession();

  if (!sesion.session) {
    window.location.replace("login.html");
    return;
  }

  const { data: permiso } = await clienteSupabase
    .from("administradores")
    .select("user_id")
    .eq("user_id", sesion.session.user.id)
    .maybeSingle();

  if (!permiso) {
    await clienteSupabase.auth.signOut();
    window.location.replace("login.html");
    return;
  }

  await cargarLibrosAdmin();
}

async function cargarLibrosAdmin() {
  const { data, error } = await clienteSupabase
    .from("libros")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error("No se ha podido cargar el catálogo.");
  }

  librosAdmin = data;
  mostrarListaAdmin();
}

function mostrarListaAdmin() {
  document.querySelector("#total-admin").textContent =
    `${librosAdmin.length} ${librosAdmin.length === 1 ? "libro" : "libros"}`;

  listaAdmin.innerHTML = librosAdmin
    .map(
      (libro) => `
        <article class="libro-admin">
          <img src="${escaparHTML(rutaImagenAdmin(libro.imagen))}" alt="" />
          <div>
            <h3>${escaparHTML(libro.titulo)}</h3>
            <p>${escaparHTML(libro.autor)}</p>
          </div>
          <div class="libro-admin-acciones">
            <button type="button" data-editar="${libro.id}">Editar</button>
            <button class="peligro" type="button" data-eliminar="${libro.id}">
              Eliminar
            </button>
          </div>
        </article>
      `,
    )
    .join("");
}

function etiquetaCategoria(categoria) {
  const etiquetas = {
    fantasia: "Fantasía",
    juveniles: "Juvenil",
    distopia: "Distopía",
    romance: "Romance",
  };

  return etiquetas[categoria] || categoria;
}

function obtenerDatosFormulario() {
  const esCategoriaNueva = selectorCategoria.value === "otra";
  const etiqueta = esCategoriaNueva
    ? categoriaPersonalizada.value.trim()
    : etiquetaCategoria(selectorCategoria.value);
  const categoria = esCategoriaNueva
    ? crearIdentificadorCategoria(etiqueta)
    : selectorCategoria.value;

  if (!categoria || !etiqueta) {
    throw new Error("Escribe el nombre de la nueva categoría.");
  }

  return {
    titulo: document.querySelector("#titulo-libro").value.trim(),
    autor: document.querySelector("#autor-libro").value.trim(),
    categoria,
    etiqueta,
    saga: document.querySelector("#saga-libro").value.trim() || "Independiente",
    descripcion: document.querySelector("#descripcion-libro").value.trim(),
    opinion: document.querySelector("#opinion-libro").value.trim(),
    valoracion: Number(document.querySelector("#valoracion-libro").value),
    puntos_destacados: document
      .querySelector("#destacados-libro")
      .value.split(",")
      .map((punto) => punto.trim())
      .filter(Boolean),
    contiene_spoilers: document.querySelector("#spoilers-libro").checked,
  };
}

async function subirPortada() {
  const archivo = document.querySelector("#portada-libro").files[0];

  if (!archivo) {
    return document.querySelector("#imagen-actual").value;
  }

  if (!archivo.type.startsWith("image/")) {
    throw new Error("La portada debe ser una imagen.");
  }

  if (archivo.size > 5 * 1024 * 1024) {
    throw new Error("La portada no puede superar los 5 MB.");
  }

  const extension = archivo.name.split(".").pop().toLowerCase();
  const nombre = `${crypto.randomUUID()}.${extension}`;
  const ruta = `libros/${nombre}`;

  const { error } = await clienteSupabase.storage
    .from("portadas")
    .upload(ruta, archivo, { cacheControl: "3600", upsert: false });

  if (error) {
    throw new Error("No se ha podido subir la portada.");
  }

  return clienteSupabase.storage.from("portadas").getPublicUrl(ruta).data
    .publicUrl;
}

async function guardarLibro() {
  const id = document.querySelector("#libro-id").value;
  const datos = obtenerDatosFormulario();
  datos.imagen = await subirPortada();

  if (!datos.imagen) {
    throw new Error("Selecciona una portada para el libro.");
  }

  const consulta = id
    ? clienteSupabase.from("libros").update(datos).eq("id", id)
    : clienteSupabase.from("libros").insert(datos);

  const { error } = await consulta;

  if (error) {
    console.error(error);
    throw new Error("No se ha podido guardar el libro.");
  }
}

function editarLibro(id) {
  const libro = librosAdmin.find((elemento) => elemento.id === id);

  document.querySelector("#libro-id").value = libro.id;
  document.querySelector("#titulo-libro").value = libro.titulo;
  document.querySelector("#autor-libro").value = libro.autor;
  const categoriaConocida = [...selectorCategoria.options].some(
    (opcion) => opcion.value === libro.categoria && opcion.value !== "otra",
  );

  selectorCategoria.value = categoriaConocida ? libro.categoria : "otra";
  mostrarCategoriaPersonalizada(!categoriaConocida);

  if (!categoriaConocida) {
    categoriaPersonalizada.value = libro.etiqueta || libro.categoria;
  }

  document.querySelector("#valoracion-libro").value = libro.valoracion;
  document.querySelector("#saga-libro").value = libro.saga;
  document.querySelector("#descripcion-libro").value = libro.descripcion;
  document.querySelector("#opinion-libro").value = libro.opinion;
  document.querySelector("#destacados-libro").value =
    libro.puntos_destacados.join(", ");
  document.querySelector("#spoilers-libro").checked = libro.contiene_spoilers;
  document.querySelector("#imagen-actual").value = libro.imagen;
  document.querySelector("#titulo-formulario").textContent = "Editar libro";
  botonCancelar.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function limpiarFormulario() {
  formularioLibro.reset();
  document.querySelector("#libro-id").value = "";
  document.querySelector("#imagen-actual").value = "";
  document.querySelector("#titulo-formulario").textContent = "Añadir un libro";
  selectorCategoria.value = "fantasia";
  mostrarCategoriaPersonalizada(false);
  botonCancelar.hidden = true;
}

async function eliminarLibro(id) {
  const libro = librosAdmin.find((elemento) => elemento.id === id);
  const confirmar = window.confirm(
    `¿Seguro que quieres eliminar "${libro.titulo}"?`,
  );

  if (!confirmar) {
    return;
  }

  const { error } = await clienteSupabase.from("libros").delete().eq("id", id);

  if (error) {
    throw new Error("No se ha podido eliminar el libro.");
  }

  await cargarLibrosAdmin();
}

formularioLibro.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  botonGuardar.disabled = true;
  mostrarEstado("Guardando el libro…");

  try {
    await guardarLibro();
    limpiarFormulario();
    await cargarLibrosAdmin();
    mostrarEstado("El libro se ha guardado correctamente.", "exito");
  } catch (error) {
    mostrarEstado(error.message, "error");
  } finally {
    botonGuardar.disabled = false;
  }
});

listaAdmin.addEventListener("click", async (evento) => {
  const botonEditar = evento.target.closest("[data-editar]");
  const botonEliminar = evento.target.closest("[data-eliminar]");

  if (botonEditar) {
    editarLibro(Number(botonEditar.dataset.editar));
  }

  if (botonEliminar) {
    try {
      await eliminarLibro(Number(botonEliminar.dataset.eliminar));
    } catch (error) {
      mostrarEstado(error.message, "error");
    }
  }
});

selectorCategoria.addEventListener("change", () => {
  mostrarCategoriaPersonalizada(selectorCategoria.value === "otra");
});

botonCancelar.addEventListener("click", limpiarFormulario);

document.querySelector("#cerrar-sesion").addEventListener("click", async () => {
  await clienteSupabase.auth.signOut();
  window.location.replace("login.html");
});

iniciarPanel().catch((error) => {
  mostrarEstado(error.message, "error");
});
