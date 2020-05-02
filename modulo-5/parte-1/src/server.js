const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const server = express();
const methodOverride = require('method-override');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('gymmanager', 'postgres', '1234', { 
    host: '127.0.0.1',
    dialect: 'postgres'
});

server.use(express.urlencoded({extended: true}));
server.use(express.static('public'));
server.use(methodOverride('_method'));
server.use(routes);
server.set("view engine", "njk");

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false, // deixa carregar html dinamico,
    noCache: true
})

const port = 5000 || server.port;



server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})