

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




class RobotWeekOutputBarChart extends Component {
    componentDidUpdate(prevProps, prevState) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('RobotWeekOutputBarChart'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'Completion Rate',
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
                    // data: this.props.TodayAllRobotsxSevenDaysAllRobotsOutputs.XAxisTitle || ['第2月', '第3月', '第4月', '第5月', '-', '-', '-', '-', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周', '第22周'],
                    data: ['Y 2014', , 'Y 2015', 'Y 2016', '-', 'April', 'May', 'June', '-', 'W 20', 'W 21', 'W 22'],
                    name: 'Time',
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
                    // min: 0,
                    // max: 250,
                    // interval: 50,
                    axisLine: {
                        lineStyle: {
                            color: 'white'
                        }
                    },
                    axisLabel: {
                        formatter: '{value}%'
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
                    data: this.props.PlanRate3Years || [95.0, 96.9, 94.0, 0, 0, 0, 0, 0, 0, 0, 0]
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
                    data: this.props.PlanRate3Mouths || [0, 0, 0, 0, 94.2, 95.3, 95.6, 0, 0, 0, 0]
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
                    data: this.props.PlanRate3Weeks || [0, 0, 0, 0, 0, 0, 0, 0, 95.6, 95.7, 95.9,]
                },
            ]
        });
    }


    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('RobotWeekOutputBarChart'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'Completion Rate',
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
                    // data: this.props.TodayAllRobotsxSevenDaysAllRobotsOutputs.XAxisTitle || ['第2月', '第3月', '第4月', '第5月', '-', '-', '-', '-', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周', '第22周'],
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
                    // min: 0,
                    // max: 250,
                    // interval: 50,
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
                    data: this.props.PlanRate3Years || [95.0, 96.9, 94.0, 0, 0, 0, 0, 0, 0, 0, 0]
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
                    data: this.props.PlanRate3Mouths || [0, 0, 0, 0, 94.2, 95.3, 95.6, 0, 0, 0, 0]
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
                    data: this.props.PlanRate3Weeks || [0, 0, 0, 0, 0, 0, 0, 0, 95.6, 95.7, 95.9]
                },
            ]
        });
    }
    render() {
        return (
            <div>
                <div id="RobotWeekOutputBarChart" style={{ width: '530px', height: '400px' }}></div>
            </div>
        );
    }
}


export default RobotWeekOutputBarChart;

