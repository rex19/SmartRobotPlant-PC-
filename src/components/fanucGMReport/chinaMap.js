import React from 'react';
import echarts from 'echarts';

import CRUD from '../../unit/ajax.js';
import 'echarts/map/js/china.js'

const crud = new CRUD();
var myChart = {}

//声明的变量用于下面切换省份换数据的方法  chinaMapAjaxData
let TodayAllRobotsOutputs = 0, //所有产量
  TodayAllRobotsRunningRatio = 0, //所有Robot 开动率
  TodayAllPlantSafetyDays = 0, //安全生产天数
  TodayAllRobotsPlanRate = 0, //计划完成率
  TodayAllQuanlityRate = 0, //质量合格率
  //饼图
  TodayAllRobotsStateDistribution = {},
  TodayAllRobotsAlarmsDistribution = [{ 'Ratio': '0', 'AlarmCode': '0' }, { 'Ratio': '0', 'AlarmCode': '0' }, { 'Ratio': '0', 'AlarmCode': '0' }, { 'Ratio': '0', 'AlarmCode': '0' }],
  TodayAllRobotsOutputsByPart = [{ 'Hour': '0', 'PartNumber': '0', 'Ratio': '0' }, { 'Hour': '0', 'PartNumber': '0', 'Ratio': '0' }, { 'Hour': '0', 'PartNumber': '0', 'Ratio': '0' }, { 'Hour': '0', 'PartNumber': '0', 'Ratio': '0' }],
  TodayAllRobotsRunningRatioPieChart = { "RunningRatio": 0, "StopRatio": 0 },
  //柱形图
  TodayAllRobotsOutputPerHour = [],
  TodayAllRobotsxSevenDaysAllRobotsOutputs = {},
  TodayTodayAllRobotsStopInMinutesPerHour = [],

  PlanRate3Years = [],
  PlanRate3Mouths = [],
  PlanRate3Weeks = [],
  QuanlityRate3Years = [],
  QuanlityRate3Mouths = [],
  QuanlityRate3Weeks = [],
  ComprehensiveEfficiency3Years = [],
  ComprehensiveEfficiency3Mouths = [],
  ComprehensiveEfficiency3Weeks = []

class ChinaMap extends React.Component {

  componentDidMount() {
    //能用得到的代码尸体
    var data = [
      { name: "上海", value: 29780 },
      { name: "广州", value: 15769 },
      { name: "重庆", value: 13283 },
    ];

    var geoCoordMap = {
      "上海": [121.48, 31.22],
      "广州": [113.23, 23.16],
      "重庆": [106.54, 29.59],
    };

    var convertData = function (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    };

    var convertedData = [
      convertData(data),
      convertData(data.sort(function (a, b) {
        return b.value - a.value;
      }).slice(0, 6))
    ];
    data.sort(function (a, b) {
      return a.value - b.value;
    })

    var categoryData = [];
    var barData = [];
    var sum = 0;
    var count = data.length;
    for (var i = 0; i < data.length; i++) {
      categoryData.push(data[i].name);
      barData.push(data[i].value);
      sum += data[i].value;
    }

    myChart = echarts.init(document.getElementById('main'));

    const option = {
      // backgroundColor: 'rgba(64,74,89,0.9)',
      // backgroundColor:'#202E4A',
      animation: true,
      animationDuration: 1000,
      animationEasing: 'cubicInOut',
      animationDurationUpdate: 1000,
      animationEasingUpdate: 'cubicInOut',
      title: [{
        text: '',
        // subtext: 'REGION',
        top: 20,
        left: 'center',
        textStyle: {
          color: 'red',
          fontSize: 45
        },
        // subtextStyle: {
        //     top:25,
        //     color: '#fff',
        //     fontWeight:'bolder',
        //     // fontFamily:'Times New Roman',
        //     fontSize: 30
        // }
      }
        // , {
        //     id: 'statistic',
        //     text: '区    域',
        //     // left: 'right',
        //     right: '47%',
        //     top: '10%',
        //     // width: 100,
        //     textStyle: {
        //         color: '#fff',
        //         fontWeight: 'bolder',
        //         fontSize: 30
        //     }
        // }
      ],
      toolbox: {
        iconStyle: {
          normal: {
            borderColor: '#fff'
          },
          emphasis: {
            borderColor: '#b1e4ff'
          }
        },
        feature: {
          dataZoom: {},
          brush: {
            type: ['rect', 'polygon', 'clear']
          },
          saveAsImage: {
            show: true
          }
        }
      },
      brush: {
        outOfBrush: {
          color: '#abc'
        },
        brushStyle: {
          borderWidth: 2,
          color: 'rgba(0,0,0,0.2)',
          borderColor: 'rgba(0,0,0,0.5)',
        },
        seriesIndex: [0, 1],
        throttleType: 'debounce',
        throttleDelay: 300,
        geoIndex: 0
      },
      geo: {
        map: 'china',
        left: '10',
        right: '35%',
        center: [85.98561551896913, 27.205000490896193],
        zoom: 0.8,
        label: {
          emphasis: {
            show: false
          }
        },
        roam: true,
        itemStyle: {
          normal: {
            areaColor: 'rgba(32,46,74,0.6)',
            borderColor: '#DBE6E9'
          },
          emphasis: {
            areaColor: '#2a333d'
          }
        }
      },
      tooltip: {
        trigger: 'item',
        show: false
      },
      grid: {
        right: 40,
        top: 100,
        bottom: 40,
        width: '30%'
      },
      series: [{
        // name: 'pm2.5',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: convertedData[0],
        symbolSize: function (val) {
          return Math.max(val[2] / 300, 8);
        },
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: false
          },
          emphasis: {
            show: true
          }
        },
      }
        , {
        //  name: 'Top 5',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: convertedData[0],
        symbolSize: function (val) {
          return Math.max(val[2] / 500, 8);
        },
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            show: true
          }
        },
        itemStyle: {
          normal: {
            color: '#f4e925',
            shadowBlur: 50,
            shadowColor: '#EE0000'
          }
        },
        zlevel: 1
      }]
    };


    myChart.setOption(option);

    let self = this;

    myChart.on('click', function (params) {
      // console.log('mychart Click', params, encodeURI(params.name), decodeURI('%E5%B1%B1%E4%B8%9C'), )
      self.chinaMapAjaxData(params.name)
      // var city = params.name;
      // loadChart(city);
    });
  }
  //点击地图切换数据
  chinaMapAjaxData = async (province) => {
    // try {
    if (province == '重庆') {
      console.log('重庆')
      TodayAllRobotsOutputs = 9000,
        TodayAllRobotsRunningRatio = 91.5,
        TodayAllPlantSafetyDays = 263,
        TodayAllRobotsPlanRate = 86.8, //计划完成率
        TodayAllQuanlityRate = 98.7, //质量合格率

        PlanRate3Years = [99.0, 99.9, 99.0, 0, 0, 0, 0, 0, 0, 0, 0],
        PlanRate3Mouths = [0, 0, 0, 0, 99.2, 99.3, 99.6, 0, 0, 0, 0],
        PlanRate3Weeks = [0, 0, 0, 0, 0, 0, 0, 0, 99.6, 99.7, 99.9],

        QuanlityRate3Years = [99.0, 99.9, 99.0, 0, 0, 0, 0, 0, 0, 0, 0],
        QuanlityRate3Mouths = [0, 0, 0, 0, 99.2, 99.3, 99.6, 0, 0, 0, 0],
        QuanlityRate3Weeks = [0, 0, 0, 0, 0, 0, 0, 0, 99.6, 99.7, 99.9],

        ComprehensiveEfficiency3Years = [99.0, 99.9, 99.0, 0, 0, 0, 0, 0, 0, 0, 0],
        ComprehensiveEfficiency3Mouths = [0, 0, 0, 0, 99.2, 99.3, 99.6, 0, 0, 0, 0],
        ComprehensiveEfficiency3Weeks = [0, 0, 0, 0, 0, 0, 0, 0, 99.6, 99.7, 99.9]
    } else if (province == '广州') {
      console.log('广州')
      TodayAllRobotsOutputs = 10000,
        TodayAllRobotsRunningRatio = 90.5,
        TodayAllPlantSafetyDays = 263,
        TodayAllRobotsPlanRate = 96.8, //计划完成率
        TodayAllQuanlityRate = 99.7, //质量合格率

        PlanRate3Years = [89.0, 91.9, 98.0, 0, 0, 0, 0, 0, 0, 0, 0],
        PlanRate3Mouths = [0, 0, 0, 0, 92.2, 96.3, 99.6, 0, 0, 0, 0],
        PlanRate3Weeks = [0, 0, 0, 0, 0, 0, 0, 0, 99.6, 95.7, 90.9,],

        QuanlityRate3Years = [89.0, 91.9, 98.0, 0, 0, 0, 0, 0, 0, 0, 0],
        QuanlityRate3Mouths = [0, 0, 0, 0, 92.2, 96.3, 99.6, 0, 0, 0, 0],
        QuanlityRate3Weeks = [0, 0, 0, 0, 0, 0, 0, 0, 99.6, 95.7, 90.9,],

        ComprehensiveEfficiency3Years = [89.0, 91.9, 98.0, 0, 0, 0, 0, 0, 0, 0, 0],
        ComprehensiveEfficiency3Mouths = [0, 0, 0, 0, 92.2, 96.3, 99.6, 0, 0, 0, 0],
        ComprehensiveEfficiency3Weeks = [0, 0, 0, 0, 0, 0, 0, 0, 99.6, 95.7, 90.9]

    } else if (province == '上海') {
      console.log('上海')
      TodayAllRobotsOutputs = 19000,
        TodayAllRobotsRunningRatio = 96.5,
        TodayAllPlantSafetyDays = 263,
        TodayAllRobotsPlanRate = 90.8, //计划完成率
        TodayAllQuanlityRate = 98.9, //质量合格率

        PlanRate3Years = [79.0, 99.9, 99.0, 0, 0, 0, 0, 0, 0, 0, 0],
        PlanRate3Mouths = [0, 0, 0, 0, 99.2, 99.3, 99.6, 0, 0, 0, 0],
        PlanRate3Weeks = [0, 0, 0, 0, 0, 0, 0, 0, 99.6, 99.7, 99.9],

        QuanlityRate3Years = [89.0, 99.9, 99.0, 0, 0, 0, 0, 0, 0, 0, 0],
        QuanlityRate3Mouths = [0, 0, 0, 0, 99.2, 99.3, 99.6, 0, 0, 0, 0],
        QuanlityRate3Weeks = [0, 0, 0, 0, 0, 0, 0, 0, 99.6, 99.7, 99.9],

        ComprehensiveEfficiency3Years = [96.0, 99.9, 99.0, 0, 0, 0, 0, 0, 0, 0, 0],
        ComprehensiveEfficiency3Mouths = [0, 0, 0, 0, 99.2, 99.3, 99.6, 0, 0, 0, 0],
        ComprehensiveEfficiency3Weeks = [0, 0, 0, 0, 0, 0, 0, 0, 99.6, 99.7, 99.9]

    } else {
      console.log('其他省份')
      TodayAllRobotsOutputs = 12000,
        TodayAllRobotsRunningRatio = 95.5,
        TodayAllPlantSafetyDays = 263,
        TodayAllRobotsPlanRate = 97.1, //计划完成率
        TodayAllQuanlityRate = 99.9, //质量合格率 TodayAllPlantSafetyDays = 159

        PlanRate3Years = [85.0, 86.9, 84.0, 0, 0, 0, 0, 0, 0, 0, 0],
        PlanRate3Mouths = [0, 0, 0, 0, 88.2, 86.3, 78.6, 0, 0, 0, 0],
        PlanRate3Weeks = [0, 0, 0, 0, 0, 0, 0, 0, 67.6, 89.7, 91.9],

        QuanlityRate3Years = [85.0, 86.9, 84.0, 0, 0, 0, 0, 0, 0, 0, 0],
        QuanlityRate3Mouths = [0, 0, 0, 0, 88.2, 86.3, 78.6, 0, 0, 0, 0],
        QuanlityRate3Weeks = [0, 0, 0, 0, 0, 0, 0, 0, 67.6, 89.7, 91.9,],

        ComprehensiveEfficiency3Years = [85.0, 86.9, 84.0, 0, 0, 0, 0, 0, 0, 0, 0],
        ComprehensiveEfficiency3Mouths = [0, 0, 0, 0, 88.2, 86.3, 78.6, 0, 0, 0, 0],
        ComprehensiveEfficiency3Weeks = [0, 0, 0, 0, 0, 0, 0, 0, 67.6, 89.7, 91.9]

    }

    // 赋值后传给父组件  再由父组件传给其他子组件
    this.props.transferMsg('end', TodayAllRobotsOutputs, TodayAllRobotsRunningRatio, TodayAllPlantSafetyDays, TodayAllRobotsPlanRate, TodayAllQuanlityRate,
      PlanRate3Years, PlanRate3Mouths, PlanRate3Weeks, QuanlityRate3Years, QuanlityRate3Mouths, QuanlityRate3Weeks, ComprehensiveEfficiency3Years, ComprehensiveEfficiency3Mouths, ComprehensiveEfficiency3Weeks
    )

  }

  render() {

    return (
      // 1920*1080
      <div id="main" style={{ width: '100%', height: '1080px' }}>
      </div>
    );
  }
}

export default ChinaMap;

