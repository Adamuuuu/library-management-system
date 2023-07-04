const KoaRouter = require("@koa/router");
const userController = require("../controller/user.controller");
const userRouter = new KoaRouter({ prefix: "/users" });
const { verifyUser, handlePassword } = require("../middleware/user.middeware");
const { verifyAuth } = require("../middleware/login.middeware");
//用户注册

userRouter.post("/", verifyUser, handlePassword, userController.create);
//用户查询用户列表

userRouter.get("/query", verifyAuth, userController.queryAll);
userRouter.get("/query/:userId", verifyAuth, userController.queryInfo);

// 修改用户信息

userRouter.patch(
    "/update/:id",
    verifyAuth,
    userController.update
);
// 修改博文内容
// articleRouter.patch(
//     "/updateContent/:id",
//     verifyAuth,
//     articleController.updateContent
// );
// 删除用户
userRouter.delete("/delete/:userId", verifyAuth, userController.delete);



//查询用户头像信息

module.exports = userRouter;
