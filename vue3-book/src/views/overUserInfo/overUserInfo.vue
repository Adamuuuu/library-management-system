<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names

<template>
    <div class="content">



        <div class="header">
            <h3>欠款列表</h3>
            <el-button type="primary" @click="handleCreateData()">还书</el-button>
        </div>
        <div class="main">
            <el-table :data="List" stripe border style="width: 100%">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column type="index" label="序号" width="55" align="center" />
                <el-table-column label="书名" prop="item.prop" align="center">
                    <p>天龙八部</p>
                </el-table-column>
                <el-table-column label="借阅者" prop="item.prop" align="center" />
                <el-table-column label="借阅日期" prop="item.prop" align="center" />
                <el-table-column label="截止日期" prop="item.prop" align="center" />
                <el-table-column label="归还日期" prop="item.prop" align="center" />

                <!-- 日期 -->
                <el-table-column label="欠款" prop="item.prop" align="center">

                </el-table-column>

                <!-- 编辑 -->
                <el-table-column label="操作" prop="operator" align="center">
                    <template #default="scoped">
                        <el-button key="primary" type="primary" text icon="Edit"
                            @click="handleEditClick(scoped.row)">缴纳</el-button>

                        <el-button key="danger" type="danger" text icon="Delete"
                            @click="handleDeleteClick(scoped.row.id)">计算欠款</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
        <div class="bottom">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
                layout="total, sizes, prev, pager, next, jumper" :total="30" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<script setup lang="ts">

import { storeToRefs } from "pinia";


//通过父组件传过来的参数完成对表格表头内容的封装
import { ref } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'

const visible = ref(false)



// const store = pageListStore();
// const { List } = storeToRefs(pageListStore());

const List = [{
    "BookID": 1,
    "Title": "天龙八部",
    "Author": "金庸",
    "Price": "39.99",
    "Publisher": "出版社A",
    "Summary": "《天龙八部》是金庸先生创作的武侠小说，讲述了乔峰、段誉等人的故事。",
    "TotalCopies": 5,
    "AvailableCopies": 3
}]
const currentPage = ref(1);
const pageSize = ref(10);

fatchPageListDate();
function handleSizeChange() {
    fatchPageListDate();
}
function handleCurrentChange() {
    fatchPageListDate();
}

//这个函数主要完成查询的操作  获取当前分页器每一页以及总共多少页的数据  然后通过这些数据向服务器发送post请求获得表格中的数据
//另外这个函数还可能接受一个参数 当我们搜索的时候也能调用这个函数，从父组件传入搜索的关键字，然后将关键字也放入请求体之中去获取数据
function fatchPageListDate(formData: any = {}) {
    // const size = pageSize.value;
    // const offset = (currentPage.value - 1) * size;
    // const PageInfo = { size, offset };
    // const queryInfo = { ...PageInfo, ...formData };
    // store.postPageListActions(prop.page, queryInfo);
}
//将这个函数暴露给父组件供父组件完成搜索和重置的功能

//删除用户功能
function handleDeleteClick(id: number) {
    console.log("点击了一次删除 按钮")
}

//将新建和编辑的事件发送给父组件，父组件接收到事件后调用model中的函数完成这两项操作
//编辑用户功能
function handleEditClick(formData: any) {
    console.log(formData);
    console.log("点击了一次 借阅按钮")
}
//新建用户功能
function handleCreateData() {
    console.log("点击了一次 新增按钮")
}
</script>

<style scoped lang="less">
.content {
    display: flex;
    margin: 10px 10px;
    flex-direction: column;
}

.header {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    & h3 {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    & .el-button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.main {
    display: flex;
    margin-top: 20px;
}

.bottom {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}

.my-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>