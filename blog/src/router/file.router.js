const KoaRouter = require("@koa/router");

const { verifyAuth } = require("../middleware/login.middeware");
const { handleAvatar } = require("../middleware/file.middeware");
const fileController = require("../controller/file.controller");
const fileRouter = new KoaRouter({ prefix: "/file" });
//定义文件上传的中间件

fileRouter.post("/avatar", verifyAuth, handleAvatar, fileController.create);

module.exports = fileRouter;
