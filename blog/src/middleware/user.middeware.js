const userservice = require("../service/user.service");
const md5password = require("../utils/md5-password");
//验证用户名和密码是否存在
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  if (!name || !password) {
    ctx.body = {
      code: -1001,
      message: "用户名或密码不能为空",
    };
    return;
  }
  const checkname = await userservice.findName(name);
  if (checkname.length) {
    ctx.body = {
      code: -1002,
      message: "该用户名已注册，请尝试新的用户名",
    };
    return;
  }
  await next();
};
//对密码进行加密处理
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);
  await next();
};

module.exports = { verifyUser, handlePassword };
