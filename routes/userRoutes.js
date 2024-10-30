const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { userRegistrationValidator, userUpdateValidator } = require('../validators/userValidator');
const validate = require('../middleware/validationMiddleware');

// Rutas CRUD para usuarios

// Crear un nuevo usuario
router.post(
    '/users',
    userRegistrationValidator,
    validate,
    userController.createUser
);

// Obtener todos los usuarios
router.get(
    '/users',
    userController.getAllUsers
);

// Obtener un usuario por ID
router.get(
    '/users/:id',
    userController.getUserById
);

// Actualizar un usuario
router.put(
    '/users/:id',
    userUpdateValidator,
    validate,
    userController.updateUser
);

// Eliminar un usuario
router.delete(
    '/users/:id',
    userController.deleteUser
);

module.exports = router; 