

import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


class robotAlarmPieChart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pie2'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '机器人报警类型分布',
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
            // legend: {
            //     orient: 'vertical',
            //     x: 'left',
            //     // data: [this.props.TodayAllRobotsAlarmsDistribution[0].AlarmCode || 'ACode1', this.props.TodayAllRobotsAlarmsDistribution[1].AlarmCode || 'ACode2', this.props.TodayAllRobotsAlarmsDistribution[2].AlarmCode || 'ACode3', this.props.TodayAllRobotsAlarmsDistribution[3].AlarmCode || 'ACode4'],
            //      data: this.props.TodayAllRobotsAlarmsDistributionlegend,
            //     textStyle: {
            //         color: 'white',
            //     },
            // },
            series: [{
                name: '机器人报警类型',
                type: 'pie',
                radius: '68%',
                center: ['50%', '60%'],
                clockwise: false,
                data: this.props.TodayAllRobotsAlarmsDistribution,
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
                '#89051F',
                '#AD0527',
                '#D1052E',
                '#F20334',
                '#c8efff'
            ]
        });
    }


    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pie2'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '机器人报警类型分布',
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
            // legend: {
            //     orient: 'vertical',
            //     x: 'left',
            //     // data: [this.props.TodayAllRobotsAlarmsDistribution[0].AlarmCode || 'ACode1', this.props.TodayAllRobotsAlarmsDistribution[1].AlarmCode || 'ACode2', this.props.TodayAllRobotsAlarmsDistribution[2].AlarmCode || 'ACode3', this.props.TodayAllRobotsAlarmsDistribution[3].AlarmCode || 'ACode4'],
            //     data: this.props.TodayAllRobotsAlarmsDistributionlegend,
            //     textStyle: {
            //         color: 'white',
            //     },
            // },
            series: [{
                name: '机器人报警类型',
                type: 'pie',
                radius: '68%',
                center: ['50%', '60%'],
                clockwise: false,
                data: this.props.TodayAllRobotsAlarmsDistribution,
                label: {
                    normal: {
                        show: false,
                        textStyle: {
                            // color: '#999',
                            fontSize: '5px',
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
                '#89051F',
                '#AD0527',
                '#D1052E',
                '#F20334',
                '#c8efff'
            ]
        });
    }
    render() {
        return (
            <div>
                <div id="pie2" style={{ width: '300px', height: '300px' }}></div>
            </div>
        );
    }
}


export default robotAlarmPieChart;

