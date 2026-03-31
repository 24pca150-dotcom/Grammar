const express = require('express');
const router = express.Router();
const grammarController = require('../controllers/grammarController');

// GET /api/categories - Fetch all categories
router.get('/categories', grammarController.getCategories);

// GET /api/categories/:categoryId/questions - Fetch questions by category
router.get('/categories/:categoryId/questions', grammarController.getQuestionsByCategory);

module.exports = router;
