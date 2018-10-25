<template>
<div>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form inline class="demo-table-expand">
                    <el-form-item label="商品名称">
                        <span>{{ props.row.shopName }}</span>
                    </el-form-item>
                    <el-form-item label="店铺地址">
                        <span>{{ props.row.shopAddress }}</span>
                    </el-form-item>
                    <el-form-item label="店铺介绍">
                        <span>{{ props.row.shopInfo }}</span>
                    </el-form-item>
                    <el-form-item label="店铺 ID">
                        <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <span>{{ props.row.phone }}</span>
                    </el-form-item>
                    <el-form-item label="评分">
                        <span>{{ props.row.score }}</span>
                    </el-form-item>
                    <el-form-item label="销售量">
                        <span>{{ props.row.sale }}</span>
                    </el-form-item>
                    <el-form-item label="分类">
                        <span>{{ props.row.type }}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column prop="shopName" label="店铺名称" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="shopAddress" label="店铺地址" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="shopInfo" label="店铺介绍" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
                <el-button @click.native.prevent="editRow(scope.$index, scope.row)" type="text" size="small">
                    编辑
                </el-button>
                <el-button @click.native.prevent="addFood(scope.$index, scope.row)" type="text" size="small">
                    添加食品
                </el-button>
                <el-button @click.native.prevent="deleteRow(scope.$index, scope.row)" type="text" size="small">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination @current-change="changePage" background :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
    </el-pagination>
    <el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible">
        <el-form :model="selectedRow">
            <el-form-item label="店铺名称" :label-width="formLabelWidth">
                <el-input v-model="selectedRow.shopName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
                <el-autocomplete v-model="selectedRow.shopAddress" :fetch-suggestions="querySearchAsync" placeholder="请输入地址" @select="handleSelect"></el-autocomplete>
            </el-form-item>
            <el-form-item label="店铺介绍" :label-width="formLabelWidth">
                <el-input v-model="selectedRow.shopInfo" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" :label-width="formLabelWidth">
                <el-input v-model="selectedRow.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺分类" :label-width="formLabelWidth">
                <el-cascader :options="categoryOptions" v-model="currentCategory"></el-cascader>
            </el-form-item>
            <el-form-item label="商铺图片" :label-width="formLabelWidth">
                <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false">
                    <img v-if="shopUrl" :src="shopUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    cityGuess,
    getShopCount,
    getShoplist,
    shopEdit
} from "../service/getData.js";
export default {
    data() {
        return {
            tableData: [{
                shopName: "2016-05-04",
                shopAddress: "上海市普陀区金沙江路 1518 弄",
                shopInfo: "上海"
            }],
            total: 10,
            offset: 0,
            pageSize: 20,
            currentPage: 0,
            city: {},
            dialogFormVisible: false, // 表单是否可见
            categoryOptions:[], // 分类列表
            currentCategory: [], // 当前分类
            shopUrl: "",
            selectedRow:{},// 当前商铺,获取要编辑店铺信息
            formLabelWidth: "120px"
        };
    },
    created() {
        this.initData();
    },
    methods: {
        async initData() {
            try {
                this.city = await cityGuess();
                const res = await getShopCount();
                if (res.data.status === 1) {
                    this.total = res.data.count;
                } else {
                    throw new Error("获取数据失败");
                }
                this.getShopList();
            } catch (error) {
                console.log(error);
            }
        },
        addFood(index, rows) {
            console.log();
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        // 获取食物类别
        async editRow(index, row) {
            this.dialogFormVisible = true;
            this.selectedRow = row;
            this.currentCategory = row.type.split('/');
            const shopInfo = await shopEdit();
            for(const item of shopInfo.data){
                if(shopInfo.data.length){
                    let data = {
                        label:item.name,
                        value:item.name,
                        children:[]
                    }
                    for(const val of item.sub_categories){
                        data.children.push({
                            label:val.name,
                            value:val.name
                        })
                    }
                    this.categoryOptions.push(data);
                }
            }
        },
        async getCategory(){

        },
        changePage(value) {
            this.currentPage = value;
            this.offset = (value - 1) * this.pageSize;
            this.getShopList();
        },
        async getShopList() {
            const {
                latitude,
                longitude
            } = this.city.data;
            const res = await getShoplist({
                latitude,
                longitude,
                offset: this.offset,
                limit: this.pageSize
            });
            this.tableData = [];
            for (const item of res.data) {
                this.tableData.push({
                    shopName: item.name,
                    shopAddress: item.address,
                    shopInfo: item.promotion_info,
                    id: item.id,
                    phone: item.phone,
                    score: item.rating,
                    sale: item.recent_order_num,
                    type: item.category
                });
            }
        },
        handleSelect(item) {
            console.log(item);
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
        }
    }
};
</script>

<style lang="less" scoped>
.el-pagination {
    margin-top: 20px;
}

.el-form--inline .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}

.demo-table-expand {
    font-size: 0;
}

.el-autocomplete {
    width: 100%;
}
</style>
