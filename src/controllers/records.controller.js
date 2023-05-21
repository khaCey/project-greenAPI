const RecordModel = require('../models/records.model');

exports.getRecordsList = async (req, res) => {
  try {
    console.log('record list');
    const records = await RecordModel.getAllRecord();
    res.send(records);
  } catch (err) {
    res.send(err);
  }
};

exports.getRecordByID = async (req, res) => {
  try {
    const record = await RecordModel.getRecordByID(req.params.id);
    res.send(record);
  } catch (err) {
    res.send(err);
  }
};

exports.getLatestRecordByEmployeeID = async (req, res) => {
  try {
    const record = await RecordModel.getLatestRecordByEmployeeID(req.params.id);
    res.send(record);
  } catch (err) {
    res.send(err);
  }
};

exports.getRecordsForEmployeeForDateRange = async (req, res) => {
  try {
    const records = await RecordModel.getRecordsForEmployeeForDateRange(
      req.params.employeeID,
      req.params.startDate,
      req.params.endDate
    );
    res.send(records);
  } catch (err) {
    res.send(err);
  }
};

exports.createNewRecord = async (req, res) => {
  try {
    console.log(req.body);
    
    let time = new Date();
    console.log(time.getMinutes());
    time.setMinutes(time.getMinutes() + 50);
    console.log(time.getMinutes());
    time.setMinutes(0, 0, 0);  // reset minutes, seconds, and milliseconds to 0
    console.log(time);
    req.body.time = time;
    console.log(req.body.time);
    console.log(req.body);

    const recordReqData = new RecordModel(req.body);
    console.log("recordData");
    if (req.body.constructor == Object && Object.keys(req.body).length === 0) {
      res.status(400).send({ success: false, message: 'Invalid Data.' });
    } else {
      console.log('valid data');
      const record = await RecordModel.createRecord(recordReqData);
      res.json({ status: true, message: 'Record Created', data: record });
    }
  } catch (err) {
    res.send(err);
  }
};

exports.updateRecord = async (req, res) => {
  try {
    console.log(req.body);
    const recordReqData = new RecordModel(req.body);
    if (req.body.constructor == Object && Object.keys(req.body).length === 0) {
      res.status(400).send({ success: false, message: 'Invalid Data.' });
    } else {
      console.log('valid data');
      const record = await RecordModel.updateRecord(req.params.id, recordReqData);
      res.json({ status: true, message: 'Record Updated', data: record });
    }
  } catch (err) {
    res.send(err);
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    await RecordModel.deleteRecord(req.params.id);
    res.json({ success: true, message: 'Record Deleted' });
  } catch (err) {
    res.send(err);
  }
};
