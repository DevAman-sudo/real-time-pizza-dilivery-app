const Menu = require('../../models/menu');

function homeControllers() {

    return {
        async index(req , res) {
            const pizzas = await Menu.find();
            res.render('home' , {pizzas: pizzas});
        }
    }

}

module.exports = homeControllers;