const connection = require("../app/database");
class BookService {
    async create(book) {
        const { Title, Author, Price, Publisher, Summary, TotalCopies, AvailableCopies } = book;
        const statement = "INSERT INTO `Books` (Title, Author, Price, Publisher, Summary, TotalCopies, AvailableCopies) VALUES (?,?,?,?,?,?,?)";
        const [result] = await connection.execute(statement, [Title, Author, Price, Publisher, Summary, TotalCopies, AvailableCopies]);
        return result;
    }


    async queryAll() {
        const statement =
            "select * from Books";
        const [result] = await connection.execute(statement);
        return result;
    }

    async queryInfo(bookId) {
        const statement =
            "select * from Books where BookID=? ";
        const [result] = await connection.execute(statement, [bookId]);
        return result;
    }
    async update(book) {
        const { Title, Author, Price, Publisher, Summary, TotalCopies, AvailableCopies } = book;
        // const id = ctx.user.id
        // console.log('这是用户id', id)
        const statement =
            "UPDATE Books SET Title = ?,Author = ?,Price = ?,Publisher = ? ,Summary= ?,TotalCopies=?,AvailableCopies=? WHERE BookID = 21; ";
        const [result] = await connection.execute(statement, [Title, Author, Price, Publisher, Summary, TotalCopies, AvailableCopies]);
        return result;
    }
    async delete(bookId) {
        const statement =
            "delete from Books where BookID=? ";
        const [result] = await connection.execute(statement, [bookId]);
        return !!result.length;
    }
}

module.exports = new BookService();
