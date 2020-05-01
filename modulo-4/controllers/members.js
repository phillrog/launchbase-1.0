const fs = require('fs');
const data = require('../data');
const { date, typeBlood } = require('../utils');
const Intl = require("intl");

exports.index = function(req, res) {
    return res.render('members/index', { members: data.members })
}

exports.show = function(req,res) {
    // req.params
    const { id } = req.params;

    const foundMember = data.members.find(function (member) {
        return member.id == id;
    });

    if(!foundMember) return res.send('Member not found');

    const member = {
        ...foundMember,
        birth : date(foundMember.birth).birthDay,
        blood : typeBlood(foundMember.blood),
        created_at: (new Intl.DateTimeFormat("pt-BR")).format(foundMember.created_at)
    }
    return res.render('members/show', { member });
}

exports.post = async function(req,res) {
    const keys = Object.keys(req.body);
    keys.forEach((i) => {
        if (req.body[i] == "")
            return res.send(`Please fill all fields!`)
    });

    let { birth } = req.body;

    birth = Date.parse(req.body.birth);

    const created_at = Date.now();    
    let id = 1;

    if (data.members.length > 0) {
        const lastId = data.members[data.members.length -1].id;
        id = lastId + 1;
    }

    data.members.push({
        ... req.body,
        birth, 
        id,
        created_at
    });

    await fs.writeFileSync("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file has error");

        return res.redirect('/members');
    });

    return res.redirect(`/members/${id}`);
}

exports.edit = function(req, res) {
    // req.params
    const { id } = req.params;

    const foundMember = data.members.find(function (member) {
        return member.id == id;
    });
    
    if(!foundMember) return res.send('Member not found');
    
    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }
    return res.render('members/edit', {member });
}

exports.put = async function(req, res) {
    // req.body
    const { id } = req.body;
    let index = -1;

    const foundMember = data.members.find(function (member, idx) {
        index = idx; 
        return member.id == id ;
    });

    if(!foundMember) return res.send('Member not found');

    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    };

    data.members[index] = member;

    await fs.writeFileSync("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file has error");

        return res.redirect(`/members/${id}`);
    });
    
    return res.redirect(`/members/${id}`);
}

exports.delete = async function(req, res) {
    const {id} = req.body;

    const filteredMembers = data.members.filter((member)=> member.id != id);
    
    data.members = filteredMembers;

    await fs.writeFileSync("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write file has error');
        
        return res.redirect(`/members`);
    });

    return res.redirect(`/members`);
}

exports.create = function(req, res) {
    return res.render('./members/create');
}