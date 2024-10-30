const User = require('../models/nosql/User');

// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const { Nombre, email, Password, Edad, Ciudad, Intereses, PermiteRecibirOfertas } = req.body;
        
        // Crea una nueva instancia de User
        const newUser = new User({
            Nombre,
            email,
            Password,
            Edad,
            Ciudad,
            Intereses,
            PermiteRecibirOfertas
            // Role se establece por defecto en el modelo
        });
        
        // Guarda el usuario en la base de datos
        const savedUser = await newUser.save();
        
        // No devolver la contraseña en la respuesta
        const userResponse = savedUser.toObject();
        delete userResponse.Password;
        
        res.status(201).json(userResponse);
    } catch (error) {
        console.log(error);
        if (error.code === 11000) { // Error de duplicación (E-mail único)
            return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
        }
        res.status(500).json({ message: 'Error al crear el usuario.', error: error.message });
    }
};

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-Password'); // Excluir la contraseña
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios.', error: error.message });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-Password');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario.', error: error.message });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    try {
        const updates = { ...req.body };
        
        // Si se actualiza la contraseña, se manejará en el middleware 'pre' del modelo
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        
        // Actualiza los campos permitidos
        Object.keys(updates).forEach(key => {
            if (key !== 'Role') { // Evitar actualizar el campo Role mediante esta ruta
                user[key] = updates[key];
            }
        });
        
        const updatedUser = await user.save();
        
        const userResponse = updatedUser.toObject();
        delete userResponse.Password;
        
        res.status(200).json(userResponse);
    } catch (error) {
        if (error.code === 11000) { // Error de duplicación (E-mail único)
            return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
        }
        res.status(500).json({ message: 'Error al actualizar el usuario.', error: error.message });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).select('-Password');
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado.' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente.', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario.', error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}; 