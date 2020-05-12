const db = require("../../../models");
const Member = db.Members;
const Instructor = db.Instructors;
const Op = db.Sequelize.Op;
const { age, date, typeBlood } = require('../../lib/utils');

module.exports = {
    async allAsync(callback) {
        const data = await Member.findAll({
            order: [
                'name'
            ]
        })
        .then(function(members) {            
            return members;
         });

         callback(data);
    },
    async findAsync(id, callback) {
        const data = await Member.findOne({
            attributes:[
                "id",
                "avatar_url",
                "name",
                "birth",
                "gender",
                "blood",
                "height",
                "weight",
                "email",
                "created_at",
                "instructor_id"    
            ],
            where: {               
               id
            },
            include: [{
                model: Instructor,
                attributes: [[ "name", "instructor_name"]]
            }],
         }).then(function(member) {  
            if (!member) return undefined;       
  
            return member.dataValues;
         });
         callback(data);
    },

    async createAsync(data, callback) {
            
        const {avatar_url, name, gender, blood, height, weight, email } = data;
 
        const member = await Member.create({
                avatar_url: avatar_url, 
                name: name, 
                birth:  date( data.birth).iso, 
                gender: gender, 
                blood:  blood,
                height: height,
                weight: weight,
                email: email,
                created_at: created_at = date(Date.now()).iso,
                instructor_id: data.instructor
            })
            .then(function(member) {
                return member.dataValues;
            })
            .catch(function(err) {
                // print the error details
                console.log(err, data.name);
            });
        callback(member);
    },

    async updateAsync(data, callback) {
        const member = await Member.update(
            {
                avatar_url: data.avatar_url, 
                name: data.name, 
                birth:  date( data.birth).iso, 
                gender: data.gender, 
                blood: data.blood,
                height: data.height,
                weight: data.weight,
                email: data.email,
                update_at: date(data.created_at).iso,
                instructor_id: data.instructor
            }, {
            where: {
                id: data.id
            }
        })
        .then(function(member) {
            return member.dataValues;
        })
        .catch(function(err) {   
            console.log(err);
        });

        callback();
    },

    async deleteAsync(id, callback) {
        const data = await Member.destroy({
            where : {
                id 
            }
        })
        .then(function(member) {            
            return member
         });

         callback();
    },

    async instructorsSelectOptions(callback){
        const data = await Instructor.findAll(
            {
                attributes:["id","name"],
                order: [
                    'name'
                ]
            }
        )
        .then((instructors) =>  instructors);

        return callback(data);
    },
    
    async findByAsync(filter,callback) {
        let where = {
            [Op.or]: { 
                name: {[Op.like]: `%${filter}%`}, 
                    
             }
        };
        const data = await Instructor.findAll({
            where
            
         }).then(function(member) {     
            if (!member) return undefined;  

            return member;
         });
         callback(data);
    },
    async paginateAsync(params) {
        const {filter, limit, offset, callback} = params;

        let where = {};
        let whereSubquery = "";
        if (filter){
            where = {
                [Op.or]: { 
                    name: {[Op.like]: `%${filter}%`}, 
                            
                }
            };

            whereSubquery = `"Members"."name" like '%${filter}%'`;           

            whereSubquery = "WHERE " + whereSubquery;
        }   

        console.log(limit, offset)

        let find = {
            order: [
                'name',
            ],
            attributes: [
                "id",
                "avatar_url",
                "name",
                "birth",
                "gender",
                "blood",
                "height",
                "weight",
                "email",
                "created_at",              
                [db.sequelize.literal(`(SELECT COUNT(*) FROM "Members" ${whereSubquery} )`), 'total']
            ],                        
            where,
            limit,
            offset,
            subQuery:false         
        };

        const data = await Member.findAll(find).then((data) => {
            if (!data) return undefined;  

            return data;            
        });

        callback(data);
    }
}