const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/comerce");
const comerce = require("../models/nosql/comerce");

// Ruta PUT para actualizar un comercio por CIF
router.put('/cif/:cif', async (req, res) => {
    try {
        console.log("parte");
        const { cif } = req.params;

        // Buscar comercio por CIF
        let comercio = await comerce.findOneAndUpdate({ CIF: cif },req.body);
        
        res.status(200).json({ message: 'Comercio actualizado exitosamente.', comercio });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el comercio.', error });
    }
});
router.get('/cif/:cif', async (req, res) => {
    try {
        console.log("parte");
        const { cif } = req.params;

        // Buscar comercio por CIF
        let comercio = await comerce.findOne({ CIF: cif },req.body);
        
        res.status(200).json({ message: 'Comercio actualizado exitosamente.', comercio });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el comercio.', error });
    }
});

router.delete('/cif/:cif', async (req, res) => {
    try {
        console.log("parte");
        const { cif } = req.params;

        // Buscar comercio por CIF
        let comercio = await comerce.findOneAndDelete({ CIF: cif },req.body);
        
        res.status(200).json({ message: 'Comercio actualizado exitosamente.', comercio });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el comercio.', error });
    }
});

router.get('/ciforder', async (req, res) => {
    try {
        // Obtener todos los comercios y ordenarlos por CIF de manera ascendente
        const comercios = await comerce.find({}).sort({CIF:"asc"});

        res.status(200).json(comercios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los comercios.', error });
    }
});

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
