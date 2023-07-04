const KoaRouter = require("@koa/router");
const bookController = require("../controller/book.controller");
const bookRouter = new KoaRouter({ prefix: "/book" });
const { verifyAuth } = require("../middleware/login.middeware");
//新增图书

bookRouter.post("/", verifyAuth, bookController.create);
//查询图书

bookRouter.get("/query", verifyAuth, bookController.queryAll);
bookRouter.get("/query/:bookId", verifyAuth, bookController.queryInfo);
bookRouter.get("/queryTitle/:title", verifyAuth, bookController.queryTitleInfo);
bookRouter.get("/queryAuthor/:author", verifyAuth, bookController.queryAuthorInfo);
// 修改图书信息

bookRouter.patch(
    "/update/:id",
    verifyAuth,
    bookController.update
);

// 删除某本图书
bookRouter.delete("/delete/:bookId", verifyAuth, bookController.delete);




module.exports = bookRouter;
