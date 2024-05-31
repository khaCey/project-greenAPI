const EmployeeModel = require('../models/employee.model');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.getEmployeeList = async (req, res) => {
  try {
      console.log('Fetching employee list');
      const employees = await EmployeeModel.getAllEmployee();
      console.log('Employees:', employees);
      res.send(employees);
  } catch (err) {
      console.log('Error:', err);
      res.status(500).send(err);
  }
};

exports.getEmployeeListDisplayable = async (req, res) => {
  try {
    console.log('employee list');
    const employees = await EmployeeModel.getAllEmployeeDisplayable();
    res.send(employees);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getEmployeeByID = async (req, res) => {
  try {
    const employee = await EmployeeModel.getEmployeeByID(req.params.id);
    res.send(employee);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createNewEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, privileges } = req.body;
    
    // Check for missing required fields
    if (!firstName || !lastName || !email || !phone || !password || !privileges) {
      console.log('Invalid Data');
      return res.status(400).send({ success: false, message: 'All fields are required.' });
    }

    console.log('Request Body:', req.body);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create employee data with hashed password
    const employeeReqData = new EmployeeModel({
      firstName,
      lastName,
      email,
      phone,
      privileges,
      password: hashedPassword,
      dateOfCreation: new Date(),
      dateOfUpdate: new Date()
    });

    console.log('Valid Data:', employeeReqData);

    // Create the employee
    const employee = await EmployeeModel.createEmployee(employeeReqData);

    res.json({ status: true, message: 'Employee Created', data: employee });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send({ success: false, message: 'Server Error', error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employeeReqData = new EmployeeModel(req.body);
    employeeReqData.dateOfUpdate = new Date();
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ success: false, message: 'Invalid Data.' });
    }
    const employee = await EmployeeModel.updateEmployee(req.params.id, employeeReqData);
    res.json({ status: true, message: 'Employee Updated', data: employee });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await EmployeeModel.deleteEmployee(req.params.id);
    res.json({ success: true, message: 'Employee Deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    console.log("Fetching Employee");
    const result = await EmployeeModel.login(req.body.id, req.body.password);
    if (result) {
      res.send({ success: true, message: 'Login successful' });
    } else {
      res.status(401).send({ success: false, message: 'Invalid password' });
    }
  } catch (err) {
    res.status(401).send({ success: false, message: 'Invalid username' });
  }
};
