const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const SERVER_PORT = process.env.SERVER_PORT;

app.use(cors());

app.listen(SERVER_PORT, () => {
    console.log(`Your app is running on port ${SERVER_PORT}`);
})