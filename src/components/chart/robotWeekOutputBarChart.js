

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
                text: '当周产量',
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
                    data: this.props.TodayAllRobotsxSevenDaysAllRobotsOutputs.XAxisTitle || ['0', '0', '0', '0', '0', '0', '0'],
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
                    // min: 0,
                    // max: 250,
                    // interval: 50,
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
                    name: '当周产量',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#32CD32'
                        },
                    },
                    // data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
                    data: this.props.TodayAllRobotsxSevenDaysAllRobotsOutputs.Data || [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
                }
            ]
        });
    }


    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('RobotWeekOutputBarChart'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '当周产量',
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
                    data:  this.props.TodayAllRobotsxSevenDaysAllRobotsOutputs.XAxisTitle || ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
                    // min: 0,
                    // max: 250,
                    // interval: 50,
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
                    name: '当周产量',
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: '#32CD32'
                        },
                    },
                    barWidth:15,
                    data: this.props.TodayAllRobotsxSevenDaysAllRobotsOutputs.Data || [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6]
                }
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

