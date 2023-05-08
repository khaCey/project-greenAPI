const EmployeeModel = require('../models/employee.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getEmployeeList = (req, res) => {
  console.log('employee list');
  EmployeeModel.getAllEmployee((err, employees) => {
    if (err) res.send(err);
    res.send(employees);
  });
};

exports.getEmployeeByID = (req, res) => {
  EmployeeModel.getEmployeeByID(req.params.id, (err, employee) => {
    if (err) res.send(err);
    res.send(employee);
  });
};

exports.createNewEmployee = (req, res) => {
  req.body.dateOfCreation = new Date();
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    req.body.password = hash;
    const employeeReqData = new EmployeeModel(req.body);
    if (req.body.constructor == Object && Object(req.body).length === 0) {
      res.send(400).send({ success: false, message: 'Invalid Data.' });
    } else {
      console.log('valid data');
      console.log(req.body);
      EmployeeModel.createEmployee(employeeReqData, (err, employee) => {
        if (err) res.send(err);
        res.json({ status: true, message: 'Employee Created', data: employee });
      });
    }
  });
  
};

exports.updateEmployee = (req, res) => {
  console.log(req.body);
  const employeeReqData = new EmployeeModel(req.body);
  employeeReqData.dateOfUpdate = new Date();
  if (req.body.constructor == Object && Object(req.body).length === 0) {
    res.send(400).send({ success: false, message: 'Invalid Data.' });
  } else {
    console.log('valid data');
    EmployeeModel.updateEmployee(
      req.params.id,
      employeeReqData,
      (err, employee) => {
        if (err) res.send(err);
        else
          res.json({
            status: true,
            message: 'Employee Updated',
            data: employee,
          });
      }
    );
  }
};

exports.deleteEmployee = (req, res) => {
  EmployeeModel.deleteEmployee(req.params.id, (err, employee) => {
    if (err) res.send(err);
    else res.json({ success: true, message: 'Employee Deleted' });
  });
};

exports.login = (req, res) => {
  console.log("Fetching Employee");
  EmployeeModel.login(req.body.id, req.body.password, (err, result) => {
      if (err) res.send(err);
      else res.send(result);
  })
  
}
