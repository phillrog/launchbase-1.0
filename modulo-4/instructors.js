const fs = require('fs');
const data = require('./data');
const { age, date } = require('./utils');
const Intl = require("intl");

exports.index = function(req, res) {
    return res.render('instructors/index', { instructors: data.instructors })
}

//show
exports.show = function(req,res) {
    // req.params
    const { id } = req.params;

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id;
    });

    if(!foundInstructor) return res.send('Instructor not found');

    const instructor = {
        ...foundInstructor,
        age : age(foundInstructor.birth),
        gender: foundInstructor.gender,
        services: foundInstructor.services.split(','),
        created_at: (new Intl.DateTimeFormat("pt-BR")).format(foundInstructor.created_at)
    }
    return res.render('instructors/show', { instructor });
}
// post
exports.post = async function(req,res) {
    const keys = Object.keys(req.body);
    keys.forEach((i) => {
        if (req.body[i] == "")
            return res.send(`Please fill all fields!`)
    });

    let {avatar_url, name, birth, gender, services } = req.body;

    birth = Date.parse(req.body.birth);

    const created_at = Date.now();
    const id = Number(data.instructors.length) + 1;

    data.instructors.push({
        id,
        avatar_url, 
        name, 
        birth, 
        gender, 
        services, 
        created_at
        });

    await fs.writeFileSync("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file has error");

        return res.redirect('/instructors');
    });

    return res.redirect(`/instructors/${id}`);
}

//edit
exports.edit = function(req, res) {
    // req.params
    const { id } = req.params;

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id;
    });
    
    if(!foundInstructor) return res.send('Instructor not found');
    
    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }
    return res.render('instructors/edit', {instructor });
}

// put
exports.put = async function(req, res) {
    // req.body
    const { id } = req.body;
    let index = -1;

    const foundInstructor = data.instructors.find(function (instructor, idx) {
        index = idx; 
        return instructor.id == id ;
    });

    if(!foundInstructor) return res.send('Instructor not found');

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    };

    data.instructors[index] = instructor;

    await fs.writeFileSync("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file has error");

        return res.redirect(`/instructors/${id}`);
    });
    
    return res.redirect(`/instructors/${id}`);
}

// delete
exports.delete = async function(req, res) {
    const {id} = req.body;

    const filteredInstructors = data.instructors.filter((instructor)=> instructor.id != id);
    
    data.instructors = filteredInstructors;

    await fs.writeFileSync("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send('Write file has error');
        
        return res.redirect(`/instructors`);
    });

    return res.redirect(`/instructors`);
}