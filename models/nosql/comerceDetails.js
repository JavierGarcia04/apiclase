const mongoose = require("mongoose");

const comercioDetailsSchema = new mongoose.Schema(
    {
        Ciudad: { type: String, required: true },
        Actividad: { type: String, required: true },
        Título: { type: String, required: true },
        Resumen: { type: String, required: true },
        textos: [{ type: String }],
        imágenes: [{ type: String }],
        reseñasUsuarios: {
            scoring: { type: Number, min: 0, max: 5, default: 0 },
            numeroPuntuacionesTotales: { type: Number, default: 0 },
            reseñas: [{ type: String }]
        },
        isArchived: { type: Boolean, default: false }
    },
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("ComercioDetails", comercioDetailsSchema);
