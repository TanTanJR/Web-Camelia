# Conectar las recomendaciones con Supabase

## 1. Crear la tabla

1. Abre tu proyecto en Supabase.
2. Entra en **SQL Editor** y pulsa **New query**.
3. Copia el contenido de `supabase/recomendaciones.sql`.
4. Pulsa **Run**.

## 2. Configurar Vercel

En Supabase, abre **Project Settings > API** y localiza:

- Project URL.
- La clave secreta `service_role`.

En Vercel, abre el proyecto de Camelia Books y entra en
**Settings > Environment Variables**. Añade:

- `SUPABASE_URL`: pega la Project URL.
- `SUPABASE_SERVICE_ROLE_KEY`: pega la clave `service_role`.

Activa las variables para Production, Preview y Development. Después realiza
un nuevo despliegue desde **Deployments > Redeploy**.

> La clave `service_role` es privada. No debe escribirse en HTML, JavaScript
> del navegador, GitHub ni compartirse públicamente.

## 3. Ver las recomendaciones

En Supabase, entra en **Table Editor > recomendaciones**. Ahí podrás consultar
los envíos y cambiar `estado` entre `pendiente`, `aprobada` y `rechazada`.
