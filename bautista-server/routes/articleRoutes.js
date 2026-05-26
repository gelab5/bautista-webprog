const express = require('express');
const router = express.Router();
const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  toggleStatus,
} = require('../controllers/articleController');

router.get('/', getArticles);
router.get('/:name', getArticle);
router.post('/', createArticle);
router.put('/:id', updateArticle);
router.patch('/:id/toggle-status', toggleStatus);

module.exports = router;