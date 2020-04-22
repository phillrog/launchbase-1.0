const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require('./data');


server.use(express.static('public'));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    autoescape: false // deixa carregar html dinamico
})

const port = 5000 || server.port;

server.get('/', function(req,res){
    const about =  {
        avatar_url: "https://image.freepik.com/free-icon/human-skull-with-crossed-bones-silhouette_318-46669.png",
        name: "Phillipe",
        role: " Programador full-stack",
        description: 'Atualmente estudando novas tecnologias <a href="https://github.com/phillrog/launchbase-1.0"  target="_blank">Repositório</a>',
        links: [{
            name: 'Github',
            url: 'https://github.com/phillrog'
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com'
        }]
    }
    return res.render("about", { about });
});

server.get('/cursos', function(req,res){
    return res.render("courses", {items: videos});
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})