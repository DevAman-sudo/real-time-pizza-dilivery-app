const Order = require("../../../models/order");
const moment = require("moment");

function orderControllers() {

    return {
        store(req , res) {
            
            const {number , address} = req.body;

            if (!number || !address) {
                req.flash("error" , "All fields are required");
                return res.redirect("/cart");
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                number,
                address
            })

            order.save().then( () => {

                req.flash("success" , "Order placed Successfully");
                delete req.session.cart;
                res.redirect("/customer/orders");

            }).catch( err => {
                req.flash("error" , "Something went Wrong");
                res.redirect("/cart");
            });

        },

        async index(req , res) {

            const orders = await Order.find({ customerId: req.user._id } ,
                null,
                { sort: {"createdAt": -1} }
                );
            res.render("customers/orders" , { orders: orders, moment: moment });

        }
    }

}

module.exports = orderControllers;