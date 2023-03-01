const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

router.get('/addappointment', userController.getAppointment);
router.post('/addappointment', userController.addAppointment);
router.get('/addappointment/:id', userController.getEditAppointment);
router.put('/addappointment/:id', userController.updateAppointment);
router.delete('/addappointment/:id', userController.deleteAppointment);

module.exports = router;