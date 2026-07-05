// Modo estricto
"use strict";

// Esperar a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
    init();
});

// Inicialización principal
function init() {
    console.log("Sitio cargado correctamente");
    
    // Llamadas iniciales
    // ejemplo:
    // setupMenu();
}

// Funciones reutilizables
function exampleFunction() {
    // código
}

// Manejo de errores global
window.addEventListener("error", (e) => {
    console.error("Error detectado:", e.message);
});