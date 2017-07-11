

import React, { Component } from 'react';

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
// import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
// import 'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';



class VoltageLineChart extends Component {

    componentDidUpdate(prevProps, prevState) {
        var myChart = echarts.init(document.getElementById('VoltageLineChart'));
        if (this.props.CellhandleSearchRes.Part_Serial !== "") {
            console.log('this.props.CellhandleSearchRes.Part_Serial !== ""')
            // 基于准备好的dom，初始化echarts实例

            // 绘制图表
            myChart.setOption({
                title: {
                    text: 'Voltage'
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
                    data: ['Voltage']
                },
                xAxis: [
                    {
                        type: 'category',
                        show: true,
                        // data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        data: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Voltage_TimePoint || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
                        formatter: '{value} V'
                    }
                },
                {
                    type: 'value',
                    name: 'Volt',
                    show: true,
                    position: 'left',
                    boundaryGap: ['30%', '30%'],
                    // min: 0,
                    // max: 30000,
                    axisLabel: {
                        formatter: '{value} V'
                    }
                }, {
                    type: 'value',
                    show: false,
                    position: 'right',
                    boundaryGap: ['30%', '30%'],
                    name: 'Volt',
                    axisLabel: {
                        formatter: '{value} V'
                    }
                }
                ],
                visualMap: {
                    bottom: 20,
                    right: 0,
                    pieces: [{
                        gt: 0,
                        lte: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_LSL || 0,
                        color: '#ffde33'
                    }, {
                        gt: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_LSL || 0,
                        lte: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_AVGLine || 0,
                        color: '#096'
                    }, {
                        gt: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_AVGLine || 0,
                        lte: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_USL || 0,
                        color: '#096'
                    }, {
                        gt: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_USL || 0,
                        color: '#cc0033'
                    }
                    ],
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
                        name: 'Voltage',
                        type: 'line',
                        yAxisIndex: 1,
                        data: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Data_Voltage || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        // data: data,
                        markPoint: {
                            data: [
                                { type: 'max', name: 'Max', symbol: 'diamond' },
                                { type: 'min', name: 'Min', symbol: 'arrow' }
                            ]
                        },
                        markLine: {
                            silent: true,
                            data: [{
                                name: 'min',
                                yAxis: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_LSL.toFixed(1) || 0
                            }, {
                                name: 'x',
                                yAxis: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_AVGLine.toFixed(1) || 0,
                            }, {
                                name: 'max',
                                yAxis: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_USL.toFixed(1) || 0,
                            }
                            ]
                        }
                    }]
            });
        } else {
            console.log('myChart.clear();')
            myChart.clear();
        }

    }


    componentDidMount() {

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('VoltageLineChart'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: 'Voltage'
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
            // legend: {
            //     data: ['标准电压', '电压']
            // },
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
                    formatter: '{value} V'
                }
            },
            {
                type: 'value',
                name: 'Volt',
                show: true,
                position: 'left',
                boundaryGap: ['30%', '30%'],
                // min: 0,
                // max: 30000,
                axisLabel: {
                    formatter: '{value} V'
                }
            }, {
                type: 'value',
                show: false,
                position: 'right',
                boundaryGap: ['30%', '30%'],
                name: 'Volt',
                axisLabel: {
                    formatter: '{value} V'
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
                    name: 'Voltage',
                    type: 'line',
                    yAxisIndex: 1,
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    // data: data,
                    markPoint: {
                        data: [
                            { type: 'max', name: 'Max', symbol: 'diamond' },
                            { type: 'min', name: 'Min', symbol: 'arrow' }
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
                <div id="VoltageLineChart" style={{ width: '100%', height: '400px' }}></div>
            </div>
        );
    }
}


export default VoltageLineChart;

