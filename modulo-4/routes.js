const express = require('express');
const routes = express.Router();
const instructors = require('./instructors');

routes.get('/', instructors.index);

routes.get('/instructors',  instructors.index);

routes.post('/instructors', instructors.post);

routes.get('/instructors/create', function(req,res) {
    return res.render('./instructors/create');
});

routes.get('/instructors/:id', instructors.show);

routes.get('/instructors/:id/edit', instructors.edit);

routes.put('/instructors', instructors.put);

routes.get('/members', function(req,res){
   
    return res.send('Ola');
});

routes.delete('/instructors', instructors.delete);

module.exports = routes;