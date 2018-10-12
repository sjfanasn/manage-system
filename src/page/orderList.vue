<template>
<div>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="orderId" label="订单ID">
        </el-table-column>
        <el-table-column prop="totalPrice" label="总价格">
        </el-table-column>
        <el-table-column prop="orderState" label="订单状态">
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
                    orderId: '2016-05-04',
                    totalPrice: '上海市普陀区金沙江路 1518 弄',
                    orderState: '上海',
                }, {
                    orderId: '2016-05-03',
                    totalPrice: '上海市普陀区金沙江路 1518 弄',
                    orderState: '上海',
                }, {
                    orderId: '2016-05-05',
                    totalPrice: '上海市普陀区金沙江路 1518 弄',
                    orderState: '上海',
                }, {
                    orderId: '2016-05-06',
                    totalPrice: '上海市普陀区金沙江路 1518 弄',
                    orderState: '上海',
                }, {
                    orderId: '2016-05-07',
                    totalPrice: '上海市普陀区金沙江路 1518 弄',
                    orderState: '上海',
                }, {
                    orderId: '2016-05-08',
                    totalPrice: '上海市普陀区金沙江路 1518 弄',
                    orderState: '上海',
                }, {
                    orderId: '2016-05-09',
                    totalPrice: '上海市普陀区金沙江路 1518 弄',
                    orderState: '上海',
                },
                {
                    orderId: '2016-05-08',
                    totalPrice: '上海市普陀区金沙江路 1518 弄',
                    orderState: '上海',
                }, {
                    orderId: '2016-05-09',
                    totalPrice: '上海市普陀区金沙江路 1518 弄',
                    orderState: '上海',
                },
                {
                    orderId: '2016-05-08',
                    totalPrice: '上海市普陀区金沙江路 1518 弄',
                    orderState: '上海',
                }, {
                    orderId: '2016-05-09',
                    totalPrice: '上海市普陀区金沙江路 1518 弄',
                    orderState: '上海',
                }
            ],
            total: 10
        }
    },
}
</script>

<style lang="less" scoped>

</style>
