// assets/js/render/renderWorkout.js

const typeLabels = {
    movilidad_activacion: { text: "Movilidad (Antes)", color: "var(--accent)" },
    fuerza: { text: "Fuerza Principal", color: "var(--primary)" },
    cardio: { text: "Cardio", color: "#f59e0b" },
    movilidad_descarga: { text: "Vuelta a la calma", color: "#10b981" },
    recovery: { text: "Recuperación", color: "#8b5cf6" }
};

// Aceptamos un segundo parámetro (containerId)
export function renderWorkout(data, containerId = "workout-container") {
    const container = document.getElementById(containerId);
    
    // --- ESTA ES LA LÍNEA MÁGICA ---
    // Si no encuentra la caja, se detiene suavemente en vez de dar error.
    if (!container) {
        // console.warn("No se encontró el contenedor:", containerId); 
        return;
    }

    container.innerHTML = "";

    // Header
    const header = document.createElement("div");
    header.className = "workout-header";
    header.innerHTML = `
        <h2 style="font-size: 1.5rem; margin-bottom: 5px;">${data.titulo}</h2>
        <p style="color: #888;">⏱️ ${data.duracion} min aprox.</p>
    `;
    container.appendChild(header);

    // Bloques
    if (data.bloques && Array.isArray(data.bloques)) {
        data.bloques.forEach(bloque => {
            const card = document.createElement("div");
            card.className = "card block-card";
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
            
            if (bloque.ejercicios) {
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
            }

            htmlContent += `</div>`;
            card.innerHTML = htmlContent;
            container.appendChild(card);
        });
    }
}