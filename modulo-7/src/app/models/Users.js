const db = require("../../../models");
const Users = db.Users;
const Op = db.Sequelize.Op;
const {hash} = require('bcryptjs'); 
const Products = require('./Products');
const fs = require('fs');

module.exports = {
    findOne(filter) {
        return Users.findOne({
            where: {
                [Op.or]: {
                    email: filter.email || '"Users"."email"',
                    cpf_cnpj: filter.cpf_cnpj || '"Users"."cpf_cnpj"'
                }
            },
            order: [
                'name'
            ]
        });
    },
    findById(id) {
        return Users.findOne({
            where: {
                id
            }
        });
    },
    async create(data) {
        const {         
            name, 
            email, 
            password, 
            cpf_cnpj,
            cep,
            address
        } = data;
        
        const passwordHash = await hash(data.password, 8);

        return Users.create({
                name, 
                email, 
                password: passwordHash, 
                cpf_cnpj,
                cep,
                address
            });
    },
    async update(data) {
        const {   
            id,      
            name, 
            email, 
            cpf_cnpj,
            cep,
            address,
            reset_token,
            reset_token_expires
        } = data;
            

        return Users.update({
                name: name, 
                email: email, 
                cpf_cnpj: cpf_cnpj,
                cep: cep,
                address: address,
                reset_token,
                reset_token_expires
            },{
                where: {
                    id
            }}
            );
    },
    async delete(id) {
        let products = await Products.allByUserId(id);

        let files = products.map( p => p.Files.map(file => file.dataValues)[0]);

        await Users.destroy({
            where: {
                id
            }
        });
        files.map(async file => {
            await fs.unlinkSync(file.path);
        });
    }
}