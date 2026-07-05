


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

 /* JAVASCRIPT PARA LA PAGINACION DE GRILLAS */


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

        const botonAnterior =
            padre.querySelector(
                ".boton-anterior-grilla"
            );

        const botonSiguiente =
            padre.querySelector(
                ".boton-siguiente-grilla"
            );

        const contenedorPaginas =
            padre.querySelector(
                ".numeros-pagina-grilla"
            );



        const CARDS_POR_PAGINA = 8;

        const totalPaginas =
            Math.ceil(
                cards.length /
                CARDS_POR_PAGINA
            );

        let paginaActual = 1;



        function actualizarCards() {

            const inicio =
                (paginaActual - 1) *
                CARDS_POR_PAGINA;

            const fin =
                inicio +
                CARDS_POR_PAGINA;



            cards.forEach(
                (card, index) => {

                    if(
                        index >= inicio &&
                        index < fin
                    ){

                        card.style.display =
                            "flex";

                        requestAnimationFrame(
                            () => {

                                card.classList.add(
                                    "visible"
                                );

                            }
                        );

                    }else{

                        card.classList.remove(
                            "visible"
                        );

                        card.style.display =
                            "none";

                    }

                }
            );



            botonAnterior.disabled =
                paginaActual === 1;

            botonSiguiente.disabled =
                paginaActual === totalPaginas;



            crearPaginas();



        }



        function crearPaginas() {

    contenedorPaginas.innerHTML = "";

    const MAX_NUMEROS = 4;

    let inicio =
        paginaActual -
        Math.floor(MAX_NUMEROS / 2);

    let fin =
        paginaActual +
        Math.floor(MAX_NUMEROS / 2);



    if(inicio < 1){

        inicio = 1;

        fin = Math.min(
            MAX_NUMEROS,
            totalPaginas
        );

    }



    if(fin > totalPaginas){

        fin = totalPaginas;

        inicio = Math.max(

            1,

            totalPaginas -
            MAX_NUMEROS +
            1

        );

    }



    function crearBoton(numero){

        const boton =
            document.createElement(
                "button"
            );

        boton.textContent =
            numero;

        if(
            numero ===
            paginaActual
        ){

            boton.classList.add(
                "pagina-activa"
            );

        }

        boton.addEventListener(
            "click",
            () => {

                paginaActual =
                    numero;

                crearPaginas();

                actualizarCards();

            }
        );

        contenedorPaginas.appendChild(
            boton
        );

    }



    if(inicio > 1){

        crearBoton(1);

        if(inicio > 2){

            const puntos =
                document.createElement(
                    "span"
                );

            puntos.textContent =
                "...";

            contenedorPaginas.appendChild(
                puntos
            );

        }

    }



    for(
        let i = inicio;
        i <= fin;
        i++
    ){

        crearBoton(i);

    }



    if(fin < totalPaginas){

        if(fin < totalPaginas - 1){

            const puntos =
                document.createElement(
                    "span"
                );

            puntos.textContent =
                "...";

            contenedorPaginas.appendChild(
                puntos
            );

        }

        crearBoton(
            totalPaginas
        );

    }

}



        botonAnterior.addEventListener(
            "click",
            () => {

                if(
                    paginaActual > 1
                ){

                    paginaActual--;

                    actualizarCards();

                }

            }
        );



        botonSiguiente.addEventListener(
            "click",
            () => {

                if(
                    paginaActual <
                    totalPaginas
                ){

                    paginaActual++;

                    actualizarCards();

                }

            }
        );



        crearPaginas();

        actualizarCards();

    });
