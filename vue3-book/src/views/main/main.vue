<template>
    <div class="container">

        <div class="common-layout">

            <el-container class="container">
                <el-aside :width="isCollapse ? '60px' : '210px'" class="aside">
                    <mainMenu></mainMenu>
                </el-aside>
                <el-container>
                    <el-header class="header" height="50px">
                        <mainHeader></mainHeader>
                        <!-- <homeHeader @foldchange="handleFoldChange"></homeHeader> -->
                    </el-header>
                    <el-main class="main">
                        <!-- <mainContent></mainContent> -->
                        <router-view />
                    </el-main>
                </el-container>
            </el-container>





        </div>

    </div>
</template>
<script setup lang="ts">
import mainMenu from './c-cpns/main-menu.vue';
import mainHeader from './c-cpns/main-header.vue';
import mainContent from './c-cpns/main-content.vue';
import { ref } from 'vue';

const isCollapse = ref(false)
</script>
<style scoped lang="less">
.container {
    width: 100vw;
    height: 100vh;
}

.aside {
    background-color: #02142d;
    height: 100%;
    transition: width 0.3s ease;
}

.header {
    width: 100%;
    background-color: #c6e2ff;
}

.main {
    background-color: #ecf5ff;
}
</style>