<template>
<div class="bg">
    <transition name="form-fade" mode="in-out">
        <div class="login" v-show="showLogin">
            <div class="login-title">
                后台管理系统
            </div>
            <section class="login-form">
                <el-form ref="form" :model="form">
                    <el-form-item size="large">
                        <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item size="large">
                        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item size="large">
                        <el-button type="primary" class="login-btn" @click="onSubmit">登 录</el-button>
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
export default {
    data() {
        return {
            form: {
                userName: "",
                password: ""
            },
            showLogin:false
        };
    },
    mounted(){
        this.showLogin = true;
    },
    methods: {
        onSubmit() {
            this.$router.push('manage');
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
.form-fade-enter-active,.form-fade-leave-active {
    transition: all 1s;
}
.form-fade-enter,.form-fade-leave-active {
    transform: translate3d(0,-50px,0);
    opacity: 0;
}
</style>
