    
const Users = require('../models/Users');

const {formatCep, formatCpfCnpj} = require('../../lib/utils');

module.exports = {
    registerForm(req, res) {
        return res.render('users/register.njk');
    },
    async show(req, res) {
        const {userId: id} = req.session;

        const user = await Users.findById(id);
        
        if (!user) return res.render('user/register', {
            error: "Usuário não encontrado"
        });

        user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj);
        user.cep = formatCep(user.cep);


        return res.render('users/index', {user});
    },
    async post(req, res) {

        const {  name, 
            email, 
            password,             
            cep,
            address } = req.body;

        const cpf_cnpj = req.body.cpf_cnpj.replace(/\D/g,"") ;

        const result = await Users.create({name, 
            email, 
            password,             
            cep,
            address ,
            cpf_cnpj});
        
        const user = result.dataValues;
        
        req.session.userId = user.id;

        return res.redirect('/users');
    },
    
}