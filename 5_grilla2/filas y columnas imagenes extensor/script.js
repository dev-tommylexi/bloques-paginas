


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


const expandButtons = document.querySelectorAll(".boton-expandir");

expandButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".cajitas");

        card.classList.add("active");
    });

});

const closeButtons = document.querySelectorAll(".boton-contraer");

closeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".cajitas");

        card.classList.remove("active");
    });

});

/*
###########################################################################################################
###########################################################################################################
*/




/*###########################################################################################################
 ############################################################################################################
 ############################################################################################################*/

 /* JAVASCRIPT PARA EXTENDER LA CANTIDAD DE GRILLAS */


 document
    .querySelectorAll(
        ".contenedor-grilla"
    )
    .forEach(contenedor => {

        const padre =
            contenedor.parentElement;

        const cards =
            contenedor.querySelectorAll(
                ".cajitas"
            );

        const botonMas =
            padre.querySelector(
                ".boton-mostrar-mas"
            );

        const botonMenos =
            padre.querySelector(
                ".boton-mostrar-menos"
            );

        const CARDS_INICIALES = 8;

        const CARDS_POR_CLICK = 4;

        let cardsVisibles =
            Math.min(
                CARDS_INICIALES,
                cards.length
            );



        function actualizarCards() {

            cards.forEach((card, index) => {

                const debeMostrar =
                    index < cardsVisibles;

                if (debeMostrar) {

                    if (card.style.display !== "flex") {

                        card.style.display = "flex";

                        // fuerza el siguiente frame para animar bien
                        requestAnimationFrame(() => {

                            card.classList.add("visible");

                        });

                    }

                } else {

                    if (card.style.display !== "none") {

                        card.classList.remove("visible");

                        // espera la animación y luego oculta
                        setTimeout(() => {

                            // doble check (evita bugs en cambios rápidos)
                            if (index >= cardsVisibles) {

                                card.style.display = "none";

                            }

                        }, 350); // igual al transition del CSS

                    }

                }

            });

    // botones
    if (cardsVisibles >= cards.length) {

        botonMas.style.display = "none";

    } else {

        botonMas.style.display = "inline-flex";

    }

    if (cardsVisibles <= CARDS_INICIALES) {

        botonMenos.style.display = "none";

    } else {

        botonMenos.style.display = "inline-flex";

    }

}



        actualizarCards();



        botonMas.addEventListener(
            "click",
            () => {

                cardsVisibles =
                    Math.min(

                        cardsVisibles +
                        CARDS_POR_CLICK,

                        cards.length

                    );

                actualizarCards();

            }
        );



        botonMenos.addEventListener(
            "click",
            () => {

                cardsVisibles =
                    Math.max(

                        CARDS_INICIALES,

                        cardsVisibles -
                        CARDS_POR_CLICK

                    );

                actualizarCards();

            }
        );

    });