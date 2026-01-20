// assets/js/app.js
import { db } from "./firebase/init.js";
import { collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// IMPORTANTE: Ahora apuntamos al archivo que sí tienes
import { renderWorkout } from "./render/renderWorkout.js";

const container = document.getElementById("workout-container");

async function loadTodaysWorkout() {
    try {
        console.log("📥 Buscando último entreno...");

        // Pedimos el último entreno subido a la base de datos
        const q = query(
            collection(db, "workouts"),
            orderBy("createdAt", "desc"),
            limit(1)
        );

        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            container.innerHTML = "<p>No hay entrenos programados aún.</p>";
            return;
        }

        // Si hay entreno, lo mandamos al "Pintor"
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("✅ Entreno encontrado:", data.titulo);
            renderWorkout(data);
        });

    } catch (error) {
        console.error("❌ Error cargando entreno:", error);
        container.innerHTML = `<p style="color:red">Error cargando datos. Revisa la consola.</p>`;
    }
}

// Arrancar al cargar la página
loadTodaysWorkout();