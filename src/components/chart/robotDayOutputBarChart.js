

import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// import  'echarts/lib/chart/line';
// import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';




class RobotDayOutputBarChart extends Component {
    componentDidUpdate(prevProps, prevState) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('RobotDayOutputBarChart'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '当天产量',
                textStyle: {
                    color: 'white',
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            legend: {
                data: ['产量']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时'],
                    axisLine: {
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '数量',
                    axisLine: {
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    axisLabel: {
                        formatter: '{value} '
                    }
                }
            ],
            series: [
                {
                    name: '当天产量',
                    type: 'bar',
                     itemStyle: {
                        normal: {
                            color: '#7CFC00'
                        },
                    },
                    data:this.props.TodayAllRobotsOutputPerHour|| [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3, 2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                }
            ]
        });
    }


    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('RobotDayOutputBarChart'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '当天产量',
                textStyle: {
                    color: 'white',
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            legend: {
                data: ['产量']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时', '12时', '13时', '14时', '15时', '16时', '17时', '18时', '19时', '20时', '21时', '22时', '23时'],
                    axisLine: {
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '数量',
                    axisLine: {
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    axisLabel: {
                        formatter: '{value} '
                    }
                }
            ],
            series: [
                {
                    name: '当天产量',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#7CFC00'
                        },
                    },
                    data:this.props.TodayAllRobotsOutputPerHour|| [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3, 2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                }
            ]
        });
    }
    render() {
        return (
            <div>
                <div id="RobotDayOutputBarChart" style={{ width: '530px', height: '400px' }}></div>
            </div>
        );
    }
}


export default RobotDayOutputBarChart;

