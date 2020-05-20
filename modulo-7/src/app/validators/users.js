const Users = require('../models/Users');

const post = async (req, res) => {
    const keys = Object.keys(req.body);

    for (const key of keys) {
        if (req.body[key] == "") {
            return res.render("users/register",{
                user: req.body,
                error: 'Por favor preencha todos os campos.'
            });
        }
    }

    const {email, password, passwordRepeat} = req.body;
    let cpf_cnpj = req.body.cpf_cnpj.replace(/\D/g,'');

    const user = await Users.findOne({email, cpf_cnpj});

    if (user) 
        return res.render('users/register', {
            user: req.body,
            error: 'Usuário já cadastrado.'
        });

    if (password != passwordRepeat) 
        return res.render('users/register', {
            user: req.body,
            error: 'A senha e a repetição da senha estão incorretas.'
        });
};

module.exports = { post };