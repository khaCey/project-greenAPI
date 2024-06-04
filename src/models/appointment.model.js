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
    this.name = appointment.name;
    this.email = appointment.email;
    this.phoneNumber = appointment.phoneNumber;
};

Appointment.getAllAppointments = async () => {
    try {
        const [rows, fields] = await dbConnect.query('SELECT * FROM appointment');
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
        appointmentReqData.status || 'reserved',
        appointmentReqData.name,
        appointmentReqData.email,
        appointmentReqData.phoneNumber
    ];

    try {
        const [result] = await dbConnect.query(
            `INSERT INTO appointment (startDate, endDate, title, description, createdBy, status, name, email, phoneNumber)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
            'UPDATE appointment SET startDate = ?, endDate = ?, rescheduledAt = ?, status = "rescheduled" WHERE id = ?',
            [startDate, endDate, rescheduledAt, id]
        );
        return result;
    } catch (err) {
        console.log('Error updating data', err);
        throw err;
    }
};

Appointment.cancelAppointment = async (id) => {
    try {
        const [result] = await dbConnect.query(
            'UPDATE appointment SET status = "cancelled" WHERE id = ?',
            [id]
        );
        return result;
    } catch (err) {
        console.log('Error updating data', err);
        throw err;
    }
};

Appointment.confirmAppointment = async (id) => {
    try {
        const [result] = await dbConnect.query(
            'UPDATE appointment SET status = "scheduled" WHERE id = ?',
            [id]
        );
        return result;
    } catch (err) {
        console.log('Error updating data', err);
        throw err;
    }
};

module.exports = Appointment;
