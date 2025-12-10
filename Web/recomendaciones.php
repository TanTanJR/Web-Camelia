<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recomendaciones - Camelia Books</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .recomendaciones {
            max-width: 500px;
            margin: 50px auto;
            background: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 6px 15px rgba(75,46,63,0.12);
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        #form-recomendacion {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        #form-recomendacion input {
            padding: 10px;
            border-radius: 8px;
            border: 2px solid var(--rose);
            font-size: 14px;
            outline: none;
        }
        #form-recomendacion button {
            background: var(--plum);
            color: white;
            border: none;
            padding: 10px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s ease;
        }
        #form-recomendacion button:hover {
            background: var(--rose);
        }
        #lista-recomendaciones .recomendacion-item {
            padding: 10px 12px;
            background: var(--cream);
            border-radius: 10px;
            box-shadow: 0 2px 6px rgba(75,46,63,0.1);
            margin-bottom: 8px;
        }
         #volver-inicio {
            background: var(--rose);
            color: white;
            padding: 10px;
            border-radius: 8px;
            text-align: center;
            text-decoration: none;
            font-weight: 600;
            transition: 0.3s ease;
        }
        #volver-inicio:hover {
            background: var(--plum);
        }
        html{
            scroll-behavior: smooth;
        }
    </style>
</head>
<body>
    <header>
        <h1 class="logo">🌸 Camelia Books</h1>
    </header>

    <main class="recomendaciones">
        <h2>Recomiéndanos un libro</h2>
        <p>Escribe el título y autor del libro que quieras sugerir:</p>

        <form id="form-recomendacion">
            <input type="text" id="titulo-recom" placeholder="Título del libro" required>
            <input type="text" id="autor-recom" placeholder="Autor del libro" required>
            <button type="submit">Añadir recomendación</button>
        </form>

        <h3>Lista de recomendaciones:</h3>
        <div id="lista-recomendaciones"></div>
        <a id="volver-inicio" href="index.php">⬅ Volver al inicio</a>
    </main>

    <script>
        const formRecom = document.getElementById('form-recomendacion');
const listaRecom = document.getElementById('lista-recomendaciones');

// Cargar recomendaciones guardadas en localStorage
let guardadas = JSON.parse(localStorage.getItem('recomendaciones')) || [];
guardadas.forEach(item => agregarRecomendacionDOM(item));

// Función para crear el elemento en el DOM
function agregarRecomendacionDOM(item) {
    const div = document.createElement('div');
    div.classList.add('recomendacion-item');
    div.textContent = `${item.titulo} — ${item.autor}`;

    const btnBorrar = document.createElement('button');
    btnBorrar.textContent = '🗑️';
    btnBorrar.style.marginLeft = '10px';
    btnBorrar.style.cursor = 'pointer';
    btnBorrar.style.border = 'none';
    btnBorrar.style.background = 'transparent';
    btnBorrar.addEventListener('click', () => {
        listaRecom.removeChild(div);
        // Actualizar localStorage
        guardadas = guardadas.filter(i => !(i.titulo === item.titulo && i.autor === item.autor));
        localStorage.setItem('recomendaciones', JSON.stringify(guardadas));
    });

    div.appendChild(btnBorrar);
    listaRecom.prepend(div);
}

formRecom.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.getElementById('titulo-recom').value.trim();
    const autor = document.getElementById('autor-recom').value.trim();
    if (titulo && autor) {
        const nuevoItem = {titulo, autor};
        agregarRecomendacionDOM(nuevoItem);
        guardadas.unshift(nuevoItem);
        localStorage.setItem('recomendaciones', JSON.stringify(guardadas));
        formRecom.reset();
    }
});

    </script>
</body>
</html>