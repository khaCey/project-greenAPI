const dbConnect = require('../../config/db.config');
const bcrypt = require('bcryptjs');

var Employee = function (employee) {
    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
    this.email = employee.email;
    this.phone = employee.phone;
    this.privileges = employee.privileges;
    this.password = employee.password;
    this.dateOfCreation = employee.dateOfCreation;
    this.dateOfUpdate = employee.dateOfUpdate;
};

Employee.getAllEmployee = async () => {
    try {
        const [rows, fields] = await dbConnect.query('SELECT * FROM `employee`');
        console.log('Query Result:', rows);
        return rows;
    } catch (err) {
        console.log('Error whilst fetching employees', err);
        throw err;
    }
};

Employee.getAllEmployeeDisplayable = async () => {
    try {
        const [rows, fields] = await dbConnect.query('SELECT * FROM `employee` WHERE `Displayable` = true');
        console.log('Employees fetched successfully');
        return rows;
    } catch (err) {
        console.log('Error whilst fetching employees', err);
        throw err;
    }
};

Employee.getEmployeeByID = async (id) => {
    try {
        const [rows, fields] = await dbConnect.query('SELECT * FROM `employee` WHERE `employeeID` = ?', [id]);
        return rows;
    } catch (err) {
        console.log('Error whilst fetching employee by ID', err);
        throw err;
    }
};

Employee.createEmployee = async (employeeReqData) => {
    const data = [
        employeeReqData.firstName,
        employeeReqData.lastName,
        employeeReqData.email,
        employeeReqData.phone,
        employeeReqData.privileges,
        employeeReqData.password,
        employeeReqData.dateOfCreation,
        employeeReqData.dateOfUpdate
    ];

    try {
        const [result] = await dbConnect.query(
            `INSERT INTO \`employee\` (\`firstName\`, \`lastName\`, \`email\`, \`phone\`, \`privileges\`, \`password\`, \`dateOfCreation\`, \`dateOfUpdate\`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            data
        );
        console.log('Employee created!');
        return result;
    } catch (err) {
        console.log('Error inserting data', err);
        throw err;
    }
};

Employee.updateEmployee = async (id, employeeReqData) => {
    const data = [
        employeeReqData.firstName,
        employeeReqData.lastName,
        employeeReqData.address,
        employeeReqData.email,
        employeeReqData.phone,
        employeeReqData.privileges,
        employeeReqData.password,
        employeeReqData.dateOfBirth,
        employeeReqData.dateOfUpdate,
        id,
    ];

    try {
        const [result] = await dbConnect.query(
            'UPDATE `employee` SET `firstName` = ?, `lastName` = ?, `address` = ?, `email` = ?, `phone` = ?, `privileges` = ?, `password` = ?, `dateOfBirth` = ?, `dateOfUpdate` = ? WHERE `employeeID` = ?',
            data
        );
        console.log('Updated');
        return result;
    } catch (err) {
        console.log('Error Updating Employee', err);
        throw err;
    }
};

Employee.deleteEmployee = async (id) => {
    try {
        const [result] = await dbConnect.query('DELETE FROM `employee` WHERE `employeeID` = ?', [id]);
        console.log('DELETED');
        return result;
    } catch (err) {
        console.log('Error Deleting Employee', err);
        throw err;
    }
};

Employee.login = async (id, inputPass) => {
    const numId = Number(id);
    if (isNaN(numId)) {
        console.log("ID must be a number");
        throw new Error('ID must be a number');
    }

    try {
        const [rows, fields] = await dbConnect.query('SELECT * FROM `employee` WHERE `employeeID` = ?', [numId]);
        if (rows.length) {
            const auth = await bcrypt.compare(inputPass, rows[0].password);
            return auth;
        } else {
            console.log("ID not found");
            throw new Error('No employee with the given ID found');
        }
    } catch (err) {
        console.log('Error whilst fetching employee by ID', err);
        throw err;
    }
};

module.exports = Employee;
