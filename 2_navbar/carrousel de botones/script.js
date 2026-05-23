
const vista = document.querySelector(".vista");

const btnLeft = document.querySelector(".boton-izquierda");
const btnRight = document.querySelector(".boton-derecha");



const scrollAmount = 200;

btnRight.addEventListener("click", () => {
  vista.scrollBy({
    left: scrollAmount,
    behavior: "smooth"
  });
});

btnLeft.addEventListener("click", () => {
  vista.scrollBy({
    left: -scrollAmount,
    behavior: "smooth"
  });
});