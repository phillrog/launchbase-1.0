const { age, date } = require('../../lib/utils');
const Intl = require("intl");

module.exports = {
    index(re,res){
        return;
    },
    create(re,res){
        return res.render('./instructors/create');
    },
    post(re,res){
        const keys = Object.keys(req.body);
        keys.forEach((i) => {
            if (req.body[i] == "")
                return res.send(`Please fill all fields!`)
        });
    
        let {avatar_url, name, birth, gender, services } = req.body;
    
        return;
    },
    show(re,res){
        return;
    },
    edit(re,res){
        return;
    },
    put(re,res){
        const keys = Object.keys(req.body);
        keys.forEach((i) => {
            if (req.body[i] == "")
                return res.send(`Please fill all fields!`)
        });
    
        let {avatar_url, name, birth, gender, services } = req.body;
    
        return;
    },
    delete(re,res){
        return;
    },
}