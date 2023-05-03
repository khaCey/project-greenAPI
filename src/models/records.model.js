const dbConnect = require('../../config/db.config');

var Record = function (record) {
  (this.id = record.id),
    (this.time = record.time),
    (this.type = record.type),
    (this.employeeID = record.employeeID);
};

Record.getAllRecords = (result) => {
  dbConnect.query('SELECT * FROM records', (err, res) => {
    if (err) {
      console.log('Error whilst fetching records', err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Record.getRecordByID = (id, result) => {
  dbConnect.query(
    'SELECT * FROM records WHERE employeeID=?',
    id,
    (err, res) => {
      if (err) {
        console.log('Error whilst fetching records by employeeID', err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Record.createRecord = (recordReqData, result) => {
  dbConnect.query('INSERT INTO records SET ?', recordReqData, (err, res) => {
    if (err) {
      console.log('Error inserting data' + err);
      result(null, err);
    } else {
      console.log('Record created!');
      result(null, res);
    }
  });
};

Record.updateRecord = (id, recordReqData, result) => {
  data = [recordReqData.employeeID, recordReqData.time, recordReqData.type, id];
  dbConnect.query(
    'UPDATE records SET employeeID=?, time=?, type=? WHERE id=?',
    data,
    (err, res) => {
      if (err) {
        console.log('Error Updating Record');
        console.log(err);
        result(null, err);
      } else {
        console.log('Updated');
        result(null, res);
      }
    }
  );
};

Record.deleteRecord = (id, result) => {
  dbConnect.query('DELETE FROM records where id=?', [id], (err, res) => {
    if (err) {
      console.log('Error Deleting Record');
      result(null, err);
    } else {
      console.log('DELETED');
      result(null, res);
    }
  });
};

module.exports = Record;
