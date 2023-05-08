const dbConnect = require('../../config/db.config');
const bcrypt = require('bcrypt');

var Employee = function (employee) {
  (this.firstName = employee.firstName),
  (this.lastName = employee.lastName),
  (this.email = employee.email),
  (this.phone = employee.phone),
  (this.password = employee.password),
  (this.dateOfCreation = employee.dateOfCreation),
  (this.dateOfUpdate = employee.dateOfUpdate);
};

Employee.getAllEmployee = (result) => {
  dbConnect.query('SELECT * FROM employee', (err, res) => {
    if (err) {
      console.log('Error whilst fetching employees', err);
      result(null, err);
    } else {
      console.log('Employees fetched successfully');
      result(null, res);
    }
  });
};

Employee.getEmployeeByID = (id, result) => {
  dbConnect.query(
    'SELECT * FROM employee WHERE employeeID=?',
    id,
    (err, res) => {
      if (err) {
        console.log('Error whilst fetching employee by ID', err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Employee.createEmployee = (employeeReqData, result) => {
  dbConnect.query('INSERT INTO employee SET ?', employeeReqData, (err, res) => {
    if (err) {
      console.log('Error inserting data' + err);
      result(null, err);
    } else {
      console.log('Employee created!');
      result(null, res);
    }
  });
};
//test
Employee.updateEmployee = (id, employeeReqData, result) => {
  data = [
    employeeReqData.firstName,
    employeeReqData.lastName,
    employeeReqData.address,
    employeeReqData.email,
    employeeReqData.phone,
    employeeReqData.password,
    employeeReqData.dateOfBirth,
    employeeReqData.dateOfUpdate,
    id,
  ];
  dbConnect.query(
    'UPDATE employee SET firstName=?, lastName=?, address=?, email=?, phone=?, password=?, dateOfBirth=?, dateOfUpdate=? WHERE employeeID=?',
    data,
    (err, res) => {
      if (err) {
        console.log('Error Updating Employee');
        console.log(err);
        result(null, err);
      } else {
        console.log('Updated');
        result(null, res);
      }
    }
  );
};

Employee.deleteEmployee = (id, result) => {
  dbConnect.query(
    'DELETE FROM employee where employeeID=?',
    [id],
    (err, res) => {
      if (err) {
        console.log('Error Deleting Employee');
        result(null, err);
      } else {
        console.log('DELETED');
        result(null, res);
      }
    }
  );
};

Employee.login = (id, inputPass, result) => {
  dbConnect.query('SELECT * FROM employee WHERE employeeID=?', id, (err, res) => {
    if (err) {
      console.log('Error whilst fetching employee by ID', err);
      result(false);
    }
    else {
      bcrypt.compare(inputPass, res[0].password, (err, auth) => {
        result(auth);
      });
    }
  });
}
module.exports = Employee;
