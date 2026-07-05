


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




/*#############################################################################################################3
################################################################################################################
 JAVASCRIPT PARA CATEGORIAS*/


const botonesCategorias =
document.querySelectorAll(
    ".caja-categorias"
);

const productos =
document.querySelectorAll(
    ".cajitas"
);

botonesCategorias.forEach((boton) => {

    boton.addEventListener(
        "click",
        () => {


            botonesCategorias.forEach(
                (b) => {

                b.classList.remove(
                    "activa"
                );

            });

            boton.classList.add(
                "activa"
            );


            const categoria =
            boton.dataset.categoria;

            productos.forEach(
                (producto) => {

                if (
                    categoria === "todos"
                ) {

                    producto.style.display =
                    "flex";

                    return;
                }

                if (
                    producto.dataset.categoria
                    === categoria
                ) {

                    producto.style.display =
                    "flex";

                } else {

                    producto.style.display =
                    "none";
                }

            });

        }
    );

});





/*##############################################################################################################
#################################################################################################################
#################################################################################################################*/


/* JAVASCRIPT  */









































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









/*##############################################################################################################
#################################################################################################################
#################################################################################################################*/


/* JAVASCRIPT PARA SUBIDOR FLOTANTE  */



const hero =
    document.querySelector(".grilla-productos");

const botonArriba =
    document.querySelector(".atajo-flotante-1");

let scrolling = false;

window.addEventListener(
    "scroll",
    () => {

        if(
            window.scrollY >=
            hero.offsetHeight
        ){

            botonArriba.classList.add(
                "visible"
            );

        }else{

            botonArriba.classList.remove(
                "visible"
            );

        }

    }
);

function scrollArriba(){

    const posicion =
        window.scrollY;

    if(posicion <= 0){

        scrolling = false;

        return;

    }

    window.scrollTo(

        0,

        posicion - Math.max(
            20,
            posicion / 12
        )

    );

    requestAnimationFrame(
        scrollArriba
    );

}

botonArriba.addEventListener(
    "click",
    e => {

        e.preventDefault();

        if(scrolling)
            return;

        scrolling = true;

        scrollArriba();

    }
);