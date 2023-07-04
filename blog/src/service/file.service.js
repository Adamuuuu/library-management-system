const connection = require("../app/database");

class fileService {
  async create(filename, mimetype, size, id) {
    const statement =
      "INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?)";
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      id,
    ]);
    return result;
  }
}
module.exports = new fileService();
