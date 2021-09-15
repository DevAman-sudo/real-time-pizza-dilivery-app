const Order = require("../../../models/order");

function orderControllers() {

    return {
        store(req , res) {
            
            const {number , address} = req.body;

            Order.find();

        }
    }

}

module.exports = orderControllers;