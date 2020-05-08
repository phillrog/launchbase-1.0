const { age, date, typeBlood } = require('../../lib/utils');
const Intl = require("intl");
const Member = require('../models/Member');

module.exports = {
    index(re,res){
        Member.allAsync((members) => res.render('./members/index', { members }));        
    },
    create(req,res){
        Member.instructorsSelectOptions(function(options){
            return res.render('./members/create', {instructorsOptions : options});
        });
    },
    post(req,res){
        Member.createAsync(req.body, (member) => res.redirect(`/members/${member.id}`));
    },
    show(req,res){
        Member.findAsync(req.params.id, (member) => {
            if (!member) return res.send('Member not found');
            const { Instructor:{ dataValues:{ instructor_name} } } = member;
            console.log(instructor_name);
            member.blood = typeBlood(member.blood);
            member.birth = date(member.birth).birthDay;
            member.created_at = (new Intl.DateTimeFormat("pt-BR")).format(member.created_at);
            member.instructor_name = instructor_name;
            return res.render('members/show', { member });
        });         
    },
    edit(req,res){
       
        Member.findAsync(req.params.id, (member) => {
            if (!member) return res.send('Member not found');

            member.birth = date(member.birth).iso;
            member.created_at = date(member.birth).iso;
            
            return res.render('members/edit', { member });
        });   
    },
    put(req,res){
        const keys = Object.keys(req.body);
        keys.forEach((i) => {
            if (req.body[i] == "")
            throw `Please fill all fields!`;
        });
        Member.updateAsync(req.body, () =>{
            return res.redirect(`members/${req.body.id}`);
        });    
    },
    delete(req,res){
        Member.deleteAsync(req.body.id, () =>{
            return res.redirect(`members`);
        }); 
    },
}