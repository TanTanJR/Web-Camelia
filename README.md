# 🌸 Camelia Books

Camelia Books es una web de reseñas y recomendaciones literarias. El proyecto permite consultar libros, buscar por título o autor, filtrar el catálogo por categorías y abrir una ficha completa con la valoración y la opinión de cada lectura.

También incluye un formulario para que los visitantes puedan recomendar libros. Las recomendaciones se guardan de forma privada en una base de datos de Supabase.

## Demo

La web está publicada en Vercel:

**[Visitar Camelia Books](https://web-camelia.vercel.app/)**

## Funciones principales

- Catálogo de libros organizado mediante tarjetas.
- Buscador por título y autor.
- Filtros por categoría.
- Valoraciones con estrellas.
- Fichas emergentes con descripción, opinión y puntos destacados.
- Indicador de contenido con o sin spoilers.
- Diseño adaptable a ordenadores, tabletas y móviles.
- Formulario para recomendar libros.
- Panel privado para añadir, editar y eliminar libros.
- Acceso de administradora mediante Supabase Auth.
- Subida de portadas mediante Supabase Storage.
- Almacenamiento privado de recomendaciones en Supabase.
- Validación de los datos en el navegador y en el servidor.
- Protección básica contra envíos automáticos.
- Correos electrónicos protegidos y no visibles públicamente.

## Tecnologías utilizadas

- **HTML5** para la estructura de las páginas.
- **CSS3** para el diseño y la adaptación a diferentes pantallas.
- **JavaScript** para el catálogo, los filtros, el buscador y los formularios.
- **Vercel Functions** para procesar las recomendaciones de forma segura.
- **Supabase (PostgreSQL)** para almacenar las recomendaciones.
- **Vercel** para publicar la web.
- **Git y GitHub** para el control de versiones.

## Estructura del proyecto

```text
Web-Camelia/
├── api/
│   ├── configuracion-supabase.js # Configuración pública para el panel
│   ├── libros.js                 # Lectura del catálogo desde Supabase
│   └── recomendaciones.js        # API privada del formulario
├── admin/
│   ├── index.html                # Gestión del catálogo
│   └── login.html                # Acceso de administradora
├── datos/
│   └── libros.js                # Información del catálogo
├── img/                         # Imágenes de las portadas
├── js/
│   ├── app.js                   # Catálogo, filtros y fichas
│   └── recomendaciones.js       # Envío del formulario
├── supabase/
│   └── recomendaciones.sql      # Creación de la tabla
├── CONFIGURACION_SUPABASE.md    # Guía para conectar Supabase
├── CONFIGURACION_ADMIN.md       # Guía del panel privado
├── index.html                   # Página principal
├── recomendaciones.html         # Formulario de recomendaciones
└── styles.css                   # Estilos de toda la web
```

## Ejecutar la web en local

### Opción sencilla: Live Server

1. Clona el repositorio:

```bash
git clone https://github.com/TanTanJR/Web-Camelia.git
```

2. Abre la carpeta en Visual Studio Code.
3. Instala la extensión **Live Server**.
4. Haz clic derecho sobre `index.html`.
5. Selecciona **Open with Live Server**.

El catálogo y los filtros funcionarán en local. Para probar el envío a la base de datos también es necesario ejecutar las funciones de Vercel y configurar las variables de entorno.

## Base de datos de recomendaciones

La tabla `recomendaciones` contiene los siguientes campos:

| Campo | Descripción |
| --- | --- |
| `id` | Identificador automático |
| `titulo` | Título del libro |
| `autor` | Autor o autora |
| `nombre` | Nombre de quien recomienda |
| `email` | Correo privado de contacto |
| `comentario` | Motivo de la recomendación |
| `consentimiento` | Permiso para contactar |
| `estado` | `pendiente`, `aprobada` o `rechazada` |

La tabla se crea ejecutando el archivo `supabase/recomendaciones.sql` en el SQL Editor de Supabase. Las instrucciones completas están en [CONFIGURACION_SUPABASE.md](CONFIGURACION_SUPABASE.md).

## Variables de entorno

El proyecto necesita estas variables en Vercel:

```text
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

> [!IMPORTANT]
> `SUPABASE_SERVICE_ROLE_KEY` es una clave privada. Nunca debe escribirse en el código, publicarse en GitHub ni enviarse a otras personas.

## Añadir un libro

Los libros se encuentran en `datos/libros.js`. Para añadir uno nuevo, copia uno de los objetos existentes y modifica sus datos:

```javascript
{
  titulo: "Título del libro",
  autor: "Nombre del autor",
  categoria: "fantasia",
  etiqueta: "Fantasía",
  saga: "Nombre de la saga",
  imagen: "img/portada.webp",
  valoracion: 5,
  opinion: "Opinión personal sobre la lectura.",
  puntosDestacados: ["Ritmo", "Personajes", "Ambientación"],
  contieneSpoilers: false,
  descripcion: "Descripción breve del libro.",
}
```

Después guarda la portada dentro de la carpeta `img` y comprueba que el nombre coincida exactamente con la ruta indicada.

## Diseño

La identidad visual utiliza tonos rosa, malva, crema y ciruela. El color rosa principal de Camelia Books es:

```css
--rose: #d8a7b1;
```

Las tipografías principales son **DM Serif Display** y **Poppins**.

## Privacidad

Los correos enviados mediante el formulario no se muestran en la web. La petición se procesa en una función del servidor y la tabla de Supabase tiene activada la seguridad a nivel de fila (RLS).

## Autor

Proyecto creado por [TanTanJR](https://github.com/TanTanJR).

Instagram: [@camelia__09](https://www.instagram.com/camelia__09/)
