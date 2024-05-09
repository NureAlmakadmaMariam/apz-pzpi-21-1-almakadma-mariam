// cardController.js
const Card = require('../models/cardModel');

exports.createCard = async (req, res) => {
    const { user_id } = req.body;

    try {
        const card = await Card.create({ user_id });
        res.status(201).json({ card, message: 'Card created successfully' });
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateCard = async (req, res) => {
    const { cardId } = req.params;
    const { user_id } = req.body;

    try {
        let card = await Card.findByPk(cardId);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        card.user_id = user_id;
        await card.save();

        card = await Card.findByPk(cardId);

        res.status(200).json({ card, message: 'Card updated successfully' });
    } catch (error) {
        console.error('Error updating card:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteCard = async (req, res) => {
    const { cardId } = req.params;

    try {
        const card = await Card.findByPk(cardId);
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        await card.destroy();

        res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};