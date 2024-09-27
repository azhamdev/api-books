const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth')
const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('./controller')

router.get('/categories', auth, getAllCategories);
router.post('/categories', auth, createCategory);
router.put('/categories/:id', auth, updateCategory);
router.delete('/categories/:id', auth, deleteCategory);

module.exports = router; 
