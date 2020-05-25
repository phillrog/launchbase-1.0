const Categories = require('../models/Categories');
const Products = require('../models/Products');
const Files = require('../models/Files');
const {formatPrice, date} = require('../../lib/utils');
const db = require("../../../models");
const FilesModel = db.Files;

module.exports = {
    async index(req, res) {
       let results, params = {};

       const { filter, category } = req.query;
       
        if (!filter) return res.redirect('/');

        params.filter = filter;

        if (category) {
            params.category = category;
        }

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

        results = await Products.search(params);

        console.log(results);

        const products = results.map(prod => prod.dataValues);
        const productsPromise = products.map(async (prod) => {
            prod.img = await getImage(prod.id);
            prod.oldPrice = formatPrice(prod.old_price);
            prod.price = formatPrice(prod.price);
        })

        await Promise.all(productsPromise);


        const search = {
            term: req.query.filter,
            total: products.length
        }
        
        const categories = products.map( product =>( {
            id: product.category_id,
            name: product.Cat.name
        })).reduce(
            (categoriesFiltered, category) => {
                const found = categoriesFiltered.some(cat => cat.id == category.id);

                if ( !found)
                    categoriesFiltered.push(category);
                    
                return categoriesFiltered
            }, []
        );

        return res.render("search/index.njk", {products, search, categories});
    }
}