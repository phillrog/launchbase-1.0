const Users = require('../models/Users');
const { compare } = require('bcryptjs');

const login = async(req, res, next) => {
    const { email, password} = req.body;

    const user = await Users.findOne({email});
    
    if (!user) return res.render('session/login', {
        user: req.body,
        error: "Usuário não encontrado"
    });
    
    const passed = await compare(password, user.password);

    if (!passed) 
        return res.render('session/login', {
            user: req.body,
            error: "Senha incorreta"
        });


    req.user = user ;

    next();

};

module.exports = { login };