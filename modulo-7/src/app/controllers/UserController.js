    
const Users = require('../models/Users');

module.exports = {
    registerForm(req, res) {
        return res.render('users/register.njk');
    },
    async post(req, res) {
        

        return res.send('Passed');
    }
}