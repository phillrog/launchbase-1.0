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

const forgot = async (req, res, next) => {
    const {email} = req.body;

    try {
        let user = await Users.findOne({email});

        if (!user) 
            return res.render("session/forgot-password",
                  {
                      user: req.body,
                      error: "Email não cadastrado!"
                  });

        req.user = user;
        
        next();
    } catch (error) {
        console.error(error);
    }
};
module.exports = { login, forgot };