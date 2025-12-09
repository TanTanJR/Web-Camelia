<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Camelia Books</title>
    <link rel="stylesheet" href="styles.css">
    <style>
    
    </style>
</head>

<body>

    <header>
        <h1 class="logo">🌸 Camelia Books</h1>
        <p class="subtitle">Opiniones y recomendaciones de una lectora común</p>
    </header>
    <nav class="navbar">
        <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Reseñas</a></li>
            <li><a href="#">Categorías</a></li>
            <li><a href="#">Contacto</a></li>
        </ul>

    </nav>

    <main>
        <!-- Sección de introducción -->
        <section class="intro">
            <p>Bienvenidos a Camelia Books, una web dedicada a describir, valorar y recomendar libros leídos por una persona normal como la mayoría de nosotros.</p>
        </section>
        <!-- Sección de categorías -->
        <section class="categorias" id="categorias">
            <h2>Categorías de libros</h2>
            <div class="categoria-botones">
                <button data-categoria="todas">Todas</button>
                <button data-categoria="fantasia">Fantasía</button>
                <button data-categoria="juveniles">Juveniles</button>
                <button data-categoria="distopia">Distopía/Ciencia ficción</button>
                <button data-categoria="romance">Romance</button>
            </div>
        </section>

        <!-- Sección de tarjetas de libros -->
        <section class="tarjetas">

        <div class="libro-contenedor" data-categoria="fantasia"> <!-- Alas de Sangre-->

            <div class="libro-imagen">
                <img src="img/alasdesangrewhite.jpeg" alt="Portada del libro Alas de Sangre">
                <span class="categoria">Fantasia</span>
            </div>

            <div class="libro-info"> 

                <div class="titulo-autor">
                    <h2>Alas de Sangre</h2>
                    <p class="autor">Rebecca Yarros</p>
                </div>

            <p class="descripcion">novela de fantasía juvenil escrita por Rebecca Yarros que narra la historia de Violet Sorrengail, una joven que, en lugar de convertirse en escriba, es forzada por su madre a unirse al brutal Colegio de Guerra de Basgiath para entrenar como jinete de dragón</p>

                <div class="valoracion">
                    <span>Valoración</span>

                    <div class="estrellas" data-rating="5">★★★★★</div>
                    <button class="leer-mas">
                    <span class="texto">Leer más</span>
                    <span class="flecha">▼</span>
                    </button>

                </div>

            </div>

        </div>    
        
        
         <div class="libro-contenedor" data-categoria="fantasia"> <!-- Alas de Hierro-->

            <div class="libro-imagen">
                <img src="img/alasdehierro.jpg" alt="Portada del libro Alas de Hierro">
                <span class= "categoria">Fantasia</span>
            </div>

            <div class= "libro-info">

                <div class="titulo-autor">
                    <h2>Alas de Hierro</h2>
                    <p class="autor">Rebecca Yarros</p>
                </div>

                <p class= "descripcion">
                    segundo libro de la saga de fantasía romántica Empíreo de Rebecca Yarros, que continúa la historia de Violet Sorrengail en el Colegio de Guerra Basgiath. La trama se centra en las pruebas de supervivencia que debe superar para convertirse en jinete de dragón, su relación con Xaden, la lucha contra un secreto del colegio y los prejuicios que enfrenta por su fragilidad física. 
                </p>

                <div class="valoracion">
                    <span>Valoracion</span>
                    
                    <div class="estrellas" data-rating="5">★★★★★</div>
                    <button class="leer-mas">
                    <span class="texto">Leer más</span>
                    <span class="flecha">▼</span>
            
                </div>

            </div>

        </div>
            
        <div class="libro-contenedor" data-categoria="fantasia"> <!-- Alas de Ónix-->

            <div class="libro-imagen">
                <img src="img/alasdeonixwhite.jpg" alt="Portada del libro Alas de Ónix">
                <span class="categoria">Fantasia</span>
            </div>

            <div class="libro-info">

                <div class="titulo-autor">
                    <h2>Alas de Ónix</h2>
                    <p class="autor">Rebecca Yarros</p>
                </div>

                <p class="descripcion">"Alas de ónix" es el tercer libro de la saga "Empíreo" de Rebecca Yarros, donde Violet Sorrengail, tras casi dos años en el Colegio de Guerra Basgiath, debe tomar decisiones urgentes para defender su nación contra los enemigos. La historia se centra en la búsqueda de alianzas para la guerra y la de Violet para encontrar una cura para la transformación de Xaden en un venin</p>

                <div class="valoracion">
                    <span>Valoración</span>

                    <div class="estrellas" data-rating="5">★★★★★</div>
                    <button class="leer-mas">
                    <span class="texto">Leer más</span>
                    <span class="flecha">▼</span>

                </div>

            </div>

        </div>

        <div class="libro-contenedor" data-categoria="juveniles"> <!-- Etereo-->

            <div class="libro-imagen">
                <img src="img/etereo.jpg" alt="Portada del libro Etereo">
                <span class="categoria">Juveniles</span>
            </div>

            <div class="libro-info">

                <div class="titulo-autor">
                    <h2>Etereo</h2>
                    <p class="autor">Joana Marcús</p>
                </div>

                <p class="descripcion">"Caleb no es un chico corriente. Ha tenido una vida complicada, quizá por las habilidades especiales que lo convierten, a sus ojos, en un monstruo. El destino lo ha llevado a trabajar para gente de moral dudosa, a hacer cosas que le han manchado las manos y el alma.</p>

                <div class="valoracion">
                    <span>Valoración</span>

                    <div class="estrellas" data-rating="3">★★★☆☆</div>
                    <button class="leer-mas">
                    <span class="texto">Leer más</span>
                    <span class="flecha">▼</span>

                </div>

            </div>

        </div>

        <div class="libro-contenedor" data-categoria="distopia"> <!-- ciudades de humo-->

            <div class="libro-imagen">
                <img src="img/ciudadesdehumo.jpg" alt="Portada del libro Ciudades de Humo">
                <span class="categoria">Distopía/Ciencia ficción</span>
            </div>

            <div class="libro-info">

                <div class="titulo-autor">
                    <h2>Ciudades de Humo Trilogía Fuego</h2>
                    <p class="autor">Joana Marcús</p>
                </div>

                <p class="descripcion"> Se trata de una historia de ciencia ficción y distopía ambientada en un mundo donde la libertad está controlada. La trama sigue a Alice, una androide que debe aprender a vivir como humana después de escapar de su existencia controlada y se desarrolla a través de la aventura, el romance y la lucha por la supervivencia. </p>

                <div class="valoracion">
                    <span>Valoración</span>

                    <div class="estrellas" data-rating="4">★★★★☆</div><!-- 4 estrellas  y media⯨ -->
                    <button class="leer-mas">
                    <span class="texto">Leer más</span>
                    <span class="flecha">▼</span>

                </div>

            </div>

        </div>

        <div class="libro-contenedor" data-categoria="distopia"> <!-- ciudades de ceniza-->

            <div class="libro-imagen">
                <img src="img/ciudadesdeceniza.jpg" alt="Portada del libro Ciudades de Ceniza">
                <span class="categoria">Distopía/Ciencia ficción</span>
            </div>

            <div class="libro-info">

                <div class="titulo-autor">
                    <h2>Ciudades de Ceniza Trilogía Fuego</h2>
                    <p class="autor">Joana Marcús</p>
                </div>

                <p class="descripcion"> La historia sigue a Alice en un mundo postapocalíptico, donde busca venganza tras la destrucción de su ciudad. La trama incluye acción, romance, androides y experimentos prohibidos, y está dirigida a un público joven y adulto joven.  </p>

                <div class="valoracion">
                    <span>Valoración</span>

                    <div class="estrellas" data-rating="4">★★★★☆</div><!-- 4 estrellas  y media⯨ -->
                    <button class="leer-mas">
                    <span class="texto">Leer más</span>
                    <span class="flecha">▼</span>

                </div>

            </div>

        </div>

        <div class="libro-contenedor" data-categoria="fantasia"> <!-- Powerless-->

            <div class="libro-imagen" >
                <img src="img/Powerless.webp" alt="Portada del libro Powerless">
                <span class="categoria">Fantasía <span class="flecha">▼</span></span>
            </div>

            <div class="libro-info">

                <div class="titulo-autor">
                    <h2>Powerless</h2>
                    <p class="autor">Lauren Roberts</p>
                </div>

                <p class="descripcion"> La historia se ambienta en el reino de Ilya, donde la sociedad está dividida entre los "Élite" con poderes y los "Vulgares" sin ellos. La protagonista, Paedyn, una "Vulgar" que finge ser una psíquica para sobrevivir, se ve obligada a participar en las Pruebas de la Purga tras salvar a uno de los príncipes.  </p>

                <div class="valoracion">
                    <span>Valoración</span>

                    <div class="estrellas" data-rating="5">★★★★★</div><!-- 4 estrellas  y media⯨ -->
                   <button class="leer-mas">
                    <span class="texto">Leer más</span>
                    <span class="flecha">▼</span>

                </div>

            </div>

        </div>

        <div class="libro-contenedor" data-categoria="fantasia"> <!-- Powerfull-->

            <div class="libro-imagen" >
                <img src="img/powerful.webp" alt="Portada del libro Powerful">
                <span class="categoria">Fantasía</span>
            </div>

            <div class="libro-info">

                <div class="titulo-autor">
                    <h2>Powerful</h2>
                    <p class="autor">Lauren Roberts</p>
                </div>

                <p class="descripcion"> La historia sigue a Adena y Mak mientras navegan peligrosos desafíos y desarrollan su relación, marcada por la tensión, el romance y la lealtad.   </p>

                <div class="valoracion">
                    <span>Valoración</span>

                    <div class="estrellas" data-rating="4,5">★★★★⯨</div><!-- 4 estrellas  y media⯨ -->
                    <button class="leer-mas">
                    <span class="texto">Leer más</span>
                    <span class="flecha">▼</span>

                </div>

            </div>

        </div>

        <div class="libro-contenedor" data-categoria="fantasia"> <!-- Reckless-->

            <div class="libro-imagen">
                <img src="img/reckless.webp" alt="Portada del libro Reckless">
                <span class="categoria">Fantasía</span>
            </div>

            <div class="libro-info">

                <div class="titulo-autor">
                    <h2>Reckless</h2>
                    <p class="autor">Lauren Roberts</p>
                </div>

                <p class="descripcion">  Sigue a Paedyn Gray mientras huye tras matar al rey. Ahora, es perseguida por Kai Azer, el defensor del nuevo rey, quien, a pesar de su deber, se debate entre la lealtad y el deseo. El libro combina elementos de amistad, amor, misterio y peligro.    </p>

                <div class="valoracion">
                    <span>Valoración</span>

                    <div class="estrellas" data-rating="4">★★★★☆</div><!-- 4 estrellas  y media⯨ -->
                    <button class="leer-mas">
                    <span class="texto">Leer más</span>
                    <span class="flecha">▼</span>

                </div>

            </div>

        </div>

        <div class="libro-contenedor" data-categoria="fantasia"> <!-- Fearless-->

            <div class="libro-imagen">
                <img src="img/fearless.jpg" alt="Portada del libro Fearless">
                <span class="categoria">Fantasía</span>
            </div>

            <div class="libro-info">

                <div class="titulo-autor">
                    <h2>Fearless</h2>
                    <p class="autor">Lauren Roberts</p>
                </div>

                <p class="descripcion">Los protagonistas Paedyn y Kai se separan por la realidad y se enfrentan a decisiones difíciles, incluyendo un sacrificio personal significativo. El libro explora temas como el poder, el destino frente al libre albedrío, el amor, el sacrificio y la redención en un mundo con elementos sobrenaturales.    </p>

                <div class="valoracion">
                    <span>Valoración</span>

                    <div class="estrellas" data-rating="4">★★★★☆</div><!-- 4 estrellas  y media⯨ -->
                    <button class="leer-mas">
                    <span class="texto">Leer más</span>
                    <span class="flecha">▼</span>

                </div>

            </div>

        </div>

        <div class="libro-contenedor" data-categoria="fantasia"> <!-- Fearful -->

            <div class="libro-imagen">
                <img src="img/fearful.jpg" alt="Portada del libro Fearful">
                <span class="categoria">Fantasía</span>
            </div>

            <div class="libro-info">

                <div class="titulo-autor">
                    <h2>Fearful</h2>
                    <p class="autor">Lauren Roberts</p>
                </div>

                <p class="descripcion">Mara se había propuesto no volver a Ilya. Pero cuando el rey toma una decisión trascendental, ella recupera el interés, y la muerte está decidida a comprender la mente de Kitt Azer, siempre que él esté dispuesto a encontrarse con ella en El Mors.    </p>

                <div class="valoracion">
                    <span>Valoración</span>

                    <div class="estrellas" data-rating="4">★★★★☆</div><!-- 4 estrellas  y media⯨ -->
                   <button class="leer-mas">
                    <span class="texto">Leer más</span>
                    <span class="flecha">▼</span>

                </div>

            </div>

        </div>

        <div class="libro-contenedor" data-categoria="romance"> <!-- Blind Side -->

            <div class="libro-imagen">
                <img src="img/blindside.jpg" alt="Portada del libro Blind Side">
                <span class="categoria">Romance</span>
            </div>

            <div class="libro-info">

                <div class="titulo-autor">
                    <h2>Blind Side</h2>
                    <p class="autor">Kandi Steiner</p>
                </div>

                <p class="descripcion"> Clay Johnson tiene un cuerpo de infarto y una sonrisa que te detiene el corazón... Como coordinadora de Relaciones Públicas de su equipo de fútbol universitario, solía ser el jugador más fácil de abordar, hasta que su novia rompió con él y se convirtió en mi mayor dolor de cabeza.  </p>

                <div class="valoracion">
                    <span>Valoración</span>

                    <div class="estrellas" data-rating="4">★★★☆☆</div><!-- 4 estrellas  y media⯨ -->
                    <button class="leer-mas">
                    <span class="texto">Leer más</span>
                    <span class="flecha">▼</span>

                </div>

            </div>

        </div>
            

            <!-- Más tarjetas de libros pueden añadirse aquí -->
        </section>
        
    </main>
        <footer>
            <p>&copy; 2025 Camelia Books - Web de reseñas literarias</p>
        </footer>

    <script>
const botones = document.querySelectorAll('.categoria-botones button');
const libros = document.querySelectorAll('.libro-contenedor');

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        const categoria = boton.dataset.categoria.toLowerCase();

        libros.forEach(libro => {
            if (
                categoria === 'todas' || 
                libro.dataset.categoria.toLowerCase() === categoria
            ) {
                libro.style.display = '';
            } else {
                libro.style.display = 'none';
            }
        });

        botones.forEach(b => b.classList.remove('activo'));
        boton.classList.add('activo');
    });
});
</script>
<script>
// Expandir / Colapsar descripción
const botonesLeerMas = document.querySelectorAll('.leer-mas');

botonesLeerMas.forEach(boton => {
    boton.addEventListener('click', () => {
        const descripcion = boton.closest('.libro-info').querySelector('.descripcion');
        const texto = boton.querySelector('.texto');
        const flecha = boton.querySelector('.flecha');

        // Alternar clase para expandir la descripción
        descripcion.classList.toggle('expandida');

        // Cambiar el texto del botón
        if(descripcion.classList.contains('expandida')){
            texto.textContent = 'Leer menos';
            flecha.classList.add('girada'); // girar flecha
        } else {
            texto.textContent = 'Leer más';
            flecha.classList.remove('girada'); // volver flecha
        }
    });
});



</script>



</body>
</html>
