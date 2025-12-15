const TIEMPO_POR_PREGUNTA = 10;

const secciones = [
    {
        nombre: "¿Qué tanto me conoces? 💖",
        preguntas: [
            { texto: "¿Qué fue lo primero que me enamoró de ti?", respuestas:["Tu sonrisa 😊","Tu forma de ser 💕"], correcta:1 },
            { texto: "¿Qué prefiero un domingo?", respuestas:["Pelis juntos 🎬","Salir 🚶"], correcta:1 },
            { texto: "¿Qué es lo que más extraño cuando no estás?", respuestas:["Tus Abrazos 🎬","Escucharte "], correcta:0 },
            { texto: "¿Qué me hace sentir más amado?", respuestas:["Que me escuches","Que me regales cosas "], correcta:0 },
            { texto: "Si estamos peleados, ¿qué hago primero?", respuestas:["Me hago el boludo","TRATO de solucionar (Pero no me dejan aveces) "], correcta:1 },
            { texto: "¿Quién se duerme primero cuando estamos juntos?", respuestas:["Tu","Yo "], correcta:0 },
        ]
    },
    {
        nombre: "¿Qué tanto nos conoces? 💕",
        preguntas: [
            { texto:"¿Dónde fue nuestra primera cita?", respuestas:["Parque Paraguayo","Parque de la Ciudad"], correcta:0 },
            { texto:"¿Qué nunca falta cuando salimos juntos?", respuestas:["Fotiss","Sonrisas"], correcta:1 },
            { texto:"¿Quién es más celoso/a?", respuestas:["Tu","Yo"], correcta:0 },
            { texto:"¿Qué lugar queremos visitar juntos?", respuestas:["EE.UU","Brasil"], correcta:0 },
            { texto:"¿Cuál es la bebida favorita cuando estamos juntos?", respuestas:["Caipi","Fernet"], correcta:0 },
            { texto:"¿Cuál fue nuestro primer viaje juntos?", respuestas:["Itu","Apos"], correcta:0 },
        ]
    }
];

let seccionActual = 0;
let indice = 0;
let tiempo = TIEMPO_POR_PREGUNTA;
let intervalo = null;
let respondido = false;

const bienvenida = document.getElementById("bienvenida");
const intermedio = document.getElementById("intermedio");
const juego = document.getElementById("juego");
const final = document.getElementById("final");

const pregunta = document.getElementById("pregunta");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const titulo = document.getElementById("titulo-seccion");
const barra = document.getElementById("barra-tiempo");
const textoTiempo = document.getElementById("tiempo-texto");

document.getElementById("btnEmpezar").addEventListener("click", () => iniciarSeccion(0));
document.getElementById("btnSegunda").addEventListener("click", () => iniciarSeccion(1));
document.getElementById("btnSiguiente").addEventListener("click", siguientePregunta);

btn1.addEventListener("click", () => responder(0));
btn2.addEventListener("click", () => responder(1));

function iniciarSeccion(num) {
    seccionActual = num;
    indice = 0;

    bienvenida.style.display = "none";
    intermedio.style.display = "none";
    final.style.display = "none";
    juego.style.display = "block";

    titulo.textContent = secciones[seccionActual].nombre;
    cargarPregunta();
}

function cargarPregunta() {
    respondido = false;
    tiempo = TIEMPO_POR_PREGUNTA;

    const p = secciones[seccionActual].preguntas[indice];
    pregunta.textContent = p.texto;
    btn1.textContent = p.respuestas[0];
    btn2.textContent = p.respuestas[1];

    btn1.className = "";
    btn2.className = "";

    barra.style.width = "100%";
    textoTiempo.textContent = `⏳ ${tiempo}s`;

    clearInterval(intervalo);
    intervalo = setInterval(() => {
        tiempo--;
        barra.style.width = `${(tiempo / TIEMPO_POR_PREGUNTA) * 100}%`;
        textoTiempo.textContent = `⏳ ${tiempo}s`;
        if (tiempo <= 0) clearInterval(intervalo);
    }, 1000);
}

function responder(opcion) {
    if (respondido) return;
    respondido = true;

    const correcta = secciones[seccionActual].preguntas[indice].correcta;
    (opcion === correcta ? [btn1, btn2][opcion].classList.add("correcto")
                          : [btn1, btn2][opcion].classList.add("incorrecto"));
}

function siguientePregunta() {
    indice++;
    if (indice >= secciones[seccionActual].preguntas.length) {
        juego.style.display = "none";
        seccionActual === 0 ? intermedio.style.display = "block" : final.style.display = "block";
        return;
    }
    cargarPregunta();
}