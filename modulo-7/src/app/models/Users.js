const db = require("../../../models");
const Users = db.Users;
const Op = db.Sequelize.Op;

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
    }
}