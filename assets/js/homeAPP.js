/* assets/js/homeApp.js */

// --- ELEMENTOS DOM ---
const menuBtn = document.getElementById('menu-btn');
const sideMenu = document.getElementById('side-menu');
const closeMenuBtn = document.getElementById('close-menu');

const startSessionBtn = document.getElementById('start-session-btn');
const selectionModal = document.getElementById('selection-modal');
const closeSelectionModal = document.getElementById('close-selection-modal');

const lastWorkoutName = document.getElementById('last-workout-name');
const lastWorkoutDate = document.getElementById('last-workout-date');

// --- 1. LÓGICA DEL MENÚ LATERAL ---
function toggleMenu() {
    sideMenu.classList.toggle('active');
}

menuBtn.addEventListener('click', toggleMenu);
closeMenuBtn.addEventListener('click', toggleMenu);

// Cerrar menú si clicamos fuera (en la parte transparente si hubiera overlay, 
// o simplemente al hacer scroll a veces se prefiere cerrar)
// Por ahora simple: botón abrir y botón cerrar.


// --- 2. LÓGICA DEL MODAL DE SELECCIÓN ---
startSessionBtn.addEventListener('click', () => {
    selectionModal.classList.add('active');
});

closeSelectionModal.addEventListener('click', () => {
    selectionModal.classList.remove('active');
});

// Cerrar al hacer clic fuera del modal
selectionModal.addEventListener('click', (e) => {
    if (e.target === selectionModal) {
        selectionModal.classList.remove('active');
    }
});


// --- 3. DATOS DEL DASHBOARD (Simulados) ---
// Aquí leeríamos de localStorage para ver qué hiciste la última vez
function loadDashboardData() {
    // Simulamos que hay datos guardados
    // const lastWorkout = JSON.parse(localStorage.getItem('lastWorkout'));
    
    // Como aún no tenemos base de datos real, ponemos datos "dummy"
    const mockData = {
        name: "Pecho y Tríceps",
        date: "2023-10-24" // Hace unos días
    };

    // Pintamos en pantalla
    if (mockData) {
        lastWorkoutName.textContent = mockData.name;
        lastWorkoutDate.textContent = `Realizado el: ${mockData.date}`;
    } else {
        lastWorkoutName.textContent = "Sin registros";
        lastWorkoutDate.textContent = "Empieza tu primer entreno hoy";
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadDashboardData();
    
    // Listener para los botones de acceso rápido (Grid)
    const shortcuts = document.querySelectorAll('.shortcut-btn');
    shortcuts.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.target.getAttribute('data-type');
            alert(`Aquí iniciaríamos la rutina de: ${type.toUpperCase()}`);
            // Aquí redirigiremos a la página de entreno:
            // window.location.href = `workout.html?type=${type}`;
        });
    });
});