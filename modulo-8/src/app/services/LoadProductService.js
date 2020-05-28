const Products = require('../models/Products');
const {formatPrice, date} = require('../../lib/utils');

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

    return files.length > 0 ? files[0].src : undefined;
}

function format(product) {
    product.img = await getImage(prod.id);
    product.formattedOldPrice = formatPrice(product.old_price);
    product.formattedPrice = formatPrice(product.price);
    
    const { day, hour, minutes, month } = date(product.updated_at);
    product.published = { 
        day: `${day}/${month}`,
        hour: `${hour}h${minutes}`
    };

    product.oldPrice = formatPrice(product.old_price);
    product.price = formatPrice(product.price);
}

const LoadService = {
    load(service, filter) {
        this.filter = filter;
        return this[service]()
    },
    product() {
        try {
            const product = await Products.findOne(this.filter);

            return format(product);
        } catch (error) {
            console.log(error)
        }
    },
    products(){
        try {
            const products = await Products.all(this.filter);
            const productPromise = products.map(format)
            return Promise.all(productPromise);
        } catch (error) {
            console.log(error)
        }
    },
    format
}

module.exports = LoadService;