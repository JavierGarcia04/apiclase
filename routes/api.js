const express = require('express');
const router = express.Router();

router.post('/comerce', async (req, res) => {
    try {
        // Tu lógica actual
        const result = await comerceModel.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            message: 'Error interno del servidor',
            error: error.message 
        });
    }
}); 

module.exports = router; 