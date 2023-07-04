const KoaRouter = require("@koa/router");

const loginRouter = new KoaRouter({ prefix: "/login" });
const loginController = require("../controller/login.controller");
const { verifyPassword, verifyAuth, refreshDebt } = require("../middleware/login.middeware");
loginRouter.post("/", verifyPassword, loginController.sign, refreshDebt);
loginRouter.get("/test", verifyAuth, loginController.test);
module.exports = loginRouter;
