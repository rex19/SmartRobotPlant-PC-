

import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';


class robotAlarmPieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //   AlarmsDistribution:{value:0,name:'0'}

        }
    }

    componentDidUpdate(prevProps, prevState) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pie2'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'Robot AlarmType Ratio',
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
            series: [{
                name: 'Robot AlarmType Ratio',
                type: 'pie',
                radius: '68%',
                center: ['50%', '60%'],
                clockwise: false,
                // data: [{
                //     value: 45,
                //     name: 'upTime'
                // }, {
                //     value: 25,
                //     name: 'WatingTime'
                // }, {
                //     value: 15,
                //     name: 'DowmTime'
                // }],
                data: this.props.TodayAllRobotsAlarmsDistribution,
                // data:[
                //     {
                //         value:  45,
                //         name:  'ACode1',
                //     }],
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
                text: 'Robot AlarmType Ratio',
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
            series: [{
                name: 'Robot AlarmType Ratio',
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
                <div id="pie2" style={{ width: '400px', height: '300px' }}></div>
            </div>
        );
    }
}


export default robotAlarmPieChart;

