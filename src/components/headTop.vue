<template>
<div class="header">
    <el-breadcrumb separator="/" style="color:#97a8be;">
        <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in $route.meta" v-bind:key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command = "handleCommand">
        <img src="../assets/logo.png" alt="avator" class="avator">
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command = "home">首页</el-dropdown-item>
            <el-dropdown-item command = "exit">退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</div>
</template>

<script>
export default {
    methods:{
        handleCommand(command){
            if(command === 'home'){
                this.$router.push('/manage');
            }else if(command === 'exit'){

            }
        }
    }
};
</script>

<style lang="less" scoped>
@import '../style/mixin';

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 25px;
    background-color: #EFF2F7;
    border-right: 4px;
}

.avator {
    .wh(36px, 36px);
    border-radius: 50%;
    border: 1px solid red;
}
</style>
