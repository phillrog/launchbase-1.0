const Users = require('../models/Users');
const { compare } = require('bcryptjs');

const checkAllFields = (body) => {
    const keys = Object.keys(body);

    for (const key of keys) {
        if (body[key] == "") {
            return { 
                user: body,
                error: 'Por favor preencha todos os campos.'
            }
        }
    }
}

const show = async(req, res, next) => {
    const {userId: id} = req.session;
    if (! id) return res.render('users/register');
    const results = await Users.findById(id);
    
    if (!results) return res.render('users/register', {
        error: "Usuário não encontrado"
    });

    const user = results.dataValues;

    req.user = user ;

    next();

};

const post = async (req, res, next) => {
    const fillAllFields = checkAllFields(req.body);

    if (fillAllFields) return res.render("users/register", fillAllFields);

    const {email, password, passwordRepeat} = req.body;
    let cpf_cnpj = req.body.cpf_cnpj.replace(/\D/g,'');

    const results = await Users.findOne({email, cpf_cnpj});
    
    if (results) 
        return res.render('users/register', {
            user: req.body,
            error: 'Usuário já cadastrado.'
        });

    const user = results.dataValues;

    if (password != passwordRepeat) 
        return res.render('users/register', {
            user: req.body,
            error: 'A senha e a repetição da senha estão incorretas.'
        });

    req.body.user = user;

    next();
};


const update = async (req, res, next) => {
    const fillAllFields = checkAllFields(req.body);

    if (fillAllFields) return res.render("users/register", fillAllFields);

    const { id, password } = req.body;

    if (! password || ! id) 
        return res.render('users/index',{
            user: req.body,
            error: 'Coloque sua senha para atualizar seu cadastro.'
        });
    
    const results = await Users.findById(id);
    const user = results.dataValues;
    const passed = await compare(password, user.password);

    if (!passed) 
        return res.render('users/index', {
            user: req.body,
            error: "Senha incorreta"
        });


    next();
};

module.exports = { post , show, update };