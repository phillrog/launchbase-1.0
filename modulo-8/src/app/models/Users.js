const db = require("../../../models");
const Users = db.Users;
const Op = db.Sequelize.Op;
const {hash} = require('bcryptjs'); 

const Base = require('./Base');

Base.init("Users")

module.exports = {
    ...Base,     
    
    // async delete(id) {
    //     let products = await Products.allByUserId(id);

    //     let files = products.map( p => p.Files.map(file => file.dataValues)[0]);

    //     await Users.destroy({
    //         where: {
    //             id
    //         }
    //     });
    //     files.map(async file => {
    //         await fs.unlinkSync(file.path);
    //     });
    // }
}