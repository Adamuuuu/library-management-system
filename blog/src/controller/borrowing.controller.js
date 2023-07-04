const borrowingservice = require("../service/borrowing.service");
const userservice = require("../service/user.service");

class BorrowingController {
    async create(ctx, next) {
        ctx.flag = false
        const { ReaderID, BookID } = ctx.request.body;
        console.log("可以收到BookID", BookID);
        //获得借出日期
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 使用 padStart 补零
        const day = String(currentDate.getDate()).padStart(2, "0");

        const BorrowDate = `${year}-${month}-${day}`;
        //获得归还日期

        currentDate.setDate(currentDate.getDate() + 20);

        const dueyear = currentDate.getFullYear();
        const duemonth = String(currentDate.getMonth() + 1).padStart(2, "0");
        const dueday = String(currentDate.getDate()).padStart(2, "0");

        const DueDate = `${dueyear}-${duemonth}-${dueday}`;
        console.log("这是传入数据", BookID, BorrowDate, DueDate)
        const result = await borrowingservice.create(BookID, BorrowDate, DueDate);

        ctx.body = {
            code: 0,
            message: "借书成功",
        };
        ctx.bookid = BookID
        ctx.userid = ReaderID

        await next();
    }
    //还书逻辑
    async returnBooks(ctx, next) {
        ctx.flag = true
        //首先查询该用户是否有欠款，如果没有，直接删除借阅表中的数据，同时修改读者表和图书表
        const { ReaderID, BookID } = ctx.request.body
        const result = await borrowingservice.queryDebt(ReaderID, BookID)
        const { BorrowID, FineAmount } = result[0]
        ctx.userid = ReaderID
        ctx.bookid = BookID
        if (FineAmount == null) {
            const result2 = await borrowingservice.delete(BorrowID)
            ctx.body = {
                code: 0,
                message: "还书成功"
            }


        } else {
            //如果有欠款，则将当天日期作为还书日期填入借阅表中
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // 使用 padStart 补零
            const day = String(currentDate.getDate()).padStart(2, "0");

            const ReturnDate = `${year}-${month}-${day}`;
            const result = await borrowingservice.updateDate(BorrowID, ReturnDate)
            ctx.body = {
                code: 0,
                message: "此书已逾期归还，请尽快缴纳欠款，以免影响后续借书"
            }
        }
        await next()

    }
    //缴纳欠款逻辑
    //缴纳罚款，首先还书，然后查看该用户所有有欠款且未还的书籍，如果有，获取未还的书的价格*3然后加上罚款成为新的罚款数目，如果没有，罚款数目不变，然后扫码付款，删除借阅表中的信息，清零用户表中的罚款数，最大借书数目和当前借书数目，同时对书籍表中的最大可借阅量减去相应的数目
    async queryDebtBooks(ctx, next) {
        // const { ReaderID } = ctx.userid
        const { ReaderID } = ctx.request.body
        const result = await borrowingservice.queryDebtBooks(ReaderID)
        ctx.userid = ReaderID
        await next()
    }
    async payfine(ctx, next) {
        const ReaderID = ctx.userid
        const result = await userservice.queryDebt(ReaderID)
        ctx.body = {
            code: 0,
            message: "查询欠款成功",
            data: result,
        };

        await next()
    }
}

module.exports = new BorrowingController();
