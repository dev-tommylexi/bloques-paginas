


/* 
    javascript de hamburguesa
    ##########################################################################################################

*/

const hamburguesa = document.getElementById("hamburguesa");
const menu = document.getElementById("menu-desplegable");

hamburguesa.addEventListener("click", () => {
    menu.classList.toggle("activo");


hamburguesa.classList.toggle("activo");
});










/* JAVASCRIPT DEL HERO 
###################################################################################################################
*/


const slides = document.getElementById("slides");
const total = slides.children.length;

const dotsContainer = document.getElementById("dots");

let index = 0;

/* ===== CONFIG ===== */
const AUTO_INTERVAL = 10000;   // 10s reales
const PAUSA_USUARIO = 20000;   // 20s pausa

/* ===== ESTADO ===== */
let ultimoCambio = Date.now();
let pausaHasta = 0;

/* ===== CREAR DOTS ===== */
for (let i = 0; i < total; i++) {

    let dot = document.createElement("span");

    dot.onclick = () => {
        index = i;
        actualizar();
        pausarPorUsuario();
    };

    dotsContainer.appendChild(dot);
}

const dots = dotsContainer.children;

/* ===== ACTUALIZAR ===== */
function actualizar() {

    /* slides */
    for (let i = 0; i < slides.children.length; i++) {
        slides.children[i].classList.remove("active");
    }

    slides.children[index].classList.add("active");

    /* dots */
    for (let d of dots) {
        d.classList.remove("active");
    }

    dots[index].classList.add("active");
}

/* ===== SIGUIENTE ===== */
function siguienteSlide() {
    index = (index + 1) % total;
    actualizar();
}

/* ===== LOOP PRINCIPAL ===== */
function loop() {

    const ahora = Date.now();

    /* pausa usuario */
    if (ahora < pausaHasta) {
        requestAnimationFrame(loop);
        return;
    }

    /* control tiempo real */
    if (ahora - ultimoCambio >= AUTO_INTERVAL) {

        siguienteSlide();

        ultimoCambio = ahora;
    }

    requestAnimationFrame(loop);
}

/* ===== PAUSA SOLO USUARIO ===== */
function pausarPorUsuario() {

    pausaHasta = Date.now() + PAUSA_USUARIO;

    /* reinicia referencia temporal */
    ultimoCambio = Date.now();
}

/* ===== BOTONES ===== */
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

nextBtn.onclick = () => {

    siguienteSlide();

    pausarPorUsuario();
};

prevBtn.onclick = () => {

    index = (index - 1 + total) % total;

    actualizar();

    pausarPorUsuario();
};

/* ===== INICIO ===== */
window.addEventListener("load", () => {

    actualizar();

    ultimoCambio = Date.now();

    loop();
});

/* ########################################################################################################################### */
























/* ############################################################################################################################*/

/* JAVASCRIPT PARA LAS GRILLAS */
/* mover carrousel grilla con botones */

document
    .querySelectorAll(
        ".contenedor-grilla"
    )
    .forEach(contenedor => {

        const grilla =
            contenedor.querySelector(
                ".carrousel-grilla"
            );

        const botonIzq =
            contenedor.querySelector(
                ".boton-izquierda-grilla"
            );

        const botonDer =
            contenedor.querySelector(
                ".boton-derecha-grilla"
            );

        const distancia = () => {

            const primeraCard =
                grilla.firstElementChild;

            const gap =
                parseInt(
                    getComputedStyle(grilla).gap
                ) || 0;

            return (
                primeraCard.offsetWidth +
                gap
            );

        };






        function moverCarrousel(
            distancia
        ){

            const inicio =
                grilla.scrollLeft;

            const destino =
                inicio + distancia;

            const duracion =
                300;

            let tiempoInicio =
                null;

            function animar(
                tiempoActual
            ){

                if(
                    tiempoInicio === null
                ){

                    tiempoInicio =
                        tiempoActual;

                }

                const progreso =
                    Math.min(

                        (
                            tiempoActual -
                            tiempoInicio
                        ) / duracion,

                        1

                    );

                // Ease In Out
                const ease =
                    progreso < 0.5

                    ? 2 * progreso * progreso

                    : 1 -
                    Math.pow(
                            -2 * progreso + 2,
                            2
                        ) / 2;

                grilla.scrollLeft =
                    Math.round(

                        inicio +

                        (destino - inicio) * ease

                    );

                if(
                    progreso < 1
                ){

                    requestAnimationFrame(
                        animar
                    );

                }

            }

            requestAnimationFrame(
                animar
            );

        }


        botonDer.addEventListener(
            "click",
            () => {

                moverCarrousel(
                    distancia()
                );

            }
        );

        botonIzq.addEventListener(
            "click",
            () => {

                moverCarrousel(
                    -distancia()
                );

            }
        );

    });

/*
###########################################################################################################
###########################################################################################################
*/