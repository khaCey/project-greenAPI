const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5673;

const employeeRoutes = require('./src/routes/employee.route');
const recordsRoutes = require('./src/routes/records.route');
const studentRoutes = require('./src/routes/student.route');
const appointmentRoutes = require('./src/routes/appointment.route');

// Set up CORS to allow requests from both localhost:5173 and localhost:3000
const allowedOrigins = ['http://localhost:5173', 'http://192.168.68.130:5173', 'http://localhost:3000', 'https://appointment.slanaitheoir.com/'];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these methods
    allowedHeaders: ['Content-Type', 'x-api-key']  // Allow these headers
}));

app.use('/api', (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(401).json({ message: 'Missing API Key' });
    }
    if (apiKey !== process.env.API_KEY) {
        return res.status(403).json({ message: 'Invalid API Key' });
    }
    next();
});

app.use('/api/v1/employee', employeeRoutes);
app.use('/api/v1/record', recordsRoutes);
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/appointment', appointmentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
