const RecordModel = require('../models/records.model');

exports.getRecordsList = (req, res) => {
  console.log('record list');
  RecordModel.getAllRecord((err, Record) => {
    console.log('Here');
    if (err) res.send(err);
    res.send(Record);
  });
};

exports.getRecordByID = (req, res) => {
  RecordModel.getRecordByID(req.params.id, (err, record) => {
    if (err) res.send(err);
    res.send(record);
  });
};

exports.createNewRecord = (req, res) => {
  console.log(req.body);
  req.body.dateOfCreation = new Date();
  const recordReqData = new RecordModel(req.body);
  if (req.body.constructor == Object && Object(req.body).length === 0) {
    res.send(400).send({ success: false, message: 'Invalid Data.' });
  } else {
    console.log('valid data');
    RecordModel.createRecord(recordReqData, (err, record) => {
      if (err) res.send(err);
      res.json({ status: true, message: 'Record Created', data: record });
    });
  }
};

exports.updateRecord = () => {
  console.log(req.body);
  const recordReqData = new RecordModel(req.body);
  if (req.body.constructor == Object && Object(req.body).length === 0) {
    res.send(400).send({ success: false, message: 'Invalid Data.' });
  } else {
    console.log('valid data');
    RecordModel.updateRecord(req.params.id, recordReqData, (err, record) => {
      if (err) res.send(err);
      res.json({ status: true, message: 'Record Updated', data: record });
    });
  }
};

exports.deleteRecord = (req, res) => {
  RecordModel.deleteRecord(req.params.id, (err, record) => {
    if (err) res.send(err);
    else res.json({ success: true, message: 'Record Deleted' });
  });
};
