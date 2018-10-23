<template>
<div class="bg">
    <transition name="form-fade" mode="in-out">
        <div class="login" v-show="showLogin">
            <div class="login-title">
                后台管理系统
            </div>
            <section class="login-form">
                <el-form ref="roleForm" :rules="rules" :model="form">
                    <el-form-item prop="userName" size="large">
                        <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" size="large">
                        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item size="large">
                        <el-button type="primary" class="login-btn" @click="onSubmit('roleForm')">登 录</el-button>
                    </el-form-item>
                </el-form>
                <div class="tip">
                    <p>温馨提示：</p>
                    <p>未登录过的新用户，自动注册</p>
                    <p>注册过的用户可凭账号密码登录</p>
                </div>
            </section>
        </div>
    </transition>
</div>
</template>

<script>
import {
    login,
    getAdminInfo
} from "../service/getData.js";
import {
    mapActions,
    mapState
} from "vuex";
export default {
    data() {
        return {
            form: {
                userName: "",
                password: ""
            },
            rules: {
                userName: [{
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur"
                }],
                password: [{
                    required: true,
                    message: "请输入密码",
                    trigger: "blur"
                }]
            },
            showLogin: false
        };
    },
    mounted() {
        this.showLogin = true;
        if (!this.adminInfo.id) {
            console.log('1111');
            this.getAdminData();
        }
    },
    computed: {
        ...mapState(['adminInfo'])
    },
    methods: {
        ...mapActions(["getAdminData"]),
        async onSubmit(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    const res = await login({
                        user_name: this.form.userName,
                        password: this.form.password
                    });
                    if (res.data.status === 1) {
                        this.$message({
                            type: "success",
                            message: "登录成功"
                        });
                        this.$router.push("manage");
                    } else {
                        this.$message({
                            type: "error",
                            message: res.message
                        });
                    }
                } else {
                    this.$notify.error({
                        title: "错误",
                        message: "请输入用户名密码",
                        offset: 100
                    });
                    return false;
                }
            });
        }
    },
    watch: {
        adminInfo: function (newValue) {
            if (newValue.id) {
                this.$message({
                    type: 'success',
                    message: '检测到您之前登录过，将自动登录'
                });
                this.$router.push('manage');
            }
        }
    }
};
</script>

<style scoped>
.bg {
    background-color: #324057;
}

.login {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
}

.login-title {
    font-size: 34px;
    margin-bottom: 50px;
}

.login-form {
    width: 320px;
    height: 210px;
    background: #fff;
    border-radius: 4px;
    padding: 25px;
}

.login-btn {
    width: 100%;
    font-size: 16px;
}

.tip {
    margin-top: -10px;
    text-align: center;
    font-size: 12px;
    color: red;
}

.form-fade-enter-active,
.form-fade-leave-active {
    transition: all 1s;
}

.form-fade-enter,
.form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
}
</style>
