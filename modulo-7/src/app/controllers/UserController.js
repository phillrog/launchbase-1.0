    
const Users = require('../models/Users');

const {formatCep, formatCpfCnpj} = require('../../lib/utils');

module.exports = {
    registerForm(req, res) {
        return res.render('users/register.njk');
    },
    async show(req, res) {
        const {user} = req;

        user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj);
        user.cep = formatCep(user.cep);

        return res.render('users/index', {user});
    },
    async post(req, res) {

        const {  name, 
            email, 
            password,             
            address } = req.body;

        const cpf_cnpj = req.body.cpf_cnpj.replace(/\D/g,"") ;
        const cep = req.body.cep.replace(/\D/g,"") ;

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
    async update(req,res){

        try {
            const {  
                id,
                name, 
                email,             
                address } = req.body;
    
            const cpf_cnpj = req.body.cpf_cnpj.replace(/\D/g,"") ;
            const cep = req.body.cep.replace(/\D/g,"") ;

            const result = await Users.update({
                id,
                name, 
                email,            
                cep,
                address ,
                cpf_cnpj});
            
            return res.render('users/index', {
                success: 'Conta atualizada com sucesso!',
                user: req.body
            });

        } catch (error) {
            console.error(error);
            return res.render('users/index', {
                error: 'Algum erro aconteceu!'
            })
        }
    }
    
}