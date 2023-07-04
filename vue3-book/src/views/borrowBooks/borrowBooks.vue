<template>
    <div class="search">
        <el-form :model="searchFrom" ref="formRef" label-wdith="80px" class="from">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="书名" prop="item.prop">
                        <el-input v-model="searchFrom.title" placeholder="请输入书名" size="large"></el-input>
                    </el-form-item>
                    <el-form-item label="作者名" prop="item.prop">
                        <el-input v-model="searchFrom.title" placeholder="请输入作者名" size="large"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
        </el-form>

        <div class="btn">
            <el-button icon="Refresh" @click="hendleResetClick()">重置</el-button>
            <el-button icon="Search" type="primary" @click="handleSearchClick">搜索</el-button>
        </div>
    </div>
    <borrowBooksContent />
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import type { ElForm } from "element-plus";
import borrowBooksContent from "./c-cpns/borrowBooks-content.vue";


const searchFrom = reactive({
    title: ""
});
const formRef = ref<InstanceType<typeof ElForm>>();
function hendleResetClick() {
    if (!formRef.value) return;
    formRef.value.resetFields();

}
//点击搜索按钮，将表单中的数据和这个事件传给父组件
function handleSearchClick() {
    console.log("执行了一次搜索操作")
}
</script>

<style lang="less" scoped>
.search {
    background-color: #fff;
    padding: 20px;

    .el-form-item {
        padding: 20px 30px;
        margin: 0;
    }
}

.from {
    display: flex;
    flex-direction: column;
}

.btn {
    display: flex;
    justify-content: flex-end;
}
</style>