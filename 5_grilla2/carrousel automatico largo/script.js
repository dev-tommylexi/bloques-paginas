


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


document.querySelectorAll(".carrousel-grilla").forEach(carousel => {

    const viewport =
        carousel.querySelector(".visionador-carrousel");

    const track =
        carousel.querySelector(".cinta-carrousel");


    const originalCards = [...track.children];
    const cardsCount = originalCards.length;

    

    track.innerHTML = "";

    // BLOQUE IZQUIERDO (clones)
    originalCards.forEach(card => {
        track.appendChild(card.cloneNode(true));
    });

    // BLOQUE CENTRAL (originales clonados)
    originalCards.forEach(card => {
        track.appendChild(card.cloneNode(true));
    });

    // BLOQUE DERECHO (clones)
    originalCards.forEach(card => {
        track.appendChild(card.cloneNode(true));
    });


    const container =
        carousel.parentElement;

        const prevButton =
            container.querySelector(
                ".boton-prev-grilla"
            );

        const nextButton =
            container.querySelector(
                ".boton-next-grilla"
            );













    // =====================
    // VARIABLES
    // =====================

    let isDragging = false;

    let startX = 0;

    let currentTranslate = 0;

    let previousTranslate = 0;

    let currentIndex = cardsCount;

    let autoPlayInterval;

    let stepCount = 0;

    const DOTS_COUNT = 3;

    let userInteracted = false;

    let moved = false;


    

    // =====================
    // CARD WIDTH
    // =====================

    function getCardWidth() {

        const firstCard =
            track.children[0];

        const gap =
            parseInt(
                getComputedStyle(track).gap
            ) || 0;

        return (
            firstCard.offsetWidth +
            gap
        );
    }



    /* DOTS #############################*/



    function createDots() {

        const dotsContainer =
            carousel.querySelector(
                ".slides-visionador-carrousel"
            );

        if (!dotsContainer) return;

        dotsContainer.innerHTML = "";

        for (let i = 0; i < DOTS_COUNT; i++) {

            const dot =
                document.createElement("div");

            dot.classList.add("dot");

            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {

        const dotsContainer =
            carousel.querySelector(
                ".slides-visionador-carrousel"
            );

        if (!dotsContainer) return;

        const dots =
            dotsContainer.querySelectorAll(
                ".dot"
            );

        const active =
            ((stepCount % DOTS_COUNT)
                + DOTS_COUNT)
                % DOTS_COUNT;

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === active
            );

        });
    }











    // =====================
    // POSITION
    // =====================

    function updateSlider() {

        track.style.transform =
            `translateX(${currentTranslate}px)`;
    }

    function goToIndex(
        index,
        animated = true,
        direction = 0
    ) {

        const cardWidth =
            getCardWidth();

        currentIndex =
            index;

        currentTranslate =
            -(currentIndex * cardWidth);

        previousTranslate =
            currentTranslate;

        track.style.transition =
            animated
                ? "transform 0.6s ease"
                : "none";

        updateSlider();

        if(direction !== 0){

            stepCount += direction;

            updateDots();
        }
    }




    // =====================
    // CENTRAR EN BLOQUE REAL
    // =====================

    function normalizePosition() {

        const cardWidth = getCardWidth();

        if (currentIndex < cardsCount) {
            currentIndex += cardsCount;
        }

        if (currentIndex >= cardsCount * 2) {
            currentIndex -= cardsCount;
        }

        track.style.transition = "none";

        currentTranslate =
            -(currentIndex * cardWidth);

        previousTranslate = currentTranslate;

        updateSlider();
    }


    function startAutoPlay() {

        clearInterval(
            autoPlayInterval
        );

        const delay =
            userInteracted
                ? 9000
                : 5000;

        autoPlayInterval =
            setInterval(() => {

                goToIndex(
                    currentIndex + 1,
                    true,
                    1
                );

            }, delay);
    }

    function resetAutoPlay() {

        userInteracted = true;

        startAutoPlay();
    }

    // =====================
    // DRAG
    // =====================

    function getPositionX(event) {

        return event.type.includes(
            "mouse"
        )
            ? event.pageX
            : event.touches[0].clientX;
    }

    function dragStart(event) {

        resetAutoPlay();
        isDragging = true;

        startX =
            getPositionX(event);

        previousTranslate =
            currentTranslate;

        track.style.transition =
            "none";
        
        moved = false;
    }

    function dragMove(event) {

        if(!isDragging)
            return;

        const currentX =
            getPositionX(event);

        const delta =
            currentX - startX;

        currentTranslate =
            previousTranslate +
            delta;

        updateSlider();



        if (
            !moved &&
            Math.abs(delta) > 10
        ) {

            moved = true;

            track.querySelectorAll("a")
                .forEach(link => {

                    link.style.pointerEvents =
                        "none";

                });
        }









    }

    
    function dragEnd() {

        if(!isDragging)
            return;

        isDragging = false;

        const cardWidth =
            getCardWidth();

        const oldIndex =
            currentIndex;

        currentIndex =
            Math.round(
                -currentTranslate / cardWidth
            );

        let direction = 0;

        if(currentIndex > oldIndex){

            direction = 1;

        }else if(
            currentIndex < oldIndex
        ){

            direction = -1;
        }

        goToIndex(
            currentIndex,
            true,
            direction
        );
        

        track.querySelectorAll("a")
            .forEach(link => {

                link.style.pointerEvents =
                    "";

            });


    }




    // =====================
    // TRANSITION END
    // =====================

    track.addEventListener(
        "transitionend",
        normalizePosition
    );

    // =====================
    // EVENTS TOUCH
    // =====================

    track.addEventListener(
        "touchstart",
        dragStart,
        { passive: true }
    );

    track.addEventListener(
        "touchmove",
        dragMove,
        { passive: true }
    );

    track.addEventListener(
        "touchend",
        dragEnd
    );

    // =====================
    // EVENTS MOUSE
    // =====================

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

    // =====================
    // EVITAR DRAG HTML
    // =====================

    track.addEventListener(
        "dragstart",
        e =>
            e.preventDefault()
    );










    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                clearInterval(
                    autoPlayInterval
                );

            } else {

                currentIndex =
                    ((currentIndex % cardsCount)
                        + cardsCount)
                    % cardsCount;

                currentIndex += cardsCount;

                currentTranslate =
                    -(currentIndex * getCardWidth());

                previousTranslate =
                    currentTranslate;

                track.style.transition =
                    "none";

                updateSlider();

                startAutoPlay();

            }

        }
    );








    if (prevButton) {

        prevButton.addEventListener(
            "click",
            () => {

                resetAutoPlay();

                goToIndex(
                    currentIndex - 1,
                    true,
                    -1
                );

            }
        );

    }

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                resetAutoPlay();

                goToIndex(
                    currentIndex + 1,
                    true,
                    1
                );

            }
        );

    }



























    // =====================
    // INICIO
    // =====================

    createDots();

    updateDots();

    



    requestAnimationFrame(() => {

        track.offsetWidth; // fuerza layout real con clones

        currentIndex = cardsCount;

        currentTranslate =
            -(currentIndex * getCardWidth());

        previousTranslate = currentTranslate;

        track.style.transition = "none";

        updateSlider();

        startAutoPlay();

    });
















});