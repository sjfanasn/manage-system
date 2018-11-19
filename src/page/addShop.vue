<template>
<div class="add-shop">
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="店铺名称" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
            <el-autocomplete v-model="form.address" :fetch-suggestions="querySearchAsync" placeholder="请输入地址" @select="handleSelect"></el-autocomplete>
            <div>当前城市： {{city.name}}</div>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
            <el-input v-model.number="form.phone" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="店铺简介">
            <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="店铺标语">
            <el-input v-model="form.promotion_info"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类">
            <el-cascader :options="shopKinds" v-model="selectedOptions3"></el-cascader>
        </el-form-item>
        <el-form-item label="店铺特点">
            <el-row :gutter="20">
                品牌保证 <el-switch v-model="form.is_premium" active-color="#20a0ff" inactive-color="#bfcbd9"></el-switch>
                蜂鸟专送 <el-switch v-model="form.delivery_mode" active-color="#20a0ff" inactive-color="#bfcbd9"></el-switch>
                新开店铺 <el-switch v-model="form.new" active-color="#20a0ff" inactive-color="#bfcbd9"></el-switch>
            </el-row>
            <el-row :gutter="20" style="margin-left:0">
                外卖保 <el-switch v-model="form.bao" active-color="#20a0ff" inactive-color="#bfcbd9"></el-switch>
                准时达 <el-switch v-model="form.zhun" active-color="#20a0ff" inactive-color="#bfcbd9"></el-switch>
                开发票 <el-switch v-model="form.piao" active-color="#20a0ff" inactive-color="#bfcbd9"></el-switch>
            </el-row>
        </el-form-item>
        <el-form-item label="配送费">
            <el-input-number v-model="form.float_delivery_fee" controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="起送价">
            <el-input-number v-model="form.float_minimum_order_amount" controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="活动时间">
            <el-time-select placeholder="起始时间" v-model="form.startTime" :picker-options="{start: '05:30',step: '00:15',end: '23:30'}">
            </el-time-select>
            <el-time-select placeholder="结束时间" v-model="form.endTime" :picker-options="{start: '05:30',step: '00:15',end: '23:30',minTime: form.startTime}">
            </el-time-select>
        </el-form-item>
        <el-form-item label="上传店铺头像">
            <el-upload class="avatar-uploader" :action="baseUrl + '/v1/addimg/shop'" :show-file-list="false" :on-success="handleAvatarSuccessA" :before-upload="beforeAvatarUpload">
                <img v-if="form.image_path" :src="baseUrlImage + form.image_path" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="上传营业执照">
            <el-upload class="avatar-uploader" :action="baseUrl + '/v1/addimg/shop'" :show-file-list="false" :on-success="handleAvatarSuccessB" :before-upload="beforeAvatarUpload">
                <img v-if="form.catering_service_license_image" :src="baseUrlImage + form.catering_service_license_image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="上传餐饮服务许可证">
            <el-upload class="avatar-uploader" :action="baseUrl + '/v1/addimg/shop'" :show-file-list="false" :on-success="handleAvatarSuccessC" :before-upload="beforeAvatarUpload">
                <img v-if="form.business_license_image" :src="baseUrlImage + form.business_license_image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="优惠活动">
            <el-select v-model="selectedOffer" @change="currentAct" placeholder="请选择">
                <el-option class="el-select-dropdown__item" v-for="item in preActivites" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-table :data="actLists" style="width: 100%">
                <el-table-column label="活动标题" width="120">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.icon_name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="活动名称" width="120">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.name }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="活动详情" width="120">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.description }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" style="text-align:right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="deleteAct(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item style="text-align:center;">
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import {
    baseUriImage,
    foodCategory,
    cityGuess,
    searchplace,
    addShop,
    baseUri
} from "../service/getData.js";
export default {
    data() {
        return {
            form: {
                name: "", //店铺名称
                address: "", //详细地址
                latitude: "", // 经度
                longitude: "", // 纬度
                description: "", //介绍
                phone: "", // 联系电话
                promotion_info: "", // 店铺标语
                is_premium: true, // 品牌保证
                delivery_mode: true, // 蜂鸟转送
                new: true, // 新开店铺
                bao: true, // 外卖保
                zhun: true, // 准时宝
                piao: true, // 开发票
                float_delivery_fee: 5, //运费
                float_minimum_order_amount: 20, //起价
                startTime: "", // 活动开始时间
                endTime: "", // 活动结束时间
                image_path: "", // 店铺头像
                business_license_image: "", // 营业执照
                catering_service_license_image: "" // 餐饮许可
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入店铺名称',
                    trigger: 'blur'
                }],
                address: [{
                    required: true,
                    message: '请输入详细地址',
                    trigger: 'blur'
                }],
                phone: [{
                        required: true,
                        message: '请输入联系电话'
                    },
                    {
                        type: 'number',
                        message: '电话号码必须是数字'
                    }
                ]
            },
            // 活动类别
            preActivites: [{
                value: '满减优惠',
                label: '满减优惠'
            }, {
                value: '优惠大酬宾',
                label: '优惠大酬宾'
            }, {
                value: '新用户立减',
                label: '新用户立减'
            }, {
                value: '进店领券',
                label: '进店领券'
            }],
            shopKinds: [],
            selectedOptions3: [],
            actLists: [], // 活动列表
            restaurants: [],
            timeout: null,
            selectedOffer: "",
            city: {},
            baseUrl: "",
            baseUrlImage: ""
        };
    },
    created() {
        this.initData();
    },
    mounted() {
        // this.restaurants = this.detailAddr();
    },
    methods: {
        // 初始化
        async initData() {
            try {
                // 食品分类
                this.baseUrl = baseUri;
                this.baseUrlImage = baseUriImage;
                const city = await cityGuess();
                this.city = city.data;
                const res = await foodCategory();
                for (const item of res.data) {
                    const categroyA = {
                        value: item.name,
                        label: item.name,
                        children: []
                    };
                    for (const data of item.sub_categories) {
                        categroyA.children.push({
                            value: data.name,
                            label: data.name
                        });
                    }
                    this.selectedOptions3.push(item.name);
                    this.shopKinds.push(categroyA);
                }
            } catch (error) {
                console.log(error);
            }
        },
        // 添加保存
        async onSubmit() {
            Object.assign(this.form, {
                activities: this.actLists
            }, {
                category: this.selectedOptions3.join('/')
            });
            this.$refs['form'].validate(async (valid) => {
                if (valid) {
                    const res = await addShop(this.form);
                    if (res.data.status === 1) {
                        this.$message.success(res.data.sussess);
                        this.form = {
                            name: "",
                            address: "",
                            latitude: "",
                            longitude: "",
                            description: "",
                            phone: "",
                            promotion_info: "",
                            is_premium: true,
                            delivery_mode: true,
                            new: true,
                            bao: true,
                            zhun: true,
                            piao: true,
                            float_delivery_fee: 5,
                            float_minimum_order_amount: 20,
                            startTime: "",
                            endTime: "",
                            image_path: "",
                            business_license_image: "",
                            catering_service_license_image: ""
                        };
                    } else {
                        this.$message.error(res.data.message);
                    }
                }else {
                    this.$notify.error({
                        title:'错误',
                        message:'请检查输入是否正确',
                        offset:100
                    })
                }
            })
        },
        // 详细地址
        async querySearchAsync(queryString, cb) {
            // 城市位置
            try {
                if (queryString) {
                    const res = await searchplace(this.city.id, queryString);
                    console.log(res.data);
                    if (res.data instanceof Array) {
                        res.data.map(item => {
                            item.value = item.address;
                            return item;
                        })
                        cb(res.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        handleSelect(address) {
            this.form.latitude = address.latitude;
            this.form.longitude = address.longitude;
        },
        createStateFilter(queryString) {
            return state => {
                return (
                    state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                );
            };
        },
        // 上传图片
        handleAvatarSuccessA(res, file) {
            if (res.status === 1) {
                this.form.image_path = res.image_path;
            } else {
                this.$message({
                    type: 'error',
                    message: '上传失败'
                })
            }
        },
        handleAvatarSuccessB(res, file) {
            if (res.status === 1) {
                this.form.catering_service_license_image = res.image_path;
            } else {
                this.$message({
                    type: 'error',
                    message: '上传失败'
                })
            }
        },
        handleAvatarSuccessC(res, file) {
            if (res.status === 1) {
                this.form.business_license_image = res.image_path;
            } else {
                this.$message({
                    type: 'error',
                    message: '上传失败'
                })
            }
        },
        // 验证图片
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        // 删除优惠活动
        deleteAct(index) {
            this.actLists.splice(index, 1);
        },
        // 选中当前优惠活动
        currentAct(curValue) {
            let curList = {};
            this.$prompt('请输入活动详情', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({
                value
            }) => {
                if (value === null) {
                    this.$message({
                        type: 'info',
                        message: '请输入活动详情'
                    })
                } else {
                    switch (curValue) {
                        case '满减优惠':
                            curList = {
                                icon_name: "减",
                                name: "满减优惠",
                                description: value
                            };
                            break;
                        case '优惠大酬宾':
                            curList = {
                                icon_name: "特",
                                name: "优惠大酬宾",
                                description: value
                            };
                            break;
                        case '新用户立减':
                            curList = {
                                icon_name: "新",
                                name: "新用户立减",
                                description: value
                            };
                            break;
                        case '进店领券':
                            curList = {
                                icon_name: "券",
                                name: "进店领券",
                                description: value
                            };
                            break;
                    }
                    this.actLists.push(curList);
                }
            })

        }
    }
};
</script>

<style lang="less">
@import "../style/common";

.add-shop {
    padding: 20px 550px 20px 200px !important;
}

.el-autocomplete {
    width: 100%;
}

.el-form-item {
    margin-bottom: 15px;
}

.add-food {
    margin-top: 30px;
}

.el-select-dropdown__item {
    padding: 8px 10px;
    line-height: 1.5;
    height: 36px;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    word-break: border-box;
    text-overflow: ellipsis;
    max-width: 200px;
}

.el-select-dropdown__item>span {
    line-height: 1.5;
}

.el-select-dropdown__item.selected {
    color: #fff;
    background-color: #409EFF;
}

.el-table th.is-leaf:last-child {
    text-align: right;
    padding-right: 15px;
}

.el-table td:last-child {
    text-align: right;
}
</style>
