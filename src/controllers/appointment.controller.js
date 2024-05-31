const AppointmentModel = require('../models/appointment.model');

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await AppointmentModel.getAllAppointments();
    res.json(appointments);
  } catch (err) {
    res.status(500).send({ message: 'Error fetching appointments', error: err.message });
  }
};

exports.createAppointment = async (req, res) => {
  const { startDate, endDate, title, description, createdBy, status, name, email, phoneNumber } = req.body;

  try {
    const result = await AppointmentModel.createAppointment({
      startDate,
      endDate,
      title,
      description,
      createdBy,
      status,
      name,
      email,
      phoneNumber
    });
    res.status(201).send({ message: 'Appointment created', appointmentId: result.insertId });
  } catch (err) {
    res.status(500).send({ message: 'Error creating appointment', error: err.message });
  }
};

exports.rescheduleAppointment = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.body;

  try {
    const result = await AppointmentModel.rescheduleAppointment(id, startDate, endDate);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Appointment not found' });
    }
    res.send({ message: 'Appointment rescheduled', rescheduledAt: new Date() });
  } catch (err) {
    res.status(500).send({ message: 'Error rescheduling appointment', error: err.message });
  }
};
