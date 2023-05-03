const express = require('express')();
const app = express;
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

const employeeRoutes = require('./src/routes/employee.route');
const recordsRoutes = require('./src/routes/records.route');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());
app.use('/api', (req, res, next) => {
    try {
        //checkAuth();
        next();
    }
    catch {
        //res.send({message: 'Login Required'});
        res.redirect('/api/login');
    }
});


app.use('/api/v1/employee', employeeRoutes);

app.use('/api/v1/records', recordsRoutes);

app.listen(
    PORT,
    () => {
        console.log(`live! on ` + PORT);
    });