const dbConnect = require('../../config/db.config');

var Grades = function(grades){
    this.gradesID          = grades.gradesID,
    this.description        = grades.description,
    this.type               = grades.type,
    this.points             = grades.points
}

Grades.getAllGrades = (result) =>{
    dbConnect.query('SELECT * FROM grades', (err, res) =>{
        if(err){
            console.log('Error whilst fetching grades', err);
            result(null,err);
        }
        else{
            console.log('Grades fetched successfully');
            result(null,res);
        }
    })
}

Grades.getGradesByID = (id, result)=>{
    dbConnect.query('SELECT * FROM grades WHERE gradesID=?', id, (err, res)=> {
        if(err){
            console.log('Error whilst fetching grades by ID', err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    })
}

Grades.createGrades = (gradesReqData, result) => {
    dbConnect.query('INSERT INTO grades SET ?', gradesReqData, (err, res) =>{
        if(err){
            console.log('Error inserting data' + err);
            result(null, err);
        }
        else{
            console.log('Grades created!');
            result(null, res)
        }
    })
}

Grades.updateGrades = (id, gradesReqData, result) =>{
    data = [gradesReqData.studentID, gradesReqData.description, gradesReqData.type, gradesReqData.points, gradesReqData.dateOfUpdate, id];
    dbConnect.query('UPDATE grades SET studentID=?, description=?, type=?, points=?, dateOfUpdate=? WHERE id=?', data, (err, res) =>{
        if(err){
            console.log('Error Updating Grades');
            console.log(err);
            result(null, err);
        } 
        else{
            console.log('Updated');
            result(null, res);
        }
    });
}

Grades.deleteGrades = (id, result) =>{
    dbConnect.query('DELETE FROM grades where id=?', [id], (err, res) =>{
        if(err){
            console.log('Error Deleting Grades');
            result(null, err);
        }
        else{
            console.log('DELETED');
            result(null, res);
        }
    })
}
module.exports = Grades;