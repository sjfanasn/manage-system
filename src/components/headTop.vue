<template>
<div class="header">
    <el-breadcrumb separator="/" style="color:#97a8be;">
        <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in $route.meta" v-bind:key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand">
        <img src="../assets/logo.png" alt="avator" class="avator">
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="home">首页</el-dropdown-item>
            <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</div>
</template>

<script>
import {
    signout
} from "../service/getData.js";
export default {
    methods: {
        async handleCommand(command) {
            if (command === "home") {
                this.$router.push("/manage");
            } else if (command === "exit") {
                const res = await signout();
                console.log(res);
                if (res.data.status === 1) {
                    this.$message({
                        type: "success",
                        message: res.data.success
                    });
                    this.$router.push('login');
                }
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import "../style/mixin";

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 25px;
    background-color: #eff2f7;
    border-right: 4px;
}

.avator {
    .wh(36px, 36px);
    border-radius: 50%;
    border: 1px solid red;
}
</style>
