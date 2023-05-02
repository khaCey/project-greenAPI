const dbConnect = require('../../config/db.config');

var User = function (user) {
    this.login = user.login,
        this.password = user.password
}

User.getAllUsers = (result) => {
    dbConnect.query('SELECT * FROM users', (err, res) => {
        if (err) {
            console.log('Error whilst fetching users', err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    })
}

User.getUserByID = (id, result) => {
    dbConnect.query('SELECT * FROM users WHERE login=?', id, (err, res) => {
        if (err) {
            console.log('Error whilst fetching users by ID', err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    })
}

User.createUser = (userReqData, result) => {
    dbConnect.query('INSERT INTO users SET ?', userReqData, (err, res) => {
        if (err) {
            console.log('Error inserting data' + err);
            result(null, err);
        }
        else {
            console.log('User created!');
            result(null, res)
        }
    })
}

User.updateUser = (id, userReqData, result) => {
    data = [userReqData.userID, userReqData.password, id];
    dbConnect.query('UPDATE users SET login=?, password=? WHERE id=?', data, (err, res) => {
        if (err) {
            console.log('Error Updating User');
            console.log(err);
            result(null, err);
        }
        else {
            console.log('Updated');
            result(null, res);
        }
    });
}

User.deleteUser = (id, result) => {
    dbConnect.query('DELETE FROM users where id=?', [id], (err, res) => {
        if (err) {
            console.log('Error Deleting User');
            result(null, err);
        }
        else {
            console.log('DELETED');
            result(null, res);
        }
    })
}

User.login = (id, inputPass, result) => {
    dbConnect.query('SELECT * FROM users WHERE login=?', id, (err, res) => {
        if (err) {
            console.log('Error whilst fetching users by ID', err);
            result(false);
        }
        else {
            if (res.password === inputPass) result(true);
            else result(false);
        }
    });
}
module.exports = User;