<template>
<div class="add-shop">
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="店铺名称">
            <el-input v-model="form.shopName"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
            <el-autocomplete v-model="form.shopAddr" :fetch-suggestions="querySearchAsync" placeholder="请输入地址" @select="handleSelect"></el-autocomplete>
        </el-form-item>
        <el-form-item label="联系电话">
            <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="店铺简介">
            <el-input v-model="form.shopInfo"></el-input>
        </el-form-item>
        <el-form-item label="店铺标语">
            <el-input v-model="form.slogan"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类">
            <el-cascader :options="form.options" v-model="selectedOptions3"></el-cascader>
        </el-form-item>
        <el-form-item label="店铺特点">
            <el-row :gutter="20">
                品牌保证 <el-switch v-model="form.character.value1" active-color="#20a0ff" inactive-color="#bfcbd9"></el-switch>
                蜂鸟专送 <el-switch v-model="form.character.value2" active-color="#20a0ff" inactive-color="#bfcbd9"></el-switch>
                新开店铺 <el-switch v-model="form.character.value3" active-color="#20a0ff" inactive-color="#bfcbd9"></el-switch>
            </el-row>
            <el-row :gutter="20" style="margin-left:0">
                外卖保 <el-switch v-model="form.character.value4" active-color="#20a0ff" inactive-color="#bfcbd9"></el-switch>
                准时达 <el-switch v-model="form.character.value5" active-color="#20a0ff" inactive-color="#bfcbd9"></el-switch>
                开发票 <el-switch v-model="form.character.value6" active-color="#20a0ff" inactive-color="#bfcbd9"></el-switch>
            </el-row>
        </el-form-item>
        <el-form-item label="配送费">
            <el-input-number v-model="form.shipFee" controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="起送价">
            <el-input-number v-model="form.startPrice" controls-position="right" :min="0"></el-input-number>
        </el-form-item>
        <el-form-item label="活动时间">
            <el-time-select placeholder="起始时间" v-model="form.startTime" :picker-options="{start: '05:30',step: '00:15',end: '23:30'}">
            </el-time-select>
            <el-time-select placeholder="结束时间" v-model="form.endTime" :picker-options="{start: '05:30',step: '00:15',end: '23:30',minTime: form.startTime}">
            </el-time-select>
        </el-form-item>
        <el-form-item label="上传店铺头像">
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="上传营业执照">
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="licenseUrl" :src="licenseUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="上传餐饮服务许可证">
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="serviceUrl" :src="serviceUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>
        <el-form-item label="优惠活动">
            <el-select v-model="selectedOffer" placeholder="请选择">
                <el-option v-for="item in form.offers" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-table :data="form.tableData" style="width: 100%">
                <el-table-column label="活动标题" width="120">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.actTitle }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="活动名称" width="120">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.actName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="活动详情" width="120">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.actInfo }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="deleteAct(scope.$index, scope.row)">删除</el-button>
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
export default {
    data() {
        return {
            form: {
                shopName: "", // 店铺名称
                shopAddr: "", // 店铺地址
                phone: "", // 手机号
                shopInfo: "", // 店铺简介
                slogan: "", // 店铺标语
                options: [{
                        // 店铺分类
                        value: "zhinan",
                        label: "指南",
                        children: [{
                                value: "shejiyuanze",
                                label: "设计原则"
                            },
                            {
                                value: "daohang",
                                label: "导航"
                            }
                        ]
                    },
                    {
                        value: "zujian",
                        label: "组件",
                        children: [{
                                value: "basic",
                                label: "Basic"
                            },
                            {
                                value: "form",
                                label: "Form"
                            },
                            {
                                value: "data",
                                label: "Data"
                            },
                            {
                                value: "notice",
                                label: "Notice"
                            },
                            {
                                value: "navigation",
                                label: "Navigation"
                            },
                            {
                                value: "others",
                                label: "Others"
                            }
                        ]
                    },
                    {
                        value: "ziyuan",
                        label: "资源",
                        children: [{
                                value: "axure",
                                label: "Axure Components"
                            },
                            {
                                value: "sketch",
                                label: "Sketch Templates"
                            },
                            {
                                value: "jiaohu",
                                label: "组件交互文档"
                            }
                        ]
                    }
                ],
                character: {
                    value1: true,
                    value2: true,
                    value3: true,
                    value4: true,
                    value5: true,
                    value6: true
                },
                shipFee: 5,
                startPrice: 20,
                startTime: "",
                endTime: "",
                offers: [{
                        value: "选项1",
                        label: "黄金糕"
                    },
                    {
                        value: "选项2",
                        label: "双皮奶"
                    },
                    {
                        value: "选项3",
                        label: "蚵仔煎"
                    },
                    {
                        value: "选项4",
                        label: "龙须面"
                    },
                    {
                        value: "选项5",
                        label: "北京烤鸭"
                    }
                ],
                tableData: [{
                        actTitle: "活动1",
                        actName: "活动名称1",
                        actInfo: "活动详情1"
                    },
                    {
                        actTitle: "活动2",
                        actName: "活动名称2",
                        actInfo: "活动详情2"
                    },
                    {
                        actTitle: "活动3",
                        actName: "活动名称3",
                        actInfo: "活动详情3"
                    }
                ]
            },
            selectedOptions3: ["zujian", "data", "tag"],
            restaurants: [],
            timeout: null,
            avatarUrl: "",
            serviceUrl: "",
            licenseUrl: "",
            selectedOffer: ""
        };
    },
    methods: {
        onSubmit() {
            console.log("submit!");
        },
        loadAll() {
            return [{
                    value: "三全鲜食（北新泾店）",
                    address: "长宁区新渔路144号"
                },
                {
                    value: "Hot honey 首尔炸鸡（仙霞路）",
                    address: "上海市长宁区淞虹路661号"
                },
                {
                    value: "新旺角茶餐厅",
                    address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
                },
                {
                    value: "泷千家(天山西路店)",
                    address: "天山西路438号"
                },
                {
                    value: "胖仙女纸杯蛋糕（上海凌空店）",
                    address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
                },
                {
                    value: "贡茶",
                    address: "上海市长宁区金钟路633号"
                },
                {
                    value: "豪大大香鸡排超级奶爸",
                    address: "上海市嘉定区曹安公路曹安路1685号"
                },
                {
                    value: "茶芝兰（奶茶，手抓饼）",
                    address: "上海市普陀区同普路1435号"
                },
                {
                    value: "十二泷町",
                    address: "上海市北翟路1444弄81号B幢-107"
                },
                {
                    value: "星移浓缩咖啡",
                    address: "上海市嘉定区新郁路817号"
                },
                {
                    value: "阿姨奶茶/豪大大",
                    address: "嘉定区曹安路1611号"
                },
                {
                    value: "新麦甜四季甜品炸鸡",
                    address: "嘉定区曹安公路2383弄55号"
                },
                {
                    value: "Monica摩托主题咖啡店",
                    address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
                },
                {
                    value: "浮生若茶（凌空soho店）",
                    address: "上海长宁区金钟路968号9号楼地下一层"
                },
                {
                    value: "NONO JUICE  鲜榨果汁",
                    address: "上海市长宁区天山西路119号"
                },
                {
                    value: "CoCo都可(北新泾店）",
                    address: "上海市长宁区仙霞西路"
                },
                {
                    value: "快乐柠檬（神州智慧店）",
                    address: "上海市长宁区天山西路567号1层R117号店铺"
                },
                {
                    value: "Merci Paul cafe",
                    address: "上海市普陀区光复西路丹巴路28弄6号楼819"
                },
                {
                    value: "猫山王（西郊百联店）",
                    address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
                },
                {
                    value: "枪会山",
                    address: "上海市普陀区棕榈路"
                },
                {
                    value: "纵食",
                    address: "元丰天山花园(东门) 双流路267号"
                },
                {
                    value: "钱记",
                    address: "上海市长宁区天山西路"
                },
                {
                    value: "壹杯加",
                    address: "上海市长宁区通协路"
                },
                {
                    value: "唦哇嘀咖",
                    address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"
                },
                {
                    value: "爱茜茜里(西郊百联)",
                    address: "长宁区仙霞西路88号1305室"
                },
                {
                    value: "爱茜茜里(近铁广场)",
                    address: "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
                },
                {
                    value: "鲜果榨汁（金沙江路和美广店）",
                    address: "普陀区金沙江路2239号金沙和美广场B1-10-6"
                },
                {
                    value: "开心丽果（缤谷店）",
                    address: "上海市长宁区威宁路天山路341号"
                },
                {
                    value: "超级鸡车（丰庄路店）",
                    address: "上海市嘉定区丰庄路240号"
                },
                {
                    value: "妙生活果园（北新泾店）",
                    address: "长宁区新渔路144号"
                },
                {
                    value: "香宜度麻辣香锅",
                    address: "长宁区淞虹路148号"
                },
                {
                    value: "凡仔汉堡（老真北路店）",
                    address: "上海市普陀区老真北路160号"
                },
                {
                    value: "港式小铺",
                    address: "上海市长宁区金钟路968号15楼15-105室"
                },
                {
                    value: "蜀香源麻辣香锅（剑河路店）",
                    address: "剑河路443-1"
                },
                {
                    value: "北京饺子馆",
                    address: "长宁区北新泾街道天山西路490-1号"
                },
                {
                    value: "饭典*新简餐（凌空SOHO店）",
                    address: "上海市长宁区金钟路968号9号楼地下一层9-83室"
                },
                {
                    value: "焦耳·川式快餐（金钟路店）",
                    address: "上海市金钟路633号地下一层甲部"
                },
                {
                    value: "动力鸡车",
                    address: "长宁区仙霞西路299弄3号101B"
                },
                {
                    value: "浏阳蒸菜",
                    address: "天山西路430号"
                },
                {
                    value: "四海游龙（天山西路店）",
                    address: "上海市长宁区天山西路"
                },
                {
                    value: "樱花食堂（凌空店）",
                    address: "上海市长宁区金钟路968号15楼15-105室"
                },
                {
                    value: "壹分米客家传统调制米粉(天山店)",
                    address: "天山西路428号"
                },
                {
                    value: "福荣祥烧腊（平溪路店）",
                    address: "上海市长宁区协和路福泉路255弄57-73号"
                },
                {
                    value: "速记黄焖鸡米饭",
                    address: "上海市长宁区北新泾街道金钟路180号1层01号摊位"
                },
                {
                    value: "红辣椒麻辣烫",
                    address: "上海市长宁区天山西路492号"
                },
                {
                    value: "(小杨生煎)西郊百联餐厅",
                    address: "长宁区仙霞西路88号百联2楼"
                },
                {
                    value: "阳阳麻辣烫",
                    address: "天山西路389号"
                },
                {
                    value: "南拳妈妈龙虾盖浇饭",
                    address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
                }
            ];
        },
        querySearchAsync(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ?
                restaurants.filter(this.createStateFilter(queryString)) :
                restaurants;

            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 3000 * Math.random());
        },
        createStateFilter(queryString) {
            return state => {
                return (
                    state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
                );
            };
        },
        handleSelect(item) {
            console.log(item);
        },
        handleAvatarSuccess(res, file) {
            this.avatarUrl = URL.createObjectURL(file.raw);
            this.serviceUrl = URL.createObjectURL(file.raw);
            this.licenseUrl = URL.createObjectURL(file.raw);
        },
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
        deleteAct(index, row) {
            console.log(index);
            console.log(row);
        }
    },
    mounted() {
        this.restaurants = this.loadAll();
    }
};
</script>

<style lang="less" scoped>
@import '../style/common';
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
</style>
