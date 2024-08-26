const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');
const authMiddleware = require('../middlewares/AuthMiddleware');

router.post('/clients', authMiddleware, ClientController.createClient);
router.get('/clients', authMiddleware, ClientController.getClients);
router.get('/clients/:id', authMiddleware, ClientController.getClientById);
router.put('/clients/:id', authMiddleware, ClientController.updateClient);
router.delete('/clients/:id', authMiddleware, ClientController.deleteClient);

module.exports = router;
