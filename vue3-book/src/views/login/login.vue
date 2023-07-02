<template>
    <div class="login">
        <LoginChild></LoginChild>
    </div>
</template>
  
<script setup lang="ts">
import LoginChild from "./c-cpns/login-child.vue";
</script>
  
<style scoped lang="less">
.login {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
</style>
  