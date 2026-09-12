const LIMITES = {
  nombre: 80,
  email: 254,
  titulo: 100,
  autor: 100,
  comentario: 1000,
};

function textoValido(valor, limite) {
  return (
    typeof valor === "string" &&
    valor.trim().length > 0 &&
    valor.trim().length <= limite
  );
}

function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(peticion, respuesta) {
  if (peticion.method !== "POST") {
    respuesta.setHeader("Allow", "POST");
    return respuesta.status(405).json({ error: "Método no permitido." });
  }

  const {
    nombre,
    email,
    titulo,
    autor,
    comentario,
    consentimiento,
    web,
    tiempoFormulario,
  } = peticion.body || {};

  // Los bots suelen completar el campo oculto o enviar el formulario al instante.
  if (web || !Number.isFinite(tiempoFormulario) || tiempoFormulario < 2000) {
    return respuesta.status(400).json({ error: "No se pudo validar el envío." });
  }

  const datosValidos =
    textoValido(nombre, LIMITES.nombre) &&
    textoValido(email, LIMITES.email) &&
    emailValido(email.trim()) &&
    textoValido(titulo, LIMITES.titulo) &&
    textoValido(autor, LIMITES.autor) &&
    textoValido(comentario, LIMITES.comentario) &&
    consentimiento === true;

  if (!datosValidos) {
    return respuesta.status(400).json({
      error: "Revisa los campos y acepta el consentimiento para continuar.",
    });
  }

  const urlSupabase = process.env.SUPABASE_URL;
  const clavePrivada = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!urlSupabase || !clavePrivada) {
    console.error("Faltan las variables de entorno de Supabase.");
    return respuesta.status(500).json({
      error: "El formulario todavía no está conectado. Inténtalo más tarde.",
    });
  }

  try {
    const respuestaSupabase = await fetch(
      `${urlSupabase}/rest/v1/recomendaciones`,
      {
        method: "POST",
        headers: {
          apikey: clavePrivada,
          Authorization: `Bearer ${clavePrivada}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          email: email.trim().toLowerCase(),
          titulo: titulo.trim(),
          autor: autor.trim(),
          comentario: comentario.trim(),
          consentimiento: true,
          estado: "pendiente",
        }),
      },
    );

    if (!respuestaSupabase.ok) {
      const detalle = await respuestaSupabase.text();
      console.error("Error de Supabase:", detalle);
      throw new Error("Supabase rechazó el envío.");
    }

    return respuesta.status(201).json({ mensaje: "Recomendación guardada." });
  } catch (error) {
    console.error("Error al guardar la recomendación:", error);
    return respuesta.status(500).json({
      error: "No se pudo guardar la recomendación. Inténtalo más tarde.",
    });
  }
}
