const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require('./data');


server.use(express.static('public'));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server
})

const port = 5000 || server.port;

server.get('/', function(req,res){
    return res.render("about");
});

server.get('/cursos', function(req,res){
    return res.render("courses", {items: videos});
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})