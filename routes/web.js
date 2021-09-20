// web controllers
const homeControllers = require('../app/http/controllers/homeControllers');
const authControllers = require('../app/http/controllers/authControllers');
const cartControllers = require('../app/http/controllers/customers/cartControllers');
const orderControllers = require('../app/http/controllers/customers/orderControllers');
const AdminOrderControllers = require('../app/http/controllers/admin/orderControllers');
const guest = require('../app/http/middleware/guest');
const auth = require('../app/http/middleware/auth');


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

  // customers routes
  app.post("/order", auth , orderControllers().store);

  app.get("/customer/orders", auth , orderControllers().index);

  // admin routes
  app.get("/admin/orders", auth , AdminOrderControllers().index);

}

module.exports = initRoutes;
