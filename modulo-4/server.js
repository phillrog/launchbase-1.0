const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const server = express();

server.use(express.urlencoded({extended: true}));
server.use(express.static('public'));
server.use(routes);
server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false, // deixa carregar html dinamico,
    noCache: true
})

const port = 5000 || server.port;



server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})