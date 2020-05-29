const Products = require('../models/Products');
const db = require("../../../models");
const Categories = require('../models/Categories');

const checkAllFields = (body) => {
    const keys = Object.keys(body);

    for (const key of keys) {
        if (body[key] == "") {
            return { 
                error: 'Por favor preencha todos os campos.',
                product: body
            }
        }
    }
}


const post = async(req, res, next) => {
    const categories = await Categories.all({order:["name"]});
    const fillAllFields = checkAllFields(req.body);

    if (fillAllFields) return res.render("products/create.njk", 
    {
        error: "Preencha todos os campos",
        ...fillAllFields, 
        categories
    });

    if (!req.files || req.files.length == 0){
        return res.render("products/create.njk",{
            error: "Por favor informe pelo menos uma imagem do produto!",
            product: req.body,
            categories
        });
    }
    
    next();

};

const put = async(req, res, next) => {
    const categories = await Categories.all({order:["name"]});
    const fillAllFields = checkAllFields(req.body);

    if (fillAllFields) return res.render("products/edit.njk", 
    {
        error: "Preencha todos os campos",
        fillAllFields, 
        categories
    });
   
    
    next();

};

module.exports = { post, put }