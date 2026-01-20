// assets/js/render/renderWorkout.js

// Diccionario de colores (igual que antes)
const typeLabels = {
    movilidad_activacion: { text: "Movilidad (Antes)", color: "var(--accent)" },
    fuerza: { text: "Fuerza Principal", color: "var(--primary)" },
    cardio: { text: "Cardio", color: "#f59e0b" },
    movilidad_descarga: { text: "Vuelta a la calma", color: "#10b981" },
    recovery: { text: "Recuperación", color: "#8b5cf6" }
};

export function renderWorkout(data) {
    const container = document.getElementById("workout-container");
    
    // 1. Limpiamos la pantalla
    container.innerHTML = "";

    // 2. Pintamos el Título del Entreno
    const header = document.createElement("div");
    header.className = "workout-header";
    header.innerHTML = `
        <h2 style="font-size: 1.5rem; margin-bottom: 5px;">${data.titulo}</h2>
        <p style="color: #888;">⏱️ ${data.duracion} min aprox.</p>
    `;
    container.appendChild(header);

    // 3. Pintamos cada Bloque (tarjetas)
    data.bloques.forEach(bloque => {
        const card = document.createElement("div");
        card.className = "card block-card";
        // Estilos rápidos para que se vea bien ya
        card.style.marginTop = "20px";
        card.style.background = "#1c1e24";
        card.style.padding = "15px";
        card.style.borderRadius = "12px";

        const typeInfo = typeLabels[bloque.tipo] || { text: "Bloque", color: "#fff" };
        
        let htmlContent = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span style="color:${typeInfo.color}; font-size:0.8rem; font-weight:bold; text-transform:uppercase;">${typeInfo.text}</span>
            </div>
            <h3 style="font-size:1.1rem; margin-bottom:5px;">${bloque.titulo}</h3>
        `;

        if (bloque.notas) {
            htmlContent += `<p style="color:#aaa; font-size:0.9rem; font-style:italic; margin-bottom:15px;">💡 ${bloque.notas}</p>`;
        }

        htmlContent += `<div class="exercise-list">`;
        
        bloque.ejercicios.forEach(ej => {
            let details = "";
            if (ej.series) details += `${ej.series} x `;
            if (ej.reps) details += `${ej.reps}`;
            if (ej.tiempo) details += `${ej.tiempo}`;

            htmlContent += `
                <div style="display:flex; justify-content:space-between; padding: 8px 0; border-bottom: 1px solid #333;">
                    <span>${ej.nombre}</span>
                    <span style="font-weight:bold; color: var(--primary);">${details}</span>
                </div>
            `;
        });

        htmlContent += `</div>`;
        card.innerHTML = htmlContent;
        container.appendChild(card);
    });
}