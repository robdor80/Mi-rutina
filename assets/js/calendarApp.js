// Referencias a los elementos del DOM (del HTML que me has pasado)
const calendarGrid = document.getElementById('calendar-grid');
const currentMonthLabel = document.getElementById('current-month-label');
const prevBtn = document.getElementById('prev-month');
const nextBtn = document.getElementById('next-month');

// Elementos del Modal
const modal = document.getElementById('workout-modal');
const modalBody = document.getElementById('modal-body-container');
const closeModal = document.getElementById('close-modal');

// Estado actual (Fecha que estamos viendo)
let currentDate = new Date();

// --- DATOS DE EJEMPLO (Simulamos una base de datos) ---
// En el futuro, esto vendrá de localStorage o una API.
// Formato de clave: "YYYY-MM-DD"
const workoutData = {
    "2023-10-15": { title: "Pecho y Tríceps", details: "Press banca: 80kg x 8..." },
    "2023-10-18": { title: "Pierna", details: "Sentadilla: 100kg x 5..." },
    // Nota: El código adaptará esto a la fecha actual automáticamente para que veas algo
};

// Función principal: Pintar el calendario
function renderCalendar() {
    // Limpiamos la cuadrícula previa
    calendarGrid.innerHTML = "";

    // Obtenemos año y mes actual del estado
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Actualizamos el título (Ej: "Octubre 2023")
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    currentMonthLabel.textContent = `${monthNames[month]} ${year}`;

    // Cálculos matemáticos de fechas
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Día de la semana (0=Domingo, 1=Lunes...)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Total días (28, 30, 31)

    // AJUSTE: En JS el domingo es 0, pero en tu calendario (Lunes primero) el domingo es 6.
    // Convertimos para que Lunes=0, Domingo=6
    let startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // 1. Pintar huecos vacíos antes del día 1
    for (let i = 0; i < startingDay; i++) {
        const emptyCell = document.createElement('div');
        // No le ponemos clase 'day-cell' para que no tenga borde ni fondo si no quieres,
        // o le ponemos una clase 'empty' si quieres estilizarla.
        calendarGrid.appendChild(emptyCell);
    }

    // 2. Pintar los días del mes (1 al 31)
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day-cell');
        
        // Creamos el número del día
        const dayNumber = document.createElement('span');
        dayNumber.textContent = day;
        dayCell.appendChild(dayNumber);

        // Generamos la clave de fecha para buscar datos: "YYYY-MM-DD"
        // Truco: padStart(2, '0') asegura que sea "05" en vez de "5"
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // VERIFICAMOS SI HAY ENTRENO
        // (Aquí conectamos con tus datos ficticios o reales)
        if (workoutData[dateKey] || localStorage.getItem(dateKey)) {
            dayCell.classList.add('has-workout');
            
            // Añadimos el puntito azul (clase .dot que vi en tu CSS)
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dayCell.appendChild(dot);

            // Evento click para abrir modal
            dayCell.addEventListener('click', () => openModal(dateKey));
        }

        calendarGrid.appendChild(dayCell);
    }
}

// --- FUNCIONES DEL MODAL ---
function openModal(dateKey) {
    // Buscamos datos (primero en el objeto de prueba, luego en localStorage)
    const data = workoutData[dateKey] || JSON.parse(localStorage.getItem(dateKey));
    
    if (data) {
        let contentHtml = `<h3>Entreno del ${dateKey}</h3>`;
        // Si es un objeto simple de prueba
        if (data.title) {
            contentHtml += `<p><strong>${data.title}</strong></p><p>${data.details}</p>`;
        } 
        // Si guardaste un JSON complejo en localStorage
        else {
            contentHtml += `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        }
        
        modalBody.innerHTML = contentHtml;
        modal.classList.add('active'); // Clase de tu CSS para mostrarlo
    }
}

// Cerrar modal
closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Cerrar modal si clicamos fuera del contenido (en el fondo oscuro)
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// --- CONTROLES DE MES ---
prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// --- INICIALIZACIÓN ---
// Ejecutamos la función por primera vez al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Truco: Añado un dato de prueba para HOY para que veas que funciona
    const today = new Date();
    const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    workoutData[key] = { title: "DEMO DE HOY", details: "Si ves esto, el JS funciona." };

    renderCalendar();
});