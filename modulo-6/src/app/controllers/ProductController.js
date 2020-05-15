const Categories = require('../models/Categories');
const Products = require('../models/Products');

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

        return res.render('products/create.njk', { product, categories } );
    },
}