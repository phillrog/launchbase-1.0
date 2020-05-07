const db = require("../../../models");
const Instructor = db.Instructors;
const Member = db.Members;
const Op = db.Sequelize.Op;
const { age, date } = require('../../lib/utils');

module.exports = {
    async allAsync(callback) {
        const data = await Instructor.findAll({
            order: [
                'name',
            ],
            attributes: [
                "id",
            "avatar_url", 
            "name", 
            "birth", 
            "gender", 
            "services", 
            "created_at",
                [db.sequelize.cast( db.sequelize.fn('COUNT', db.sequelize.col('Members.*')), 'INTEGER'), 'total_students'],
            ],
            include: [{
                model: Member,
                attributes: [],
                as: 'Members'
            }],
            group: [db.sequelize.col('Instructors.id')]
                
        })
        .then(function(instructor, err) {    
            console.log(instructor);  
            return instructor;
         })
         .catch( error => {
            console.error(error);
          });
         
         callback(data);
    },
    async findAsync(id, callback) {
        const data = await Instructor.findOne({
            where: {
               id
            }
         }).then(function(instructor) {     
            if (!instructor) return undefined;      
            return instructor.dataValues;
         });
         callback(data);
    },

    async createAsync(data, callback) {        
        const {avatar_url, name, gender, services } = data;
         
        const instructor = await Instructor.create({
                avatar_url: avatar_url, 
                name: name, 
                birth:  date( data.birth).iso, 
                gender: gender, 
                services: services,
                created_at: date(Date.now()).iso
            })
            .then(function(instructor) {
                return instructor.dataValues;
            })
            .catch(function(err) {
                // print the error details
                console.log(err, data.name);
            });
        callback(instructor);
    },

    async updateAsync(data, callback) {
        const instructor = await Instructor.update(
            {
                avatar_url: data.avatar_url, 
                name: data.name, 
                birth:  date( data.birth).iso, 
                gender: data.gender, 
                services: data.services,
                updateAt: date(Date.now()).iso
            }, {
            where: {
                id: data.id
            }
        })
        .then(function(instructor) {
            return instructor.dataValues;
        })
        .catch(function(err) {   
            console.log(err, data.name);
        });

        callback();
    },

    async deleteAsync(id, callback) {
        const data = await Instructor.destroy({
            where : {
                id 
            }
        })
        .then(function(instructor) {            
            return instructor
         });

         callback();
    }
}