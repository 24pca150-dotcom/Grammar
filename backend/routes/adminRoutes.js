const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// GET /api/admin/stats - Basic summary metrics
router.get('/stats', adminController.getStats);

// GET /api/admin/users - Paginated user list
router.get('/users', adminController.getUsers);

// GET /api/admin/xp-flow - Data for the chart
router.get('/xp-flow', adminController.getXpFlow);

module.exports = router;
