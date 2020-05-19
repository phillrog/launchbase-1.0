const Users = require('../models/Users');

const post = async (req, res) => {
    const keys = Object.keys(req.body);

    for (const key of keys) {
        if (req.body[key] == "") {
            return res.send("Please fill all fields");
        }
    }

    const {email, password, passwordRepeat} = req.body;
    let cpf_cnpj = req.body.cpf_cnpj.replace(/\D/g,'');

    const user = await Users.findOne({email, cpf_cnpj});

    if (user) 
        return res.send('Users exists');

    if (password != passwordRepeat) 
        return res.send('Passoword mismatch');
};

module.exports = { post };