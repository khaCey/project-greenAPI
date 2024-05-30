const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');

router.get('/', appointmentController.getAppointments);
router.post('/', appointmentController.createAppointment);
router.put('/:id/reschedule', appointmentController.rescheduleAppointment); // Route for rescheduling

module.exports = router;
