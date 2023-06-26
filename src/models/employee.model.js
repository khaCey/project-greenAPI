const dbConnect = require('../../config/db.config');
const bcrypt = require('bcrypt');

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

Employee.getAllEmployee = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query('SELECT * FROM employee', (err, res) => {
      if (err) {
        console.log('Error whilst fetching employees', err);
        reject(err);
      } else {
        console.log('Employees fetched successfully');
        resolve(res.rows);
      }
    });
  });
};

Employee.getEmployeeByID = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      'SELECT * FROM employee WHERE employeeid=$1',
      [id],
      (err, res) => {
        if (err) {
          console.log('Error whilst fetching employee by ID', err);
          reject(err);
        } else {
          resolve(res.rows);
        }
      }
    );
  });
};

Employee.createEmployee = (employeeReqData) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('INSERT INTO employee SET $1', [employeeReqData], (err, res) => {
      if (err) {
        console.log('Error inserting data' + err);
        reject(err);
      } else {
        console.log('Employee created!');
        resolve(res);
      }
    });
  });
};

Employee.updateEmployee = (id, employeeReqData) => {
  data = [
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
  return new Promise((resolve, reject) => {
    dbConnect.query(
      'UPDATE employee SET firstname=$1, lastname=$2, address=$3, email=$4, phone=$5, privileges=$6, password=$7, dateofbirth=$8, dateofupdate=$9 WHERE employeeid=$10',
      data,
      (err, res) => {
        if (err) {
          console.log('Error Updating Employee');
          console.log(err);
          reject(err);
        } else {
          console.log('Updated');
          resolve(res);
        }
      }
    );
  });
};

Employee.deleteEmployee = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      'DELETE FROM employee where employeeid=$1',
      [id],
      (err, res) => {
        if (err) {
          console.log('Error Deleting Employee');
          reject(err);
        } else {
          console.log('DELETED');
          resolve(res);
        }
      }
    );
  });
};

Employee.login = (id, inputPass) => {
  return new Promise((resolve, reject) => {
    const numId = Number(id);
    if (isNaN(numId)) {
      console.log("ID must be a number");
      reject('ID must be a number');
      return;
    }

    dbConnect.query('SELECT * FROM employee WHERE employeeid=$1', [numId], (err, res) => {
      if (err) {
        console.log('Error whilst fetching employee by ID', err);
        reject(err);
      } else {
        console.log(res);
        if (res.rows.length) {
          bcrypt.compare(inputPass, res.rows[0].password, (err, auth) => {
            if (err) {
              reject(err);
            } else {
              resolve(auth);
            }
          });
        } else {
          console.log("ID not found");
          reject('No employee with the given ID found');
        }
      }
    });
  });
}

module.exports = Employee;
