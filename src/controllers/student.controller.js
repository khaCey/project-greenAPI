const StudentModel = require('../models/student.model');

exports.getStudentList = async (req, res) => {
  try {
      const students = await StudentModel.getAllStudents();
      res.send(students);
  } catch (err) {
      console.log('Error:', err);
      res.status(500).send(err);
  }
};

exports.getStudentByID = async (req, res) => {
  try {
    const student = await StudentModel.getStudentByID(req.params.id);
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createNewStudent = async (req, res) => {
  try {
    req.body.dateOfCreation = new Date();
    const studentReqData = new StudentModel(req.body);
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ success: false, message: 'Invalid Data.' });
    }
    const student = await StudentModel.createStudent(studentReqData);
    res.json({ status: true, message: 'Student Created', data: student });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Server Error', error: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const studentReqData = new StudentModel(req.body);
    studentReqData.dateOfUpdate = new Date();
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ success: false, message: 'Invalid Data.' });
    }
    const student = await StudentModel.updateStudent(req.params.id, studentReqData);
    res.json({ status: true, message: 'Student Updated', data: student });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await StudentModel.deleteStudent(req.params.id);
    res.json({ success: true, message: 'Student Deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};
