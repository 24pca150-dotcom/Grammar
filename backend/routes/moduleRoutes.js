const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController');

// POST /api/modules - Create a new module
router.post('/modules', moduleController.createModule);

// GET /api/modules - Fetch all modules
router.get('/modules', moduleController.getAllModules);

// DELETE /api/modules/:id - Remove a module
router.delete('/modules/:id', moduleController.deleteModule);

module.exports = router;
