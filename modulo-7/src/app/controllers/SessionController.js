const crypt = require('crypto');
const Users = require('../models/Users');
const mailer = require('../../lib/mailer');
const {hash} = require('bcryptjs');

module.exports = {
    loginForm(req,res ) {
        return res.render('session/login')
    },
    login(req, res) {
        req.session.userId = req.user.id;

        return res.redirect("/users");
    },
    logout(req, res){
        req.session.destroy();
        return res.redirect('/');
    },
    forgotForm(req, res){
        req.session.destroy();
        return res.render('session/forgot-password');
    },
    async forgot(req,res){
        const { user } = req;
        try {
            
            const token = crypt.randomBytes(20).toString("hex");

            let now = new Date();

            now = now.setHours(now.getHours() + 1);

            user.reset_token = token;
            user.reset_token_expires = now;

            await Users.update(user);

            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@launchstore.com.br',
                subject: 'Recuperação de senha',
                html: `
                    <h2>Perdeu a chave ?</h2>
                    <p> Não se preocupe, clique no link abaixo para recuperar a sua senha</p>
                    <p>
                        <a href="http://localhost:3000/users/password-reset?token=${token}" target="_blank">
                        RECUPERAR A SENHA
                        </a>
                    </p>
                `
            });

            return res.render("session/forgot-password",{
                success: 'Verifique seu e-mail para resetar sua senha!'
            });
        } catch (error) {
            console.error(error); 
            return res.render("session/forgot-password",{
                error: "Erro inesperado. Tente novamente mais tarde."
            });
        }
    },
    resetForm(req,res){
       return res.render('session/password-reset', {
           token: req.query.token
       }); 
    },
    async reset(req,res){
        const user = req.user;
        const {email, password,passwordRepeat, token } = req.body;
console.log(user)
        try {
            const newPassword = await hash(password, 8);

            await Users.update({
                ...user,
                password: newPassword,
                reset_token: "",
                reset_token_expires: ""
            })

            return res.render('session/login',{
                user: req.body,
                success: 'Senha atualizada! Faça o seu login'
            });
        } catch (error) {
            console.error(error);
            return res.render('session/password-reset', {
                user: req.body,
                token,
                error: 'Erro inesperado, tente novamente!'
            })
        }
    }
}