


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

const carouseles = document.querySelectorAll(
    ".super-contenedor-grilla-pc"
);

carouseles.forEach((carrousel) => {

    const viewport =
    carrousel.querySelector(
        ".contenedor-grilla-pc"
    );

    const botonIzquierda =
    carrousel.querySelector(
        ".boton-izquierda"
    );

    const botonDerecha =
    carrousel.querySelector(
        ".boton-derecha"
    );

    const mover = 300;

    botonDerecha.addEventListener(
        "click",
        () => {

            viewport.scrollBy({

                left: mover,

                behavior: "smooth"
            });

        }
    );

    botonIzquierda.addEventListener(
        "click",
        () => {

            viewport.scrollBy({

                left: -mover,

                behavior: "smooth"
            });

        }
    );

});



/*
###########################################################################################################
###########################################################################################################
*/




const carousels =
    document.querySelectorAll(".carrousel-grilla");

//
// ======================================
// CREAR INSTANCIA PARA CADA CAROUSEL
// ======================================
//

carousels.forEach(carousel => {

    const track =
        carousel.querySelector(".cinta-carrousel");

    //
    // ======================
    // VARIABLES
    // ======================
    //

    let isDragging = false;

    let startPosition = 0;

    let currentTranslate = 0;

    let previousTranslate = 0;

    let autoPlayInterval;

    const totalDots = 4;

    let activeDotIndex = 0;

    const dotsContainer =
        carousel.querySelector(
            ".slides-visionador-carrousel"
        );

    //
    // ======================
    // CARD WIDTH
    // ======================
    //


        function getCardWidth(){

        const firstCard =
            track.children[0];

        const gap =
            parseInt(
                getComputedStyle(track).gap
            ) || 0;

        return firstCard.offsetWidth + gap;

    }








    //
    // ======================
    // POSICIÓN X
    // ======================
    //

    function getPositionX(event){

        return event.type.includes("mouse")
            ? event.pageX
            : event.touches[0].clientX;

    }

    //
    // ======================
    // UPDATE
    // ======================
    //

    function updateSlider(){

        track.style.transform =
            `translateX(${currentTranslate}px)`;

    }

    //
    // ======================
    // RECYCLE FORWARD
    // ======================
    //

    function recycleForward(){

        const cardWidth =
            getCardWidth();

        if(Math.abs(currentTranslate)
            >= cardWidth){

            const firstCard =
                track.firstElementChild;

            track.appendChild(firstCard);

            activeDotIndex++;

            if(activeDotIndex >= totalDots){

                activeDotIndex = 0;

            }

            updateDots();



            currentTranslate += cardWidth;

            previousTranslate =
                currentTranslate;

            updateSlider();

        }

    }

    //
    // ======================
    // RECYCLE BACKWARD
    // ======================
    //

    function recycleBackward(){

        const cardWidth =
            getCardWidth();

        if(currentTranslate > 0){

            const lastCard =
                track.lastElementChild;

            track.prepend(lastCard);


            activeDotIndex--;

            if(activeDotIndex < 0){

                activeDotIndex =
                    totalDots - 1;

            }

            updateDots();




            currentTranslate -= cardWidth;

            previousTranslate =
                currentTranslate;

            updateSlider();

        }

    }

    //
    // ======================
    // AUTOPLAY
    // ======================
    //


        //
    // ======================
    // CREAR DOTS
    // ======================
    //

    function createDots(){

        if(!dotsContainer) return;

        dotsContainer.innerHTML = "";

        for(let i = 0; i < totalDots; i++){

            const dot =
                document.createElement("div");

            dot.classList.add("dot");

            if(i === 0){

                dot.classList.add("active");

            }

            dotsContainer.appendChild(dot);

        }

    }



    //
// ======================
// CREAR DOTS
// ======================
//

    function createDots(){

        if(!dotsContainer) return;

        dotsContainer.innerHTML = "";

        for(let i = 0; i < totalDots; i++){

            const dot =
                document.createElement("div");

            dot.classList.add("dot");

            if(i === 0){

                dot.classList.add("active");

            }

            dotsContainer.appendChild(dot);

        }

    }

    //
    // ======================
    // ACTUALIZAR DOTS
    // ======================
    //

    function updateDots(){

        if(!dotsContainer) return;

        const dots =
            dotsContainer.querySelectorAll(".dot");

        dots.forEach(dot => {

            dot.classList.remove("active");

        });

        dots[activeDotIndex]
            ?.classList.add("active");

    }












    function startAutoPlay(){

        autoPlayInterval =
            setInterval(() => {

            if(isDragging) return;

            currentTranslate -=
                getCardWidth();

            previousTranslate =
                currentTranslate;

            track.style.transition =
                "transform 0.5s ease";

            updateSlider();

            setTimeout(() => {

                track.style.transition =
                    "none";

                recycleForward();

            }, 1500);

        }, 6000);

    }

    //
    // ======================
    // STOP AUTOPLAY
    // ======================
    //

    function stopAutoPlay(){

        clearInterval(autoPlayInterval);

    }

    //
    // ======================
    // DRAG START
    // ======================
    //

    function dragStart(event){

        isDragging = true;

        stopAutoPlay();

        startPosition =
            getPositionX(event);

        previousTranslate =
            currentTranslate;

        track.style.transition =
            "none";

    }

    //
    // ======================
    // DRAG MOVE
    // ======================
    //

    function dragMove(event){

        if(!isDragging) return;

        const currentPosition =
            getPositionX(event);

        currentTranslate =
            previousTranslate +
            currentPosition -
            startPosition;

        recycleForward();

        recycleBackward();

        updateSlider();

    }

    //
    // ======================
    // DRAG END
    // ======================
    //

    function dragEnd(){

        if(!isDragging) return;

        isDragging = false;

        const cardWidth =
            getCardWidth();

        currentTranslate =
            Math.round(
                currentTranslate /
                cardWidth
            ) * cardWidth;

        previousTranslate =
            currentTranslate;

        track.style.transition =
            "transform 0.3s ease";

        updateSlider();

        startAutoPlay();

    }

    //
    // ======================
    // TOUCH EVENTS
    // ======================
    //

    track.addEventListener(
        "touchstart",
        dragStart
    );

    track.addEventListener(
        "touchmove",
        dragMove
    );

    track.addEventListener(
        "touchend",
        dragEnd
    );

    //
    // ======================
    // MOUSE EVENTS
    // ======================
    //

    track.addEventListener(
        "mousedown",
        dragStart
    );

    window.addEventListener(
        "mousemove",
        dragMove
    );

    window.addEventListener(
        "mouseup",
        dragEnd
    );

    //
    // ======================
    // PREVENIR DRAG NATIVO
    // ======================
    //

    track.addEventListener(
        "dragstart",
        e => e.preventDefault()
    );

    //
    // ======================
    // INIT
    // ======================
    //

    //
// ======================
// INIT
// ======================
//

    createDots();

    updateDots();

    startAutoPlay();

});