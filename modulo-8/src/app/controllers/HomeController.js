const Categories = require('../models/Categories');
const Products = require('../models/Products');
const Files = require('../models/Files');
const {formatPrice, date} = require('../../lib/utils');
const db = require("../../../models");
const FilesModel = db.Files;

module.exports = {
    async index(req, res) {
        let results = await Products.all();
        const products = results.map(item => item.dataValues);
        
        async function getImage(productId) {
            let results = await Products.findOne({            
                where: {id: productId},
                attibutes: [
                    "id",
                    "category_id", 
                    "user_id",
                    "name", 
                    "description", 
                    "old_price",
                    "price", 
                    "quantity",
                    "status",
                    "updated_at"
                ],
                include : [
                    {
                        model : FilesModel 
                    }
                ]
            });
            const product = results.dataValues;

            if (!product) return undefined;              
    
            let files = product.Files.map(file => file.dataValues);
    
            files = files.map((file) => ({
                ...file,
                src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
            }))
            return files.length > 0 ? files[0].src : undefined;
        }

        let imgPromises = products.map(async prod => {
            prod.img = await getImage(prod.id);
            prod.oldPrice = formatPrice(prod.old_price);
            prod.price = formatPrice(prod.price);
        });

        await Promise.all(imgPromises);

        return res.render("home/index.njk", {products});
    },
    
}