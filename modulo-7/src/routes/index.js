const express = require('express');
const routes = express.Router();
const HomeController = require('../app/controllers/HomeController');

const home = require('./home');
const products = require('./products');
const users = require('./users');

routes.use('/products', products)
routes.use('/users', users);

// Home
routes.get('/', HomeController.index);


// Alias
routes.get('/ads/create', (req, res) => res.redirect("/products/create"));


module.exports = routes;