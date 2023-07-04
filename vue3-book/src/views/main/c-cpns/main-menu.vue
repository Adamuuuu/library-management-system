<template>
    <div class="menu">
        <div class="logo">
            <!-- <img src="@/assets/imges/logo.svg" alt="" /> -->
            <span>图书管理系统 </span>
        </div>
        <div class="main">
            <el-menu :default-active="1" active-background-color="#0b5cbf" background-color="#02142d"
                class="el-menu-vertical" text-color="#fff">

                <template v-for="item in menutree" :key="item.id">
                    <el-menu-item :index="item.id + ''" @click="handleItemClick(item)">
                        {{ item.name }}
                    </el-menu-item>
                </template>
                <!-- <template v-for="item in menutree" :key="item.id">
                    <el-sub-menu :index="item.id + ''">
                        <template #title>
                            <span>{{ item.name }}</span>
                        </template>
                        
                    </el-sub-menu>
                </template> -->
            </el-menu>

        </div>
    </div>
</template>


<script setup lang="ts">
import router from '@/router';


const menutree = [
    {
        id: 1,
        name: "首页",
        url: "/main/content"
    },
    {
        id: 2,
        name: "发现图书"
    },
    {
        id: 3,
        name: "图书借阅",
        url: "/main/borrowBooks"
    },
    {
        id: 4,
        name: "缴纳欠款",
        url: "/main/payfine"
    },
    {
        id: 5,
        name: "图书管理",
        url: "/main/books"
    },
    {
        id: 6,
        name: "个人信息",
        url: "/main/userInfo"
    },
    {
        id: 7,
        name: "逾期人员信息",
        url: "/main/overUserInfo"
    }
]

function handleItemClick(item: any) {
    const url = item.url
    router.push(url)
    console.log(url)
}
</script>
<style scoped lang="less">
.logo {
    margin-top: 10px;
    display: flex;

    & img {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 20px;
    }

    & span {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        color: aliceblue;
    }
}
</style>