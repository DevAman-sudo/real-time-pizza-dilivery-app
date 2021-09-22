const { resolveInclude } = require("ejs");
const order = require("../../../models/order");

function orderControllers() {

    return {

        index(req , res) {

            order.find({ status: { $ne: "completed"} } , null , {sort: {"createdAt": -1}}).
            populate("customerId" , "-password").exec( (err , orders) => {

                if (req.xhr) {
                    return res.json(orders)
                }
                return res.render("admin/order");
            });

        }

    }

}

module.exports = orderControllers;