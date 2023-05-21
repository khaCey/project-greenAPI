const dbConnect = require('../../config/db.config');
const bcrypt = require('bcrypt');

var Employee = function (employee) {
  (this.firstName = employee.firstName),
  (this.lastName = employee.lastName),
  (this.email = employee.email),
  (this.phone = employee.phone),
  (this.privileges = employee.privileges),
  (this.password = employee.password),
  (this.dateOfCreation = employee.dateOfCreation),
  (this.dateOfUpdate = employee.dateOfUpdate);
};

Employee.getAllEmployee = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query('SELECT * FROM employee', (err, res) => {
      if (err) {
        console.log('Error whilst fetching employees', err);
        reject(err);
      } else {
        console.log('Employees fetched successfully');
        resolve(res);
      }
    });
  });
};

Employee.getEmployeeByID = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      'SELECT * FROM employee WHERE employeeID=?',
      id,
      (err, res) => {
        if (err) {
          console.log('Error whilst fetching employee by ID', err);
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

Employee.createEmployee = (employeeReqData) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('INSERT INTO employee SET ?', employeeReqData, (err, res) => {
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
      'UPDATE employee SET firstName=?, lastName=?, address=?, email=?, phone=?, password=?, dateOfBirth=?, dateOfUpdate=? WHERE employeeID=?',
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
      'DELETE FROM employee where employeeID=?',
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
    // Convert the ID to a number and check if it's NaN
    const numId = Number(id);
    if (isNaN(numId)) {
      console.log("ID must be a number");
      reject('ID must be a number');
      return;
    }

    dbConnect.query('SELECT * FROM employee WHERE employeeID=?', numId, (err, res) => {
      if (err) {
        console.log('Error whilst fetching employee by ID', err);
        reject(err);
      } else {
        console.log(res);
        // Check if res[0] is defined before trying to access its password property
        if (res[0]) {
          bcrypt.compare(inputPass, res[0].password, (err, auth) => {
            if (err) {
              reject(err);
            } else {
              resolve(auth);
            }
          });
        } else {
          // If there's no employee with the given ID, reject the promise
          console.log("ID not found");
          reject('No employee with the given ID found');
        }
      }
    });
  });
}



module.exports = Employee;
