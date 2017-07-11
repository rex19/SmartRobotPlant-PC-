import React from 'react';
import './index.css';

import { Dropdown, Button, Modal, Grid, Label, Form, Table, Input, Rating, Icon, Menu, Segment, Card } from 'semantic-ui-react'
import { Affix, Badge, Carousel } from 'antd';

import CRUD from '../../unit/ajax.js';

import RobotRunningStatePieChart from '../chart/robotRunningStatePieChart.js'
import RobotUtilizationPieChart from '../chart/robotUtilizationPieChart.js'
import RobotAlarmPieChart from '../chart/robotAlarmPieChart.js'
import RobotProductionPieChart from '../chart/robotProductionPieChart.js'

import RobotDayDowntimeBarChart from '../chart/robotDayDowntimeBarChart.js'
import RobotDayOutputBarChart from '../chart/robotDayOutputBarChart.js'
import RobotWeekOutputBarChart from '../chart/robotWeekOutputBarChart.js'

import VoltageLineChart from '../chart/voltageLineChart.js';
// import VoltageLineChart from '../chart/VoltageLineChartTest.js';
import CurrentLineChart from '../chart/currentLineChart.js';

import fanucLogo from '../../img/fanucLogo1.png'
const crud = new CRUD();

let ZDTsrc = 'http://www.baidu.com'

let cell1Options = [{ key: '1', text: 'ZDT', value: 'cell11' }, { key: '2', text: '工作站状态', value: 'cell12' }]
let cell2Options = [{ key: '1', text: 'ZDT', value: 'cell21' }, { key: '2', text: '工作站状态', value: 'cell22' }]
let cell3Options = [{ key: '1', text: 'ZDT', value: 'cell31' }, { key: '2', text: '工作站状态', value: 'cell32' }]
let cell4Options = [{ key: '1', text: 'ZDT', value: 'cell41' }, { key: '2', text: '工作站状态', value: 'cell42' }]
let cell5Options = [{ key: '1', text: 'ZDT', value: 'cell51' }, { key: '2', text: '工作站状态', value: 'cell52' }]
let cell6Options = [{ key: '1', text: 'ZDT', value: 'cell61' }, { key: '2', text: '工作站状态', value: 'cell62' }]
let cell7Options = [{ key: '1', text: 'ZDT', value: 'cell71' }, { key: '2', text: '工作站状态', value: 'cell72' }]

let timer2 = {} //CellstateModal定时任务  10s
let timer3 = {} //AlarmRecordTable定时任务 10s
let timer4 = {} //AjaxCellSerialNoModal序列号查询定时任务 5s 10s 15s
let timer5 = {}

// let Part_SerialOptions = [];
let Part_NumberOptionsArray = [];
let CellPass_NosOptionsArray = []
let CellPart_NumberOptionsArray = []
let CellSerialNumbersOptionsArray = []

//工作站
let CellNo = 1
//实时焊接数据定时任务默认刷新频率 初始值10s
let SetIntervalTime = 15000
let SetIntervalTimeOption = [{ key: '1', text: '5s', value: '5000' }, { key: '2', text: '10s', value: '10000' }, { key: '3', text: '15s', value: '15000' }]

//判断新工件生产 声明旧工件变量
let OldCellPart_Serial = [<div><Segment inverted color='green' secondary >无</Segment></div>]
let NewCellPart_Serial = [<div><Segment inverted color='green' secondary >无</Segment></div>]
//焊缝Table
let PassNoTable = []
class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open1: false, open2: false, open3: false, open4: false, open5: false,//open5是第二个ZDT模态框
            openD: false,
            // //CellState  Cell产量，状态等
            // CurrentInfo: { data: [] },
            // CellNo: 1,
            //单个Cell的产量
            CellOutput: 0,
            //所有Cell的当前状态
            // CellState:[1,1,1,1,1,1,1,1],
            //报警记录 Table
            dataTable: [],
            TodayRobotCurrentAlarm: {},
            //饼图
            TodayRobotStateDistribution: {},
            TodayRobotRunningRatio: [{ 'Ratio': '0', 'AlarmCode': '0' }, { 'Ratio': '0', 'AlarmCode': '0' }, { 'Ratio': '0', 'AlarmCode': '0' }, { 'Ratio': '0', 'AlarmCode': '0' }],
            // TodayRobotAlarmsDistribution: [{ 'Hour': '0', 'PartNumber': '0', 'Ratio': '0' }, { 'Hour': '0', 'PartNumber': '0', 'Ratio': '0' }, { 'Hour': '0', 'PartNumber': '0', 'Ratio': '0' }, { 'Hour': '0', 'PartNumber': '0', 'Ratio': '0' }],
            TodayRobotAlarmsDistribution: [{ value: 0, name: '0' }],
            // TodayRobotOutputsByPart: [{ "Ratio": 0, "PartNumber": 'name1', 'Quantity': 0 }, { "Ratio": 0, "PartNumber": 'name2', 'Quantity': 0 }, { "Ratio": 0, "PartNumber": 'name3', 'Quantity': 0 }, { "Ratio": 0, "PartNumber": 'name4', 'Quantity': 0 }],
            TodayRobotOutputsByPart: [{ value: 0, name: 'PartNumber' }],
            //柱形图this.setState({ handleSearchRes: x, handleSearchResFirst: y, Part_Number: z, Part_NumberOptions: Part_NumberOptionsArray });
            TodayRobotOutputPerHour: [],
            SevenDaysRobotOutputs: [],
            TodayRobotStopInMinutesPerHour: [],
            handleSearchRes: [], //OnePassMeasurementRecord
            // handleSearchRes: {
            //     "Part_Serial": "AR12580_1",
            //     "QualityGrade": 0, //评分
            //     "Standard_Data_Voltage": [
            //         0,
            //         0,
            //         0,
            //         0,
            //         0
            //     ],
            //     "Standard_Data_Current": [
            //         0,
            //         0,
            //         0,
            //         0,
            //         0,
            //     ],
            //     "Pass_Nos": [
            //         1
            //     ],
            //     "Passes_QualityGrade": [
            //         {
            //             "Pass_No": 1,
            //             "QualityGrade": 1
            //         },
            //     ],
            //     "OnePassMeasurementRecord": {
            //         "Part_Serial": "AR12580_1",
            //         "Part_Number": "TESTTESTTEST",
            //         "Pass_No": 1,
            //         "Para_Value1": 100,
            //         "Para_Value2": 16,
            //         "Para_Value3": 7,
            //         "Weave_Value1": 2,
            //         "Weave_Value2": 1,
            //         "Weave_Value3": 0,
            //         "Weave_Value4": 0,
            //         "Data_Voltage": [
            //             0,
            //             0,
            //             0,
            //             0,
            //             0,
            //         ],
            //         "Data_Current": [
            //             0,
            //             0,
            //             0,
            //             0,
            //             0,

            //         ],
            //         "Start_Time": "2017-05-12T00:00:00",
            //         "End_Time": "2017-05-12T00:00:00",
            //         "Insert_Time": "2017-05-12T00:00:00",
            //         "Standard_Current_MaxLine": 0,
            //         "Standard_Current_USL": 0,
            //         "Standard_Current_AVGLine": 0,
            //         "Standard_Current_LSL": 0,
            //         "Standard_Voltage_MaxLine": 0,
            //         "Standard_Voltage_USL": 0,
            //         "Standard_Voltage_AVGLine": 0,
            //         "Standard_Voltage_LSL": 0
            //     },
            //     'Voltage_TimePoint': [],
            //     'Current_TimePoint': []
            // },
            handleSearchResFirst: [],
            Part_Number: 1,
            Part_NumberOptions: [0],//焊缝号下拉菜单数组初始化
            Part_SerialOptions: [0],

            PartSerialValue: '',
            PartNumberValue: '',

            //质量状态
            Grade: '',
            GradeColor: '#21BA45',

            //停止刷新按钮
            ButtonColor: '#EB3F2F',
            ButtonValue: '停止实时刷新',
            ButtonIcon: 'pause',
            //新工件
            // NewCellPart_Serial:[<div><Segment inverted color='green' secondary >旧工件</Segment></div>],
            PassNoTable: [<Table.Row>
                <Table.Cell>暂无数据</Table.Cell>
                <Table.Cell>暂无数据</Table.Cell>
            </Table.Row>]

        }
    }
    //  show4 = (size) => () => {
    //         this.setState({ size, open4: true })
    //         let CRUDAjax =  crud.fanucKanbanAjaxSelectRobotIDPartSerial(CellNo);
    //         if (CRUDAjax.data.Part_Serial === "" && CRUDAjax.data.Part_Serial === undefined) {
    //             alert('此工站目前无加工数据')

    //         } else {
    //             this.AjaxCellSerialNoModal(CellNo)
    //             clearInterval(timer5)
    //             timer4 = setInterval(() => this.AjaxCellSerialNoModal(CellNo), SetIntervalTime);
    //         }
    //     }


    //报警信息Modal 打开
    show3 = (size) => () => {
        this.setState({ size, open3: true })
        this.AjaxCellAlermRecordModal(CellNo)
        timer3 = setInterval(() => this.AjaxCellAlermRecordModal(CellNo), 10000);
    }
    //RobotID序列号查询 打开

    // test = async () => {
    //     console.log('test')
    // let CRUDAjax = crud.fanucKanbanAjaxSelectRobotIDPartSerial(CellNo);
    // if (CRUDAjax.data.Part_Serial === "" && CRUDAjax.data.Part_Serial === undefined) {
    //     alert('此工站目前无加工数据')
    // } else {
    //     this.show4('fullscreen')
    // }
    // }
    //实时焊接模态框
    show4 = (size) => () => {
        this.setState({ size, open4: true })
        this.AjaxCellSerialNoModal(CellNo)
        clearInterval(timer5)
        this.props.CloseInterval() //clear timer1
        clearInterval(timer2)    //clear timer2
        timer4 = setInterval(() => this.AjaxCellSerialNoModal(CellNo), SetIntervalTime);
        this.setState({ ButtonColor: '#EB3F2F', ButtonValue: '停止实时刷新', ButtonIcon: 'pause' })
    }
    //提示无数据关掉焊接模态框
    show5 = (size) => {
        console.log('show5')
        this.setState({ size, openD: true })
    }

    close1 = () => { this.setState({ open1: false }), console.log('close1') }
    close2 = () => { this.setState({ open2: false }), clearInterval(timer2); }
    close3 = () => { this.setState({ open3: false }), clearInterval(timer3); }
    close4 = () => {
        this.setState({ open4: false }), console.log('close4'),
            clearInterval(timer4); clearInterval(timer5);
        this.props.OpenInterval();
        timer2 = setInterval(() => this.AjaxCellStateModal(CellNo), 10000)
    }
    close5 = () => { this.setState({ open5: false }), console.log('close5') }
    closeD = () => { this.setState({ openD: false }), this.close4(), console.log('closeD') }

    //Cell下拉菜单触发对应模态框
    handleClick = async (e, obj) => {
        try {
            let DropdownValue = obj.value;
            let size = 'fullscreen'
            switch (DropdownValue) {
                case 'cell11':  //激光跟踪焊接单元
                    ZDTsrc = 'http://172.16.29.15/ZDTWebPortal/RobotControllerDetails?controllerID=c962b37a-1ac0-eb2a-f1c7-8c6eb53a74b6&clusterName=LaserTracking&tabIndex=0&language=Chinese&ipAddress=192.168.2.2'
                    CellNo = 16
                    await this.setState({ size, open1: true });
                    break;
                case 'cell12':
                    CellNo = 16
                    await this.setState({ size, open2: true });
                    this.AjaxCellStateModal(CellNo)
                    timer2 = setInterval(() => this.AjaxCellStateModal(CellNo), 10000);
                    break;
                case 'cell21': //碳钢焊接单元
                    ZDTsrc = 'http://172.16.29.15/ZDTWebPortal/RobotControllerDetails?controllerID=c962b37a-1ac0-eb2a-f1c7-8c6eb5336a1e&clusterName=Smart%20ARC&tabIndex=0&language=Chinese&ipAddress=172.16.29.165'
                    CellNo = 15
                    await this.setState({ size, open1: true });
                    break;
                case 'cell22':
                    CellNo = 15
                    await this.setState({ size, open2: true });
                    this.AjaxCellStateModal(CellNo)
                    timer2 = setInterval(() => this.AjaxCellStateModal(CellNo), 10000);
                    break;
                case 'cell31': //镀锌板焊接单元
                    ZDTsrc = 'http://172.16.29.15/ZDTWebPortal/RobotControllerDetails?controllerID=c962b37a-1ac0-eb2a-f1c7-8c6eb53adeec&clusterName=Galvanized%20Plate%20Welding&tabIndex=0&language=Chinese&ipAddress=172.16.29.162'
                    CellNo = 12
                    await this.setState({ size, open1: true });
                    break;
                case 'cell32':
                    CellNo = 12
                    await this.setState({ size, open2: true });
                    this.AjaxCellStateModal(CellNo)
                    timer2 = setInterval(() => this.AjaxCellStateModal(CellNo), 10000);
                    break;
                case 'cell41': //不锈钢焊接单元
                    ZDTsrc = 'http://172.16.29.15/ZDTWebPortal/RobotControllerDetails?controllerID=c962b37a-1ac0-eb2a-f1c7-8c6eb53adefc&clusterName=Stainless%20Steel%20Welding&tabIndex=0&language=Chinese&ipAddress=172.16.29.163'
                    CellNo = 13
                    await this.setState({ size, open1: true });
                    break;
                case 'cell42':
                    CellNo = 13
                    await this.setState({ size, open2: true });
                    this.AjaxCellStateModal(CellNo)
                    timer2 = setInterval(() => this.AjaxCellStateModal(CellNo), 10000);
                    break;
                case 'cell51': //铝合金焊接单元
                    ZDTsrc = 'http://172.16.29.15/ZDTWebPortal/RobotControllerDetails?controllerID=c962b37a-1ac0-eb2a-f1c7-8c6eb53adefa&clusterName=Aluminium%20alloy%20Welding&tabIndex=0&language=Chinese&ipAddress=172.16.29.164'
                    CellNo = 14
                    await this.setState({ size, open1: true });
                    break;
                case 'cell52':
                    CellNo = 14
                    await this.setState({ size, open2: true });
                    this.AjaxCellStateModal(CellNo)
                    timer2 = setInterval(() => this.AjaxCellStateModal(CellNo), 10000);
                    break;
                case 'cell61': //智能焊接铣削打焊接单元
                    ZDTsrc = 'http://172.16.29.15/ZDTWebPortal/RobotControllerDetails?controllerID=c962b37a-1ac0-eb2a-f1c7-8c6eb53bc1c6&clusterName=Automobile%20Seat%20Welding&tabIndex=0&language=Chinese&ipAddress=172.16.29.161'
                    CellNo = 17
                    await this.setState({ size, open1: true });
                    break;
                case 'cell62':
                    CellNo = 17
                    await this.setState({ size, open2: true });
                    this.AjaxCellStateModal(CellNo);
                    timer2 = setInterval(() => this.AjaxCellStateModal(CellNo), 10000);
                    break;
                case 'cell71': //汽车座椅焊接单元
                    ZDTsrc = 'http://172.16.29.15/ZDTWebPortal/RobotControllerDetails?controllerID=c962b37a-1ac0-eb2a-f1c7-8c6eb53bc1c6&clusterName=Automobile%20Seat%20Welding&tabIndex=0&language=Chinese&ipAddress=172.16.29.161'
                    CellNo = 11
                    await this.setState({ size, open1: true });
                    break;
                case 'cell72':
                    CellNo = 11
                    await this.setState({ size, open2: true });
                    this.AjaxCellStateModal(CellNo);
                    timer2 = setInterval(() => this.AjaxCellStateModal(CellNo), 10000);
                    break;
                default:
                    console.log('非正常值'); break;
            }
        } catch (error) {
            console.log('Cell.js/handleClick/Error:', error)
        }

    }
    //Cell 报警信息TABLE 查询AJAX
    AjaxCellAlermRecordModal = async (cell) => {
        console.log('time3,1s')
        try {
            let AjaxTodayRobotCurrentAlarmResponse = await crud.fanucKanbanAjaxTodayRobotCurrentAlarm(cell);
            let AlarmTableArray = AjaxTodayRobotCurrentAlarmResponse.data.AlarmRecords

            let dataTable = []
            for (var i = 0; i < AlarmTableArray.length; i++) {
                dataTable.push(
                    <Table.Row>
                        <Table.Cell>{AlarmTableArray[i].ID}</Table.Cell>
                        <Table.Cell>{AlarmTableArray[i].Robot_YH_No}</Table.Cell>
                        <Table.Cell>{AlarmTableArray[i].Alarm_Code}</Table.Cell>
                        <Table.Cell>{AlarmTableArray[i].Alarm_Message}</Table.Cell>
                        <Table.Cell>{AlarmTableArray[i].Alarm_Severity}</Table.Cell>
                        <Table.Cell>{AlarmTableArray[i].Alarm_Cause}</Table.Cell>
                        <Table.Cell>{AlarmTableArray[i].Time}</Table.Cell>
                    </Table.Row>)
            }
            this.setState({ dataTable: dataTable })
        } catch (error) {
            console.log('Cell.js/AjaxCellAlermRecordModal/Ajax:', error)
        }
    }

    //CellState Modal (饼图/柱形图) AJAX数据
    AjaxCellStateModal = async (cell) => {
        console.log('time2,10s')
        try {
            //Cell 产量
            let AjaxTodayRobotOutputsResponse = await crud.fanucKanbanAjaxTodayRobotOutputs(cell);
            //所有Cell的
            //饼图
            let AjaxTodayRobotStateDistributionResponse = await crud.fanucKanbanAjaxTodayRobotStateDistribution(cell);
            // console.log('let AjaxTodayRobotStateDistributionResponse = await crud.fanucKanbanAjaxTodayRobotStateDistribution(cell);',AjaxTodayRobotStateDistributionResponse)
            let AjaxTodayRobotRunningRatioResponse = await crud.fanucKanbanAjaxTodayRobotRunningRatio(cell);
            let AjaxTodayRobotAlarmsDistributionResponse = await crud.fanucKanbanAjaxTodayRobotAlarmsDistribution(cell);
            let AjaxTodayRobotOutputsByPartResponse = await crud.fanucKanbanAjaxTodayRobotOutputsByPart(cell);

            //柱形图
            let AjaxTodayRobotOutputPerHourResponse = await crud.fanucKanbanAjaxTodayRobotOutputPerHour(cell);
            let AjaxSevenDaysRobotOutputsResponse = await crud.fanucKanbanAjaxSevenDaysRobotOutputs(cell);
            let AjaxTodayRobotStopInMinutesPerHourResponse = await crud.fanucKanbanAjaxTodayRobotStopInMinutesPerHour(cell);

            //故障饼图的不确定数量处理
            let TodayRobotAlarmsDistributionArray = AjaxTodayRobotAlarmsDistributionResponse.data.SlicesInfo
            let arr4 = TodayRobotAlarmsDistributionArray.map(function (item, index, input) {
                return { value: item.Ratio, name: item.AlarmSeverity }
            })
            //产品类型饼图的不确定数量处理
            let TodayRobotOutputsByPartArray = AjaxTodayRobotOutputsByPartResponse.data.SlicesInfo
            let arr5 = TodayRobotOutputsByPartArray.map(function (item, index, input) {
                return { value: item.Ratio, name: item.PartNumber }
            })
            this.setState({
                CellOutput: AjaxTodayRobotOutputsResponse.data.OutputsQuantity,

                TodayRobotStateDistribution: AjaxTodayRobotStateDistributionResponse.data,
                TodayRobotRunningRatio: AjaxTodayRobotRunningRatioResponse.data,
                TodayRobotAlarmsDistribution: arr4,
                TodayRobotOutputsByPart: arr5,

                TodayRobotOutputPerHour: AjaxTodayRobotOutputPerHourResponse.data.SlicesInfo,
                SevenDaysRobotOutputs: AjaxSevenDaysRobotOutputsResponse.data,
                TodayRobotStopInMinutesPerHour: AjaxTodayRobotStopInMinutesPerHourResponse.data.BarsInfo
            })
        } catch (error) {
            console.log('Cell.js/AjaxCellStateModal/Ajax:', error)
        }
    }

    //Cell序列号查询Modal （电流电压图） AJAX数据
    AjaxCellSerialNoModal = async (CellNo) => {
        console.log('time4,', SetIntervalTime)
        // let time = new Date()
        // console.log('AjaxCellSerialNoModal  刷新一次打印一次', time)   let CRUDAjax = await crud.fanucKanbanAjaxSelectRobotIDPartSerial(CellNo);
        try {
            
            let CRUDAjax = await crud.fanucKanbanAjaxSelectRobotIDPartSerial(CellNo);
            // let CRUDAjax = await crud.fanucKanbanAjaxSelectPartSerial('AR25407_4', 1);
            if (CRUDAjax.data.OnePassMeasurementRecord.Voltage_TimePoint.length <= 1) {
                console.log('CRUDAjax.data.OnePassMeasurementRecord.Voltage_TimePoint.length <=1')
                this.show5('fullscreen')

                let TotalRes = CRUDAjax.data //总数据
                let OneRes = CRUDAjax.data.OnePassMeasurementRecord  //一条数据
                let PassNoArray = CRUDAjax.data.Pass_Nos  //焊缝号 
                //判断是否来了新工件
                if (OneRes.Part_Serial === OldCellPart_Serial) {
                    // NewCellPart_Serial = OneRes.Part_Serial
                    console.log('仍旧旧工件')
                    NewCellPart_Serial = [<div><Segment inverted color='green' secondary >{OldCellPart_Serial}</Segment></div>]
                } else if (OneRes.Part_Serial != OldCellPart_Serial) {
                    console.log('来了新工件')
                    NewCellPart_Serial = [<div><Segment inverted color='teal' secondary >新工件{OneRes.Part_Serial}</Segment></div>]
                    OldCellPart_Serial = OneRes.Part_Serial
                }


                //序列号和焊缝号数组
                Part_NumberOptionsArray = []
                CRUDAjax.data.Pass_Nos.forEach((value, index) => {
                    Part_NumberOptionsArray.push(
                        { key: index, value: value, text: value } //递增index
                    )
                })
                CellSerialNumbersOptionsArray = []
                CRUDAjax.data.SerialNumbers.forEach((value, index) => {
                    CellSerialNumbersOptionsArray.push(
                        { key: index, value: value, text: value }
                    )
                })
                this.setState({ handleSearchRes: TotalRes, handleSearchResFirst: OneRes, Part_Number: PassNoArray, Part_NumberOptions: Part_NumberOptionsArray, Part_SerialOptions: CellSerialNumbersOptionsArray });
                //质量状态和对应的颜色
                let PassNoQualityGrade = ''
                let PassNoQualityGradeColor = ''
                let tableTest = []
                for (var i = 0; i < TotalRes.Passes_QualityGrade.length; i++) {
                    switch (TotalRes.Passes_QualityGrade[i].QualityGrade) {
                        case -1: PassNoQualityGrade = '-1'; PassNoQualityGradeColor = '#21BA45'; break;
                        case 1: PassNoQualityGrade = 'Good'; PassNoQualityGradeColor = '#21BA45'; break;
                        case 2: PassNoQualityGrade = 'OK'; PassNoQualityGradeColor = '#21BA45'; break;
                        case 3: PassNoQualityGrade = 'NG'; PassNoQualityGradeColor = 'red'; break;
                        default: PassNoQualityGrade = 'Good'; PassNoQualityGradeColor = '#21BA45'; break;
                    }
                    //焊缝号table
                    tableTest.push(
                        <Table.Row style={{ backgroundColor: PassNoQualityGradeColor }}>
                            <Table.Cell>{TotalRes.Passes_QualityGrade[i].Pass_No}</Table.Cell>
                            <Table.Cell>{PassNoQualityGrade}</Table.Cell>
                        </Table.Row>)
                }
                this.setState({ PassNoTable: tableTest })
                switch (TotalRes.QualityGrade) {
                    case -1: this.setState({ Grade: '-1', GradeColor: '#21BA45' }); break;
                    case 1: this.setState({ Grade: 'Good', GradeColor: '#21BA45' }); break;
                    case 2: this.setState({ Grade: 'OK', GradeColor: 'yellow' }); break;
                    case 3: this.setState({ Grade: 'NG', GradeColor: 'red' }); break;
                    default: this.setState({ Grade: '-1', GradeColor: '#21BA45' }); break;
                }

            } else {
                console.log('CRUDAjax.data.OnePassMeasurementRecord.Voltage_TimePoint.length >1')
                let TotalRes = CRUDAjax.data //总数据
                let OneRes = CRUDAjax.data.OnePassMeasurementRecord  //一条数据
                let PassNoArray = CRUDAjax.data.Pass_Nos  //焊缝号 
                //判断是否来了新工件
                if (OneRes.Part_Serial === OldCellPart_Serial) {
                    // NewCellPart_Serial = OneRes.Part_Serial
                    console.log('仍旧旧工件')
                    NewCellPart_Serial = [<div><Segment inverted color='green' secondary >{OldCellPart_Serial}</Segment></div>]
                } else if (OneRes.Part_Serial != OldCellPart_Serial) {
                    console.log('来了新工件')
                    NewCellPart_Serial = [<div><Segment inverted color='teal' secondary >新工件{OneRes.Part_Serial}</Segment></div>]
                    OldCellPart_Serial = OneRes.Part_Serial
                }


                //序列号和焊缝号数组
                Part_NumberOptionsArray = []
                CRUDAjax.data.Pass_Nos.forEach((value, index) => {
                    Part_NumberOptionsArray.push(
                        { key: index, value: value, text: value } //递增index
                    )
                })
                CellSerialNumbersOptionsArray = []
                CRUDAjax.data.SerialNumbers.forEach((value, index) => {
                    CellSerialNumbersOptionsArray.push(
                        { key: index, value: value, text: value }
                    )
                })
                this.setState({ handleSearchRes: TotalRes, handleSearchResFirst: OneRes, Part_Number: PassNoArray, Part_NumberOptions: Part_NumberOptionsArray, Part_SerialOptions: CellSerialNumbersOptionsArray });

                let PassNoQualityGrade = ''
                let PassNoQualityGradeColor = ''
                let tableTest = []
                for (var i = 0; i < TotalRes.Passes_QualityGrade.length; i++) {
                    switch (TotalRes.Passes_QualityGrade[i].QualityGrade) {
                        case -1: PassNoQualityGrade = '-1'; PassNoQualityGradeColor = '#21BA45'; break;
                        case 1: PassNoQualityGrade = 'Good'; PassNoQualityGradeColor = '#21BA45'; break;
                        case 2: PassNoQualityGrade = 'OK'; PassNoQualityGradeColor = '#21BA45'; break;
                        case 3: PassNoQualityGrade = 'NG'; PassNoQualityGradeColor = 'red'; break;
                        default: PassNoQualityGrade = 'Good'; PassNoQualityGradeColor = '#21BA45'; break;
                    }

                    tableTest.push(
                        <Table.Row style={{ backgroundColor: PassNoQualityGradeColor }}>
                            <Table.Cell>{TotalRes.Passes_QualityGrade[i].Pass_No}</Table.Cell>
                            <Table.Cell>{PassNoQualityGrade}</Table.Cell>
                        </Table.Row>)
                }
                this.setState({ PassNoTable: tableTest })
                switch (TotalRes.QualityGrade) {
                    case -1: this.setState({ Grade: '-1', GradeColor: '#21BA45' }); break;
                    case 1: this.setState({ Grade: 'Good', GradeColor: '#21BA45' }); break;
                    case 2: this.setState({ Grade: 'OK', GradeColor: 'yellow' }); break;
                    case 3: this.setState({ Grade: 'NG', GradeColor: 'red' }); break;
                    default: this.setState({ Grade: '-1', GradeColor: '#21BA45' }); break;
                }
            }
        } catch (error) {
            console.log('Cell.js/AjaxCellSerialNoModal/Ajax:', error)
        }
    }

    //序列号查询的下拉菜单值
    handleChange1 = (e, { value }) => {
        this.setState({ PartSerialValue: value })
    }
    handleChange2 = async (e, { value }) => {
        // this.setState({ PartNumberValue: value })
        this.CellPassNoAJAX(this.state.handleSearchResFirst.Part_Serial, value)
        clearInterval(timer4); clearInterval(timer5);
        //判断是否处于暂停刷新状态
        // if (this.state.ButtonColor != '#21BA45') {
        //     timer5 = setInterval(() => this.CellPassNoAJAX(this.state.handleSearchResFirst.Part_Serial, value), SetIntervalTime);
        // }
    }
    //选择焊缝拉取新数据  changepassNo
    CellPassNoAJAX = async (Part_Serial, value) => {
        console.log('time5', SetIntervalTime)
        let CRUDAjax = await crud.fanucKanbanAjaxSelectPartSerial(Part_Serial, value);
        let TotalRes = CRUDAjax.data //总数据
        let OneRes = CRUDAjax.data.OnePassMeasurementRecord  //一条数据
        let PassNoArray = CRUDAjax.data.Pass_Nos  //焊缝号 
        //判断是否来了新工件
        if (OneRes.Part_Serial === OldCellPart_Serial) {
            // NewCellPart_Serial = OneRes.Part_Serial
            console.log('仍旧旧工件')
            NewCellPart_Serial = [<div><Segment inverted color='green' secondary >{OldCellPart_Serial}</Segment></div>]
        } else if (OneRes.Part_Serial != OldCellPart_Serial) {
            console.log('来了新工件')
            NewCellPart_Serial = [<div><Segment inverted color='teal' secondary >新工件{OneRes.Part_Serial}</Segment></div>]
            OldCellPart_Serial = OneRes.Part_Serial
        }


        //序列号和焊缝号数组
        Part_NumberOptionsArray = []
        CRUDAjax.data.Pass_Nos.forEach((value, index) => {
            Part_NumberOptionsArray.push(
                { key: index, value: value, text: value } //递增index
            )
        })
        CellSerialNumbersOptionsArray = []
        CRUDAjax.data.SerialNumbers.forEach((value, index) => {
            CellSerialNumbersOptionsArray.push(
                { key: index, value: value, text: value }
            )
        })
        this.setState({ handleSearchRes: TotalRes, handleSearchResFirst: OneRes, Part_Number: PassNoArray, Part_NumberOptions: Part_NumberOptionsArray, Part_SerialOptions: CellSerialNumbersOptionsArray });


        //生成每条焊缝质量判断的Table
        let PassNoQualityGrade = ''
        let PassNoQualityGradeColor = ''
        let tableTest = []
        for (var i = 0; i < TotalRes.Passes_QualityGrade.length; i++) {
            switch (TotalRes.Passes_QualityGrade[i].QualityGrade) {
                case -1: PassNoQualityGrade = '-1'; PassNoQualityGradeColor = '#21BA45'; break;
                case 1: PassNoQualityGrade = 'Good'; PassNoQualityGradeColor = '#21BA45'; break;
                case 2: PassNoQualityGrade = 'OK'; PassNoQualityGradeColor = '#21BA45'; break;
                case 3: PassNoQualityGrade = 'NG'; PassNoQualityGradeColor = 'red'; break;
                default: PassNoQualityGrade = 'Good'; PassNoQualityGradeColor = '#21BA45'; break;
            }

            tableTest.push(
                <Table.Row style={{ backgroundColor: PassNoQualityGradeColor }}>
                    <Table.Cell>{TotalRes.Passes_QualityGrade[i].Pass_No}</Table.Cell>
                    <Table.Cell>{PassNoQualityGrade}</Table.Cell>
                </Table.Row>)
        }
        this.setState({ PassNoTable: tableTest })

        switch (TotalRes.QualityGrade) {
            case 1: this.setState({ Grade: 'Good', GradeColor: '#21BA45' }); break;
            case 2: this.setState({ Grade: 'OK', GradeColor: 'yellow' }); break;
            case 3: this.setState({ Grade: 'NG', GradeColor: 'red' }); break;
            case -1: this.setState({ Grade: '-1', GradeColor: '#21BA45' }); break;
            default: this.setState({ Grade: '-1', GradeColor: '#21BA45' }); break;
        }
    }
    //序列号提交值查询
    // handleSubmit = async (e) => {
    //     e.preventDefault()
    //     let Serial_Part = ''; let Part_Number = '';
    //     try {
    //         if (this.state.PartSerialValue === undefined) {
    //             alert('序列号选项不能为空');
    //             return false
    //         } else {
    //             Serial_Part = this.state.PartSerialValue
    //         }

    //         if (this.state.PartNumberValue === undefined) {
    //             alert('焊缝号选项不能为空');
    //             return false
    //         } else {
    //             Part_Number = this.state.PartNumberValue
    //         }
    //         let CRUDAjax = await crud.fanucKanbanAjaxSelectPartSerial(Serial_Part, Part_Number);
    //         let TotalRes = CRUDAjax.data //总数据
    //         let OneRes = CRUDAjax.data.OnePassMeasurementRecord  //一条数据
    //         let PassNoArray = CRUDAjax.data.Pass_Nos  //焊缝号 
    //         Part_NumberOptionsArray = []
    //         CRUDAjax.data.Pass_Nos.forEach((value, index) => {
    //             Part_NumberOptionsArray.push(
    //                 { key: index, value: value, text: value } //递增index
    //             )
    //         })
    //         CellSerialNumbersOptionsArray = []
    //         CRUDAjax.data.SerialNumbers.forEach((value, index) => {
    //             CellSerialNumbersOptionsArray.push(
    //                 { key: index, value: value, text: value }
    //             )
    //         })
    //         this.setState({ handleSearchRes: TotalRes, handleSearchResFirst: OneRes, Part_Number: PassNoArray, Part_NumberOptions: Part_NumberOptionsArray, Part_SerialOptions: CellSerialNumbersOptionsArray });
    //         //    this.setState({ handleSearchRes: TotalRes, handleSearchResFirst: OneRes, Part_Number: PassNoArray});
    //         clearInterval(timer4)
    //         timer5 = setInterval(() => this.handleSubmitSetInterval(), 5000);
    //     } catch (error) {
    //         console.log('Cell.js/handleSubmit/Ajax:', error)
    //     }
    // }

    // handleSubmitSetInterval = async () => {
    //     let Serial_Part = ''; let Part_Number = '';
    //     if (this.state.PartSerialValue === undefined) {
    //         if (this.handleSearchRes.OnePassMeasurementRecord.Part_Serial != "") {
    //             Serial_Part = this.handleSearchRes.OnePassMeasurementRecord.Part_Serial
    //         } else { alert('无值可选'); return false }
    //     } else {
    //         Serial_Part = this.state.PartSerialValue
    //     }

    //     if (this.state.PartNumberValue === undefined) {
    //         if (this.handleSearchRes.OnePassMeasurementRecord.Pass_No != "") {
    //             Part_Number = this.handleSearchRes.OnePassMeasurementRecord.Pass_No
    //         } else { alert('无值可选'); return false }  //return false退出方法
    //     } else {
    //         Part_Number = this.state.PartNumberValue
    //     }
    //     let CRUDAjax = await crud.fanucKanbanAjaxSelectPartSerial(Serial_Part, Part_Number);
    //     let TotalRes = CRUDAjax.data //总数据
    //     let OneRes = CRUDAjax.data.OnePassMeasurementRecord  //一条数据
    //     let PassNoArray = CRUDAjax.data.Pass_Nos  //焊缝号 
    //     Part_NumberOptionsArray = []
    //     CRUDAjax.data.Pass_Nos.forEach((value, index) => {
    //         Part_NumberOptionsArray.push(
    //             { key: index, value: value, text: value } //递增index
    //         )
    //     })
    //     CellSerialNumbersOptionsArray = []
    //     CRUDAjax.data.SerialNumbers.forEach((value, index) => {
    //         CellSerialNumbersOptionsArray.push(
    //             { key: index, value: value, text: value }
    //         )
    //     })
    //     this.setState({ handleSearchRes: TotalRes, handleSearchResFirst: OneRes, Part_Number: PassNoArray, Part_NumberOptions: Part_NumberOptionsArray, Part_SerialOptions: CellSerialNumbersOptionsArray });
    // }


    //停止定时任务更新电压电流
    PauseUpdate = async () => {

        if (this.state.ButtonColor === '#EB3F2F') { //关掉定时任务
            console.log('pause Update red')
            clearInterval(timer4); clearInterval(timer5);
            this.setState({ ButtonColor: '#21BA45', ButtonValue: '开始实时刷新', ButtonIcon: 'play' })
        } else if (this.state.ButtonColor === '#21BA45') { //打开定时任务
            console.log('pause Update  green')
            clearInterval(timer4); clearInterval(timer5);
            timer4 = setInterval(() => this.AjaxCellSerialNoModal(CellNo), SetIntervalTime);
            this.setState({ ButtonColor: '#EB3F2F', ButtonValue: '停止实时刷新', ButtonIcon: 'pause' })
            // if (this.state.handleSearchResFirst.Pass_No === '1') {
            //     timer4 = setInterval(() => this.AjaxCellSerialNoModal(CellNo), SetIntervalTime);
            //     this.setState({ ButtonColor: '#EB3F2F', ButtonValue: '停止实时刷新', ButtonIcon: 'pause' })
            // } else {
            //     timer5 = setInterval(() => this.CellPassNoAJAX(this.state.handleSearchResFirst.Part_Serial, this.state.handleSearchResFirst.Pass_No), SetIntervalTime)
            //     this.setState({ ButtonColor: '#EB3F2F', ButtonValue: '停止实时刷新', ButtonIcon: 'pause' })
            // }
        }
    }
    //更换刷新频率
    handleChangeUpdataFrequency = async (e, { value }) => {
        clearInterval(timer4); clearInterval(timer5);
        SetIntervalTime = value
        timer4 = setInterval(() => this.AjaxCellSerialNoModal(CellNo), SetIntervalTime);
        this.setState({ ButtonColor: '#EB3F2F', ButtonValue: '停止实时刷新', ButtonIcon: 'pause' })
        // if (this.state.handleSearchResFirst.Pass_No === '1') {
        //     timer4 = setInterval(() => this.AjaxCellSerialNoModal(CellNo), SetIntervalTime);
        // } else {
        //     timer5 = setInterval(() => this.CellPassNoAJAX(this.state.handleSearchResFirst.Part_Serial, this.state.handleSearchResFirst.Pass_No), SetIntervalTime)
        // }
    }

    render() {
        // this.props.transferMsg('rex')
        const { open1, open2, open3, open4, open5, openD, size } = this.state
        return (

            <div>
                <Affix style={{ position: 'absolute', top: '79%', left: '10%' }}>
                    <Button.Group color={this.props.Cell1State}>
                        <Dropdown text='激光跟踪焊接展示单元' search floating labeled button className='icon' options={cell1Options} onChange={this.handleClick.bind(this)} />
                    </Button.Group >
                    <br />
                    <Form.Field style={{ display: this.props.HideLabel }}>
                        <Label basic color={this.props.Cell1State} pointing>
                            <p>当班产量：{this.props.CellState[9].Output || 0 + '件'}<Badge status="success" text="计划完成率  90%" /></p>
                            <Badge status="error" text="设备开动率 30%" />
                            <Badge status="success" text="质量合格率 98%" />
                            <Badge status="warning" text="停机率 80%" />
                            <Badge status="success" text="安全生产98天" />
                        </Label>
                    </Form.Field>
                </Affix>

                <Affix style={{ position: 'absolute', top: '66%', left: '10%' }}>
                    <Button.Group color={this.props.Cell2State}>
                        <Dropdown text='碳钢焊接单元' search floating labeled button className='icon' options={cell2Options} color='red' onChange={this.handleClick.bind(this)} />
                    </Button.Group >
                    <br />
                    <Form.Field style={{ display: this.props.HideLabel }}>
                        <Label basic color={this.props.Cell2State} pointing>
                            <p>当班产量：{this.props.CellState[8].Output || 0 + '件'}<Badge status="success" text="计划完成率  98%" /></p>

                            <Badge status="error" text="设备开动率 30%" />
                            <Badge status="success" text="质量合格率 98%" />
                            <Badge status="warning" text="停机率 80%" />
                            <Badge status="success" text="安全生产98天" />
                        </Label>
                    </Form.Field>
                </Affix>


                <Affix style={{ position: 'absolute', top: '32%', left: '10%' }}>
                    <Button.Group color={this.props.Cell3State}>
                        <Dropdown text='镀锌板焊接单元' search floating labeled button className='icon' options={cell3Options} onChange={this.handleClick.bind(this)} />
                    </Button.Group >
                    <br />
                    <Form.Field style={{ display: this.props.HideLabel }}>
                        <Label basic color={this.props.Cell3State} pointing>
                            {/*状态：{this.props.CellState[1].State === false ? '正常' : '故障'}<br />*/}
                            <p>当班产量：{this.props.CellState[5].Output || 0 + '件'} <Badge status="success" text="计划完成率  95%" /></p>

                            <Badge status="error" text="设备开动率 30%" />
                            <Badge status="success" text="质量合格率 98%" />
                            <Badge status="warning" text="停机率 80%" />
                            <Badge status="success" text="安全生产98天" />
                        </Label>
                    </Form.Field>
                </Affix>

                <Affix style={{ position: 'absolute', top: '44%', left: '10%' }}>
                    <Button.Group color={this.props.Cell4State}>
                        <Dropdown text='不锈钢焊接单元' search floating labeled button className='icon' options={cell4Options} color='red' onChange={this.handleClick.bind(this)} />
                    </Button.Group >
                    <br />
                    <Form.Field style={{ display: this.props.HideLabel }}>
                        <Label basic color={this.props.Cell4State} pointing>
                            {/*状态：{this.props.CellState[2].State === false ? '正常' : '故障'}<br />*/}
                            <p>当班产量：{this.props.CellState[6].Output || 0 + '件'}<Badge status="success" text="计划完成率  98%" /></p>
                            <Badge status="error" text="设备开动率 30%" />
                            <Badge status="success" text="质量合格率 98%" />
                            <Badge status="warning" text="停机率 80%" />
                            <Badge status="success" text="安全生产98天" />
                        </Label>
                    </Form.Field>
                </Affix>

                <Affix style={{ position: 'absolute', top: '55%', left: '10%' }}>
                    <Button.Group color={this.props.Cell5State}>
                        <Dropdown text='铝合金焊接单元' search floating labeled button className='icon' options={cell5Options} color='red' onChange={this.handleClick.bind(this)} />
                    </Button.Group >
                    <br />
                    <Form.Field style={{ display: this.props.HideLabel }}>
                        <Label basic color={this.props.Cell5State} pointing>
                            {/*状态：{this.props.CellState[2].State === false ? '正常' : '故障'}<br />*/}
                            <p>当班产量：{this.props.CellState[7].Output || 0 + '件'}<Badge status="success" text="计划完成率  98%" /></p>
                            <Badge status="error" text="设备开动率 30%" />
                            <Badge status="success" text="质量合格率 98%" />
                            <Badge status="warning" text="停机率 80%" />
                            <Badge status="success" text="安全生产98天" />
                        </Label>
                    </Form.Field>
                </Affix>



                <Affix style={{ position: 'absolute', top: '75%', right: '6%' }}>
                    <Button.Group color={this.props.Cell6State}>
                        <Dropdown text='智能焊接铣削打磨系统' search floating labeled button className='icon' options={cell6Options} color='red' onChange={this.handleClick.bind(this)} />
                    </Button.Group >
                    <br />
                    <Form.Field style={{ display: this.props.HideLabel }}>
                        <Label basic color={this.props.Cell6State} pointing>
                            {/*状态：{this.props.CellState[2].State === false ? '正常' : '故障'}<br />*/}
                            <p>当班产量：{this.props.CellState[10].Output || 0 + '件'}<Badge status="success" text="计划完成率  98%" /></p>
                            <Badge status="error" text="设备开动率 30%" />
                            <Badge status="success" text="质量合格率 98%" />
                            <Badge status="warning" text="停机率 80%" />
                            <Badge status="success" text="安全生产98天" />
                        </Label>
                    </Form.Field>
                </Affix>
                <Affix style={{ position: 'absolute', top: '20%', left: '10%' }} >
                    <Button.Group color={this.props.Cell7State}>
                        <Dropdown text='汽车座椅焊接单元' search floating labeled button className='icon' options={cell7Options} onChange={this.handleClick.bind(this)} />
                    </Button.Group >
                    <br />
                    <Form.Field style={{ display: this.props.HideLabel }}>
                        <Label basic color={this.props.Cell7State} pointing>
                            <p>当班产量：{this.props.CellState[4].Output || 0 + '件'}<Badge status="success" text="计划完成率  60%" /></p>
                            <Badge status="error" text="设备开动率 30%" />
                            <Badge status="success" text="质量合格率 98%" />
                            <Badge status="warning" text="停机率 80%" />
                            <Badge status="success" text="安全生产98天" />
                        </Label>
                    </Form.Field>
                </Affix>



                {/*ZDT Modal1*/}
                <Modal size={size} open={open1} onClose={this.close1} closeIcon='close' basic>
                    <Modal.Header>
                        Fanuc ZDT
                     </Modal.Header>
                    <Modal.Content>
                        <iframe src={ZDTsrc} width="100%" height="600px">
                            {/*<iframe src="172.16.3.188:8088" width="100%" height="600px">*/}

                            您的浏览器不支持iframe，请升级您的浏览器
                        </iframe>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close1}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>

                {/*ZDT Modal2*/}
                <Modal size={size} open={open5} onClose={this.close5} closeIcon='close' basic>
                    <Modal.Header>
                        Fanuc ZDT
                     </Modal.Header>
                    <Modal.Content>
                        <iframe src="http://172.16.29.25/ZDTWebPortal/RobotControllerDetails?controllerID=c962b37a-1ac0-eb2a-f1c7-8c6eb5336a1e&amp;amp;clusterName=Smart%20ARC&amp;amp;tabIndex=0&amp;amp;language=null%2Cnull%2Cnull%2Cnull&amp;amp;ipAddress=172.16.29.197&amp;language=null&amp;redirected=true?language=null&language=null&redirected=true" width="100%" height="600px">
                            {/*<iframe src="172.16.3.188:8088" width="100%" height="600px">*/}

                            您的浏览器不支持iframe，请升级您的浏览器
                        </iframe>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close5}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>

                {/*CellState  Modal*/}
                <Modal size={size} open={open2} onClose={this.close2} closeIcon='close' basic>
                    <Modal.Header>
                        Fanuc 工作站状态
                     </Modal.Header>
                    <Modal.Content>
                        <Grid>
                            <Grid.Row columns={4}>
                                <Grid.Column>
                                    <Button.Group fluid>
                                        <Button>OEE</Button>
                                        <Button positive>75%</Button>
                                    </Button.Group>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button onClick={this.show3('fullscreen')} fluid>机器人报警信息</Button>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button onClick={this.show4('fullscreen')} fluid>实时焊接数据</Button>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button.Group fluid>
                                        <Button>产量</Button>
                                        <Button positive>{this.state.CellOutput}</Button>
                                    </Button.Group>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns={4}>
                                <Grid.Column>
                                    <RobotRunningStatePieChart TodayAllRobotsStateDistribution={this.state.TodayRobotStateDistribution} />
                                </Grid.Column>
                                <Grid.Column>
                                    <RobotUtilizationPieChart TodayAllRobotsRunningRatioPieChart={this.state.TodayRobotRunningRatio} />
                                </Grid.Column>
                                <Grid.Column>
                                    <RobotProductionPieChart TodayAllRobotsOutputsByPart={this.state.TodayRobotOutputsByPart} />
                                </Grid.Column>
                                <Grid.Column>
                                    <RobotAlarmPieChart TodayAllRobotsAlarmsDistribution={this.state.TodayRobotAlarmsDistribution} />
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row columns={3}>
                                <Grid.Column>
                                    <RobotDayOutputBarChart TodayAllRobotsOutputPerHour={this.state.TodayRobotOutputPerHour} />
                                </Grid.Column>
                                <Grid.Column>
                                    <RobotWeekOutputBarChart TodayAllRobotsxSevenDaysAllRobotsOutputs={this.state.SevenDaysRobotOutputs} />
                                </Grid.Column>
                                <Grid.Column>
                                    <RobotDayDowntimeBarChart TodayTodayAllRobotsStopInMinutesPerHour={this.state.TodayRobotStopInMinutesPerHour} />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close2}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>

                {/*AlarmInfoModal*/}
                <Modal size={size} open={open3} onClose={this.close3} closeIcon='close' basic>
                    <Modal.Header >
                        <a style={{ color: 'red' }}>报警信息记录</a>
                    </Modal.Header>
                    <Modal.Content>
                        <Table inverted color={'red'}>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>ID</Table.HeaderCell>
                                    <Table.HeaderCell>机器人YH号</Table.HeaderCell>
                                    <Table.HeaderCell>报警代码</Table.HeaderCell>
                                    <Table.HeaderCell>报警信息</Table.HeaderCell>
                                    <Table.HeaderCell>报警严重程度</Table.HeaderCell>
                                    <Table.HeaderCell>报警原因</Table.HeaderCell>
                                    <Table.HeaderCell>报警时间</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {this.state.dataTable}

                            </Table.Body>

                            {/*<Table.Footer >
                                <Table.Row>
                                    <Table.HeaderCell colSpan='3'>
                                        <Menu floated='right' pagination color={'red'}>
                                            <Menu.Item as='a' icon>
                                                <Icon name='left chevron' />
                                            </Menu.Item>
                                            <Menu.Item as='a'>1</Menu.Item>
                                            <Menu.Item as='a'>2</Menu.Item>
                                            <Menu.Item as='a'>3</Menu.Item>
                                            <Menu.Item as='a'>4</Menu.Item>
                                            <Menu.Item as='a' icon>
                                                <Icon name='right chevron' />
                                            </Menu.Item>
                                        </Menu>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>*/}
                        </Table>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close3}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>


                {/*SelectPartNoModal   */}
                <Modal size={size} open={open4} onClose={this.close4} closeIcon='close' >
                    <Modal.Header>
                        实时焊接数据
                     </Modal.Header>
                    <Modal.Content>
                        <Grid>
                            {/*<Grid.Row >
                                <Grid.Column width={16}>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Dropdown placeholder='序列号' search selection options={this.state.Part_SerialOptions} style={{ width: '30%' }} onChange={this.handleChange1} />
                                        <Dropdown placeholder='焊缝号' search selection options={this.state.Part_NumberOptions} style={{ width: '30%' }} onChange={this.handleChange2} />
                                        <Button circular icon='search' />
                                        <Button.Group floated='right'>
                                            <Label size='big'  >
                                                评分：
                                        </Label>
                                            <Rating disabled maxRating={3} defaultRating={this.state.handleSearchRes.QualityGrade || 0} icon='star' size='massive' style={{ floated: 'right' }} />
                                            <br />
                                        </Button.Group>
                                    </Form>
                                </Grid.Column>

                            </Grid.Row>*/}

                            <Grid.Row >
                                <Grid.Column width={12}>
                                    <VoltageLineChart CellhandleSearchRes={this.state.handleSearchRes} />
                                    <CurrentLineChart CellhandleSearchRes={this.state.handleSearchRes} />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Carousel autoplay vertical="true" style={{ width: '50%', marginLeft: '3%' }} >
                                        {/*<div>  <Segment inverted color='green' secondary >Robot无故障 </Segment></div>*/}
                                        {NewCellPart_Serial}
                                    </Carousel>
                                    <Button content={this.state.ButtonValue} icon={this.state.ButtonIcon} labelPosition='left' style={{ width: '40%', marginBottom: '10px', marginTop: '10px', backgroundColor: this.state.ButtonColor }} onClick={this.PauseUpdate.bind(this)} />
                                    <Dropdown placeholder='刷新频率' search selection options={SetIntervalTimeOption} defaultValue={SetIntervalTime} style={{ width: '55%', marginLeft: '4%', marginBottom: '10px' }} onChange={this.handleChangeUpdataFrequency.bind(this)} />
                                    {/*<Form onSubmit={this.handleSubmitInsert}>*/}
                                    {/*<Form>
                                        <Form.Field>*/}

                                    <Dropdown placeholder='焊缝号' search selection options={this.state.Part_NumberOptions} style={{ width: '100%', marginBottom: '10px' }} onChange={this.handleChange2} />
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>工件序列号</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{this.state.handleSearchResFirst.Part_Serial}</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>焊缝号</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{this.state.handleSearchResFirst.Pass_No}</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>开始时间</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{this.state.handleSearchResFirst.Start_Time}</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>结束时间</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{this.state.handleSearchResFirst.End_Time}</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>采集周期</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>24ms</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>电压设定标准值</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{this.state.handleSearchResFirst.Standard_Voltage_AVGLine + 'V'}</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>电压上下限波动(%)</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>30%</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>电流设定标准值</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{this.state.handleSearchResFirst.Standard_Current_AVGLine + 'A'}</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>电流上下限波动(%)</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>30%</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>电压超出百分比</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{(this.state.handleSearchResFirst.Voltage_Real_Over_Percent * 100).toFixed(2) + '%'}</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>电流超出百分比</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{(this.state.handleSearchResFirst.Current_Real_Over_Percent * 100).toFixed(2) + '%'}</Button>
                                    </Button.Group>
                                    {/*<Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>质量状态</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px', backgroundColor: this.state.GradeColor }}>{this.state.Grade}</Button>
                                    </Button.Group>*/}
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>数据上传时间</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{this.state.handleSearchResFirst.Insert_Time}</Button>
                                    </Button.Group>
                                    {/*<Input
                                                action={{ color: 'teal', labelPosition: 'left', icon: 'numbered list', content: '工件序列号' }}
                                                actionPosition='left'
                                                value={this.state.handleSearchResFirst.Part_Serial}
                                                style={{ marginBottom: '20px' }}
                                                readOnly
                                            />

                                            <Input
                                                action={{ color: 'teal', labelPosition: 'left', icon: 'numbered list', content: '焊缝号' }}
                                                actionPosition='left'
                                                value={this.state.handleSearchResFirst.Pass_No}
                                                style={{ marginBottom: '20px' }}
                                                readOnly
                                            />
                                            <Input
                                                action={{ color: 'teal', labelPosition: 'left', icon: 'time', content: '开始时间' }}
                                                actionPosition='left'
                                                value={this.state.handleSearchResFirst.Start_Time}
                                                style={{ marginBottom: '20px' }}
                                                readOnly
                                            /><br />
                                            <Input
                                                action={{ color: 'teal', labelPosition: 'left', icon: 'time', content: '结束时间' }}
                                                actionPosition='left'
                                                value={this.state.handleSearchResFirst.End_Time}
                                                style={{ marginBottom: '20px' }}
                                                readOnly
                                            /><br />
                                            <Input
                                                action={{ color: 'teal', labelPosition: 'left', icon: 'numbered list', content: '采集周期' }}
                                                actionPosition='left'
                                                value='24ms'
                                                style={{ marginBottom: '20px' }}
                                                readOnly
                                            /><br />
                                            <Input
                                                action={{ color: 'teal', labelPosition: 'left', icon: 'numbered list', content: '电压标准值' }}
                                                actionPosition='left'
                                                value={this.state.handleSearchResFirst.Standard_Voltage_AVGLine + 'V'}
                                                style={{ marginBottom: '20px' }}
                                                readOnly
                                            /><br />
                                            <Input
                                                action={{ color: 'teal', labelPosition: 'left', icon: 'numbered list', content: '电压上下限波动百分比' }}
                                                actionPosition='left'
                                                value='30%'
                                                style={{ marginBottom: '20px' }}
                                                readOnly
                                            />
                                            <Input
                                                action={{ color: 'teal', labelPosition: 'left', icon: 'numbered list', content: '电流标准值' }}
                                                actionPosition='left'
                                                value={this.state.handleSearchResFirst.Standard_Current_AVGLine + 'A'}
                                                style={{ marginBottom: '20px' }}
                                                readOnly
                                            />
                                            <Input
                                                action={{ color: 'teal', labelPosition: 'left', icon: 'numbered list', content: '电流上下限波动百分比' }}
                                                actionPosition='left'
                                                value='30%'
                                                style={{ marginBottom: '20px' }}
                                                readOnly
                                            />
                                            <Input
                                                action={{ color: this.state.GradeColor || 'teal', labelPosition: 'left', icon: 'numbered list', content: '质量状态' }}
                                                actionPosition='left'
                                                value={this.state.Grade}
                                                style={{ marginBottom: '20px' }}
                                                readOnly
                                            />
                                            <Input
                                                action={{ color: 'teal', labelPosition: 'left', icon: 'time', content: '数据上传时间' }}
                                                actionPosition='left'
                                                value={this.state.handleSearchResFirst.Insert_Time}
                                                style={{ marginBottom: '20px' }}
                                                readOnly
                                            />*/}
                                    {/*</Form.Field>
                                    </Form>*/}
                                    {/*<Card
                                        image={fanucLogo}
                                        style={{ width: '410px' }}
                                    />*/}
                                </Grid.Column>
                                {/*<Grid.Column width={2}>
                                    <Table inverted color={'green'}>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>焊缝号</Table.HeaderCell>
                                                <Table.HeaderCell>质量状态</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {this.state.PassNoTable}
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>*/}
                            </Grid.Row>
                        </Grid>

                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.close4}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>


                <Modal size='small' open={openD} onClose={this.closeD} closeIcon='close' basic>
                    <Modal.Header icon='archive' content='警告' />
                    <Modal.Content>
                        <p>此工作站今日没有作业数据，谢谢！</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' inverted onClick={this.closeD}>
                            <Icon name='checkmark' /> 退出
                         </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default Cell;