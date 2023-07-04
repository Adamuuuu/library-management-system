const bookservice = require("../service/book.service");
const fs = require("fs");
class BookController {
    async create(ctx, next) {
        const book = ctx.request.body;
        console.log("可以收到book", book);
        const result = await bookservice.create(book);
        console.log("这是result", result);
        ctx.body = {
            code: 0,
            message: "新增图书成功",
        };
    }
    //-- 查询所有图书
    async queryAll(ctx, next) {
        const result = await bookservice.queryAll();
        ctx.body = {
            code: 0,
            message: "查询所有图书成功",
            data: result,
        };
    }
    //查询单个图书信息
    async queryInfo(ctx, next) {
        const { bookId } = ctx.params;

        const result = await bookservice.queryInfo(bookId);
        ctx.body = {
            code: 0,
            message: "查询图书成功",
            data: result,
        };
    }
    async queryTitleInfo(ctx, next) {
        const { title } = ctx.params;
        console.log("这是title", title)
        const result = await bookservice.queryTitleInfo(title);
        ctx.body = {
            code: 0,
            message: "查询图书成功",
            data: result,
        };
    }
    async queryAuthorInfo(ctx, next) {
        const { author } = ctx.params;

        const result = await bookservice.queryAuthorInfo(author);
        ctx.body = {
            code: 0,
            message: "查询图书成功",
            data: result,
        };
    }
    //更新图书信息
    async update(ctx, next) {
        const book = ctx.request.body
        console.log("这是将要更新的数据", book)
        const result = await bookservice.update(book)
        ctx.body = {
            code: 0,
            message: "修改图书信息成功",
            data: result,
        }
    }
    async delete(ctx, next) {
        const { bookId } = ctx.params

        const result = await bookservice.delete(bookId)
        ctx.body = {
            code: 0,
            message: "删除用户成功",
            data: result,
        };
    }
}

module.exports = new BookController();
