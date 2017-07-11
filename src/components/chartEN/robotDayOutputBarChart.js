

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
                text: 'Yield(Today)',
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
                data: ['Yield']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
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
                    name: 'Quantity',
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
                    name: 'Today Yield',
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
                text: 'Yield(Today)',
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
                data: ['Output']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['0:00','1:00','2:00','3:00','4:00','5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
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
                    name: 'Quantity',
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
                    name: 'Yield(Today)',
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

