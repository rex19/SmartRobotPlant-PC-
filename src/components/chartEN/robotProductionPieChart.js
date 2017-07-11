

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


class robotProductionPieChart extends Component {
    componentDidUpdate(prevProps, prevState) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pie3'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'ProductionType Ratio',
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
            //     data: [name1, name2, name3, name4],
            //     textStyle: {
            //         color: 'white',
            //     },
            // },
            series: [{
                name: 'ProductionType Ratio',
                type: 'pie',
                radius: '68%',
                center: ['50%', '60%'],
                clockwise: false,
                  data:this.props.TodayAllRobotsOutputsByPart,
                // data: [{
                //     value: value1,
                //     name: name1,
                // }, {
                //     value: value2,
                //     name: name2,
                // }, {
                //     value: value3,
                //     name: name3,
                // }, {
                //     value: value4,
                //     name: name4,
                // }],
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
                '#A7E530',
                '#A5D55E',
                '#31A058',
                '#117041',
                '#c8efff'
            ]
        });
    }


    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('pie3'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'ProductionType Ratio',
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
                name: 'ProductionType Ratio',
                type: 'pie',
                radius: '68%',
                center: ['50%', '60%'],
                clockwise: false,
                
                data:this.props.TodayAllRobotsOutputsByPart,
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
                '#A7E530',
                '#A5D55E',
                '#31A058',
                '#117041',
                '#c8efff'
            ]
        });
    }
    render() {
        return (
            <div>
                <div id="pie3" style={{ width: '400px', height: '300px' }}></div>
            </div>
        );
    }
}


export default robotProductionPieChart;


