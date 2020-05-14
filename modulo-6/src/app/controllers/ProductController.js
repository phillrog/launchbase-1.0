const Categories = require('../models/Categories');

module.exports = {
    create(req, res) {

        Categories.allAsync()
        .then((categories) => { 

            return res.render('products/create.njk', {categories})
        })
        .catch((error) => { throw new Error(error) });
        
    },
    post(req, res) {
        return res.render('products/create.njk')
    },
    async categoriesSelectOptions(callback){
        

        return data;
    },
}