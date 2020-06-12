const Orders = require('../models/Orders');
const db = require("../../../models");
const FilesModel = db.Files;
const {formatPrice, date} = require('../../lib/utils');
const LoadProductService = require('../services/LoadProductService');
const User = require('../models/Users');
const mailer = require('../../lib/mailer');
const Cart = require('../../lib/cart');

const email = (seller, product, buyer) => `
<h2>Olá ${seller.name} </h2>
<p>Você tem um novo pedido de compra do seu produto </p>
<p>Produto: ${product.name}</p>
<p>Preço: ${product.formattedPrice}</p>
<p><br/><br/></p>
<h3>Dados do comprador</h3>
<p>${buyer.name}</p>
<p>${buyer.email}</p>
<p>${buyer.address}</p>
<p>${buyer.cep}</p>
<p><br/><br/></p>
<p><strong>Entre em contato com o comprador para finalizar a venda!</strong></p>
<p><br/><br/></p>
<p>Atenciosamente equipe Launchstore</p>
`;

module.exports = {
    async post(req, res) {
        try {

            const cart = Cart.init(req.session.cart);
            const buyer_id = req.session.userId;

            const filteredItems = cart.items.filter(item => 
                item.product.user_id != buyer_id
            );

            const createdOrdersPromise = filteredItems.map(async item => {
                let { product, price:total, quantity } = item;
                const { price, id:product_id, user_id:seller_id } = product;
                const status = "open";

                const order = await Orders.create({
                    seller_id,
                    buyer_id,
                    product_id,
                    price,
                    total,
                    quantity,
                    status
                });

                product = await LoadProductService.load('product', {            
                    where: {id: product_id},
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

                const seller = await User.findOne({where : {id: seller_id}});

                const buyer = await User.findOne({where : {id: buyer_id }});

                await mailer.sendMail({
                    to: seller.email,
                    from: 'no-reply@launchstore.com.br',
                    subject: 'Novo pedido de venda',
                    html: email(seller, product, buyer)
                });

                return order;
            });

            await Promise.all(createdOrdersPromise);

            return res.render('orders/success');

        } catch (error) {
            console.error(error);
            return res.render('orders/error');
            
        }
        
    },
    
}