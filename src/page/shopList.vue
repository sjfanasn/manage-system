<template>
<div>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="shopName" label="店铺名称">
        </el-table-column>
        <el-table-column prop="shopAddress" label="店铺地址">
        </el-table-column>
        <el-table-column prop="shopInfo" label="店铺介绍">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
                <el-button @click.native.prevent="editRow(scope.$index, tableData)" type="text" size="small">
                    编辑
                </el-button>
                <el-button @click.native.prevent="addFood(scope.$index, tableData)" type="text" size="small">
                    添加食品
                </el-button>
                <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                    删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total">
    </el-pagination>
</div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [{
                    shopName: '2016-05-04',
                    shopAddress: '上海市普陀区金沙江路 1518 弄',
                    shopInfo: '上海',
                }, {
                    shopName: '2016-05-03',
                    shopAddress: '上海市普陀区金沙江路 1518 弄',
                    shopInfo: '上海',
                }, {
                    shopName: '2016-05-05',
                    shopAddress: '上海市普陀区金沙江路 1518 弄',
                    shopInfo: '上海',
                }, {
                    shopName: '2016-05-06',
                    shopAddress: '上海市普陀区金沙江路 1518 弄',
                    shopInfo: '上海',
                }, {
                    shopName: '2016-05-07',
                    shopAddress: '上海市普陀区金沙江路 1518 弄',
                    shopInfo: '上海',
                }, {
                    shopName: '2016-05-08',
                    shopAddress: '上海市普陀区金沙江路 1518 弄',
                    shopInfo: '上海',
                }, {
                    shopName: '2016-05-09',
                    shopAddress: '上海市普陀区金沙江路 1518 弄',
                    shopInfo: '上海',
                },
                {
                    shopName: '2016-05-08',
                    shopAddress: '上海市普陀区金沙江路 1518 弄',
                    shopInfo: '上海',
                }, {
                    shopName: '2016-05-09',
                    shopAddress: '上海市普陀区金沙江路 1518 弄',
                    shopInfo: '上海',
                },
                {
                    shopName: '2016-05-08',
                    shopAddress: '上海市普陀区金沙江路 1518 弄',
                    shopInfo: '上海',
                }, {
                    shopName: '2016-05-09',
                    shopAddress: '上海市普陀区金沙江路 1518 弄',
                    shopInfo: '上海',
                }
            ],
            total: 10
        }
    },
    methods: {
        addFood(index, rows) {
            console.log();
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        editRow(index, rows) {
            console.log(index, rows);
        }
    }
}
</script>

<style lang="less" scoped>
.el-pagination {
    margin-top: 20px;
}
</style>
