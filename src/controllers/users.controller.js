const UserModel = require('../models/users.model');

exports.getUsersList = (req, res) => {
    console.log('user list');
    UserModel.getAllUsers((err, User) => {
        console.log('Here');
        if (err) res.send(err);
        res.send(User);
    })
}

exports.getUserByID = (req, res) => {
    UserModel.getUserByID(req.params.id, (err, user) => {
        if (err) res.send(err);
        res.send(user);
    });
}

exports.createNewUser = (req, res) => {
    console.log(req.body);
    req.body.dateOfCreation = new Date();
    const userReqData = new UserModel(req.body);
    if (req.body.constructor == Object && Object(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Invalid Data.' })
    }
    else {
        console.log('valid data');
        UserModel.createUser(userReqData, (err, user) => {
            if (err) res.send(err);
            res.json({ status: true, message: 'User Created', data: user });
        })
    }
}

exports.updateUser = () => {
    console.log(req.body);
    const userReqData = new UserModel(req.body);
    if (req.body.constructor == Object && Object(req.body).length === 0) {
        res.send(400).send({ success: false, message: 'Invalid Data.' })
    }
    else {
        console.log('valid data');
        UserModel.updateUser(req.params.id, userReqData, (err, user) => {
            if (err) res.send(err);
            res.json({ status: true, message: 'User Updated', data: user });

        })
    }
}

exports.deleteUser = (req, res) => {
    UserModel.deleteUser(req.params.id, (err, user) => {
        if (err) res.send(err);
        else res.json({ success: true, message: 'User Deleted' });
    })
}

exports.login = (req, res) => {
    UserModel.login(req.params.id, req.params.password, (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    })
}