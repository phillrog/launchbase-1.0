const db = require("../../../models");

const Base = {
    init(model) {
        if(!model) throw "Tabela não informada";

        this.model = model;

        return this;
    },
    findOne({where, attributes = null, include = null, order = null}) {
        let parm = {
            where
        };

        if (order) {
            parm.order = order;
        }

        if (attributes){
            parm.attributes;
        }

        if (include) {
            parm.include = include;
        }

        console.log(parm)

        return db[this.model].findOne(parm);
    },
    create(data) {
        return db[this.model].create(data);
    },
    update({data, parm}) {      
                     console.log(data, parm)
        return db[this.model].update(data, parm);
    },
    delete(id) {
        return db[this.model].destroy({
            where: {
                id
            }
        });
    },
    all({where, attributes = null, include = null, order = null}){
        let parm = {
            where
        };

        if (order) {
            parm.order = order;
        }

        if (attributes){
            parm.attributes;
        }

        if (include) {
            parm.include = include;
        }

        console.log(parm)

        return db[this.model].findAll(parm);
    }
}

module.exports = Base;