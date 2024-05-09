// cardRouter.js
const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

router.post('/', cardController.createCard);
router.put('/:cardId', cardController.updateCard);
router.delete('/:cardId', cardController.deleteCard);
router.get('/getUsersCard/:companyId', cardController.getCardsAndUsersByCompany);

module.exports = router;
