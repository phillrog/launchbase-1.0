const db = require("../../../models");
const Instructor = db.Instructors;
const Op = db.Sequelize.Op;

module.exports = {
    async all(callback) {
        const data = await Instructor.findAll()
        .then(function(instructor) {            
            return instructor.dataValues;
         });

         callback(data);
    },
    async findAsync(id, callback) {
        const data = await Instructor.findOne({
            where: {
               id
            }
         }).then(function(instructor) {
            if (!instructor) {
                throw 'Instructor not found';
            }
            return instructor.dataValues;
         });
         callback(data);
    },

    async createAsync(data, callback) {
        const keys = Object.keys(data);
        keys.forEach((i) => {
            if (data[i] == "")
            throw `Please fill all fields!`;
        });
    
        const {avatar_url, name, gender, services } = data;
 
        const instructor = await Instructor.create({
                avatar_url: avatar_url, 
                name: name, 
                birth:  date( data.birth).iso, 
                gender: gender, 
                services: services,
                created_at: created_at = date(Date.now()).iso
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
                created_at: date(data.created_at).iso
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
        const data = await Instructor.delete({
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