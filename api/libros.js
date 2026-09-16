function transformarLibro(libro) {
  return {
    id: libro.id,
    titulo: libro.titulo,
    autor: libro.autor,
    categoria: libro.categoria,
    etiqueta: libro.etiqueta,
    saga: libro.saga,
    imagen: libro.imagen,
    valoracion: Number(libro.valoracion),
    opinion: libro.opinion,
    puntosDestacados: libro.puntos_destacados || [],
    contieneSpoilers: libro.contiene_spoilers,
    descripcion: libro.descripcion,
  };
}

export default async function handler(peticion, respuesta) {
  if (peticion.method !== "GET") {
    respuesta.setHeader("Allow", "GET");
    return respuesta.status(405).json({ error: "Método no permitido." });
  }

  const urlSupabase = process.env.SUPABASE_URL;
  const clavePrivada = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!urlSupabase || !clavePrivada) {
    return respuesta.status(500).json({ error: "Falta configurar Supabase." });
  }

  try {
    const consulta = new URL(`${urlSupabase}/rest/v1/libros`);
    consulta.searchParams.set("select", "*");
    consulta.searchParams.set("order", "id.asc");

    const respuestaSupabase = await fetch(consulta, {
      headers: {
        apikey: clavePrivada,
        Authorization: `Bearer ${clavePrivada}`,
      },
    });

    if (!respuestaSupabase.ok) {
      throw new Error(await respuestaSupabase.text());
    }

    const libros = await respuestaSupabase.json();
    return respuesta.status(200).json(libros.map(transformarLibro));
  } catch (error) {
    console.error("No se pudo cargar el catálogo:", error);
    return respuesta.status(500).json({ error: "No se pudo cargar el catálogo." });
  }
}
