const Products = require('../models/Products');
const {formatPrice, date} = require('../../lib/utils');
const db = require("../../../models");
const FilesModel = db.Files;

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
        src: `${file.path.replace('public', '')}`
    }))

    product.files = files;    

    return product;
}

async function format(product) {
    const Cat = product.Cat;

    product = await getImage(product.id);

    product.img = (product.files && product.files.length > 0 && product.files[0]) ? product.files[0].src : undefined;

    product.formattedOldPrice = formatPrice(product.old_price);
    product.formattedPrice = formatPrice(product.price);
    product.Cat = Cat;

    const { day, hour, minutes, month } = date(product.updated_at);
    product.published = { 
        day: `${day}/${month}`,
        hour: `${hour}h${minutes}`
    };
    product.oldPrice = product.old_price;
    product.price = product.price;

    return product;
}

const LoadService = {
    load(service, filter) {
        this.filter = filter;
        return this[service]();
    },
    async product() {
        try {
            const productFind = await Products.findOne(this.filter);
            const product = productFind.dataValues;

            return format(product);
        } catch (error) {
            console.log(error)
        }
    },
    async products(){
        try {
            const productsFind = await Products.all(this.filter);
            const products = productsFind.map(item => item.dataValues);
            const productPromise = products.map(format);
            return Promise.all(productPromise);

        } catch (error) {
            console.log(error)
        }
    },
    format
}

module.exports = LoadService;