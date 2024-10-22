const ComercioDetails = require("../models/nosql/comerceDetails");
const { validationResult } = require("express-validator");

// Función para manejar errores de validación
const handleValidationErrors = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.status = 400;
        error.details = errors.array();
        throw error;
    }
};

// Visitar una página web por su ID
const getComerceDetailsById = async (req, res, next) => {
    try {
        handleValidationErrors(req);
        const { id } = req.params;
        const comercio = await ComercioDetails.findOne({ _id: id, isArchived: false });
        if (!comercio) {
            return res.status(404).json({ message: "Comercio no encontrado" });
        }
        res.json(comercio);
    } catch (error) {
        next(error);
    }
};

// Crear una nueva página web
const createComerceDetails = async (req, res, next) => {
    try {
        handleValidationErrors(req);
        const newComercio = new ComercioDetails(req.body);
        const savedComercio = await newComercio.save();
        res.status(201).json(savedComercio);
    } catch (error) {
        next(error);
    }
};

// Modificar una página web
const updateComerceDetails = async (req, res, next) => {
    try {
        handleValidationErrors(req);
        const { id } = req.params;
        const updatedComercio = await ComercioDetails.findOneAndUpdate(
            { _id: id, isArchived: false },
            req.body,
            { new: true }
        );
        if (!updatedComercio) {
            return res.status(404).json({ message: "Comercio no encontrado o está archivado" });
        }
        res.json(updatedComercio);
    } catch (error) {
        next(error);
    }
};

// Archivar una página web (Borrado lógico)
const archiveComerceDetails = async (req, res, next) => {
    try {
        handleValidationErrors(req);
        const { id } = req.params;
        const archivedComercio = await ComercioDetails.findOneAndUpdate(
            { _id: id, isArchived: false },
            { isArchived: true },
            { new: true }
        );
        if (!archivedComercio) {
            return res.status(404).json({ message: "Comercio no encontrado o ya está archivado" });
        }
        res.json({ message: "Comercio archivado exitosamente" });
    } catch (error) {
        next(error);
    }
};

// Eliminar una página web (Borrado físico)
const deleteComerceDetails = async (req, res, next) => {
    try {
        handleValidationErrors(req);
        const { id } = req.params;
        const deletedComercio = await ComercioDetails.findByIdAndDelete(id);
        if (!deletedComercio) {
            return res.status(404).json({ message: "Comercio no encontrado" });
        }
        res.json({ message: "Comercio eliminado físicamente exitosamente" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getComerceDetailsById,
    createComerceDetails,
    updateComerceDetails,
    archiveComerceDetails,
    deleteComerceDetails
};
