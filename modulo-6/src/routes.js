const express = require('express');
const routes = express.Router();
const instructors = require('./app/controllers/instructors');
const members = require('./app/controllers/members');

routes.get('/', (req, res) => res.send("ok"));

module.exports = routes;