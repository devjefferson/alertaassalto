const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser')
const router = require('../routes/index')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false})); // support encoded bodies

app.use('/',router);

module.exports = app