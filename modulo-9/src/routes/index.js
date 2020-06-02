const express = require('express');
const routes = express.Router();
const HomeController = require('../app/controllers/HomeController');

const products = require('./products');
const users = require('./users');
const cart = require('./cart');

routes.use('/products', products)
routes.use('/users', users);
routes.use('/cart', cart);

// Home
routes.get('/', HomeController.index);


// Alias
routes.get('/ads/create', (req, res) => res.redirect("/products/create"));

routes.get('/accounts', (req, res) => res.redirect("/users/login"));


module.exports = routes;