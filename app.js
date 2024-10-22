const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes"); // Importa el router centralizado
require("dotenv").config();
const app = express();

const dbConnect = require("./config/mongo");

// Middleware para parsear JSON
app.use(express.json());

// Conectar a MongoDB
dbConnect();

// Usar las rutas centralizadas
app.use("/api", routes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || "Error interno del servidor",
        details: err.details || []
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
