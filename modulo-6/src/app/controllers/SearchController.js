const Categories = require('../models/Categories');
const Products = require('../models/Products');
const Files = require('../models/Files');
const {formatPrice, date} = require('../../lib/utils');

module.exports = {
    async index(req, res) {
        let results = await Products.all();
        const products = results.map(item => item.dataValues);
        
        async function getImage(productId) {
            let results = await Products.find(productId);
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

        res.render("search/index.njk", {products});
    },
    
}