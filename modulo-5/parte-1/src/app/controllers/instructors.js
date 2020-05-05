const { age, date } = require('../../lib/utils');
const Intl = require("intl");
const Instructor = require('../models/Instructor');

module.exports = {
    async index(re,res){
        await Instructor.allSync((instructors) => res.render('./instructors/index', { instructors }));        
    },
    create(re,res){
        return res.render('./instructors/create');
    },
    async post(req,res){
        await Instructor.createAsync(req.body, (instructor) => res.redirect(`/instructors/${instructor.id}`));
    },
    async show(req,res){
        await Instructor.findAsync(req.params.id, (data) => {
            const instructor = {
                ...data,
                age : age(data.birth),
                gender: data.gender,
                services: data.services.split(','),
                created_at: (new Intl.DateTimeFormat("pt-BR")).format(data.created_at)
            }
    
            return res.render('instructors/show', { instructor });
        });         
    },
    edit(re,res){
        return;
    },
    put(re,res){
        const keys = Object.keys(req.body);
        keys.forEach((i) => {
            if (req.body[i] == "")
                return res.send(`Please fill all fields!`)
        });
    
        let {avatar_url, name, birth, gender, services } = req.body;
    
        return;
    },
    delete(re,res){
        return;
    },
}