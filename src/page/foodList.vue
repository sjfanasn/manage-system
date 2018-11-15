<template>
<div>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="foodName" label="食品名称">
        </el-table-column>
        <el-table-column prop="foodInfo" label="食品介绍">
        </el-table-column>
        <el-table-column prop="scare" label="评分">
        </el-table-column>
        <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
                <el-button @click.native.prevent="editRow(scope.$index, tableData)" type="text" size="small">
                    编辑
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
                    foodName: '2016-05-04',
                    foodInfo: '上海市普陀区金沙江路 1518 弄',
                    scare: '上海',
                }, {
                    foodName: '2016-05-03',
                    foodInfo: '上海市普陀区金沙江路 1518 弄',
                    scare: '上海',
                }, {
                    foodName: '2016-05-05',
                    foodInfo: '上海市普陀区金沙江路 1518 弄',
                    scare: '上海',
                }, {
                    foodName: '2016-05-06',
                    foodInfo: '上海市普陀区金沙江路 1518 弄',
                    scare: '上海',
                }
            ],
            total: 10
        }
    },
    methods: {
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
