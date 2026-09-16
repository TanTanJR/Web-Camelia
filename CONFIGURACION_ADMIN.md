# Configurar el panel de administración

El panel privado permite añadir, editar y eliminar libros sin modificar el
código. También permite subir portadas a Supabase Storage.

## 1. Crear las tablas y los permisos

1. Abre el proyecto de Camelia Books en Supabase.
2. Entra en **SQL Editor** y pulsa **New query**.
3. Copia todo el archivo `supabase/administracion.sql`.
4. Pégalo en el editor y pulsa **Run**.

Este SQL crea:

- La tabla `libros` y copia el catálogo actual.
- La tabla privada `administradores`.
- El espacio `portadas` de Supabase Storage.
- Las reglas que permiten leer los libros públicamente y modificarlos solo a
  los administradores.

## 2. Crear la cuenta de la administradora

1. En Supabase abre **Authentication > Users**.
2. Pulsa **Add user > Create new user**.
3. Escribe el correo y una contraseña segura.
4. Activa **Auto Confirm User** y crea el usuario.
5. Copia el valor de la columna **User UID** del usuario recién creado.

La contraseña no se guarda en GitHub ni en la tabla de libros. Supabase Auth se
encarga de protegerla.

## 3. Darle permiso de administradora

Abre de nuevo **SQL Editor > New query**, sustituye `PEGA_AQUI_EL_USER_UID` por
el identificador copiado y ejecuta:

```sql
insert into public.administradores (user_id)
values ('PEGA_AQUI_EL_USER_UID')
on conflict (user_id) do nothing;
```

## 4. Añadir la clave pública a Vercel

En Supabase abre **Project Settings > API Keys**. Copia la **Publishable key**
o la clave `anon` de la pestaña de claves antiguas.

En Vercel abre **Settings > Environments** y crea:

```text
SUPABASE_ANON_KEY
```

Pega la clave pública como valor y actívala para **Production**, **Preview** y
**Development**. Esta clave es pública y está limitada por las políticas RLS;
no debe confundirse con la clave privada `service_role`.

Las variables que debe tener el proyecto son:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_ANON_KEY
```

Después realiza un **Redeploy** en Vercel.

## 5. Entrar al panel

Abre:

```text
https://web-camelia.vercel.app/admin/login.html
```

Inicia sesión con el correo y la contraseña creados en Supabase. Los cambios
guardados en el panel aparecerán en el catálogo público automáticamente.

## Seguridad

- No publiques ni compartas `SUPABASE_SERVICE_ROLE_KEY`.
- No añadas la contraseña a ningún archivo del proyecto.
- La clave pública puede utilizarse en el navegador porque RLS limita sus
  permisos.
- Solo los usuarios incluidos en `public.administradores` pueden cambiar el
  catálogo o subir portadas.
