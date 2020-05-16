const db = require("../../../models");
const Files = db.Files;

module.exports = {
    create({ path, filename, product_id }) {
        
        return Files.create({                
                path, name: filename, product_id
        });
    },
}