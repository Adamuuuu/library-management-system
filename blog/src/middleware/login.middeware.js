const { PUBLIC_KEY, PRIVATE_KEY } = require("../config/screct");
const borrowingService = require("../service/borrowing.service");
const userService = require("../service/user.service");
const md5password = require("../utils/md5-password");
const jwt = require("jsonwebtoken");
const verifyPassword = async (ctx, next) => {
  const { username, password } = ctx.request.body;
  console.log("这是用户名和密码", username, password)
  if (!username || !password) {
    ctx.body = {
      code: -1001,
      message: "用户名或密码不能为空",
    };
    return;
  }

  const user = await userService.findName(username);
  console.log("这是用户", user[0])
  if (!user.length) {
    ctx.body = {
      code: -1003,
      message: "该用户名不存在",
    };
    return;
  }

  if (user[0].Password !== md5password(password)) {
    console.log(user[0].password)
    ctx.body = {
      code: -1004,
      message: "输入密码不正确，请重新输入",
    };
    return;
  }
  ctx.user = user[0];
  await next();
};
//生成token并验证

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", "");

  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });

    ctx.user = result;

    await next();
  } catch (error) {
    console.log(error);
    ctx.body = {
      code: "-1006",
      Message: "无效的token或者token已过期",
    };
    return;
  }
};

//更新读者的欠款信息
const refreshDebt = async (ctx, next) => {
  const result = await borrowingService.init()
}
module.exports = { verifyPassword, verifyAuth, refreshDebt };
