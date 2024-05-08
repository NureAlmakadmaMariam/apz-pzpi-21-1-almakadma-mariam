// workHoursSettingsRouter.js
const express = require('express');
const router = express.Router();
const workHoursSettingsController = require('../controllers/workHoursSettingsController');

router.get('/:company_id', workHoursSettingsController.getAllByCompanyId);
router.get('/', workHoursSettingsController.getAll);
router.put('/:setting_id', workHoursSettingsController.updateHoursSettings);
router.post('/', workHoursSettingsController.create);

module.exports = router;
