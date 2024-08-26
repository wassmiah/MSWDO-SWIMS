const express = require('express');
const { createCase, getCases, deleteCase } = require('../controllers/CaseController');
const authMiddleware = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.post('/cases', authMiddleware, createCase);
router.get('/cases', authMiddleware, getCases);
router.delete('/cases/:caseId', authMiddleware, deleteCase);

module.exports = router;
