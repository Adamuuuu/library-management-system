const fileService = require("../service/file.service");
const userservice = require("../service/user.service");
class fileController {
  async create(ctx, next) {
    const { filename, mimetype, size } = ctx.request.file;
    const { id } = ctx.user;
    const result = await fileService.create(filename, mimetype, size, id);
    const avatarUrl = `http://localhost:8000/users/avatar/${id}`;
    const result2 = await userservice.updateAvatarUrl(avatarUrl, id);
    ctx.body = {
      code: 0,
      message: "上传文件成功",
      data: result2,
    };
  }
}
module.exports = new fileController();
