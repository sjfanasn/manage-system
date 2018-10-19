<template>
<div class="sort">
    <div class="food-sort">
        <div style="text-align:center;margin-bottom:20px;">选择食品种类</div>
        <el-form ref="form" :model="form" label-width="120px" class="sort-form">
            <el-form-item label="食品种类">
                <el-select v-model="form.selectFoodKind" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <div ref="editFood" class="add_category_row" :class="show ? 'showEdit' : '' ">
                <el-form-item label="食品种类">
                    <el-input v-model="form.foodKind"></el-input>
                </el-form-item>
                <el-form-item label="种类描述">
                    <el-input v-model="form.foodDesc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </el-form-item>
            </div>
        </el-form>
        <div class="add_category_button" @click="isShow" v-show="!show"><i class="el-icon-caret-bottom edit_icon" slot="icon"></i> <span>添加食品种类</span></div>
        <div class="add_category_button" @click="isShow" v-show="show"><i class="el-icon-caret-top edit_icon" slot="icon"></i> <span>添加食品种类</span></div>
    </div>
    <div class="add-food">
        <div style="text-align:center;margin-bottom:20px;">添加食品</div>
      <div class="add-food-form">
            <el-form ref="form" :model="foodForm" label-width="120px" class="sort-form">
            <el-form-item label="食品名称">
                <el-input v-model="foodForm.foodeName"></el-input>
            </el-form-item>
            <el-form-item label="食品活动">
                <el-input v-model="foodForm.foodActive"></el-input>
            </el-form-item>
            <el-form-item label="食品详情">
                <el-input v-model="foodForm.selectFoodKind"></el-input>
            </el-form-item>
            <el-form-item label="上传店铺头像">
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="foodForm.foodUrl" :src="foodForm.foodUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="食品特点">
                <el-select v-model="foodForm.foodFeature" placeholder="请选择">
                    <el-option v-for="item in offers" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="食品规格">
                <el-radio v-model="foodForm.foodStandard" label="single">单规格</el-radio>
                <el-radio v-model="foodForm.foodStandard" label="more">多规格</el-radio>
            </el-form-item>
            <el-form-item label="包装费">
                <el-input-number v-model="foodForm.foodPackageFee" controls-position="right" @change="handleChange" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="价格">
                <el-input-number v-model="foodForm.foodPrice" controls-position="right" @change="handleChange" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认添加商品</el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                selectFoodKind: "",
                foodKind: "",
                foodDesc: ""
            },
            foodForm: {
                foodeName: "",
                foodActive: "",
                foodDesc: "",
                foodUrl: "",
                foodFeature: "",
                foodStandard: "single",
                foodPackageFee: 0,
                foodPrice: 20

            },
            offers: [{
                    value: "new",
                    label: "新品"
                },
                {
                    value: "sign",
                    label: "招牌"
                }
            ],
            foodKinds: [''],
            show: false
        }
    },
    mounted() {

    },
    methods: {
        isShow() {
            this.show = !this.show;
        },
        onSubmit() {

        }
    }
}
</script>

<style lang="less" scoped>
@import '../style/common';

.sort {
    padding: 20px 280px !important;
}

.sort-form {
    width: 100%;
    height: 100%;
    
    border-bottom: none;
}

.el-form-item {
    padding: 10px 30px 0px 0;
    margin-bottom: 10px;
}

.food-sort .el-select {
    width: 100%;
}

.el-scrollbar__wrap {
    padding: 0 10px;
}

.add-food {
    margin-top: 30px;
    height: 100%;
    padding: 20px 0;
}
.add-food-form {
    padding: 20px 0;
    border: 1px solid #eaeefb;
}
.add_category_button {
    text-align: center;
    line-height: 40px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border: 1px solid #eaeefb;
    border-top: none;
    transition: all 400ms;
    cursor: pointer;
    width: 100%;
}

.add_category_button:hover {
    background: #f9fafc;
}

.add_category_button:hover .edit_icon {
    color: #20a0ff;
}

.add_category_button .edit_icon {
    color: #ccc;
    transition: all 400ms;
}

.add_category_button:hover span,
.add_category_button:hover .edit_icon {
    color: #20a0ff;
}

.add_category_button span {
    font-size: 14px;
    color: #999;
    transition: all 400ms;
}

.add_category_row {
    height: 0;
    overflow: hidden;
    transition: all 400ms;
    background: #f9fafc;
    border-top: 1px solid #eaeefb;
}

.showEdit {
    height: 185px;
}
</style>
