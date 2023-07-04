<template>
    <div class="header">
        <div class="userinfo">
            <img src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" alt="">
            <span>{{ name }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const name = "孙悟空"
</script>

<style scoped lang="less">
.header {
    display: flex;
    align-self: center;
    justify-content: end;

}

.userinfo {
    display: flex;
    align-items: center;
    justify-content: center;

    & img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 50%
    }
}
</style>