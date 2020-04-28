const fs = require('fs');
const data = require('./data');

// post
exports.post = function(req,res) {
    const keys = Object.keys(req.body);
    keys.forEach((i) => {
        if (req.body[i] == "")
            return res.send(`Please fill all fields!`)
    });

    req.body.birth = Date.parse(req.body.birth);
    req.body.created_at = Date.now();
    data.instructors.push(req.body);

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
        if(err) return res.send("Write file has error");

        return res.redirect('/instructors');
    });

    return res.send(req.body);
}