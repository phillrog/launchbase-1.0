const Categories = require('../models/Categories');
const Products = require('../models/Products');
const {formatPrice} = require('../../lib/utils');

module.exports = {
   async create(req, res) {

      const categories = await Categories.allAsync();
      
      return res.render('products/create.njk', {categories});
    },
    async post(req, res) {
        const keys = Object.keys(req.body);

        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send("Please fill all fields");
            }
        }

        let results = await Products.create(req.body);
        product = results.dataValues;
        results = await Categories.allAsync();  
        const categories = results;

        return res.redirect(`/products/${product.id}`);
    },
    async edit (req, res) {
        let results = await Products.find(req.params.id);
console.log(results)
        const product = results.dataValues;     

        if (!product) return res.send('Product not found!');

        product.price = formatPrice(product.price);
        product.old_price = formatPrice(product.old_price);
        
        results = await Categories.allAsync();  
        const categories = results;

        return res.render('products/edit.njk', {product, categories});

    }
}