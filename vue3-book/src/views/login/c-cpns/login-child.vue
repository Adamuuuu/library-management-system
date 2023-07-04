<template>
  <div class="login">
    <div class="header">
      <h1 style="color: aqua">后台管理系统</h1>
    </div>
    <div class="main">
      <el-tabs type="border-card" stretch v-model="activeName">
        <el-tab-pane name="account" label="账号登录">
          <template #label>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span class="text">账号登陆</span>
          </template>

          <!-- 账号密码表单 -->
          <el-form
            :model="account"
            :rules="accountRules"
            ref="fromRef"
            status-icon
          >
            <el-form-item label="账号" prop="name">
              <el-input v-model="account.name" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="account.password" show-password />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 手机验证码表单 -->
        <!-- <el-tab-pane name="phone" label="手机登录">
                    <template #label>
                        <el-icon>
                            <Iphone />
                        </el-icon>
                        <span class="text">手机登录</span>
                    </template>

                    <el-form>
                        <el-form-item label="手机" label-width="55px">
                            <el-input v-model="phone" />
                        </el-form-item>
                        <el-form-item label="验证码">
                            <el-input v-model="verify" />
                        </el-form-item>
                    </el-form>
                </el-tab-pane> -->
      </el-tabs>
    </div>

    <!-- 记住密码和忘记密码 -->
    <div class="checkout">
      <el-checkbox v-model="isremember" label="记住密码" size="large" />
      <el-link type="primary" :underline="false">忘记密码</el-link>
    </div>
    <!-- 立即登录按钮 -->
    <div class="footer">
      <el-button
        type="primary"
        class="login-btn"
        size="large"
        @click="loginAction"
        >立即登录</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormRules } from "element-plus";
import { reactive, ref, watch } from "vue";
import { localCache } from "../../../utils/cache";

const activeName = ref("account");
const account = reactive({
  name: "",
  password: "",
});
const accountRules: FormRules = {
  name: [
    { required: true, message: "请输入账号", trigger: "blur" },
    {
      min: 6,
      max: 12,
      message: "请输入6-12位的字符",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: "请输入6~12数字",
      trigger: "blur",
    },
  ],
};

const isremember = ref<boolean>(localCache.getCache("isremember") ?? false);
watch(isremember, (newValue) => {
  console.log(isremember.value);
  localCache.setCache("isremember", newValue);
});

function loginAction() {
  console.log("登陆成功");
}
</script>

<style lang="less" scoped>
.login {
  background: url(@/assets/images/背景图.jpg);
}

.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main {
  margin-top: 20px;
}

.checkout {
  width: 300px;
  display: flex;
  justify-content: space-between;
}

.footer {
  width: 333px;
  margin-top: 10px;
}

.login-btn {
  width: 100%;
}
</style>
