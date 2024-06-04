const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');

router.get('/', appointmentController.getAppointments);
router.post('/', appointmentController.createAppointment);
router.put('/:id/reschedule', appointmentController.rescheduleAppointment); // Route for rescheduling
router.put('/:id/cancel', appointmentController.cancelAppointment); // Route for cancelling
router.put('/:id/confirm', appointmentController.confirmAppointment); // Route for confirming

module.exports = router;
