const db = require("../../../models");
const Files = db.Files;
const fs = require('fs');

module.exports = {
    find(id) {
        return Files.findOne({
            where:{
                id
            }
        })
    },
    create({ path, filename, product_id }) {
        
        return Files.create({                
                path, name: filename, product_id
        });
    },
    async delete (id) {
        try {
            const file = await this.find(id);

            await fs.unlinkSync(file.path);
            
            return Files.destroy({
                
                where: {
                    id
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}