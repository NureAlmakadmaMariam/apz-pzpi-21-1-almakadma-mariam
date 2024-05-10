// roomRouter.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');


router.post('/company/:companyId', roomController.createRoom);

router.get('/company/:companyId', roomController.getRoomsByCompany);
router.delete('/room/:roomId', roomController.deleteRoom);

module.exports = router;
