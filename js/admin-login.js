const formularioLogin = document.querySelector("#form-login");
const estadoLogin = document.querySelector("#estado-login");
const botonLogin = formularioLogin.querySelector('button[type="submit"]');

let clienteSupabase;

async function prepararSupabase() {
  const respuesta = await fetch("/api/configuracion-supabase");
  const configuracion = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(configuracion.error);
  }

  clienteSupabase = window.supabase.createClient(
    configuracion.url,
    configuracion.clavePublica,
  );

  const { data } = await clienteSupabase.auth.getSession();

  if (data.session) {
    window.location.replace("index.html");
  }
}

async function comprobarPermiso(userId) {
  const { data, error } = await clienteSupabase
    .from("administradores")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error || !data) {
    await clienteSupabase.auth.signOut();
    throw new Error("Este usuario no tiene permisos de administración.");
  }
}

formularioLogin.addEventListener("submit", async (evento) => {
  evento.preventDefault();
  botonLogin.disabled = true;
  estadoLogin.className = "estado-formulario informacion";
  estadoLogin.textContent = "Comprobando los datos…";

  const email = document.querySelector("#email-admin").value.trim();
  const password = document.querySelector("#password-admin").value;

  try {
    const { data, error } = await clienteSupabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error("El correo o la contraseña no son correctos.");
    }

    await comprobarPermiso(data.user.id);
    window.location.replace("index.html");
  } catch (error) {
    estadoLogin.className = "estado-formulario error";
    estadoLogin.textContent = error.message;
    botonLogin.disabled = false;
  }
});

prepararSupabase().catch((error) => {
  estadoLogin.className = "estado-formulario error";
  estadoLogin.textContent = error.message;
  botonLogin.disabled = true;
});
