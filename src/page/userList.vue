<template>
<div>
    <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column property="date" label="注册日期" width="120">
        </el-table-column>
        <el-table-column property="name" label="用户姓名" width="120">
        </el-table-column>
        <el-table-column property="address" label="注册地址">
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
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            total: 1
        }
    },
}
</script>

<style lang="less" scoped>
.el-pagination {
    margin-top: 20px;
}
</style>
