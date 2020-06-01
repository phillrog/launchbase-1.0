const Categories = require('../models/Categories');
const Products = require('../models/Products');
const Files = require('../models/Files');
const {formatPrice, date} = require('../../lib/utils');
const db = require("../../../models");
const FilesModel = db.Files;
const LoadProductService = require('../services/LoadProductService');

module.exports = {
    async index(req, res) {
       let results, params = {};

       let { filter, category } = req.query;

        if (!filter || filter.toLowerCase() == 'toda a loja') filter = null;

        params.filter = filter;

        if (category) {
            params.category = category;
        }
        
        results = await Products.search(params);
        
        const productsPromises = results.map(prod => LoadProductService.format(prod.dataValues));

        const products = await Promise.all(productsPromises);

        const search = {
            term: filter || 'Toda a loja',
            total: products.length,
            category 
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