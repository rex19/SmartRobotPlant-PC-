
import React from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';



// var data = [22, 358, 630, 722, 724, 708, 699, 697, 697, 698, 698, 698, 698, 698, 698, 698, 698, 538, 274, 345, 576, 694, 718, 710, 701, 698, 697, 698, 698, 698, 698, 0, 0, 0, 38, 167, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 200, 541, 700, 728, 714, 702, 697, 697, 697, 698, 698, 698, 698, 698, 698, 698, 698, 698, 698, 698, 698, 668, 441, 252, 189, 185, 190, 196, 200, 198, 181, 196, 209, 202, 196, 184, 191, 205, 209, 208, 208, 207, 210, 215, 231, 219, 185, 191, 195, 179, 150, 144, 136, 143, 159, 167, 159, 159, 167, 163, 169, 175, 187, 191, 194, 202, 195, 180, 169, 185, 190, 184, 174, 160, 160, 156, 145, 142, 151, 176, 194, 197, 191, 183, 178, 176, 165, 144, 137, 136, 136, 257, 541, 690, 651, 402, 235, 198, 237, 286, 306, 297, 283, 271, 258, 245, 238, 246, 253, 254, 251, 257, 269, 283, 311, 500, 657, 711, 713, 704, 699, 697, 562, 386, 280, 252, 254, 250, 238, 223, 216, 214, 212, 209, 204, 186, 172, 190, 216, 219, 208, 196, 189, 183, 178, 169, 196, 205, 190, 166, 153, 140, 125, 122, 125, 126, 135, 137, 140, 142, 150, 160, 174, 173, 164, 182, 187, 182, 183, 187, 190, 195, 197, 197, 196, 194, 192, 187, 183, 178, 171, 157, 154, 155, 143, 131, 130, 146, 156, 153, 161, 174, 176, 185, 194, 200, 208, 211, 214, 203, 217, 236, 255, 279, 300, 320, 326, 339, 362, 263, 212, 201, 196, 186, 170, 177, 175, 153, 124, 114, 116, 120, 125, 129, 125, 119, 133, 143, 166, 187, 188, 201, 222, 254, 272, 269, 256, 242, 241, 245, 261, 278, 277, 261, 245, 250, 280, 284, 275, 286, 295, 285, 228, 180, 158, 171, 177, 159, 154, 159, 161, 173, 182, 184, 186, 188, 179, 164, 145, 114, 103, 115, 131, 137, 150, 163, 184, 204, 214, 221, 219, 194, 180, 173, 171, 167, 165, 165, 159, 158, 156, 156, 145, 130, 129, 138, 146, 149, 155, 170, 174, 185, 192, 195, 198, 200, 201, 205, 217, 223, 195, 157, 142, 133, 128, 139, 153, 162, 176, 176, 172, 179, 170, 161, 169, 176, 188, 189, 192, 186, 178, 159, 144, 132, 119, 119, 126, 139, 149, 159, 165, 162, 366, 609, 647, 436, 264, 212, 238, 285, 0, 0, 0, 39, 168, 0, 0, 0];

// var data = [0, 1, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 548, 2122, 1252, 319, 0, 0, 0, 0, 7, 7, 310, 562, 844, 858, 1264, 1683, 1748, 1256, 692, 583, 577, 704, 668, 788, 768, 937, 1082, 1128, 1247, 1181, 1044, 927, 877, 892, 846, 846, 959, 913, 902, 1053, 1191, 1150, 985, 946, 936, 802, 728, 744, 772, 837, 923, 919, 952, 1050, 1194, 1241, 1090, 962, 928, 841, 808, 792, 799, 847, 842, 985, 1074, 1078, 1065, 1087, 1009, 990, 966, 867, 754, 721, 903, 1053, 1022, 995, 961, 884, 839, 943, 1041, 1121, 1031, 924, 866, 836, 912, 944, 991, 1057, 1008, 960, 1034, 983, 980, 1010, 949, 987, 942, 972, 1059, 1023, 894, 858, 941, 943, 1072, 1058, 933, 885, 870, 926, 911, 974, 974, 996, 1020, 982, 952, 937, 919, 875, 832, 906, 951, 952, 982, 954, 974, 1027, 1038, 1020, 1037, 896, 819, 817, 863, 945, 977, 906, 856, 869, 981, 1124, 1148, 1032, 869, 808, 793, 778, 843, 929, 929, 916, 927, 922, 948, 1005, 1015, 983, 925, 877, 860, 906, 957, 960, 1117, 1136, 1089, 999, 921, 810, 723, 852, 894, 916, 978, 957, 1025, 1064, 1013, 957, 1009, 953, 878, 857, 839, 807, 789, 880, 985, 1046, 1034, 1003, 986, 939, 956, 1036, 1083, 1127, 1170, 1096, 900, 806, 799, 742, 825, 895, 912, 890, 871, 895, 931, 1047, 1120, 1108, 1059, 1004, 916, 895, 893, 856, 888, 907, 926, 986, 1025, 981, 978, 929, 910, 951, 982, 1054, 1089, 1088, 0, 0, 0, 0, 1, 0, 0, 0,]
// var data = [

//     {
//         x: [0, 1, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
//     },
//     {
//         y: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6]
//     },

// ]

let data = {
    "x": "AR25910_7",
    "y": [0, 1, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    "QualityGrade": -1,
    "a": 4,
    "b": 3,
    "b": 2,
}




class VoltageLineChart extends React.Component {
    render() {
        console.log('VoltageLineChart', this.props.CellhandleSearchRes)


        const option = {
            title: {
                text: '电压'
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
                    show: false,
                    data: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Voltage_TimePoint || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    // data: data.y || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ],
            yAxis: [{
                type: 'value',
                // name: 'anpei',
                // min: 0,
                // max: 25,
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
                // min: 0,
                // max: 30000,
                axisLabel: {
                    formatter: '{value} V'
                }
            }, {
                type: 'value',
                show: false,
                position: 'right',
                name: '伏特',
                axisLabel: {
                    formatter: '{value} V'
                }
            }],
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
                    // lte: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_MaxLine,
                    color: '#cc0033'
                }],
                // pieces: [{
                //     gt: 0,
                //     lte:  data.a || 0,
                //     color: '#ffde33'
                // }, {
                //     gt:  data.a || 0,
                //     lte:  data.b || 0,
                //     color: '#096'
                // }, {
                //     gt: data.b || 0,
                //     lte:  data.c || 0,
                //     color: '#096'
                // }, {
                //     gt: data.c || 0,
                //     color: '#cc0033'
                // }],
                outOfRange: {
                    color: '#999'
                }
            },
            dataZoom: [{
                type: 'slider',
                start: 0,
                end: 100
            }],
            series: [

                {
                    name: '电压',
                    type: 'line',
                    yAxisIndex: 1,
                    // data: data.y || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    data: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Data_Voltage || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    // data: data,
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值', symbol: 'diamond' },
                            { type: 'min', name: '最小值', symbol: 'arrow' }
                        ]
                    },
                    markLine: {
                        silent: true,
                        // data: [{
                        //     yAxis: data.a || 0
                        // }, {
                        //     yAxis: data.b || 0,
                        // }, {
                        //     yAxis: data.c || 0,
                        // }
                        // ]
                        data: [{
                            yAxis: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_LSL || 0
                        }, {
                            yAxis: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_AVGLine || 0,
                        }, {
                            yAxis: this.props.CellhandleSearchRes.OnePassMeasurementRecord.Standard_Voltage_USL || 0,
                        }]
                    }
                }]
        };
        return (
            <ReactEcharts
                option={option}
                style={{ height: '450px', width: '100%' }}
                className={'react_for_echarts'}
                data={data}
            />
        )
    }
}

export default VoltageLineChart;



// export default VoltageLineChart;

