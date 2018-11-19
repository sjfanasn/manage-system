<template>
<div class="sort">
    <div class="food-sort">
        <div style="text-align:center;margin-bottom:20px;">选择食品种类</div>
        <el-form ref="forms" :model="form" label-width="120px" class="sort-form">
            <el-form-item label="食品种类">
                <el-select v-model="form.selectFoodKind" placeholder="请选择活动区域">
                    <el-option v-for="item in form.foodKinds" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
                    <el-button type="primary" @click="onCategorySubmit">提交</el-button>
                </el-form-item>
            </div>
        </el-form>
        <div class="add_category_button" @click="isShow" v-show="!show"><i class="el-icon-caret-bottom edit_icon" slot="icon"></i> <span>添加食品种类</span></div>
        <div class="add_category_button" @click="isShow" v-show="show"><i class="el-icon-caret-top edit_icon" slot="icon"></i> <span>添加食品种类</span></div>
    </div>
    <div class="add-food">
        <div style="text-align:center;margin-bottom:20px;">添加食品</div>
        <div class="add-food-form">
            <el-form ref="form" :model="foodForm" :rules="rules" label-width="120px" class="sort-form">
                <el-form-item label="食品名称" prop="name">
                    <el-input v-model="foodForm.name"></el-input>
                </el-form-item>
                <el-form-item label="食品活动">
                    <el-input v-model="foodForm.activity"></el-input>
                </el-form-item>
                <el-form-item label="食品详情">
                    <el-input v-model="foodForm.selectFoodKind"></el-input>
                </el-form-item>
                <el-form-item label="上传店铺头像">
                    <el-upload class="avatar-uploader" :action="baseUrl+'/v1/addimg/food'" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="foodForm.image_path" :src="baseImageUrl+foodForm.image_path" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="食品特点">
                    <el-select multiple v-model="foodForm.attributes" placeholder="请选择">
                        <el-option v-for="item in offers" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="食品规格">
                    <el-radio v-model="foodStandard" label="single">单规格</el-radio>
                    <el-radio v-model="foodStandard" label="more">多规格</el-radio>
                </el-form-item>
                <el-row v-if="foodStandard === 'single'">
                    <el-form-item label="包装费">
                        <el-input-number v-model="foodForm.specs[0].packing_fee" controls-position="right" @change="handleChange" :min="0"></el-input-number>
                    </el-form-item>
                    <el-form-item label="价格">
                        <el-input-number v-model="foodForm.specs[0].price" controls-position="right" @change="handleChange" :min="0"></el-input-number>
                    </el-form-item>
                </el-row>
                <el-row v-else style="padding: 20px;text-align:center">
                    <el-button type="primary" @click="specsModal = true" style="margin-bottom: 20px;">添加规格</el-button>
                    <el-table :data="foodForm.specs" style="width: 100%text-align: center;" border>
                        <el-table-column label="规格" width="180">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.specs }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="包装费" width="180">
                            <template slot-scope="scope">
                                <span>{{scope.row.packing_fee}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="价格" width="180">
                            <template slot-scope="scope">
                                <span>{{scope.row.price}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-dialog style="text-align:left" title="添加规格" :visible.sync="specsModal">
                        <el-form>
                            <el-form-item label="活动名称">
                                <el-input v-model="addSpecsForm.specs" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="包装费">
                                <el-input-number v-model="addSpecsForm.packing_fee" controls-position="right" @change="handleChange" :min="0"></el-input-number>
                            </el-form-item>
                            <el-form-item label="价格">
                                <el-input-number v-model="addSpecsForm.price" controls-position="right" @change="handleChange" :min="0"></el-input-number>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="specsModal = false">取 消</el-button>
                            <el-button type="primary" @click="addSpecs">确 定</el-button>
                        </div>
                    </el-dialog>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确认添加商品</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</div>
</template>

<script>
import {
    getCategory,
    addCategory,
    baseUri,
    baseUriImage,
    addFood
} from "../service/getData.js";
export default {
    data() {
        return {
            form: {
                foodKinds: [],
                selectFoodKind: "",
                foodKind: "",
                foodDesc: ""
            },
            foodForm: {
                name: "",
                activity: "",
                image_path: "",
                attributes: [],
                specs: [{
                    specs: "默认",
                    packing_fee: 0,
                    price: 20
                }]
            },
            rules: {
                name: [{
                    required: true,
                    message: "请输入食品名称"
                }]
            },
            addSpecsForm: {
                specs: "",
                packing_fee: 0,
                price: 20
            },
            foodStandard: "single",
            offers: [{
                    value: "new",
                    label: "新品"
                },
                {
                    value: "sign",
                    label: "招牌"
                }
            ],

            restaurant_id: 0,
            baseUrl: "",
            baseImageUrl: "",
            specsModal: false,
            show: false
        };
    },
    created() {
        // if (this.$router.query && this.$router.query.restaurant_id) {
        //     this.restaurant_id = this.$router.query.restaurant_id;
        // } else {
        this.restaurant_id = Math.ceil(Math.random() * 10);
        //     this.$msgbox({
        //         title: '提示',
        //         message: '添加食品需要选择一个商铺，先去就去选择商铺吗？',
        //         showCancelButton: true,
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         beforeClose: (action, instance, done) => {
        //             if (action === 'confirm') {
        //                 this.$router.push('/shopList');
        //                 done();
        //             }
        //         }
        //     })
        // }
        this.initData();
    },
    computed: {
        selectedValue: function () {
            return this.form.foodKinds[this.form.selectFoodKind] || {};
        }
    },
    methods: {
        async initData() {
            this.baseUrl = baseUri;
            this.baseImageUrl = baseUriImage;
            const res = await getCategory(this.restaurant_id);
            res.data.category_list.map((item, index) => {
                item.label = item.name;
                item.value = index;
            });
            this.form.foodKinds = res.data.category_list;
        },
        isShow() {
            this.show = !this.show;
        },
        async onSubmit() {
            const query = {
                ...this.foodForm,
                category_id: this.selectedValue.id,
                restaurant_id: this.restaurant_id
            };
            this.$refs["form"].validate(async valid => {
                if (valid) {
                    const res = await addFood(query);
                    if (res.data.status === 1) {
                        this.$message.success(res.data.success);
                        this.foodForm = {
                            name: "",
                            activity: "",
                            image_path: "",
                            attributes: [],
                            specs: [{
                                specs: "默认",
                                packing_fee: 0,
                                price: 20
                            }]
                        };
                    }
                } else {
                    this.$notify({
                        title: "错误",
                        message: "请检查输入是否正确",
                        offers: 100
                    });
                }
            });
        },
        async onCategorySubmit() {
            const query = {
                description: this.form.foodDesc,
                name: this.form.foodKind,
                restaurant_id: this.restaurant_id
            };
            const res = await addCategory(query);
            if (res.data.status === 1) {
                this.$message.success(res.data.success);
                this.form.foodKind = "";
                this.form.foodDesc = "";
                this.show = !this.show;
            }
        },
        addSpecs() {
            this.foodForm.specs.push({
                specs: this.addSpecsForm.specs,
                packing_fee: this.addSpecsForm.packing_fee,
                price: this.addSpecsForm.price
            });
            this.addSpecsForm = {
                specs: "",
                packing_fee: 0,
                price: 20
            };
            this.specsModal = false;
        },
        handleDelete(index, row) {
            this.foodForm.specs.splice(index, 1);
        },
        handleChange() {},
        handleAvatarSuccess(res) {
            if (res.status === 1) {
                this.foodForm.image_path = res.image_path;
            }
        },
        beforeAvatarUpload() {}
    }
};
</script>

<style lang="less">
@import "../style/common";

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

.el-table td,
.el-table th.is-leaf {
    border-bottom: 1px solid #dfe6ec;
}

.el-table td:last-child,
.el-table th.is-leaf:last-child {
    text-align: right;
}

.el-table th.is-leaf:last-child {
    margin-right: 20px;
}
</style>
