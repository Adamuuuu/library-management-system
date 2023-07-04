const userservice = require("../service/user.service");
const fs = require("fs");
class UserController {
  async create(ctx, next) {
    const user = ctx.request.body;
    console.log("可以收到user", user);
    const result = await userservice.create(user);
    console.log("这是result", result);
    ctx.body = {
      code: 0,
      message: "创建用户成功",
    };
  }
  //-- 查询多个博文的时候展示评论的个数
  async queryAll(ctx, next) {
    const result = await userservice.queryAll();
    ctx.body = {
      code: 0,
      message: "查询所有博文成功",
      data: result,
    };
  }
  //查询单个用户信息
  async queryInfo(ctx, next) {
    const { userId } = ctx.params;
    console.log("这是readid", ctx.params)
    const result = await userservice.queryInfo(userId);
    ctx.body = {
      code: 0,
      message: "查询用户成功",
      data: result,
    };
  }
  //更新用户信息
  async update(ctx, next) {
    const user = ctx.request.body
    console.log("这是将要更新的数据", user)
    const result = await userservice.update(user)
    ctx.body = {
      code: 0,
      message: "修改用户信息成功",
      data: result,
    }
  }
  async delete(ctx, next) {
    const { userId } = ctx.params

    const result = await userservice.delete(userId)
    ctx.body = {
      code: 0,
      message: "删除用户成功",
      data: result,
    };
  }
}

module.exports = new UserController();
