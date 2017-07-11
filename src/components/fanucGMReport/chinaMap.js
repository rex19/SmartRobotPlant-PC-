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
    // componentWillMount() {
    //     setTimeout(() => {
    //         this.props.transferMsg('end')
    //     }, 1000);
    // }

    componentDidMount() {
        //能用得到的代码尸体
        var data = [
            { name: "上海", value: 29780 },
            // { name: "珠海", value: 2186 },
            // { name: "三亚", value: 1135 },
            // { name: "惠州", value: 1973 },
            // { name: "海口", value: 2568 },
            // { name: "合肥", value: 4039 },
            // { name: "南京", value: 6959 },
            // { name: "杭州", value: 5632 },
            // { name: "苏州", value: 6707 },
            // { name: "无锡", value: 3393 },
            // { name: "昆山", value: 1894 },
            { name: "广州", value: 15769 },
            // { name: "深圳", value: 8259 },
            // { name: "佛山", value: 5741 },
            // { name: "东莞", value: 3030 },
            // { name: "福州", value: 4542 },
            // { name: "厦门", value: 3329 },
            // { name: "南宁", value: 3157 },
            // { name: "郑州", value: 6690 },
            // { name: "武汉", value: 8678 },
            // { name: "长沙", value: 5303 },
            // { name: "南昌", value: 3025 },
            // { name: "北京", value: 20259 },
            // { name: "长春", value: 3016 },
            // { name: "大连", value: 3202 },
            // { name: "沈阳", value: 4540 },
            // { name: "哈尔滨", value: 3141 },
            // { name: "天津", value: 8626 },
            // { name: "济南", value: 4361 },
            // { name: "青岛", value: 6667 },
            // { name: "太原", value: 4080 },
            // { name: "石家庄", value: 6137 },
            // { name: "西安", value: 6991 },
            // { name: "成都", value: 13873 },
            { name: "重庆", value: 13283 },
            // { name: "昆明", value: 4633 },


        ];

        var geoCoordMap = {
            "上海": [121.48, 31.22],
            // "珠海": [113.52, 22.3],
            // "三亚": [109.31, 18.14],
            // "惠州": [114.4, 23.09],
            // "海口": [110.35, 20.02],
            // "合肥": [117.27, 31.86],
            // "南京": [118.78, 32.04],
            // "杭州": [120.19, 30.26],
            // "苏州": [120.62, 31.32],
            // "无锡": [120.29, 31.59],
            // "昆山": [120.95, 31.39],
            "广州": [113.23, 23.16],
            // "深圳": [114.07, 22.62],
            // "佛山": [113.11, 23.05],
            // "东莞": [113.75, 23.04],
            // "福州": [119.3, 26.08],
            // "厦门": [118.1, 24.46],
            // "南宁": [108.33, 22.84],
            // "郑州": [113.65, 34.76],
            // "武汉": [114.31, 30.52],
            // "长沙": [113, 28.21],
            // "南昌": [115.89, 28.68],
            // "北京": [116.46, 39.92],
            // "长春": [125.35, 43.88],
            // "大连": [121.62, 38.92],
            // "沈阳": [123.38, 41.8],
            // "哈尔滨": [126.63, 45.75],
            // "天津": [117.2, 39.13],
            // "济南": [117, 36.65],
            // "青岛": [120.33, 36.07],
            // "太原": [112.53, 37.87],
            // "石家庄": [114.48, 38.03],
            // "西安": [108.95, 34.27],
            // "成都": [104.06, 30.67],
            "重庆": [106.54, 29.59],
            // "昆明": [102.73, 25.04],
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
            backgroundColor: '#404a59',
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
            }, {
                id: 'statistic',
                text: '区    域',
                // left: 'right',
                right: '47%',
                top: '10%',
                // width: 100,
                textStyle: {
                    color: '#fff',
                    fontWeight: 'bolder',
                    fontSize: 30
                }
            }],
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
                        areaColor: '#323c48',
                        borderColor: '#111'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            tooltip: {
                trigger: 'item'
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
                TodayAllRobotsRunningRatio = 85.5,
                TodayAllPlantSafetyDays = 108


            TodayAllRobotsStateDistribution = {
                "Date": "2017-05-19T18:03:05.6015113+08:00",
                "RunningtRatio": 65.5,
                "PowerOffRatio": 10,
                "FaultRatio": 17.5,
                "ReadyRatio": 7
            },
                TodayAllRobotsAlarmsDistribution = [
                    { value: 10.5, name: 'ACode1' },
                    { value: 30, name: 'ACode2' },
                    { value: 50, name: 'ACode3' },
                    { value: 9.5, name: 'ACode4' },
                ],
                TodayAllRobotsOutputsByPart = [
                    { value: 0.5, name: 'PN1' },
                    { value: 25, name: 'PN2' },
                    { value: 35, name: 'PN3' },
                    { value: 39.5, name: 'PN4' },

                ],
                TodayAllRobotsRunningRatioPieChart = {
                    "Date": "2017-05-19T00:00:00+08:00",
                    "RunningRatio": 55.5,
                    "StopRatio": 40.1
                },

                TodayAllRobotsOutputPerHour = [53.0, 57.9, 0, 59.0, 55.2, 57.5, 0, 56.6, 52.7, 55.6, 52.2, 52.6, 57.7, 55.6, 55.2, 55.6, 56.7, 55.6, 52.2],
                TodayAllRobotsxSevenDaysAllRobotsOutputs = [70.0, 77.9, 0, 79.0, 75.2, 77.5, 0, 76.6, 72.7, 75.6, 72.2, 72.6, 77.7, 75.6, 75.2, 75.6, 86.7, 95.6, 92.2],
                TodayTodayAllRobotsStopInMinutesPerHour = [80.0, 77.9, 0, 69.0, 65.2, 67.5, 0, 66.6, 62.7, 65.6, 62.2, 92.6, 97.7, 95.6, 95.2, 95.6, 86.7, 95.6, 92.2],

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
                TodayAllPlantSafetyDays = 108


            TodayAllRobotsStateDistribution = {
                "Date": "2017-05-19T18:03:05.6015113+08:00",
                "RunningtRatio": 65.5,
                "PowerOffRatio": 10,
                "FaultRatio": 17.5,
                "ReadyRatio": 7
            },
                TodayAllRobotsAlarmsDistribution = [
                    { value: 10.5, name: 'ACode1' },
                    { value: 30, name: 'ACode2' },
                    { value: 50, name: 'ACode3' },
                    { value: 9.5, name: 'ACode4' },
                ],
                TodayAllRobotsOutputsByPart = [
                    { value: 0.5, name: 'PN1' },
                    { value: 25, name: 'PN2' },
                    { value: 35, name: 'PN3' },
                    { value: 39.5, name: 'PN4' },

                ],
                TodayAllRobotsRunningRatioPieChart = {
                    "Date": "2017-05-19T00:00:00+08:00",
                    "RunningRatio": 55.5,
                    "StopRatio": 40.1
                },

                TodayAllRobotsOutputPerHour = [53.0, 57.9, 0, 59.0, 55.2, 57.5, 0, 56.6, 52.7, 55.6, 52.2, 52.6, 57.7, 55.6, 55.2, 55.6, 56.7, 55.6, 52.2],
                TodayAllRobotsxSevenDaysAllRobotsOutputs = [70.0, 77.9, 0, 79.0, 75.2, 77.5, 0, 76.6, 72.7, 75.6, 72.2, 72.6, 77.7, 75.6, 75.2, 75.6, 86.7, 95.6, 92.2],
                TodayTodayAllRobotsStopInMinutesPerHour = [80.0, 77.9, 0, 69.0, 65.2, 67.5, 0, 66.6, 62.7, 65.6, 62.2, 92.6, 97.7, 95.6, 95.2, 95.6, 86.7, 95.6, 92.2],

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
                TodayAllRobotsRunningRatio = 76.5,
                TodayAllPlantSafetyDays = 108


            TodayAllRobotsStateDistribution = {
                "Date": "2017-05-19T18:03:05.6015113+08:00",
                "RunningtRatio": 65.5,
                "PowerOffRatio": 10,
                "FaultRatio": 17.5,
                "ReadyRatio": 7
            },
                TodayAllRobotsAlarmsDistribution = [
                    { value: 10.5, name: 'ACode1' },
                    { value: 30, name: 'ACode2' },
                    { value: 50, name: 'ACode3' },
                    { value: 9.5, name: 'ACode4' },
                ],
                TodayAllRobotsOutputsByPart = [
                    { value: 0.5, name: 'PN1' },
                    { value: 25, name: 'PN2' },
                    { value: 35, name: 'PN3' },
                    { value: 39.5, name: 'PN4' },

                ],
                TodayAllRobotsRunningRatioPieChart = {
                    "Date": "2017-05-19T00:00:00+08:00",
                    "RunningRatio": 55.5,
                    "StopRatio": 40.1
                },

                TodayAllRobotsOutputPerHour = [53.0, 57.9, 0, 59.0, 55.2, 57.5, 0, 56.6, 52.7, 55.6, 52.2, 52.6, 57.7, 55.6, 55.2, 55.6, 56.7, 55.6, 52.2],
                TodayAllRobotsxSevenDaysAllRobotsOutputs = [70.0, 77.9, 0, 79.0, 75.2, 77.5, 0, 76.6, 72.7, 75.6, 72.2, 72.6, 77.7, 75.6, 75.2, 75.6, 86.7, 95.6, 92.2],
                TodayTodayAllRobotsStopInMinutesPerHour = [80.0, 77.9, 0, 69.0, 65.2, 67.5, 0, 66.6, 62.7, 65.6, 62.2, 92.6, 97.7, 95.6, 95.2, 95.6, 86.7, 95.6, 92.2],

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
            TodayAllRobotsOutputs = 1200,
                TodayAllRobotsRunningRatio = 55.5,
                TodayAllPlantSafetyDays = 159
            TodayAllRobotsStateDistribution = {
                "Date": "2017-05-19T18:03:05.6015113+08:00",
                "RunningtRatio": 15.5,
                "PowerOffRatio": 10,
                "FaultRatio": 47.5,
                "ReadyRatio": 17
            },
                TodayAllRobotsAlarmsDistribution = [
                    { value: 10, name: 'ACode1' },
                    { value: 1.5, name: 'ACode2' },
                    { value: 0.5, name: 'ACode3' },
                    { value: 79, name: 'ACode4' },
                ],
                TodayAllRobotsOutputsByPart = [
                    { value: 50, name: 'ACode1' },
                    { value: 30.5, name: 'ACode2' },
                    { value: 0.5, name: 'ACode3' },
                    { value: 19, name: 'ACode4' },

                ],
                TodayAllRobotsRunningRatioPieChart = {
                    "Date": "2017-05-19T00:00:00+08:00",
                    "RunningRatio": 95.5,
                    "StopRatio": 4.5
                },
                TodayAllRobotsOutputPerHour = [97.0, 97.9, 0, 99.0, 95.2, 97.5, 0, 96.6, 92.7, 95.6, 92.2, 96.6, 90.7, 99.6, 95.2, 95.6, 86.7, 95.6, 92.2],
                TodayAllRobotsxSevenDaysAllRobotsOutputs = [90.0, 97.9, 0, 99.0, 95.2, 97.5, 0, 96.6, 92.7, 96.6, 90.7, 99.6, 97.7, 95.6, 95.2, 95.6, 86.7, 95.6, 92.2],
                TodayTodayAllRobotsStopInMinutesPerHour = [90.0, 97.9, 0, 99.0, 95.2, 97.5, 0, 96.6, 92.7, 95.6, 92.2, 92.6, 97.7, 95.6, 95.2, 95.6, 96.6, 90.7, 99.6],

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
        this.props.transferMsg('end', TodayAllRobotsOutputs, TodayAllRobotsRunningRatio, TodayAllPlantSafetyDays,
            TodayAllRobotsStateDistribution, TodayAllRobotsAlarmsDistribution, TodayAllRobotsOutputsByPart, TodayAllRobotsRunningRatioPieChart,
            TodayAllRobotsOutputPerHour, TodayAllRobotsxSevenDaysAllRobotsOutputs, TodayTodayAllRobotsStopInMinutesPerHour, PlanRate3Years, PlanRate3Mouths, PlanRate3Weeks, QuanlityRate3Years, QuanlityRate3Mouths, QuanlityRate3Weeks, ComprehensiveEfficiency3Years, ComprehensiveEfficiency3Mouths, ComprehensiveEfficiency3Weeks
        )

    }


    render() {

        return (
            // 1920*1080
            <div id="main" style={{ width: '100%', height: '1080%' }}>
            </div>
        );
    }
}

export default ChinaMap;

