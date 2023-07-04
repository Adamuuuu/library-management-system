const KoaRouter = require("@koa/router");
const borrowingController = require("../controller/borrowing.controller");
const borrowingRouter = new KoaRouter({ prefix: "/borrowing" });
const { verifyAuth } = require("../middleware/login.middeware");
const { refreshBookInfo, refreshReaderInfo, recoverUser } = require("../middleware/borrowing.middeware");
//借书功能实现

borrowingRouter.post("/", verifyAuth, borrowingController.create, refreshBookInfo, refreshReaderInfo);
//还书功能实现
borrowingRouter.post("/returnbook", verifyAuth, borrowingController.returnBooks, refreshBookInfo, refreshReaderInfo);

//缴纳罚款功能
borrowingRouter.post("/payfine", verifyAuth, borrowingController.queryDebtBooks, borrowingController.payfine, recoverUser);

// borrowingRouter.get("/query", verifyAuth, borrowingController.queryAll);
// borrowingRouter.get("/query/:borrowingId", verifyAuth, borrowingController.queryInfo);

// 修改图书信息

// borrowingRouter.patch(
//     "/update/:id",
//     verifyAuth,
//     borrowingController.update
// );

// 删除某本图书
// borrowingRouter.delete("/delete/:borrowingId", verifyAuth, borrowingController.delete);




module.exports = borrowingRouter;
