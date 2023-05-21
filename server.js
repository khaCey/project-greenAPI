const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8080;

const employeeRoutes = require('./src/routes/employee.route');
const recordsRoutes = require('./src/routes/records.route');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/api', (req, res, next) => {
    const apiKey = req.headers['x-api-key']; 

    if (!apiKey) {
        return res.status(401).json({ message: 'Missing API Key' });
    }

    // Use the API key from the environment variable
    if (apiKey !== process.env.API_KEY) {
        console.log(apiKey);
        console.log(process.env.API_KEY);
        return res.status(403).json({ message: 'Invalid API Key' });
    }

    next();
});


app.use('/api/v1/employee', employeeRoutes);

app.use('/api/v1/records', recordsRoutes);

app.listen(
    PORT,
    () => {
        console.log(`live! on ` + PORT);
    });
