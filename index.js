const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/database');
const appointmentRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// Routes

app.use('/', appointmentRoutes);

// Database Connection
sequelize.sync().then(result => {
    console.log('Database Connected Successfully');
}).catch((err) => {
    console.log(err);
});
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is Successfully running on PORT : ${port}`);
})