<template>
<div>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="adminName" label="姓名">
        </el-table-column>
        <el-table-column prop="date" label="注册日期">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
        <el-table-column prop="auth" label="权限">
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
                    adminName: '2016-05-04',
                    date: '上海市普陀区金沙江路 1518 弄',
                    address: '上海',
                    auth:'权限'
                }, {
                    adminName: '2016-05-04',
                    date: '上海市普陀区金沙江路 1518 弄',
                    address: '上海',
                    auth:'权限'
                }
            ],
            total: 10
        }
    },
}
</script>

<style lang="less" scoped>
.el-pagination {
    margin-top: 20px;
}
</style>
