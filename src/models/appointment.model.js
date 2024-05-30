const dbConnect = require('../../config/db.config');

var Appointment = function (appointment) {
    this.startDate = appointment.startDate;
    this.endDate = appointment.endDate;
    this.title = appointment.title;
    this.description = appointment.description;
    this.createdBy = appointment.createdBy;
    this.status = appointment.status;
    this.rescheduledAt = appointment.rescheduledAt;
    this.createdAt = appointment.createdAt;
    this.updatedAt = appointment.updatedAt;
};

Appointment.getAllAppointments = async () => {
    try {
        const [rows, fields] = await dbConnect.query('SELECT * FROM appointments');
        return rows;
    } catch (err) {
        console.log('Error whilst fetching appointments', err);
        throw err;
    }
};

Appointment.createAppointment = async (appointmentReqData) => {
    const data = [
        appointmentReqData.startDate,
        appointmentReqData.endDate,
        appointmentReqData.title,
        appointmentReqData.description,
        appointmentReqData.createdBy,
        appointmentReqData.status || 'scheduled'
    ];

    try {
        const [result] = await dbConnect.query(
            `INSERT INTO appointments (startDate, endDate, title, description, createdBy, status)
            VALUES (?, ?, ?, ?, ?, ?)`,
            data
        );
        return result;
    } catch (err) {
        console.log('Error inserting data', err);
        throw err;
    }
};

Appointment.rescheduleAppointment = async (id, startDate, endDate) => {
    const rescheduledAt = new Date();

    try {
        const [result] = await dbConnect.query(
            'UPDATE appointments SET startDate = ?, endDate = ?, rescheduledAt = ? WHERE id = ?',
            [startDate, endDate, rescheduledAt, id]
        );
        return result;
    } catch (err) {
        console.log('Error updating data', err);
        throw err;
    }
};

module.exports = Appointment;
