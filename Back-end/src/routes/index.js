const UserRouter = require("./UserRouter");
const ProductRouter = require("./ProductRouter");
const OrderRouter = require("./OrderRouter");
const FrameRouter = require("./FrameRouter");
const SizeRouter = require("./SizeRouter");
const EvaluateRouter = require("./EvaluateRouter");
const CartRouter = require("./CartRouter");
const PaymentRouter = require('./PaymentRouter')

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/product", ProductRouter);
  app.use("/api/order", OrderRouter);
  app.use("/api/frame", FrameRouter);
  app.use("/api/size", SizeRouter);
  app.use("/api/evaluate", EvaluateRouter);
  app.use('/api/payment', PaymentRouter);
  app.use('/api/cart', CartRouter)



};

module.exports = routes;
