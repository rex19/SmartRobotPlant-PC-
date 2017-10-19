

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
                text: 'Robot RunningState Ratio',
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
                data: ['FaultRatio', 'PowerOffRatio', 'ReadyRatio', 'RunningRatio'],
                textStyle: {
                    color: 'white',
                },
            },
            series: [{
                name: 'Robot RunningState Ratio',
                type: 'pie',
                radius: '68%',
                center: ['50%', '60%'],
                clockwise: false,
                data: [{
                    value: this.props.TodayAllRobotsStateDistribution.FaultRatio ,
                    name: 'FaultRatio'
                }, {
                    value: this.props.TodayAllRobotsStateDistribution.PowerOffRatio ,
                    name: 'PowerOffRatio'
                }, {
                    value: this.props.TodayAllRobotsStateDistribution.ReadyRatio ,
                    name: 'ReadyRatio'
                }, {
                    value: this.props.TodayAllRobotsStateDistribution.RunningtRatio ,
                    name: 'RunningRatio'
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
                text: 'Robot RunningState Ratio',
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
                data: ['FaultRatio', 'PowerOffRatio', 'ReadyRatio', 'RunningRatio'],
                textStyle: {
                    color: 'white',
                },
            },
            series: [{
                name: 'Robot RunningState Ratio',
                type: 'pie',
                radius: '68%',
                center: ['50%', '60%'],
                clockwise: false,
                data: [{
                    value:0,
                    name: 'FaultRatio'
                }, {
                    value: 0,
                    name: 'PowerOffRatio'
                }, {
                    value:0,
                    name: 'ReadyRatio'
                }, {
                    value:0,
                    name: 'RunningRatio'
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
        return (
            <div>
                <div id="pie1" style={{ width: '400px', height: '300px' }}></div>
            </div>
        );
    }
}


export default robotRunningStatePieChart;

