<template>
<div class="menu-left">
    <el-row style="height:100%">
        <el-col :span="4" style="min-height:100%;background-color:red;">
            <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" background-color="#303133" text-color="#fff" active-text-color="#ffd04b" router>
                <el-menu-item index="manage">
                    <i class="el-icon-menu"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-document"></i>
                        <span>数据管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="userList">用户列表</el-menu-item>
                        <el-menu-item index="shopList">商家列表</el-menu-item>
                        <el-menu-item index="foodList">食品列表</el-menu-item>
                        <el-menu-item index="orderList">订单列表</el-menu-item>
                        <el-menu-item index="adminList">管理员列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-plus"></i>
                        <span>添加数据</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="addShop">添加商铺</el-menu-item>
                        <el-menu-item index="addGoods">添加商品</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-star-on"></i>
                        <span>图表</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="visitor">用户分布</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-edit-outline"></i>
                        <span>编辑</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="vueEdit">文本编辑</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>设置</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="adminSet">管理员设置</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-col>
        <el-col :span="20" style="height:100%;overflow:auto;">
            <head-top></head-top>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </el-col>
    </el-row>
</div>
</template>

<script>
import headTop from '../components/headTop'
export default {
    data() {
        return {
            isCollapse: true
        };
    },
    created() {},
    computed: {
        defaultActive() {
            return this.$route.path.replace('/', '');
        }
    },
    components: {
        headTop
    },
    methods: {}
}
</script>

<style scoped>

</style>
