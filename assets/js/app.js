// assets/js/app.js
import { db } from "./firebase/init.js";

console.log("💪 App iniciada. DB conectada:", db);

// Aquí pronto llamaremos a renderWorkout() para pintar el entreno
const container = document.getElementById("workout-container");