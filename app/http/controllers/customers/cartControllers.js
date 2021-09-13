function cartControllers() {

    return {
        index(req , res) {
            res.render("customers/cart");
        },

        update(req , res) {
            
            // creating cart
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }

            let cart = req.session.cart;

            // checking if items does not exists in cart
            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    items: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.prize
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.prize
            }


            return res.json({ totalQty: req.session.cart.totalQty });
        }
    }

}

module.exports = cartControllers;