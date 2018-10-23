<template>
<div>
    <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column property="date" label="注册日期" width="300">
        </el-table-column>
        <el-table-column property="name" label="用户姓名" width="300" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column property="address" label="注册地址" :show-overflow-tooltip="true">
        </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total" :current-page="currentPage" :page-size="pageSize" prev-text="上一页" next-text="下一页" @current-change="currentPageChange">
    </el-pagination>
</div>
</template>

<script>
import {
    getUserList,
    getUserCount
} from "../service/getData.js";
export default {
    data() {
        return {
            tableData: [{
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ],
            offset: 0,
            total: 1,
            pageSize: 20,
            currentPage: 1
        };
    },
    created() {
        this.initData();
    },
    methods: {
        async initData() {
            try {
                const count = await getUserCount();
                if (count.data.status === 1) {
                    this.total = count.data.count;
                } else {
                    throw new Error('获取数据失败');
                }
            } catch (err) {
                console.log(err);
            }
            this.userList();
        },
        currentPageChange(e) {
            this.currentPage = e;
            this.offset = (e - 1) * this.pageSize;
            this.userList();
        },
        async userList() {
            const users = await getUserList({
                offset: this.offset,
                limit: this.pageSize
            });
            this.tableData = [];
            for (const item of users.data) {
                let userData = {};
                userData['date'] = item.registe_time;
                userData['name'] = item.username;
                userData['address'] = item.city;
                this.tableData.push(userData);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.el-pagination {
    margin-top: 20px;
}
</style>
