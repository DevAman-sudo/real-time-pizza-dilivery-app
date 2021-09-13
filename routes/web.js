// web controllers
const homeControllers = require('../app/http/controllers/homeControllers');
const authControllers = require('../app/http/controllers/authControllers');
const cartControllers = require('../app/http/controllers/customers/cartControllers');


// routes function
function initRoutes(app) {

  // home route
  app.get("/", homeControllers().index );

  app.get("/cart", cartControllers().index );

  app.post("/update-cart", cartControllers().update );

  app.get("/login", authControllers().login );

  app.get("/register", authControllers().register );
}

module.exports = initRoutes;
