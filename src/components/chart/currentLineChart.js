

import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class CurrentLineChart extends Component {

    // 组件更新数据
    componentDidUpdate(prevProps, prevState) {
        var myChart = echarts.init(document.getElementById('CurrentLineChart'));
        if (this.props.CellhandleSearchRes.Part_Serial !== "") {

            // 基于准备好的dom，初始化echarts实例

            // 绘制图表
            myChart.setOption({
                title: {
                    text: '电流'
                },
                tooltip: {
                    trigger: 'axis'
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
                    data: ['电流']
                },
                xAxis: [
                    {
                        type: 'category',
                        show: true,
                        // data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        data: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Current_TimePoint || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    }
                ],
                yAxis: [{
                    type: 'value',
                    // name: 'anpei',
                    // min: 0,
                    // max: 25,
                    boundaryGap: ['30%', '30%'],
                    position: 'left',
                    axisLabel: {
                        formatter: '{value} A'
                    }
                },
                {
                    type: 'value',
                    name: '安培',
                    show: true,
                    position: 'left',
                    boundaryGap: ['30%', '30%'],
                    // min: 0,
                    // max: 30000,
                    axisLabel: {
                        formatter: '{value} A'
                    }
                }, {
                    type: 'value',
                    show: false,
                    position: 'right',
                    boundaryGap: ['30%', '30%'],
                    name: '安培',
                    axisLabel: {
                        formatter: '{value} A'
                    }
                }
                ],
                visualMap: {
                    bottom: 20,
                    right: 0,
                    pieces: [{
                        gt: 0,
                        lte: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_LSL || 0,
                        color: '#ffde33'
                    }, {
                        gt: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_LSL || 0,
                        lte: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_AVGLine || 0,
                        color: '#096'
                    }, {
                        gt: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_AVGLine || 0,
                        lte: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_USL || 0,
                        color: '#096'
                    }, {
                        gt: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_USL || 0,
                        color: '#cc0033'
                    }],
                    outOfRange: {
                        color: '#999'
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 100
                }],
                series: [
                    {
                        name: '电流',
                        type: 'line',
                        yAxisIndex: 1,
                        data: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Data_Current || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        // data: data,
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值', symbol: 'diamond' },
                                { type: 'min', name: '最小值', symbol: 'arrow' }
                            ]
                        },
                        markLine: {
                            silent: true,
                            data: [{
                                yAxis: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_LSL.toFixed(1) || 0
                            }, {
                                yAxis: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_AVGLine.toFixed(1) || 0,
                            }, {
                                yAxis: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_USL.toFixed(1) || 0,
                            }
                            ]
                        }
                    }]
            });
        } else {
            myChart.clear();
        }
    }

    // 组件加载完成后运行
    componentDidMount() {

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('CurrentLineChart'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '电流'
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                feature: {
                    dataView: { show: true, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            xAxis: [
                {
                    type: 'category',
                    show: true,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ],
            yAxis: [{
                type: 'value',
                // name: 'anpei',
                // min: 0,
                // max: 25,
                boundaryGap: ['30%', '30%'],
                position: 'left',
                axisLabel: {
                    formatter: '{value} A'
                }
            },
            {
                type: 'value',
                name: '安培',
                show: true,
                position: 'left',
                boundaryGap: ['30%', '30%'],
                // min: 0,
                // max: 30000,
                axisLabel: {
                    formatter: '{value} A'
                }
            }, {
                type: 'value',
                show: false,
                position: 'right',
                boundaryGap: ['30%', '30%'],
                name: '安培',
                axisLabel: {
                    formatter: '{value} A'
                }
            }
            ],
            visualMap: {
                bottom: 20,
                right: 0,
                pieces: [{
                    gt: 0,
                    lte: 150,
                    color: '#096'
                }, {
                    gt: 150,
                    lte: 300,
                    color: '#ffde33'
                }, {
                    gt: 300,
                    lte: 450,
                    color: '#ff9933'
                }, {
                    gt: 450,
                    lte: 600,
                    color: '#cc0033'
                }, {
                    gt: 600,
                    color: '#7e0023'
                }],
                outOfRange: {
                    color: '#999'
                }
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 100
            }],
            series: [

                {
                    name: '电压',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    // data: data,
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值', symbol: 'diamond' },
                            { type: 'min', name: '最小值', symbol: 'arrow' }
                        ]
                    },
                    markLine: {
                        silent: true,
                        data: [{
                            yAxis: 0
                        },
                        {
                            yAxis: 0
                        }, {
                            yAxis: 0
                        }, {
                            yAxis: 0
                        }
                        ]
                    }
                }]
        });
    }
    render() {
        return (
            <div>
                <div id="CurrentLineChart" style={{ width: '100%', height: '400px' }}></div>
            </div>
        );
    }
}


export default CurrentLineChart;

