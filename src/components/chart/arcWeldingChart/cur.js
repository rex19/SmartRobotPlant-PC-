import React from 'react';
import ReactEcharts from 'echarts-for-react';



const Cur = (props) => (
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
                data: ['电流']
            },
            xAxis: [
                {
                    type: 'category',
                    show: true,
                    // data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    data: props.CellhandleSearchRes.OnePassMeasurementRecord.Current_TimePoint || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
            // visualMap: {
            //     bottom: 20,
            //     right: 0,
            //     pieces: [{
            //         gt: 0,
            //         lte: props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_LSL || 0,
            //         color: '#ffde33'
            //     }, {
            //         gt: props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_LSL || 0,
            //         lte: props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_AVGLine || 0,
            //         color: '#096'
            //     }, {
            //         gt: props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_AVGLine || 0,
            //         lte: props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_USL || 0,
            //         color: '#096'
            //     }, {
            //         gt: props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_USL || 0,
            //         color: '#cc0033'
            //     }],
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
                    name: '电流',
                    type: 'line',
                    yAxisIndex: 1,
                    data: props.CellhandleSearchRes.OnePassMeasurementRecord.Data_Current || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
                    //         yAxis: props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_LSL.toFixed(1) || 0
                    //     }, {
                    //         yAxis: props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_AVGLine.toFixed(1) || 0,
                    //     }, {
                    //         yAxis: props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Current_USL.toFixed(1) || 0,
                    //     }
                    //     ]
                    // }
                }]
        }}
        style={{ height: '400px', width: '100%' }}
        className={'react_for_echarts'}
    />
);

export default Cur;

