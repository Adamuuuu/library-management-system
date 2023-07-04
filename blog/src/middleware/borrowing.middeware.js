const borrowingservice = require("../service/borrowing.service")

const refreshReaderInfo = async (ctx, next) => {
    //获取当前读者的最大可借阅数量和已借阅数量
    const flag = ctx.flag
    console.log("还书标志1 ", ctx.flag)
    const result = await borrowingservice.refreshReaderInfo(ctx.userid, flag)
    console.log('这里可能是错误结果', result)

    //更新最大可借阅数量和已借阅数量
}
const refreshBookInfo = async (ctx, next) => {
    //获取当前图书的最大可借阅数量

    const bookId = ctx.bookid
    const flag = ctx.flag
    console.log("还书标志2", flag)
    const result = await borrowingservice.refreshBookInfo(bookId, flag)

    // console.log("刷新成功 ", result)
    //更新图书的最大可借阅数量
    await next()
}
//更新用户的信息，当用户缴纳欠款之后回复用户的各类权限
const recoverUser = async (ctx, next) => {
    const ReaderID = ctx.userid
    console.log("这是rid", ReaderID)
    // 删除借阅表中的信息，清零用户表中的罚款数，最大借书数目和当前借书数目，同时对书籍表中的最大可借阅量减去相应的数目
    const result = await borrowingservice.userInit(ReaderID)
    ctx.body = {
        code: 0,
        message: "恢复权限成功"
    }

}
module.exports = { refreshBookInfo, refreshReaderInfo, recoverUser };