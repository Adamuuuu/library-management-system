const KoaRouter = require("koa-router");
const loginRouter = new KoaRouter({ prefix: '/login' });

loginRouter.post("/", verifyPassword, loginController.sign);
// loginRouter.get("/token", vertifyToken, endMdwToken);

module.exports = loginRouter;