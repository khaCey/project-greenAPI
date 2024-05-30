const dbConnect = require('../../config/db.config');

var Student = function (student) {
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.email = student.email;
    this.phone = student.phone;
    this.dateOfCreation = student.dateOfCreation;
    this.dateOfUpdate = student.dateOfUpdate;
};

Student.getAllStudents = async () => {
    try {
        const [rows, fields] = await dbConnect.query('SELECT * FROM `student`');
        return rows;
    } catch (err) {
        console.log('Error whilst fetching students', err);
        throw err;
    }
};

Student.getStudentByID = async (id) => {
    try {
        const [rows, fields] = await dbConnect.query('SELECT * FROM `student` WHERE `studentID` = ?', [id]);
        return rows;
    } catch (err) {
        console.log('Error whilst fetching student by ID', err);
        throw err;
    }
};

Student.createStudent = async (studentReqData) => {
    const data = [
        studentReqData.firstName,
        studentReqData.lastName,
        studentReqData.email,
        studentReqData.phone,
        studentReqData.dateOfCreation,
        studentReqData.dateOfUpdate
    ];

    try {
        const [result] = await dbConnect.query(
            `INSERT INTO \`student\` (\`firstName\`, \`lastName\`, \`email\`, \`phone\`, \`dateOfCreation\`, \`dateOfUpdate\`)
            VALUES (?, ?, ?, ?, ?, ?)`,
            data
        );
        return result;
    } catch (err) {
        console.log('Error inserting data', err);
        throw err;
    }
};

Student.updateStudent = async (id, studentReqData) => {
    const data = [
        studentReqData.firstName,
        studentReqData.lastName,
        studentReqData.email,
        studentReqData.phone,
        studentReqData.dateOfUpdate,
        id,
    ];

    try {
        const [result] = await dbConnect.query(
            'UPDATE `student` SET `firstName` = ?, `lastName` = ?, `email` = ?, `phone` = ?, `dateOfUpdate` = ? WHERE `studentID` = ?',
            data
        );
        return result;
    } catch (err) {
        console.log('Error Updating Student', err);
        throw err;
    }
};

Student.deleteStudent = async (id) => {
    try {
        const [result] = await dbConnect.query('DELETE FROM `student` WHERE `studentID` = ?', [id]);
        return result;
    } catch (err) {
        console.log('Error Deleting Student', err);
        throw err;
    }
};

module.exports = Student;
