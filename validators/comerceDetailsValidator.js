const { body, param } = require("express-validator");

// Validador para crear una página web
const createComerceDetailsValidator = [
    body("Ciudad").isString().withMessage("Ciudad debe ser una cadena de texto").notEmpty(),
    body("Actividad").isString().withMessage("Actividad debe ser una cadena de texto").notEmpty(),
    body("Título").isString().withMessage("Título debe ser una cadena de texto").notEmpty(),
    body("Resumen").isString().withMessage("Resumen debe ser una cadena de texto").notEmpty(),
    body("textos").optional().isArray().withMessage("textos debe ser un array de cadenas de texto"),
    body("imágenes").optional().isArray().withMessage("imágenes debe ser un array de cadenas de texto"),
    body("reseñasUsuarios.scoring").optional().isFloat({ min: 0, max: 5 }).withMessage("Scoring debe estar entre 0 y 5"),
    body("reseñasUsuarios.numeroPuntuacionesTotales").optional().isInt({ min: 0 }).withMessage("Número de puntuaciones totales debe ser un entero positivo"),
    body("reseñasUsuarios.reseñas").optional().isArray().withMessage("Reseñas debe ser un array de cadenas de texto")
];

// Validador para obtener, archivar y eliminar por ID
const idParamValidator = [
    param("id").isMongoId().withMessage("ID debe ser un Mongo ID válido")
];

// Validador para actualizar una página web
const updateComerceDetailsValidator = [
    param("id").isMongoId().withMessage("ID debe ser un Mongo ID válido"),
    body("Ciudad").optional().isString().withMessage("Ciudad debe ser una cadena de texto"),
    body("Actividad").optional().isString().withMessage("Actividad debe ser una cadena de texto"),
    body("Título").optional().isString().withMessage("Título debe ser una cadena de texto"),
    body("Resumen").optional().isString().withMessage("Resumen debe ser una cadena de texto"),
    body("textos").optional().isArray().withMessage("textos debe ser un array de cadenas de texto"),
    body("imágenes").optional().isArray().withMessage("imágenes debe ser un array de cadenas de texto"),
    body("reseñasUsuarios.scoring").optional().isFloat({ min: 0, max: 5 }).withMessage("Scoring debe estar entre 0 y 5"),
    body("reseñasUsuarios.numeroPuntuacionesTotales").optional().isInt({ min: 0 }).withMessage("Número de puntuaciones totales debe ser un entero positivo"),
    body("reseñasUsuarios.reseñas").optional().isArray().withMessage("Reseñas debe ser un array de cadenas de texto")
];

module.exports = {
    createComerceDetailsValidator,
    idParamValidator,
    updateComerceDetailsValidator
};
