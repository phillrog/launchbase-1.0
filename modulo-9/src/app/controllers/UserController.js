    
const db = require("../../../models");
const FilesModel = db.Files;
const Users = require('../models/Users');
const {hash} = require('bcryptjs'); 
const Products = require('../models/Products');
const fs = require('fs');
const {formatCep, formatCpfCnpj} = require('../../lib/utils');
const LoadProductService = require('../services/LoadProductService');

module.exports = {
    registerForm(req, res) {
        return res.render('users/register.njk');
    },
    async show(req, res) {
        const {user} = req;

        user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj);
        user.cep = formatCep(user.cep);

        return res.render('users/index', {user});
    },
    async post(req, res) {

        const {  name, 
            email, 
            password,             
            address } = req.body;

        const cpf_cnpj = req.body.cpf_cnpj.replace(/\D/g,"") ;
        const cep = req.body.cep.replace(/\D/g,"") ;

        const passwordHash = await hash(password, 8);

        const result = await Users.create({name, 
            email, 
            password: passwordHash,             
            cep,
            address ,
            cpf_cnpj});
        
        const user = result.dataValues;
        
        req.session.userId = user.id;

        return res.redirect('/users');
    },
    async update(req,res){

        try {
            const {  
                id,
                name, 
                email,             
                address,
                reset_token,
                reset_token_expires
             } = req.body;
    
            const cpf_cnpj = req.body.cpf_cnpj.replace(/\D/g,"") ;
            const cep = req.body.cep.replace(/\D/g,"") ;

        
            const result = await Users.update({data:{
                        name: name, 
                        email: email, 
                        cpf_cnpj: cpf_cnpj,
                        cep: cep,
                        address: address,
                        reset_token,
                        reset_token_expires
                    },parm:{                         
                       where:{     id}
                    }
                });            
            
            return res.render('users/index', {
                success: 'Conta atualizada com sucesso!',
                user: req.body
            });

        } catch (error) {
            console.error(error);
            return res.render('users/index', {
                error: 'Algum erro aconteceu!',
                user: req.body
            })
        }
    },
    async delete(req, res) {
        try {
            const id = req.session.userId;

            let products = await Products.all({            
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
                ],
                order: ['updated_at'],
                where: {
                    user_id: id
                }
            });

            let files = products.map( p => p.Files.map(file => file.dataValues)[0]);


            req.session.destroy();
            await Users.delete(id);

            files.map(async file => {
                await fs.unlinkSync(file.path);
            });
            
            return res.render("session/login",{
                success: "Conta deletada com sucesso!"
            })         
        } catch (error) {
            console.error(error);
            return res.render("users/index",{
                error: "Erro ao tentar deletar sua conta",
                user: req.body
            });
        }
    },
    async ads(req, res) {
        const products = await LoadProductService.load('products',{            
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
            ],
            order: ['updated_at'],
            where: {
                user_id: req.session.userId
            }
        });

        return res.render('users/ads', {products})
    }
    
}