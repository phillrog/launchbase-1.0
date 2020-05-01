const fs = require('fs');
const data = require('./data');

//show
exports.show = function(req,res) {
    // req.params
    const { id } = req.params;

    const foundInstructor = data.instructors.find(function (instructor) {
        return instructor.id == id;
    });

    if(!foundInstructor) return res.send('Instructor not found');

    const age = (timeStamp) => {
        const today = new Date();
        const birthDate = new Date(timeStamp);

        let age = today.getFullYear() - birthDate.getFullYear();
        let month = today.getMonth() - birthDate.getMonth();

        if (month <= 0) age = age -1;
    };

    const instructor = {
        ...foundInstructor,
        age : "",
        gender: "",
        services: foundInstructor.services.split(','),
        created_at: ""
    }
    return res.render('instructors/show', { instructor });
}
// post
exports.post = function(req,res) {
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

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file has error");

        return res.redirect('/instructors');
    });

    return res.send(req.body);
}