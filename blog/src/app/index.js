const Koa = require("koa");

const app = new Koa();
const cors = require("koa2-cors");

const userRouter = require("../router/user.router");
const bodyparser = require("koa-bodyparser");
const loginRouter = require("../router/login.router");
const bookRouter = require("../router/book.router")
const borrowingRouter = require("../router/borrowing.router")
app.use(bodyparser());
app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());
app.use(bookRouter.routes());
app.use(bookRouter.allowedMethods());
app.use(borrowingRouter.routes());
app.use(borrowingRouter.allowedMethods());
app.use(cors());

module.exports = app;
