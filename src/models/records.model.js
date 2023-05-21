const dbConnect = require('../../config/db.config');

var Record = function (record) {
  (this.id = record.id),
  (this.time = record.time),
  (this.type = record.type),
  (this.employeeID = record.employeeID);
};

Record.getAllRecords = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query('SELECT * FROM records', (err, res) => {
      if (err) {
        console.log('Error whilst fetching records', err);
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

Record.getRecordByID = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      'SELECT * FROM records WHERE employeeID=?',
      id,
      (err, res) => {
        if (err) {
          console.log('Error whilst fetching records by employeeID', err);
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

Record.getLatestRecordByEmployeeID = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      'SELECT * FROM records WHERE employeeID=? ORDER BY time DESC LIMIT 1',
      id,
      (err, res) => {
        if (err) {
          console.log('Error whilst fetching latest record by employeeID', err);
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

Record.getRecordsForEmployeeForDateRange = (employeeID, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    dbConnect.query(
      `SELECT * FROM records WHERE employeeID = ? AND time BETWEEN ? AND ? ORDER BY time ASC`,
      [employeeID, startDate, endDate],
      (err, res) => {
        if (err) {
          console.log('Error fetching records for employee for date range', err);
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

Record.createRecord = (recordReqData) => {
  console.log("creating record");
  return new Promise((resolve, reject) => {
    dbConnect.query('INSERT INTO records SET ?', recordReqData, (err, res) => {
      if (err) {
        console.log('Error inserting data' + err);
        reject(err);
      } else {
        console.log('Record created!');
        resolve(res);
      }
    });
  });
};

Record.updateRecord = (id, recordReqData) => {
  data = [recordReqData.employeeID, recordReqData.time, recordReqData.type, id];
  return new Promise((resolve, reject) => {
    dbConnect.query(
      'UPDATE records SET employeeID=?, time=?, type=? WHERE id=?',
      data,
      (err, res) => {
        if (err) {
          console.log('Error Updating Record');
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

Record.deleteRecord = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query('DELETE FROM records where id=?', [id], (err, res) => {
      if (err) {
        console.log('Error Deleting Record');
        reject(err);
      } else {
        console.log('DELETED');
        resolve(res);
      }
    });
  });
};


module.exports = Record;
