const Categories = require('../models/Categories');
const Products = require('../models/Products');
const Files = require('../models/Files');
const {formatPrice, date} = require('../../lib/utils');
const fs = require('fs');
const db = require("../../../models");
const CategoriesModel = db.Categories
const FilesModel = db.Files;
const LoadProductService = require('../services/LoadProductService');

module.exports = {
    async create(req, res) {

      const categories = await Categories.all({order:["name"]});
      
      return res.render('products/create.njk', {product: req.body,categories});
    },
    async post(req, res) {
        const categories = await Categories.all({order:["name"]});               
        try {
            
            //save product
            const {
                category_id, 
                user_id, 
                name, 
                description, 
                old_price, 
                
                quantity,
                status
            } = req.body;
            let price = req.body.price.replace(/\D/g, '');
            let results = await Products.create({
                category_id, 
                user_id: user_id || 1, 
                name, 
                description, 
                old_price: old_price || price, 
                price, 
                quantity,
                status: status || 1 
            });
            product = results.dataValues;
            
            // save files
            const filesPromises = req.files.map(async file => 
                await Files.create({path: file.path, name: file.filename, product_id: product.id }));
                await Promise.all(filesPromises);
                
        } catch (error) {
            console.log('Error', error);
            return res.redirect(`/products/create`,{
                error: "Erro inesperado"
            });
        }
        return res.redirect(`/products/${product.id}`);
    },
    async edit (req, res) {
        let results = await Products.findOne({            
            where: {id: req.params.id},
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
          let oldProduct = await Products.findOne({            
            where: {id : req.body.id},
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

          req.body.old_price = oldProduct.price;
        }
        const {
            id,
            category_id, 
            user_id, 
            name, 
            description, 
            old_price, 
            price,
            quantity,
            status
        } = req.body;

        let results = await Products.update({ data: {
            category_id, 
            user_id: user_id , 
            name, 
            description, 
            old_price: old_price || price, 
            price, 
            quantity,
            status: status 
        }, parm: {
        where: {
            id
        }}});
        product = results.dataValues;
        results = await Categories.all({order:["name"]});
        const categories = results;

        return res.redirect(`/products/${req.body.id}`);
    },
    async delete(req,res) {
        let results = await Products.findOne({            
            where: {id: req.body.id},
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
        let product = await LoadProductService.load('product', {            
            where: {id: req.params.id},
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

        return res.render("products/show.njk", { product });
    }
}