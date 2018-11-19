<template>
<div>
    <div id="myEcharts" style="width: 100%;height:400px;"></div>
</div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import "echarts/lib/chart/pie";
import "echarts/lib/component/title";
import "echarts/lib/component/legend"
export default {
    props: ['data'],
    mounted(){
        this.initData();
    },
    methods: {
        initData() {
            const myEcharts = echarts.init(document.getElementById('myEcharts'));
            const option = {
                title: {
                    text: '用户分布',
                    // subtext: '纯属虚构',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['北京', '上海', '深圳', '杭州', '其他']
                },
                series: [{
                    name: '访问来源',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [{
                            value: this.data.beijing,
                            name: '北京'
                        },
                        {
                            value: this.data.shanghai,
                            name: '上海'
                        },
                        {
                            value: this.data.shenzhen,
                            name: '深圳'
                        },
                        {
                            value: this.data.hangzhou,
                            name: '杭州'
                        },
                        {
                            value: this.data.qita,
                            name: '其他'
                        }
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };
            myEcharts.setOption(option);
        }
    },
    watch: {
        data: function () {
            this.initData();
        }
    }

}
</script>

<style scoped>

</style>
