const Order = require("../../../models/order");

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
                res.redirect("/cart");

            }).catch( err => {
                req.flash("error" , "Something went Wrong");
                res.redirect("/cart");
            });

        },

        async index(req , res) {

            const orders = await Order.find({ customerId: req.user._id });
            res.render("customers/orders" , { orders: orders });

        }
    }

}

module.exports = orderControllers;