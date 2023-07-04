const connection = require("../app/database");
class UserService {
  async create(user) {
    const { name, password } = user;
    const statement = "INSERT INTO `Readers` (username,password) VALUES (?,?)";
    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }
  //检查数据库中是否已经存在该用户名
  async findName(username) {
    const statement = "SELECT * from `Readers` WHERE username=?";
    const [values] = await connection.execute(statement, [username]);
    console.log("这是value", values);
    return values;
  }
  async queryAll() {
    const statement =
      "select * from Readers";
    const [result] = await connection.execute(statement);
    return result;
  }

  async queryInfo(userId) {
    const statement =
      "select * from Readers where ReaderID=? ";
    const [result] = await connection.execute(statement, [userId]);
    return result;
  }
  async update(user) {
    console.log('这是用户信息', user.Gender)
    // const id = ctx.user.id
    // console.log('这是用户id', id)
    const statement =
      "UPDATE Readers SET Name = ?,Gender = ?,Organization = ?,Type = ? WHERE ReaderID = 21; ";
    const [result] = await connection.execute(statement, [user.Name, user.Gender, user.Organization, user.Type]);
    return result;
  }
  async delete(userId) {
    const statement =
      "delete from Readers where ReaderID=? ";
    const [result] = await connection.execute(statement, [userId]);
    return !!result.length;
  }

  async queryDebt(ReaderID) {
    const statement =
      "select Debt from Readers where ReaderID=? ";
    const [result] = await connection.execute(statement, [ReaderID]);
    return result;
  }
}

module.exports = new UserService();
