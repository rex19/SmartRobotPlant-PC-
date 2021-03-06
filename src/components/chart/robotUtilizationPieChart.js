

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


class robotUtilizationPieChart extends Component {
    componentDidUpdate(prevProps, prevState) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pie4'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '机器人开动率',
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
                data: ['开动率', '停机率'],
                textStyle: {
                    color: 'white',
                },
            },
            series: [{
                name: '机器人开动率',
                type: 'pie',
                radius: '68%',
                center: ['50%', '60%'],
                clockwise: false,
                data: [{
                    value: this.props.TodayAllRobotsRunningRatioPieChart.RunningRatio ,
                    name: '开动率'
                }, {
                    value: this.props.TodayAllRobotsRunningRatioPieChart.StopRatio,
                    name: '停机率'
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
                '#37E137',//green
                '#696969',//gray
                '#79d9f1',
                '#a7e7ff',
                '#c8efff'
            ]
        });
    }


    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pie4'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '机器人开动率',
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
                data: ['开动率', '停机率'],
                textStyle: {
                    color: 'white',
                },
            },
            series: [{
                name: '库存情况',
                type: 'pie',
                radius: '68%',
                center: ['50%', '60%'],
                clockwise: false,
                data: [{
                    value: 0,
                    name: '开动率'
                }, {
                    value:0,
                    name: '停机率'
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
                '#37E137',//green
                '#696969',//gray
                '#79d9f1',
                '#a7e7ff',
                '#c8efff'
            ]
        });
    }
    render() {
        return (
            <div>
                <div id="pie4" style={{ width: '300px', height: '300px' }}></div>
            </div>
        );
    }
}


export default robotUtilizationPieChart;

