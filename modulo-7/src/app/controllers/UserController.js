    
const Users = require('../models/Users');

module.exports = {
    registerForm(req, res) {
        return res.render('users/register.njk');
    },
    async show(req, res) {
        return res.send('Ok cadastrado')
    },
    async post(req, res) {
        console.log(req.body);
        const {  name, 
            email, 
            password,             
            cep,
            address } = req.body;

        const cpf_cnpj = req.body.cpf_cnpj.replace(/\D/g,"") ;

        const user = await Users.create({name, 
            email, 
            password,             
            cep,
            address ,
            cpf_cnpj});

        
        req.session.userId = user.dataValues.id;
        console.log(req.session);
        return res.redirect('/users');
    },
    
}