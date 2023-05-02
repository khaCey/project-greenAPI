const GradesModel = require('../models/grades.model');

exports.getGradesList = (req, res) => {
    console.log('grades list');
    GradesModel.getAllGrades((err, Grades) => {
        console.log('Here');
        if (err) res.send(err);
        res.send(Grades);
    })
}

exports.getGradesByID = (req, res) => {
    GradesModel.getGradesByID(req.params.id, (err, grades) => {
        if (err) res.send(err);
        res.send(grades);
    });
}

exports.createNewGrades = (req, res) => {
    console.log(req.body);
    req.body.dateOfCreation = new Date();
    const gradesReqData = new GradesModel(req.body);
    if (req.body.constructor == Object && Object(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Invalid Data.' })
    }
    else {
        console.log('valid data');
        GradesModel.createGrades(gradesReqData, (err, grades) => {
            if (err) res.send(err);
            res.json({ status: true, message: 'Grades Created', data: grades });
        })
    }
}

exports.updateGrades = () => {
    console.log(req.body);
    const gradesReqData = new GradesModel(req.body);
    if (req.body.constructor == Object && Object(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Invalid Data.' })
    }
    else {
        console.log('valid data');
        GradesModel.updateGrades(req.params.id, gradesReqData, (err, grades) => {
            if (err) {
                res.send(err);
                res.json({ status: true, message: 'Grades Updated', data: grades });
            }
        })
    }
}

exports.deleteGrades = (req, res) => {
    StudentModel.deleteGrades(req.params.id, (err, grades) => {
        if (err) res.send(err);
        else res.json({ success: true, message: 'Grades Deleted' });
    })
}
