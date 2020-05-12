const { age, date } = require('../../lib/utils');
const Intl = require("intl");
const Instructor = require('../models/Instructor');

module.exports = {
    index(req,res){
        let {filter, page, limit} = req.query;

        page = page || 1;
        limit = limit || 2;

        let offset = limit * (page -1);

        const params = { 
            filter, 
            page, 
            limit, 
            offset,
            callback(instructors ){
                const pagination = {
                    filter,
                    total: instructors[0].total,
                    page
                };

                return res.render('./instructors/index', { instructors, pagination });
            }
        };
        Instructor.paginateAsync(params);        
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