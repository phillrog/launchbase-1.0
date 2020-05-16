const Categories = require('../models/Categories');
const Products = require('../models/Products');
const Files = require('../models/Files');
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

        if (req.files.length == 0){
            return res.send('Please, seand at least one image');
        }
        
        //save product
        let results = await Products.create(req.body);
        product = results.dataValues;

        //get categories
        results = await Categories.allAsync();  
        const categories = results;

        // save files
        const filesPromises = req.files.map(file => Files.create({...file, product_id: product.id }));
        await Promise.all(filesPromises);

        return res.redirect(`/products/${product.id}`);
    },
    async edit (req, res) {
        let results = await Products.find(req.params.id);

        const product = results.dataValues;     

        if (!product) return res.send('Product not found!');
        
        product.price = formatPrice(product.price);
        product.old_price = formatPrice(product.old_price);
        console.log(product.old_price)
        results = await Categories.allAsync();  
        const categories = results;
        
        let files = product.Files.map(file => file.dataValues);

        files = files.map((file) => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }))

        return res.render('products/edit.njk', {product, categories, files});

    },
    async put(req, res) {
        const keys = Object.keys(req.body);

        for (const key of keys) {
            if (req.body[key] == "") {
                return res.send("Please fill all fields");
            }
        }
        
        req.body.price = req.body.price.replace(/\D/g, '');

        if (req.body.price != req.body.old_price) {
          let oldProduct = await Products.find(req.body.id);

          req.body.old_price = oldProduct.price;
        }

        let results = await Products.update(req.body);
        product = results.dataValues;
        results = await Categories.allAsync();  
        const categories = results;

        return res.redirect(`/products/${req.body.id}`);
    },
    async delete(req,res) {
        let results = await Products.find(req.body.id);

        const product = results.dataValues;     

        if (!product) return res.send('Product not found!');

        await Products.delete(product.id);

        res.redirect('/products');
    },
}