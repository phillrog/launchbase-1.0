const { age, date } = require('../../lib/utils');
const Intl = require("intl");
const Instructor = require('../models/Instructor');

module.exports = {
    index(req,res){
        Instructor.allAsync((instructors) => {
            return res.render('./instructors/index', { instructors });
        });        
    },
    create(re,res){
        return res.render('./instructors/create');
    },
    post(req,res){
        const keys = Object.keys(req.body);
        keys.forEach((i) => {
            if (req.body[i] == "")
            throw `Please fill all fields!`;
        });
        Instructor.createAsync(req.body, (instructor) => res.redirect(`/instructors/${instructor.id}`));
    },
    show(req,res){
        Instructor.findAsync(req.params.id, (data) => {
            if (!data) return res.send('Instructor not found');

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
    edit(req,res){
        
        Instructor.findAsync(req.params.id, (data) => {
            if (!data) return res.send('Instructor not found');

            const instructor = {
                ...data,
                birth : date(data.birth).iso,
                gender: data.gender,
                services: data.services.split(','),
                created_at: (new Intl.DateTimeFormat("pt-BR")).format(data.created_at)
            }
            
            return res.render(`instructors/edit`, { instructor });
        });   
    },
    put(req,res){
        const keys = Object.keys(req.body);
        keys.forEach((i) => {
            if (req.body[i] == "")
            throw `Please fill all fields!`;
        });
        Instructor.updateAsync(req.body, () =>{
            return res.redirect(`instructors/${req.body.id}`);
        });    
    },
    delete(req,res){
        Instructor.deleteAsync(req.body.id, () =>{
            return res.redirect(`instructors`);
        }); 
    },
}