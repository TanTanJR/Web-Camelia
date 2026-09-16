// CATÁLOGO DE CAMELIA BOOKS
// Para añadir un libro, copia un objeto completo y cambia sus valores.

const librosBase = [
  {
    titulo: "Alas de Sangre",
    autor: "Rebecca Yarros",
    categoria: "fantasia",
    etiqueta: "Fantasía",
    saga: "Empíreo",
    imagen: "img/alasdesangre-rosa.webp",
    valoracion: 5,
    opinion:
      "Una lectura muy adictiva, con tensión constante y personajes que consiguen que quieras seguir leyendo.",
    puntosDestacados: ["Ritmo rápido", "Dragones", "Romance y tensión"],
    contieneSpoilers: false,
    descripcion:
      "Violet Sorrengail es forzada a unirse al brutal Colegio de Guerra de Basgiath para entrenar como jinete de dragón.",
  },
  {
    titulo: "Alas de Hierro",
    autor: "Rebecca Yarros",
    categoria: "fantasia",
    etiqueta: "Fantasía",
    saga: "Empíreo",
    imagen: "img/alasdehierro-rosa.webp",
    valoracion: 5,
    opinion:
      "Mantiene la emoción de la primera parte y amplía el mundo, los conflictos y las relaciones entre los personajes.",
    puntosDestacados: ["Más acción", "Evolución de Violet", "Nuevos secretos"],
    contieneSpoilers: false,
    descripcion:
      "Continúan las pruebas de Violet para convertirse en jinete de dragón y su lucha contra los secretos del colegio.",
  },
  {
    titulo: "Alas de Ónix",
    autor: "Rebecca Yarros",
    categoria: "fantasia",
    etiqueta: "Fantasía",
    saga: "Empíreo",
    imagen: "img/alasdeonix-rosa.webp",
    valoracion: 5,
    opinion:
      "Una continuación intensa que eleva el peligro y obliga a sus protagonistas a tomar decisiones difíciles.",
    puntosDestacados: ["Alianzas", "Conflicto épico", "Momentos emocionales"],
    contieneSpoilers: false,
    descripcion:
      "Violet debe defender su nación, buscar alianzas para la guerra y encontrar una cura para la transformación de Xaden.",
  },
  {
    titulo: "Etéreo",
    autor: "Joana Marcús",
    categoria: "juveniles",
    etiqueta: "Juvenil",
    saga: "Trilogía Extraños",
    imagen: "img/etereo-rosa.webp",
    valoracion: 3,
    opinion:
      "Tiene una premisa interesante y personajes complejos, aunque algunas partes avanzan más despacio.",
    puntosDestacados: ["Poderes especiales", "Personajes grises", "Misterio"],
    contieneSpoilers: false,
    descripcion:
      "Caleb no es un chico corriente. Sus habilidades especiales y una vida complicada lo han llevado a trabajar para gente de moral dudosa.",
  },
  {
    titulo: "Ciudades de Humo",
    autor: "Joana Marcús",
    categoria: "distopia",
    etiqueta: "Distopía",
    saga: "Trilogía Fuego",
    imagen: "img/ciudadesdehumo-rosa.webp",
    valoracion: 4,
    opinion:
      "Destaca por su mundo distópico y por la evolución de Alice mientras descubre qué significa vivir como humana.",
    puntosDestacados: ["Mundo distópico", "Androides", "Búsqueda de libertad"],
    contieneSpoilers: false,
    descripcion:
      "Alice, una androide, debe aprender a vivir como humana después de escapar de una existencia controlada.",
  },
  {
    titulo: "Ciudades de Ceniza",
    autor: "Joana Marcús",
    categoria: "distopia",
    etiqueta: "Distopía",
    saga: "Trilogía Fuego",
    imagen: "img/ciudadesdeceniza-rosa.webp",
    valoracion: 4,
    opinion:
      "Una segunda parte con más acción y consecuencias, que continúa desarrollando el mundo de la trilogía.",
    puntosDestacados: ["Acción", "Venganza", "Evolución de Alice"],
    contieneSpoilers: false,
    descripcion:
      "Alice busca venganza tras la destrucción de su ciudad en un mundo de acción, romance, androides y experimentos prohibidos.",
  },
  {
    titulo: "Powerless",
    autor: "Lauren Roberts",
    categoria: "fantasia",
    etiqueta: "Fantasía",
    saga: "Powerless",
    imagen: "img/powerless-rosa.webp",
    valoracion: 5,
    opinion:
      "Una fantasía muy entretenida, con pruebas peligrosas, rivalidad y una tensión romántica que sostiene la historia.",
    puntosDestacados: ["Pruebas", "Rivalidad", "Romance"],
    contieneSpoilers: false,
    descripcion:
      "Paedyn finge ser psíquica para sobrevivir en Ilya y acaba participando en las peligrosas Pruebas de la Purga.",
  },
  {
    titulo: "Powerful",
    autor: "Lauren Roberts",
    categoria: "fantasia",
    etiqueta: "Fantasía",
    saga: "Powerless",
    imagen: "img/powerful-rosa.webp",
    valoracion: 4.5,
    opinion:
      "Una historia más breve y cercana que permite conocer mejor a Adena y aporta emoción al universo de la saga.",
    puntosDestacados: ["Adena y Mak", "Lealtad", "Historia complementaria"],
    contieneSpoilers: false,
    descripcion:
      "Adena y Mak afrontan peligrosos desafíos mientras desarrollan una relación marcada por la tensión, el romance y la lealtad.",
  },
  {
    titulo: "Reckless",
    autor: "Lauren Roberts",
    categoria: "fantasia",
    etiqueta: "Fantasía",
    saga: "Powerless",
    imagen: "img/reckless-rosa.webp",
    valoracion: 4,
    opinion:
      "La persecución entre Paedyn y Kai mantiene la tensión, mientras ambos se enfrentan a lo que sienten y a su deber.",
    puntosDestacados: [
      "Persecución",
      "Conflicto emocional",
      "Tensión romántica",
    ],
    contieneSpoilers: false,
    descripcion:
      "Paedyn huye después de matar al rey. Kai debe perseguirla, aunque se debate entre la lealtad, el deber y el deseo.",
  },
  {
    titulo: "Fearless",
    autor: "Lauren Roberts",
    categoria: "fantasia",
    etiqueta: "Fantasía",
    saga: "Powerless",
    imagen: "img/fearless-rosa.webp", 
    valoracion: 4,
    opinion:
      "Una entrega emocional que pone a prueba a los protagonistas y profundiza en el sacrificio y la redención.",
    puntosDestacados: ["Decisiones difíciles", "Sacrificio", "Redención"],
    contieneSpoilers: false,
    descripcion:
      "Paedyn y Kai se enfrentan a decisiones difíciles en una historia sobre el poder, el amor, el destino y la redención.",
  },
  {
    titulo: "Fearful",
    autor: "Lauren Roberts",
    categoria: "fantasia",
    etiqueta: "Fantasía",
    saga: "Powerless",
    imagen: "img/fearful-rosa.webp",
    valoracion: 4,
    opinion:
      "Una mirada diferente al universo de Ilya, centrada en personajes y motivaciones que quedaban en segundo plano.",
    puntosDestacados: [
      "Nueva perspectiva",
      "Kitt y Mara",
      "Historia complementaria",
    ],
    contieneSpoilers: false,
    descripcion:
      "Una decisión trascendental del rey lleva a Mara de vuelta a Ilya para tratar de comprender la mente de Kitt Azer.",
  },
  {
    titulo: "Blind Side",
    autor: "Kandi Steiner",
    categoria: "romance",
    etiqueta: "Romance",
    saga: "Red Zone Rivals",
    imagen: "img/blindside-rosa.webp",
    valoracion: 3,
    opinion:
      "Un romance universitario ligero, con química entre los protagonistas y situaciones fáciles de disfrutar.",
    puntosDestacados: ["Romance deportivo", "Universidad", "Química"],
    contieneSpoilers: false,
    descripcion:
      "Una coordinadora de relaciones públicas debe lidiar con Clay Johnson después de que una ruptura lo convierta en su mayor dolor de cabeza.",
  },
];
