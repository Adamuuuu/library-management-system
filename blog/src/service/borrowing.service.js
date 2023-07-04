const connection = require("../app/database");
class BorrowingService {
    async init() {
        // 然后查询所有逾期未还书的用户并更新所有逾期未还书的用户的欠款金额，
        //  1.截止日期小于当前日期
        const statement1 = 'UPDATE Borrowings B INNER JOIN Readers R ON B.ReaderID = R.ReaderID SET B.FineAmount = DATEDIFF(CURRENT_DATE(), B.DueDate) * 2 WHERE B.ReturnDate IS NULL AND B.DueDate < CURRENT_DATE();'
        // 2.截止日期小于还书日期
        const statement2 = 'UPDATE Borrowings B INNER JOIN Readers R ON B.ReaderID = R.ReaderID SET B.FineAmount = DATEDIFF(B.ReturnDate, B.DueDate) * 2 WHERE B.ReturnDate IS NULL AND B.DueDate < B.ReturnDate;'
        // 并在相应的读者表中更新欠款数据，
        const statement3 = 'UPDATE Readers SET Debt = ( SELECT SUM(FineAmount) FROM Borrowings WHERE Borrowings.ReaderID = Readers.ReaderID AND FineAmount > 0) WHERE ReaderID IN (SELECT ReaderID FROM Borrowings);'
        // 同时将用户的最大可借阅量修改为0,禁止该读者继续借阅
        const statement4 = 'UPDATE Readers SET MaxBorrowLimit = 0 WHERE Debt <> 0;'

        await connection.execute(statement1);
        await connection.execute(statement2);
        await connection.execute(statement3);
        await connection.execute(statement4);
        console.log("登陆初始化执行成功")


    }
    async create(BookID, BorrowDate, DueDate) {

        console.log("这是传入数据", BookID, BorrowDate, DueDate)
        const statement = "INSERT INTO `Borrowings` (ReaderID, BookID, BorrowDate, DueDate) VALUES (?,?,?,?)";
        const [result] = await connection.execute(statement, [1, BookID, BorrowDate, DueDate]);
        return result;
    }


    async queryDebt(ReaderID, BookID) {
        const statement =
            `SELECT BorrowID,FineAmount
           FROM Borrowings
           WHERE ReaderID = ? AND BookID = ?
           LIMIT 1;`
        const [result] = await connection.execute(statement, [ReaderID, BookID]);
        console.log("这是返回结果 ", result)
        return result;
    }
    async delete(BorrowID) {
        const statement =
            `DELETE FROM Borrowings
            WHERE BorrowID = ?;`
        const [result] = await connection.execute(statement, [BorrowID]);
        console.log("这是返回结果 ", result)
        return result;

    }
    async updateDate(BorrowID, ReturnDate) {
        const statement = `update Borrowings set ReturnDate=? where BorrowID=?`
        const [result] = await connection.execute(statement, [ReturnDate, BorrowID])
        return result
    }


    async refreshBookInfo(bookId, flag) {
        console.log("这是flag", flag, bookId)
        await connection.beginTransaction();
        if (!flag) {
            const statement = 'UPDATE Books SET AvailableCopies = (SELECT temp.AvailableCopies-1  FROM (SELECT AvailableCopies FROM Books WHERE BookID = ?) AS temp) WHERE BookID = ?;'
            const [result] = await connection.execute(statement, [bookId, bookId]);
            console.log("这是结果", result)
            await connection.commit();
            return result;
        } else {

            const statement = 'UPDATE Books SET AvailableCopies = (SELECT temp.AvailableCopies+1  FROM (SELECT AvailableCopies FROM Books WHERE BookID = ?) AS temp) WHERE BookID = ?;'
            const [result] = await connection.execute(statement, [bookId, bookId]);
            console.log("这是结果", result)
            await connection.commit();
            return result;
        }



    }
    async refreshReaderInfo(userId, flag) {
        try {
            await connection.beginTransaction();
            if (!flag) {
                const statement = 'UPDATE Readers SET MaxBorrowLimit = MaxBorrowLimit - 1, CurrentBorrowCount = CurrentBorrowCount + 1 WHERE ReaderID = ?;'
                const [result] = await connection.execute(statement, [userId])
                await connection.commit();
                return result;
            } else {
                const statement = 'UPDATE Readers SET MaxBorrowLimit = MaxBorrowLimit + 1, CurrentBorrowCount = CurrentBorrowCount - 1 WHERE ReaderID = ?;'
                const [result] = await connection.execute(statement, [userId])
                await connection.commit();
                return result;
            }
        } catch (error) {
            // 处理约束违反的错误
            if (connection) {
                await connection.rollback();
            }

            console.error('发生错误:', error);

            return error
            // 可以在这里执行任何你想要的错误处理逻辑，例如回滚事务或者返回相关的错误信息给调用者
            throw error; // 可以选择继续抛出错误供上层处理
        }

    }
    //查询该用户所有有欠款的书籍
    async queryDebtBooks(ReaderID) {
        const statement = `select BookID,FineAmount from Borrowings where FineAmount  !=0 and ReaderID=? and ReturnDate is  null`
        const [result] = await connection.execute(statement, [ReaderID])
        console.log("这是查询是否有未还的欠款书籍", result)
        const bookIDs = result.map(book => book.BookID);
        console.log("这是bookids", bookIDs)
        if (result != null) {
            const statement1 = `UPDATE Readers
            SET debt = debt + (SELECT SUM(price) * 3
                               FROM Books
                               WHERE BookID IN (${bookIDs}))
            WHERE ReaderID = 2;`
            const [result2] = await connection.execute(statement1, [ReaderID])
            console.log("这是更新后的结果", result2)
        }

        return result

    }
    async userInit(ReaderID) {
        const statement = `DELETE FROM Borrowings
        WHERE ReaderID = ?;`
        const statement1 = `UPDATE Readers
        SET debt = 0 ,MaxBorrowLimit=5,CurrentBorrowCount=0
        WHERE ReaderID = ?;`

        const [result] = await connection.execute(statement, [ReaderID])
        const [result2] = await connection.execute(statement1, [ReaderID])
        return result2

    }
}

module.exports = new BorrowingService();
