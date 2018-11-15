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
import {
    userCount,
    orderCount,
    adminCount,
    getUserCount,
    adminDayCount,
    getOrderCount
} from "../service/getData.js";
import dtime from "time-formater";
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
            sevenDay: [],
            sevenData: [[],[],[]]
        };
    },
    created() {
        this.initData()
    },
    mounted(){
        this.getSevenData();
    },
    components: {
        tendency
    },
    methods: {
        async initData() {
           for (let i = 6; i > -1; i--) {
                const date = dtime(new Date().getTime() - 86400000 * i).format("YYYY-MM-DD");
                this.sevenDay.push(date);
            }
            const today = dtime().format("YYYY-MM-DD");
            Promise.all([userCount(today), orderCount(today), adminDayCount(today), getUserCount(), getOrderCount(), adminCount()])
                .then(res => {
                    this.add = {
                        userNum: res[0].data.count,
                        orderNum: res[1].data.count,
                        adminNum: res[2].data.count
                    };
                    this.total = {
                        userTotal: res[3].data.count,
                        orderTotal: res[4].data.count,
                        adminTotal: res[5].data.count
                    }
                }).catch(err => {
                    console.log(err);
                })
        },
        async getSevenData() {
            const apiArr = [[],[],[]];
            this.sevenDay.forEach(item => {
                apiArr[0].push(userCount(item));
                apiArr[1].push(orderCount(item));
                apiArr[2].push(adminDayCount(item));
            })
            const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]];
            Promise.all(promiseArr).then(res => {
                const arr = [[],[],[]];
                res.forEach((item, index) => {
                    if (item.status === 200) {
                        arr[Math.floor(index / 7)].push(item.data.count);
                    }
                })
                this.sevenData = arr;
            }).catch(err => {
                console.log(err);
            })
        }
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
