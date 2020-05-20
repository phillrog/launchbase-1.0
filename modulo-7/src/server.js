const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override');
const db = require("../models");
const session = require('./config/session');

const server = express();

server.use(session(db.sequelize));
server.use(express.urlencoded({extended: true}));
server.use(express.static('public'));
server.use(methodOverride('_method'));
server.use(routes);
server.set("view engine", "njk");


db.sequelize.sync()
    
    .then(function(instance){
        return instance.update({syncedAt: sequelize.fn('NOW')});
    })
    .catch(function(err){

    });

nunjucks.configure("src/app/views", {
    express: server,
    autoescape: false, // deixa carregar html dinamico,
    noCache: true
})

const port = 5000 || server.port;




server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})