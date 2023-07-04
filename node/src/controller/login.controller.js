const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/screct");
class loginController {
  sign(ctx, next) {
    const { id, name } = ctx.user;

    //设置token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256",
    });
    ctx.body = {
      code: 0,
      data: {
        id,
        name,
        token,
      },
    };
  }
  test(ctx, next) {
    ctx.body = "验证授权通过";
  }
}

module.exports = new loginController();
