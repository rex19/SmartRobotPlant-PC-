

import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
/*import  'echarts/lib/chart/bar';
import  'echarts/lib/chart/line';*/
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


class robotRunningStatePieChart extends Component {
    componentDidUpdate(prevProps, prevState) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pie1'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '机器人运行状态',
                textStyle: {
                    color: 'white',
                },
                left: 'right',
                top: 0
            },

            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

           legend: {
                orient: 'vertical',
                x: 'left',
                data: ['故障', '停机', '等待', '运行'],
                textStyle: {
                    color: 'white',
                },
            },
            series: [{
                name: '机器人运行状态',
                type: 'pie',
                radius: '68%',
                center: ['50%', '60%'],
                clockwise: false,
                data: [{
                    value: this.props.TodayAllRobotsStateDistribution.FaultRatio ,
                    name: '故障'
                }, {
                    value: this.props.TodayAllRobotsStateDistribution.PowerOffRatio ,
                    name: '停机'
                }, {
                    value: this.props.TodayAllRobotsStateDistribution.ReadyRatio ,
                    name: '等待'
                }, {
                    value: this.props.TodayAllRobotsStateDistribution.RunningtRatio ,
                    name: '运行'
                }],
                label: {

                    normal: {
                        show: false,
                        textStyle: {
                            // color: '#999',
                            fontSize: '14px',
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 4,
                        borderColor: 'rgba(0, 0, 0, 0)',
                    },
                    emphasis: {
                        borderWidth: 0,
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }],
            color: [
                '#DC143C',//red
                '#696969',//gray
                '#FFD700', //yellow
                '#32CD32',//green
                '#c8efff'
            ]
        });
    }


    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pie1'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '机器人运行状态',
                textStyle: {
                    color: 'white',
                },
                left: 'right',
                top: 0
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['故障', '停机', '等待', '运行'],
                textStyle: {
                    color: 'white',
                },
            },
            series: [{
                name: '机器人运行状态',
                type: 'pie',
                radius: '68%',
                center: ['50%', '60%'],
                clockwise: false,
                data: [{
                    value: 0,
                    name: '故障'
                }, {
                    value: 0,
                    name: '停机'
                }, {
                    value: 0,
                    name: '等待'
                }, {
                    value: 0,
                    name: '运行'
                }],
                label: {
                    normal: {
                        show: false,
                        textStyle: {
                            // color: '#999',
                            fontSize: '14px',
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 4,
                        borderColor: 'rgba(0, 0, 0, 0)',
                    },
                    emphasis: {
                        borderWidth: 0,
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }],
            color: [
                '#DC143C',//red
                '#696969',//gray
                '#FFD700', //yellow
                '#32CD32',//green
                '#c8efff'
            ]
        });
    }
    render() {
        // console.log('this.props.TodayAllRobotsStateDistribution',this.props.TodayAllRobotsStateDistribution)
        return (
            <div>
                <div id="pie1" style={{ width: '300px', height: '300px' }}></div>
            </div>
        );
    }
}


export default robotRunningStatePieChart;

