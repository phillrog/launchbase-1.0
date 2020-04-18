const express = require('express');

const server = express();

const port = 5000 || server.port;

server.get('/', function(req,res){
    return res.send('Olá mundo');
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})