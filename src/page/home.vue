<template>
<div>
    <div class="statistics">
        <div class="statistics-title">
            数据统计
        </div>
        <el-row :gutter="20">
            <el-col :span="4">
                <div class="grid-content grid-title bg-orange">当日数据 :</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">{{add.userNum}}新增用户</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">{{add.orderNum}}新增订单</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">{{add.adminNum}}新增管理员</div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="4">
                <div class="grid-content grid-title bg-blue">总数据 :</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">{{total.userTotal}}注册用户</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">{{total.orderTotal}}订单</div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">{{total.adminTotal}}管理员</div>
            </el-col>
        </el-row>
    </div>
    <div class="chart">
        <tendency :sevenDay="sevenDay" :sevenData="sevenData"></tendency>
    </div>
</div>
</template>

<script>
import tendency from "../components/tendency";
export default {
    data() {
        return {
            add: {
                userNum: 0,
                orderNum: 0,
                adminNum: 0
            },
            total: {
                userTotal: 0,
                orderTotal: 0,
                adminTotal: 0
            },
            sevenDay: ['2018-10-07', '2018-10-08', '2018-10-09', '2018-10-10', '2018-10-11', '2018-10-12'],
            sevenData: [[0, 5, 10, 100, 5, 100],[100, 4, 50, 10, 5, 7],[3, 0, 4, 160, 6, 10]]
        };
    },
    components: {
        tendency
    }
};
</script>

<style lang="less" scoped>
.chart {
    margin-top: 35px;
}

.statistics-title {
    font-size: 30px;
    margin-bottom: 10px;
    text-align: center;
}

.el-row {
    margin-bottom: 20px;

    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.grid-title {
    font-size: 22px;
    color: #fff;
}

.bg-purple-light {
    background: #e5e9f2;
}

.bg-orange {
    background: #ff9800;
}

.bg-blue {
    background: #20a0ff;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
    text-align: center;
}

.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
