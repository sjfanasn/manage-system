<template>
<div>
    <div id="myChart" :style="{width:'90%',height:'450px'}"></div>
</div>
</template>

<script>
// 引入基本模板
import echarts from 'echarts/lib/echarts';
// 引入柱状图组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/markPoint')
require('echarts/lib/component/legend')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/title')
export default {
    mounted() {
        this.initData();
    },
    props:['sevenDay','sevenData'],
    methods: {
        initData() {
            let myChart = echarts.init(document.getElementById('myChart'));
            const option = {
                color: ['#5793f3', '#675bba', '#d14a61'],
                title: {
                    text: '走势图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['新注册用户', '新增订单', '新增管理员']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'category',
                    boundaryGap:false,
                    data: this.sevenDay
                }],
                yAxis: [{
                        type: 'value',
                        name: '用户',
                        min: 0,
                        max: 200,
                        position: 'left',
                        axisLine: {
                            lineStyle: {
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '订单',
                        min: 0,
                        max: 200,
                        position: 'right',
                        axisLine: {
                            lineStyle: {
                                color: '#999'
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                ],
                series: [{
                        name: '新注册用户',
                        type: 'line',
                        data: this.sevenData[0],
                        markPoint: {
                            data: [{
                                    type: 'max',
                                    name: '最大值'
                                },
                                {
                                    type: 'min',
                                    name: '最小值'
                                }
                            ]
                        }
                    },
                    {
                        name: '新增订单',
                        type: 'line',
                        data: this.sevenData[1],
                        markPoint: {
                            data: [{
                                    type: 'max',
                                    name: '最大值'
                                },
                                {
                                    type: 'min',
                                    name: '最小值'
                                }
                            ]
                        }
                    },
                    {
                        name: '新增管理员',
                        type: 'line',
                        data: this.sevenData[2],
                        markPoint: {
                            data: [{
                                    type: 'max',
                                    name: '最大值'
                                },
                                {
                                    type: 'min',
                                    name: '最小值'
                                }
                            ]
                        }
                    }
                ]
            };
            myChart.setOption(option)
        }
    }
}
</script>

<style scoped>

</style>
