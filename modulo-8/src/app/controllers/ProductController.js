const Categories = require('../models/Categories');
const Products = require('../models/Products');
const Files = require('../models/Files');
const {formatPrice, date} = require('../../lib/utils');
const fs = require('fs');

module.exports = {
    async create(req, res) {

      const categories = await Categories.all({order:["name"]});
      
      return res.render('products/create.njk', {product: req.body,categories});
    },
    async post(req, res) {
        const categories = await Categories.all({order:["name"]});               
        
        //save product
        let results = await Products.create(req.body);
        product = results.dataValues;

        // save files
        const filesPromises = req.files.map(async file => 
            await Files.create({path: file.path, name: file.filename, product_id: product.id }));
        await Promise.all(filesPromises);

        return res.redirect(`/products/${product.id}`);
    },
    async edit (req, res) {
        let results = await Products.find(req.params.id);          
console.log(results)
        if (!results) return res.redirect('/',{
            error: "Produto não encontrado"
        });

        const product = results.dataValues;  
        
        product.price = formatPrice(product.price);
        product.old_price = formatPrice(product.old_price);

        results = await Categories.all({order:["name"]});
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
            if (req.body[key] == "" && key != "removed_files") {
                return res.send("Please fill all fields");
            }
        }
        if ( req.files.length != 0) {
            const newFilesPromise = req.files.map(file => 
                Files.create({path: file.path, name: file.filename, product_id: product.id }));

            await Promise.all(newFilesPromise);
        }

        if ( req.body.removed_files)
        {
            const removedFiles = req.body.removed_files.split(",");
            const lastIndex = removedFiles.length - 1;

            removedFiles.splice(lastIndex, 1);

            const removedFilesPromise = removedFiles.map(id => { 
                try {
                    const file = Files.findOne({where: {id}});
                    
                    Files.delete(id)
        
                    fs.unlinkSync(file.path);
                } catch (error) {
                    console.log(error);
                }    
                
            });

            await Promise.all(removedFilesPromise);
        }

        req.body.price = req.body.price.replace(/\D/g, '');

        if (req.body.price != req.body.old_price) {
          let oldProduct = await Products.find(req.body.id);

          req.body.old_price = oldProduct.price;
        }

        let results = await Products.update(req.body);
        product = results.dataValues;
        results = await Categories.all({order:["name"]});
        const categories = results;

        return res.redirect(`/products/${req.body.id}`);
    },
    async delete(req,res) {
        let results = await Products.find(req.body.id);

        const product = results.dataValues;     

        if (!product) return res.render(`products/${req.body.id}`,{
            error: "Produto não foi encontrado"
        });

        await Products.delete(product.id);

        const files = product.Files;

        const removeFilesPromise = files.map(async file => { 
                try {                     
                   await fs.unlinkSync(file.path);
                } catch (error) {
                    console.log(error);
                }    
                
            });

            await Promise.all(removeFilesPromise);

        res.redirect('/');
    },
    async show(req, res) {
        let results = await Products.find(req.params.id);
        const product = results.dataValues;
        if (!product) return res.send('Product not found!');

        const { day, hour, minutes, month } = date(product.updated_at);
        product.published = { 
            day: `${day}/${month}`,
            hour: `${hour}h${minutes}`
        };

        product.oldPrice = formatPrice(product.old_price);
        product.price = formatPrice(product.price);


        let files = product.Files.map(file => file.dataValues);

        files = files.map((file) => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }))

        return res.render("products/show.njk", { product, files });
    }
}