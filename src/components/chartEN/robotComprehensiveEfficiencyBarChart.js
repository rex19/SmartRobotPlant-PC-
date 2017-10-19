

import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';



class robotDayDowntimeBarChart extends Component {
    componentDidUpdate(prevProps, prevState) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('robotDayDowntimeBarChart'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'Comprehensive Efficiency',
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
                top: 20,
                textStyle: {
                    color: 'white'
                },
                data: ['Last 3Years', 'Last 3Mouths', 'Last 3Weeks']
            },
            xAxis: [
                {
                    type: 'category',
                    name: 'Time',
                    data: ['Y 2014', , 'Y 2015', 'Y 2016', '-', 'April', 'May', 'June', '-', 'W 20', 'W 21', 'W 22'],
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
                    name: 'Percentage',
                    min: 0,
                    max: 100,
                    axisLine: {
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    axisLabel: {
                        formatter: '{value}% '
                    }
                }
            ],
            series: [
                {
                    name: 'Last 3Years',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            color: '#00B945'
                        },
                    },
                    data: this.props.ComprehensiveEfficiency3Years || [95.0, 96.9, 94.0, 0, 0, 0, 0, 0, 0, 0, 0]
                    // data:this.props.TodayTodayAllRobotsStopInMinutesPerHour|| [95.0, 96.9,94.0, 0,  94.2, 95.3,  95.6,0, 95.7, 95.9, 92.2]
                    // data: this.props.TodayTodayAllRobotsStopInMinutesPerHour || [95.0, 96.9, 0, 94.0, 94.2, 95.3, 0, 95.6, 95.7, 95.9, 92.2, 96.6, 95.7, 97.6, 97.3, 98.0, 97.5, 98.0, 98.0]
                },
                {
                    name: 'Last 3Mouths',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            color: '#7CE700'
                        },
                    },
                    data: this.props.ComprehensiveEfficiency3Mouths || [0, 0, 0, 0, 94.2, 95.3, 95.6, 0, 0, 0, 0]
                },
                {
                    name: 'Last 3Weeks',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            color: '#D5F800'
                        },
                    },
                    data: this.props.ComprehensiveEfficiency3Weeks || [0, 0, 0, 0, 0, 0, 0, 0, 95.6, 95.7, 95.9,]
                },
            ]
        });
    }


    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('robotDayDowntimeBarChart'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'Comprehensive Efficiency',
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
                top: 20,
                textStyle: {
                    color: 'white'
                },
                data: ['Last 3Years', 'Last 3Mouths', 'Last 3Weeks']
            },
            xAxis: [
                {
                    type: 'category',
                    name: 'Time',
                    data: ['Y 2014', , 'Y 2015', 'Y 2016', '-', 'April', 'May', 'June', '-', 'W 20', 'W 21', 'W 22'],
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
                    name: 'Percentage',
                    min: 0,
                    max: 100,
                    axisLine: {
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    axisLabel: {
                        formatter: '{value}% '
                    }
                }
            ],
            series: [
                {
                    name: 'Last 3Years',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            color: '#00B945'
                        },
                    },
                    data: this.props.ComprehensiveEfficiency3Years || [95.0, 96.9, 94.0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    name: 'Last 3Mouths',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            color: '#7CE700'
                        },
                    },
                    data: this.props.ComprehensiveEfficiency3Mouths || [0, 0, 0, 0, 94.2, 95.3, 95.6, 0, 0, 0, 0]
                },
                {
                    name: 'Last 3Weeks',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            color: '#D5F800'
                        },
                    },
                    data: this.props.ComprehensiveEfficiency3Weeks || [0, 0, 0, 0, 0, 0, 0, 0, 95.6, 95.7, 95.9,]
                },
            ]
        });
    }
    render() {
        return (
            <div>
                <div id="robotDayDowntimeBarChart" style={{ width: '530px', height: '400px' }}></div>
            </div>
        );
    }
}


export default robotDayDowntimeBarChart;

