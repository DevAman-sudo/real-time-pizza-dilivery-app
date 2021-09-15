// web controllers
const homeControllers = require('../app/http/controllers/homeControllers');
const authControllers = require('../app/http/controllers/authControllers');
const cartControllers = require('../app/http/controllers/customers/cartControllers');
const orderControllers = require('../app/http/controllers/customers/orderControllers');
const guest = require('../app/http/middleware/guest');


// routes function
function initRoutes(app) {

  // home route
  app.get("/", homeControllers().index );

  app.get("/cart", cartControllers().index );

  app.post("/update-cart", cartControllers().update );

  app.get("/login", guest , authControllers().login );

  app.post("/login", authControllers().postLogin);

  app.get("/register", guest , authControllers().register );

  app.post("/register", authControllers().postRegister );

  app.post("/logout", authControllers().logout);

  app.post("/order", orderControllers().store);
}

module.exports = initRoutes;
