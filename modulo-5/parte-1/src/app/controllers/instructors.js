const { age, date } = require('../../lib/utils');
const Intl = require("intl");
const db = require("../../../models");
const Instructor = db.Instructors;
const Op = db.Sequelize.Op;

module.exports = {
    index(re,res){
        return res.render('./instructors/index');
    },
    create(re,res){
        return res.render('./instructors/create');
    },
    async post(req,res){
        const keys = Object.keys(req.body);
        keys.forEach((i) => {
            if (req.body[i] == "")
                return res.send(`Please fill all fields!`)
        });
    
        const {avatar_url, name, gender, services } = req.body;
 
        const instructor = await Instructor.create({
                avatar_url: avatar_url, 
                name: name, 
                birth:  date( req.body.birth).iso, 
                gender: gender, 
                services: services,
                created_at: created_at = date(Date.now()).iso
            })
            .then(function(instructor) {
                return instructor.dataValues;
            })
            .catch(function(err) {
                // print the error details
                console.log(err, request.body.name);
            });

        return res.redirect(`/instructors/${instructor.id}`)
    },
    async show(req,res){
        const data = await Instructor.findOne({
            where: {
               id: req.params.id
            }
         }).then(function(instructor) {
            if (!instructor) {
                return 'Instructor not found';
            }
            return instructor.dataValues;
         });

         const instructor = {
            ...data,
            age : age(data.birth),
            gender: data.gender,
            services: data.services.split(','),
            created_at: (new Intl.DateTimeFormat("pt-BR")).format(data.created_at)
        }

        return res.render('instructors/show', { instructor });
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