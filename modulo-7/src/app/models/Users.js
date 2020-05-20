const db = require("../../../models");
const Users = db.Users;
const Op = db.Sequelize.Op;
const {hash} = require('bcryptjs'); 

module.exports = {
    findOne(filter) {
        return Users.findOne({
            where: {
                [Op.or]: {
                    email: filter.email,
                    cpf_cnpj: filter.cpf_cnpj
                }
            },
            order: [
                'name'
            ]
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
    }
}