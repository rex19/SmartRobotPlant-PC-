import React from 'react';
import ReactEcharts from 'echarts-for-react';



const J4CurrentLineChart = (props) => (
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
          name: props.title,
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
          show: true,
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
          // data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          data: props.CellhandleSearchRes.J4_Current_TimePoints || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ],
      yAxis: [{
        type: 'value',
        axisLine: {
          lineStyle: {
            color: 'rgba(12, 218, 255, 0.8)'
          }
        },
        boundaryGap: ['450%', '450%'],
        position: 'left',
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(12, 218, 255, 0.2)'
          }
        },
        axisLabel: {
          formatter: '{value} A'
        }
      },
      {
        type: 'value',
        name: 'A',
        show: true,
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
        position: 'left',
        boundaryGap: ['450%', '450%'],
        // min: 0,
        // max: 30000,
        axisLabel: {
          formatter: '{value} A'
        }
      }, {
        type: 'value',
        show: false,
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(12, 218, 255, 0.2)'
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(12, 218, 255, 0.8)'
          }
        },
        position: 'right',
        boundaryGap: ['450%', '450%'],
        name: 'A',
        axisLabel: {
          formatter: '{value} A'
        }
      }
      ],
      // visualMap: {
      //     bottom: 20,
      //     right: 0,
      //     pieces: [{
      //         gt: props.CellhandleSearchRes.J4CurrentLSL || -10,
      //         lte: props.CellhandleSearchRes.J4CurrentLSL || -10,
      //         color: '#ffde33'
      //     }, {
      //         gt: props.CellhandleSearchRes.J4CurrentLSL || -10,
      //         lte: props.CellhandleSearchRes.J4CurrentAbsAvg || 0,
      //         color: '#096'
      //     }, {
      //         gt: props.CellhandleSearchRes.J4CurrentAbsAvg || 0,
      //         lte: props.CellhandleSearchRes.J4CurrentUSL || 20,
      //         color: '#096'
      //     }, {
      //         gt: props.CellhandleSearchRes.J4CurrentUSL || 20,
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
          name: props.title,
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          // data: [10, 50, 60, 30, 50, 70, 10, 70, 20, 80],
          data: props.CellhandleSearchRes.J4_Current || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          // data: data,
          markPoint: {
            data: [
              { type: 'max', name: '最大值', symbol: 'diamond' },
              { type: 'min', name: '最小值', symbol: 'arrow' }
            ]
          },
          // markLine: {
          //     silent: true,
          //     data: [{
          //         yAxis: props.CellhandleSearchRes.J4CurrentLSL || -10,
          //     }, {
          //         yAxis: props.CellhandleSearchRes.J4CurrentAbsAvg || 0,
          //     }, {
          //         yAxis: props.CellhandleSearchRes.J4CurrentUSL || 20,
          //     }]
          // }
        }]
    }}
    style={{ height: '200px', width: '100%' }}
    className={'react_for_echarts'}
  />
);

export default J4CurrentLineChart;

