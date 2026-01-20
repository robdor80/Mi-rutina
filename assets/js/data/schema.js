// assets/js/data/schema.js

// Definimos qué campos debe tener un entreno OBLIGATORIAMENTE
export const workoutSchema = {
    titulo: "string",      // Ej: "Pierna Hipertrofia"
    duracion: "number",    // Ej: 60 (minutos)
    bloques: "array"       // Lista de ejercicios
};

// Definimos los tipos de bloques que acepta tu sistema
// Esto nos servirá luego para saber qué "pintar" en pantalla
export const blockTypes = {
    movilidad_activacion: "Movilidad (Antes)",
    fuerza: "Bloque de Fuerza",
    cardio: "Cardio / Metabólico",
    movilidad_descarga: "Estiramiento (Después)",
    recovery: "Recuperación Activa"
};