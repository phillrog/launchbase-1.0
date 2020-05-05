const { age, date } = require('../../lib/utils');
const Intl = require("intl");
const Member = require('../models/Member');

module.exports = {
    async index(re,res){
        await Member.allSync((members) => res.render('./members/index', { members }));        
    },
    create(re,res){
        return res.render('./members/create');
    },
    async post(req,res){
        await Member.createAsync(req.body, (member) => res.redirect(`/members/${member.id}`));
    },
    async show(req,res){
        await Member.findAsync(req.params.id, (data) => {
            if (!member) return res.send('Member not found');

            member.birth = date(member.birth).birthDay;
    
            return res.render('members/show', { member });
        });         
    },
    edit(re,res){
        await Member.findAsync(req.params.id, (member) => {
            if (!member) return res.send('Member not found');

            member.birth = date(member.birth).birthDay;
            
            return res.render('members/show', { member });
        });   
    },
    async put(req,res){
        await Member.updateAsync(req.body, () =>{
            return res.redirect(`members/${req.body.id}`);
        });    
    },
    async delete(req,res){
        await Member.deleteAsync(req.body.id, () =>{
            return res.redirect(`members/${req.body.id}`);
        }); 
    },
}