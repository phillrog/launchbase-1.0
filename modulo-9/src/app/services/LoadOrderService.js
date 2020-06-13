const Orders = require('../models/Orders');
const User = require('../models/Users');
const {formatPrice, date} = require('../../lib/utils');
const db = require("../../../models");
const FilesModel = db.Files;
const LoadProductService = require('./LoadProductService');

async function format(order) {
    order.product = await LoadProductService.load('productWithDelete',{            
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
            
        ],

        where: {
            id: order.product_id
        }
    });

    order.buyer = await User.findOne({where:{ id: order.buyer_id}});
    order.seller = await User.findOne({where:{ id: order.seller_id}});

    order.formattedPrice = formatPrice(order.price);
    order.formattedTotal = formatPrice(order.total);

    const statuses = {
        open: 'Aberto',
        sold: 'Vendido',
        canceled: 'Cancelado'
    };

    order.formattedStatus = statuses[order.status];
    const updateAt = date(order.updated_at)
    order.formattedUpdatedAt = `${order.formattedStatus} em ${updateAt.day}/${updateAt.month}/${updateAt.year} às ${updateAt.hour}h:${updateAt.minutes}`;

    return order;
}

const LoadService = {
    load(service, filter) {
        this.filter = filter;
        return this[service]();
    },
    async order() {
        try {
           let order = await Orders.findOne(this.filter)
            return format(order);
        } catch (error) {
            console.log(error)
        }
    },
    async orders(){
        try {
            const ordersFind = await Orders.all(this.filter);
            const orders = ordersFind.map(item => item.dataValues);
            const ordersPromise = orders.map(format);
            return Promise.all(ordersPromise);

        } catch (error) {
            console.log(error)
        }
    },
    format
}

module.exports = LoadService;