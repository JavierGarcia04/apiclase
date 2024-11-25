const express = require("express");
const router = express.Router();
const comproceDetailsController = require("../controllers/comerceDetailsController");
const validators = require("../validators/comerceDetailsValidator");

// Ruta para obtener todas las páginas web
router.get(
    "/",
    comproceDetailsController.getAllComerceDetails
);

// Ruta para visitar una página web por su ID
router.get(
    "/:id",
    validators.idParamValidator,
    comproceDetailsController.getComerceDetailsById
);


// Ruta para crear una nueva página web
router.post(
    "/",
    validators.createComerceDetailsValidator,
    comproceDetailsController.createComerceDetails
);

// Ruta para modificar una página web
router.put(
    "/:id",
    validators.updateComerceDetailsValidator,
    comproceDetailsController.updateComerceDetails
);

// Ruta para archivar una página web (borrado lógico)
router.patch(
    "/:id/archive",
    validators.idParamValidator,
    comproceDetailsController.archiveComerceDetails
);

// Ruta para eliminar una página web (borrado físico)
router.delete(
    "/:id",
    validators.idParamValidator,
    comproceDetailsController.deleteComerceDetails
);

module.exports = router;
