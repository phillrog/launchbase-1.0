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
            if (!instructor) return res.send('Instructor not found');

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
        await Instructor.findAsync(req.params.id, (instructor) => {
            if (!instructor) return res.send('Instructor not found');

            instructor.birth = date(instructor.birth).iso;
            
            return res.render('instructors/show', { instructor });
        });   
    },
    async put(req,res){
        await Instructor.updateAsync(req.body, () =>{
            return res.redirect(`instructors/${req.body.id}`);
        });    
    },
    async delete(req,res){
        await Instructor.deleteAsync(req.body.id, () =>{
            return res.redirect(`instructors/${req.body.id}`);
        }); 
    },
}