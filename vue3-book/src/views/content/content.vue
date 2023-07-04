<template>
    <div class="container">
        <div class="top">
            <div class="top-left">
                <el-carousel trigger="click" height="200px">
                    <el-carousel-item>
                        <img src="../../assets/images/图片1.jpg" alt="">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="top-right">
                <h1>个人信息</h1>
            </div>
        </div>
        <div class="bottom"></div>
    </div>
</template>


<script lang="ts" setup>
const carouselItems = [
    { image: '@/assets/images/图片1.jpg' },
    { image: '@/assets/images/图片2.jpg' },
    { image: '@/assets/images/图片3.jpg' },
    { image: '@/assets/images/图片4.jpg' },
]
</script>

<style lang="less" scoped>
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

}

.top {
    display: flex;
    align-items: center;
    justify-self: center;
}

.top-left {
    display: flex;
    flex: 2;

}

.top-right {
    display: flex;
    flex: 1;
}

.buttom {
    display: flex;
    width: 100%;
    height: 50px;
    background-color: red;
}
</style>