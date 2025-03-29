// Variables Globales
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let cartaSeleccionada = null;
let cartaEnemigoSeleccionada = null;

// Lista de cartas con sus imágenes
const cartasEternatus = [
    { nombre: "Eternatus", img: "img/Eternatus.png" },
    { nombre: "Giratina", img: "img/Giratina.webp" },
    { nombre: "Ho-Oh", img: "img/Ho-Oh.png" },
    { nombre: "Mewtwo", img: "img/Mewtwo.webp" },
    { nombre: "Rayquaza", img: "img/Rayquaza.jpg" },
    { nombre: "Zygarde", img: "img/Zygarde.webp" },
    { nombre: "Necrozma", img: "img/Necrozma.webp" },
    { nombre: "Cresselia", img: "img/Cresselia.jpg" }
];

// Función principal para inicializar todo
function iniciarTodo() {
    console.log("Iniciando el juego...");
    configurarCarrusel();
    iniciarJuego();
}

// *** Sección Mokepon ***
function iniciarJuego() {
    console.log("Configurando eventos de botones...");

    const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
    if (sectionSeleccionarAtaque) sectionSeleccionarAtaque.style.display = "none";

    const sectionReiniciar = document.getElementById("reiniciar");
    if (sectionReiniciar) sectionReiniciar.style.display = "none";

    const botonMascotaJugador = document.getElementById("boton-mascota");
    if (botonMascotaJugador) {
        botonMascotaJugador.addEventListener("click", () => {
            console.log("Botón Seleccionar clickeado");
            seleccionarCartaJugador();
        });
    } else {
        console.error("No se encontró #boton-mascota");
    }

    const botonFuego = document.getElementById("boton-fuego");
    if (botonFuego) {
        botonFuego.addEventListener("click", () => {
            console.log("Botón Fuego clickeado");
            ataqueFuego();
        });
    } else {
        console.error("No se encontró #boton-fuego");
    }

    const botonAgua = document.getElementById("boton-agua");
    if (botonAgua) {
        botonAgua.addEventListener("click", () => {
            console.log("Botón Agua clickeado");
            ataqueAgua();
        });
    } else {
        console.error("No se encontró #boton-agua");
    }

    const botonTierra = document.getElementById("boton-tierra");
    if (botonTierra) {
        botonTierra.addEventListener("click", () => {
            console.log("Botón Tierra clickeado");
            ataqueTierra();
        });
    } else {
        console.error("No se encontró #boton-tierra");
    }

    const botonReiniciar = document.getElementById("boton-reiniciar");
    if (botonReiniciar) {
        botonReiniciar.addEventListener("click", reiniciarJuego);
    }
}

function seleccionarCartaJugador() {
    if (!cartaSeleccionada) {
        alert("Debes seleccionar una carta");
        return;
    }

    const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota");
    if (sectionSeleccionarMascota) sectionSeleccionarMascota.style.display = "none";

    const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
    if (sectionSeleccionarAtaque) {
        sectionSeleccionarAtaque.style.display = "flex";
        console.log("Sección de ataque mostrada");
    }

    const spanMascotaJugador = document.getElementById("mascota-jugador");
    if (spanMascotaJugador) {
        const carta = cartasEternatus.find(c => c.nombre === cartaSeleccionada);
        if (carta) {
            spanMascotaJugador.src = carta.img;
            console.log("Mokepon jugador seleccionado:", cartaSeleccionada);
        }
    }

    seleccionarCartaEnemigo();
}

function seleccionarCartaEnemigo() {
    const cartaAleatoria = aleatorio(0, cartasEternatus.length - 1);
    cartaEnemigoSeleccionada = cartasEternatus[cartaAleatoria].nombre;
    const spanMascotaEnemigo = document.getElementById("mascota-enemigo");
    if (spanMascotaEnemigo) {
        spanMascotaEnemigo.src = cartasEternatus[cartaAleatoria].img;
        console.log("Mokepon enemigo seleccionado:", cartaEnemigoSeleccionada);
    }
}

// Funciones de ataque
function ataqueFuego() {
    ataqueJugador = "FUEGO";
    ataqueAleatorioEnemigo();
}

function ataqueAgua() {
    ataqueJugador = "AGUA";
    ataqueAleatorioEnemigo();
}

function ataqueTierra() {
    ataqueJugador = "TIERRA";
    ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
    const ataqueAleatorio = aleatorio(1, 3);
    if (ataqueAleatorio === 1) {
        ataqueEnemigo = "FUEGO";
    } else if (ataqueAleatorio === 2) {
        ataqueEnemigo = "AGUA";
    } else {
        ataqueEnemigo = "TIERRA";
    }
    console.log("Ataque enemigo:", ataqueEnemigo);
    combate();
}

function combate() {
    const spanVidasJugador = document.getElementById("vidas-jugador");
    const spanVidasEnemigo = document.getElementById("vidas-enemigo");

    if (ataqueEnemigo === ataqueJugador) {
        crearMensaje("EMPATE");
    } else if (
        (ataqueJugador === "FUEGO" && ataqueEnemigo === "TIERRA") ||
        (ataqueJugador === "AGUA" && ataqueEnemigo === "FUEGO") ||
        (ataqueJugador === "TIERRA" && ataqueEnemigo === "AGUA")
    ) {
        crearMensaje("GANASTE");
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje("PERDISTE");
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    console.log("Vidas - Jugador:", vidasJugador, "Enemigo:", vidasEnemigo);
    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigo === 0) {
        crearMensajeFinal("FELICITACIONES GANASTE");
    } else if (vidasJugador === 0) {
        crearMensajeFinal("LO SIENTO PERDISTE");
    }
}

function crearMensaje(resultado) {
    const sectionMensajes = document.getElementById("resultado");
    const ataquesDelJugador = document.getElementById("ataques-del-jugador");
    const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");

    if (sectionMensajes) sectionMensajes.innerHTML = resultado;
    if (ataquesDelJugador) ataquesDelJugador.innerHTML = ataqueJugador || "";
    if (ataquesDelEnemigo) ataquesDelEnemigo.innerHTML = ataqueEnemigo || "";
}

function crearMensajeFinal(resultadoFinal) {
    const sectionMensajes = document.getElementById("resultado");
    if (sectionMensajes) sectionMensajes.innerHTML = resultadoFinal;

    const botonFuego = document.getElementById("boton-fuego");
    const botonAgua = document.getElementById("boton-agua");
    const botonTierra = document.getElementById("boton-tierra");
    if (botonFuego) botonFuego.disabled = true;
    if (botonAgua) botonAgua.disabled = true;
    if (botonTierra) botonTierra.disabled = true;

    const sectionReiniciar = document.getElementById("reiniciar");
    if (sectionReiniciar) sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
    console.log("Reiniciando juego...");
    location.reload();
}

// Funcionalidad de desplazamiento
function configurarCarrusel() {
    const carousel = document.getElementById('carousel');
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');

    if (!carousel || !leftArrow || !rightArrow) {
        console.error("Faltan elementos del carrusel");
        return;
    }

    // Seleccionar la primera carta por defecto
    const primeraCarta = carousel.querySelector('.card-item');
    if (primeraCarta) {
        primeraCarta.classList.add('selected');
        cartaSeleccionada = primeraCarta.dataset.nombre;
        console.log("Carta inicial seleccionada:", cartaSeleccionada);
    }

    // Evento para seleccionar una carta
    carousel.addEventListener('click', (event) => {
        const card = event.target.closest('.card-item');
        if (card) {
            carousel.querySelectorAll('.card-item').forEach(item => item.classList.remove('selected'));
            card.classList.add('selected');
            cartaSeleccionada = card.dataset.nombre;
            console.log("Carta seleccionada:", cartaSeleccionada);
        }
    });

    // Funcionalidad de desplazamiento
    const cardWidth = 190; // Ancho de la carta + gap
    leftArrow.addEventListener('click', () => {
        carousel.scrollLeft -= cardWidth;
        console.log("Desplazamiento a la izquierda, scrollLeft:", carousel.scrollLeft);
    });

    rightArrow.addEventListener('click', () => {
        carousel.scrollLeft += cardWidth;
        console.log("Desplazamiento a la derecha, scrollLeft:", carousel.scrollLeft);
    });
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Iniciar todo al cargar la página
window.addEventListener("load", iniciarTodo);