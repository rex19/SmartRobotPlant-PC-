import React from 'react';
import ReactEcharts from 'echarts-for-react';



const Vol = (props) => (
    <ReactEcharts
        option={{
            title: {
                text: props.title
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
                data: ['电压']
            },
            xAxis: [
                {
                    type: 'category',
                    show: true,
                    // data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    data: props.CellhandleSearchRes.OnePassMeasurementRecord.Voltage_TimePoint || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
                name: '伏特',
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
                name: '伏特',
                axisLabel: {
                    formatter: '{value} V'
                }
            }
            ],
            // visualMap: {
            //     bottom: 20,
            //     right: 0,
            //     pieces: [{
            //         gt: 0,
            //         lte: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_LSL || 0,
            //         color: '#ffde33'
            //     }, {
            //         gt: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_LSL || 0,
            //         lte: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_AVGLine || 0,
            //         color: '#096'
            //     }, {
            //         gt: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_AVGLine || 0,
            //         lte: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_USL || 0,
            //         color: '#096'
            //     }, {
            //         gt: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_USL || 0,
            //         color: '#cc0033'
            //     }
            //     ],
            //     outOfRange: {
            //         color: '#999'
            //     }
            // },
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
                    data: props.CellhandleSearchRes.OnePassMeasurementRecord.Data_Voltage || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    // data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值', symbol: 'diamond' },
                            { type: 'min', name: '最小值', symbol: 'arrow' }
                        ]
                    },
                    // markLine: {
                    //     silent: true,
                    //     data: [{
                    //         name: 'min',
                    //         yAxis: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_LSL.toFixed(1) || 0
                    //     }, {
                    //         name: 'x',
                    //         yAxis: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_AVGLine.toFixed(1) || 0,
                    //     }, {
                    //         name: 'max',
                    //         yAxis: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_USL.toFixed(1) || 0,
                    //     }
                    //     ]
                    // }
                }]
        }}
        style={{ height: '400px', width: '100%' }}
        className={'react_for_echarts'}
    />
);

export default Vol;

