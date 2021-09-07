// web controllers
const webControllers = require('../app/http/controllers/homeControllers');

function initRoutes(app) {

    // home route
  app.get("/", webControllers().index );

  app.get("/cart", (req, res) => {
    res.render("customers/cart");
  });

  app.get("/login", (req, res) => {
    res.render("auth/login");
  });

  app.get("/register", (req, res) => {
    res.render("auth/register");
  });
}

module.exports = initRoutes;
