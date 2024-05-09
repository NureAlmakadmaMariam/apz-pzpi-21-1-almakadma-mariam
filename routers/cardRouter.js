// cardRouter.js
const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.post('/', cardController.createCard);
router.put('/:cardId', cardController.updateCard);

module.exports = router;
