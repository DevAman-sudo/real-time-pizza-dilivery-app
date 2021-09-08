function cartControllers() {

    return {
        index(req , res) {
            res.render("customers/cart");
        }
    }

}

module.exports = cartControllers;