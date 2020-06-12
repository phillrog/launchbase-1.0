const express = require('express');
const routes = express.Router();

const { onlyUsers } = require('../app/middlewares/session');

const OrderController = require('../app/controllers/OrderController');

routes.post('/', onlyUsers, OrderController.post)
      .get('/', onlyUsers, OrderController.index);
      

module.exports = routes;