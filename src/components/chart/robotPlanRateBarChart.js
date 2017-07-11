

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
                text: '计划完成率',
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
                textStyle: { color: 'white' },
                data: ['最近三年', '最近三月', '最近三周']
            },
            xAxis: [
                {
                    type: 'category',
                    name: '时间',
                    // data: this.props.TodayAllRobotsxSevenDaysAllRobotsOutputs.XAxisTitle || ['第2月', '第3月', '第4月', '第5月', '-', '-', '-', '-', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周', '第22周'],
                    data: ['2015年', '2016年', '2017年', '-', '4月', '5月', '6月', '-', '第21周', '第23周', '第23周'],
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
                    name: '百分比',
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
                    name: '最近三年',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            color: '#00B945'
                        },
                    },
                    data: this.props.PlanRate3Years || [95.0, 96.9, 94.0, 0, 0, 0, 0, 0, 0, 0, 0]
                    // data:this.props.TodayTodayAllRobotsStopInMinutesPerHour|| [95.0, 96.9,94.0, 0,  94.2, 95.3,  95.6,0, 95.7, 95.9, 92.2]
                    // data: this.props.TodayTodayAllRobotsStopInMinutesPerHour || [95.0, 96.9, 0, 94.0, 94.2, 95.3, 0, 95.6, 95.7, 95.9, 92.2, 96.6, 95.7, 97.6, 97.3, 98.0, 97.5, 98.0, 98.0]
                },
                {
                    name: '最近三月',
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
                    name: '最近三周',
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
                text: '计划完成率',
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
                textStyle: { color: 'white' },
                data: ['最近三年', '最近三月', '最近三周']
            },
            xAxis: [
                {
                    type: 'category',
                    name: '时间',
                    // data: this.props.TodayAllRobotsxSevenDaysAllRobotsOutputs.XAxisTitle || ['第2月', '第3月', '第4月', '第5月', '-', '-', '-', '-', '第7周', '第8周', '第9周', '第10周', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周', '第22周'],
                    // data: ['2015年', '2016年', '-', '4月', '5月', '6月', '-', '第11周', '第12周', '第13周', '第14周', '第15周', '第16周', '第17周', '第18周', '第19周', '第20周', '第21周', '第22周'],
                    data: ['2015年', '2016年', '2017年', '-', '4月', '5月', '6月', '-', '第21周', '第23周', '第23周'],
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
                    name: '百分比',
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
                    name: '最近三年',
                    type: 'bar',
                    stack: '总量',
                    itemStyle: {
                        normal: {
                            color: '#00B945'
                        },
                    },
                    data: this.props.PlanRate3Years || [95.0, 96.9, 94.0, 0, 0, 0, 0, 0, 0, 0, 0]
                    // data:this.props.TodayTodayAllRobotsStopInMinutesPerHour|| [95.0, 96.9,94.0, 0,  94.2, 95.3,  95.6,0, 95.7, 95.9, 92.2]
                    // data: this.props.TodayTodayAllRobotsStopInMinutesPerHour || [95.0, 96.9, 0, 94.0, 94.2, 95.3, 0, 95.6, 95.7, 95.9, 92.2, 96.6, 95.7, 97.6, 97.3, 98.0, 97.5, 98.0, 98.0]
                },
                {
                    name: '最近三月',
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
                    name: '最近三周',
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
    render() {
        // console.log('robotPlanChart.js  this.props.PlanRate3Years', this.props.PlanRate3Years)
        // console.log('this.props.TodayAllRobotsxSevenDaysAllRobotsOutputs++++', this.props.TodayAllRobotsxSevenDaysAllRobotsOutputs)
        return (
            <div>
                <div id="RobotWeekOutputBarChart" style={{ width: '530px', height: '400px' }}></div>
            </div>
        );
    }
}


export default RobotWeekOutputBarChart;

