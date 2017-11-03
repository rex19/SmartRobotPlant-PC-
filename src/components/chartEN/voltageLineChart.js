
import React from 'react';
import ReactEcharts from 'echarts-for-react';



const VoltageLineChart = (props) => (
  <ReactEcharts
    option={{
      title: {
        text: props.title,
        textStyle: {
          color: 'rgba(12, 218, 255, 0.8)'
        }
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
        data: [{
          name: '电压',
          // 强制设置图形为圆。
          icon: 'circle',
          // 设置文本为红色
          textStyle: {
            color: 'red'
          }
        }]
      },
      xAxis: [
        {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: 'rgba(12, 218, 255, 0.8)'
            }
          },
          show: true,
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(12, 218, 255, 0.2)'
            }
          },

          // data: [10, 50, 60, 30, 50, 70, 10, 70, 20, 80]
          data: props.CellhandleSearchRes.Voltage_TimePoint || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ],

      yAxis: [{
        type: 'value',
        axisLine: {
          lineStyle: {
            color: 'rgba(12, 218, 255, 0.8)'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(12, 218, 255, 0.2)'
          }
        },
        boundaryGap: ['30%', '30%'],
        position: 'left',
        axisLabel: {
          formatter: '{value} V'
        }
      }, {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: 'rgba(12, 218, 255, 0.8)'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(12, 218, 255, 0.2)'
          }
        },
        name: 'V',
        show: true,
        position: 'left',
        boundaryGap: ['30%', '30%'],
        axisLabel: {
          formatter: '{value} V'
        }
      }, {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: 'rgba(12, 218, 255, 0.8)'
          }
        },
        show: false,
        position: 'right',
        boundaryGap: ['30%', '30%'],
        name: 'V',
        axisLabel: {
          formatter: '{value} V'
        }
      }],
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
          smooth: true,
          data: props.CellhandleSearchRes.Data_Voltage || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

          // data: [10, 50, 60, 30, 50, 70, 10, 70, 20, 80],
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
    style={{ height: '350px', width: '100%' }}
    className={'react_for_echarts'}
  />
);

export default VoltageLineChart;

