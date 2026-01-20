/* assets/js/homeApp.js - VERSIÓN ROBUSTA */

document.addEventListener('DOMContentLoaded', () => {
    console.log("⚡ homeApp.js cargado correctamente");

    // --- ELEMENTOS DOM ---
    const menuBtn = document.getElementById('menu-btn');
    const sideMenu = document.getElementById('side-menu');
    const closeMenuBtn = document.getElementById('close-menu');

    const startSessionBtn = document.getElementById('start-session-btn');
    const selectionModal = document.getElementById('selection-modal');
    const closeSelectionModal = document.getElementById('close-selection-modal');

    // --- 1. LÓGICA DEL MENÚ LATERAL ---
    if (menuBtn && sideMenu) {
        menuBtn.addEventListener('click', () => {
            console.log("🍔 Menú hamburguesa clickado");
            sideMenu.classList.add('active');
        });
    }

    if (closeMenuBtn && sideMenu) {
        closeMenuBtn.addEventListener('click', () => {
            sideMenu.classList.remove('active');
        });
    }

    // --- 2. LÓGICA DEL MODAL DE SELECCIÓN (EL BOTÓN AZUL) ---
    if (startSessionBtn && selectionModal) {
        startSessionBtn.addEventListener('click', () => {
            console.log("🔵 Botón EMPEZAR clickado");
            selectionModal.classList.add('active'); // Añade la clase que lo hace visible
        });
    } else {
        console.error("❌ ERROR: No encuentro el botón 'start-session-btn' o el modal 'selection-modal' en el HTML.");
    }

    if (closeSelectionModal && selectionModal) {
        closeSelectionModal.addEventListener('click', () => {
            selectionModal.classList.remove('active');
        });
    }

    // Cerrar al hacer clic fuera
    if (selectionModal) {
        selectionModal.addEventListener('click', (e) => {
            if (e.target === selectionModal) {
                selectionModal.classList.remove('active');
            }
        });
    }
});