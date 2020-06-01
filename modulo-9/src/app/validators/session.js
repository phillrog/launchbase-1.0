const Users = require('../models/Users');
const { compare } = require('bcryptjs');
const db = require("../../../models");
const Op = db.Sequelize.Op;

const login = async(req, res, next) => {
    const { email, password} = req.body;

    const results = await Users.findOne({ 
        where:{       
            email: email                    
        }
    });   

    
    if (!results) return res.render('session/login', {
        user: req.body,
        error: "Usuário não encontrado"
    });
    
    const user = results.dataValues;

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
        let results = await Users.findOne({
            where:{       
                email: email                    
            }                                            
        });

        if (!results) 
            return res.render("session/forgot-password",
                  {
                      user: req.body,
                      error: "Email não cadastrado!"
                  });

        const user = results.dataValues;

        req.user = user;
        
        next();
    } catch (error) {
        console.error(error);
    }
};

const reset = async  (req, res, next) => {
    const { email, password, passwordRepeat, token} = req.body;

    const results = await Users.findOne({
        where:{       
            email: email                    
        }           
    });    
    
    if (!results) return res.render('session/password-reset', {
        user: req.body,
        error: "Usuário não encontrado"
    });

    const user = results.dataValues;
        
    if (password != passwordRepeat) 
        return res.render('session/password-reset', {
            user: req.body,
            error: 'A senha e a repetição da senha estão incorretas.'
        });

    if (token != user.reset_token) 
        return res.render('session/password-reset', {
            user: req.body,
            token,
            error: 'Token inválido! Solicite uma nova recuperação de senha.'
        });

    let now = new Date();
    now = now.setHours(now.getHours());

    if (now > user.reset_token_expires)
        return res.render('session/password-reset', {
            user: req.body,
            token,
            error: 'Token expirado! Solicite uma nova recuperação de senha.'
        });

    req.user = user;

    next();
}

module.exports = { login, forgot, reset };