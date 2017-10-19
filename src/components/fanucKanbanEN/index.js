import React from 'react';
import './index.css';

import { Carousel, Affix, Badge } from 'antd';
import { Radio, Segment, Header, Icon, Modal, Button, Grid, Form, Dropdown, Input, Label, Step, Image, Reveal, Rating, Table, Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import Cell from './cell.js';

import VoltageLineChart from '../chartEN/voltageLineChart.js';
import CurrentLineChart from '../chartEN/currentLineChart.js';
import CRUD from '../../unit/ajax.js';

import fanucImage from '../../img/fanucRobot.png'
import fanucLogo2 from '../../img/fanucLogo1.png'

import SFLogo from '../../img/SFLogo.png'
import fanucLogo from '../../img/logo.png'

const crud = new CRUD();

let timer1 = {}  //kanban主界面 产量/开动率/安全时间/所有CellState/所有robot故障/ 3s
let timer8 = {}  //kanban主界面 产量/开动率/安全时间/所有CellState/所有robot故障/ 5s


let size = 'large'
let sizeB = 'fullscreen'
let Part_NumberOptionsArray = [];//焊缝号下拉菜单数组
let CellPart_NumberOptionsArray = [];

let arr2 = [] //robot 走马灯
let PassNoTable = [] //焊缝号Table


class fanucKanban extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CellState: [
                {
                    "RobotId": 1,
                    "Robot_YH_NO": "0",
                    "Output": 0,
                    "State": 0,
                    "RunningRatio": 0
                },
                {
                    "RobotId": 3,
                    "Robot_YH_NO": "0",
                    "Output": 0,
                    "State": 0,
                    "RunningRatio": 0
                },
                {
                    "RobotId": 8,
                    "Robot_YH_NO": "0",
                    "Output": 0,
                    "State": 0,
                    "RunningRatio": 0
                },
                {
                    "RobotId": 10,
                    "Robot_YH_NO": "0",
                    "Output": 0,
                    "State": 0,
                    "RunningRatio": 0
                },
                {
                    "RobotId": 11,
                    "Robot_YH_NO": "0",
                    "Output": 0,
                    "State": 0,
                    "RunningRatio": 0
                },
                {
                    "RobotId": 12,
                    "Robot_YH_NO": "0",
                    "Output": 0,
                    "State": 0,
                    "RunningRatio": 0
                },
                {
                    "RobotId": 13,
                    "Robot_YH_NO": "0",
                    "Output": 0,
                    "State": 0,
                    "RunningRatio": 0
                },
                {
                    "RobotId": 14,
                    "Robot_YH_NO": "0",
                    "Output": 0,
                    "State": 0,
                    "RunningRatio": 0
                },
                {
                    "RobotId": 15,
                    "Robot_YH_NO": "0",
                    "Output": 0,
                    "State": 0,
                    "RunningRatio": 0
                },
                {
                    "RobotId": 16,
                    "Robot_YH_NO": "0",
                    "Output": 0,
                    "State": 0,
                    "RunningRatio": 0
                },
                {
                    "RobotId": 17,
                    "Robot_YH_NO": "0",
                    "Output": 0,
                    "State": 0,
                    "RunningRatio": 0
                },],//所有Cell 当前状态   
            TodayAllRobotsOutputs: 0, //所有产量
            TodayAllRobotsRunningRatio: 0, //所有Robot 开动率
            TodayAllPlantSafetyDays: 0, //安全生产天数
            openA: false,
            openB: false,
            openC: false,
            openD: false,
            openE: false,
            HideLabel: 'none',
            RadioValue: false,
            CellhandleSearchRes: {},

            CellhandleSearchResFirst: [], //OnePassMeasurementRecord
            CellPart_NumberOptions: [0], //Pass_Nos
            Part_NumberOptions: [0],//焊缝号下拉菜单数组初始化
            //robot故障
            CurrentFaultRobotsArray: <div>  <Segment inverted color='green' secondary >No Fault </Segment></div>,
            Part_SerialValue: -1,
            Part_NumberValue: 1,
            //多个焊缝号Table
            PassNoTable: [<Table.Row>
                <Table.Cell>No data</Table.Cell>
                <Table.Cell>No data</Table.Cell>
            </Table.Row>]

        }
    }
    show1 = (size) => () => { this.setState({ size, openA: true }), console.log('show1') }
    showB = (sizeB) => () => { this.setState({ sizeB, openB: true }), console.log('showB'), this.OpenInterval() }
    closeA = () => { this.setState({ openA: false }), console.log('closeA') }
    closeB = () => { this.setState({ openB: false, CellhandleSearchRes: {}, CellhandleSearchResFirst: [] }), console.log('closeB'), clearInterval(timer8); }
    closeC = () => { this.setState({ openC: false }), console.log('closeC') }
    closeD = () => { this.setState({ openD: false }), console.log('closeD') }
    closeE = () => { this.setState({ openE: false }), console.log('closeE') }

    //打开页面就持续刷新的ajax  包含total产量/开动率/安全时间  等
    componentWillMount = async () => {
        //所有cell的info
        let AjaxRobotCurrentInfoResponse = await crud.fanucKanbanAjaxRobotCurrentInfo();
        //主界面三要素
        let AjaxTodayAllRobotsOutputsResponse = await crud.fanucKanbanAjaxTodayAllRobotsOutputs();
        let AjaxTodayAllRobotsRunningRatioResponse = await crud.fanucKanbanAjaxTodayAllRobotsRunningRatio();
        let AjaxPlantSafetyDaysResponse = await crud.fanucKanbanAjaxPlantSafetyDays();
        //当前故障robot的走马灯ajax
        let AjaxCurrentFaultRobotsResponse = await crud.fanucKanbanAjaxCurrentFaultRobots();
        let CurrentFaultRobotsResponseArray = AjaxCurrentFaultRobotsResponse.data.FaultRobots
        if (CurrentFaultRobotsResponseArray.length === 0) {
            arr2 = [<div>  <Segment inverted color='green' secondary >No Fault </Segment></div>]
        } else {
            arr2 = CurrentFaultRobotsResponseArray.map(function (item, index, input) {
                return <div><Segment inverted color='red' secondary> {item} Fault </Segment></div>;
            })
        }
        // console.log()
        this.setState({
            TodayAllRobotsOutputs: AjaxTodayAllRobotsOutputsResponse.data.OutputsQuantity,
            TodayAllRobotsRunningRatio: AjaxTodayAllRobotsRunningRatioResponse.data.RunningRatio,
            TodayAllPlantSafetyDays: AjaxPlantSafetyDaysResponse.data.TillNowTotalSafetyDays,
            CurrentFaultRobotsArray: arr2,
            CellState: AjaxRobotCurrentInfoResponse.data
        })
        if (this.state.CellState != undefined) {
            //1号
            if (this.state.CellState[9].State === 1) {
                this.setState({ Cell1State: 'gray' })  //powerOff
            } else if (this.state.CellState[9].State === 2) {
                this.setState({ Cell1State: 'red' })  //Fault
            } else if (this.state.CellState[9].State === 3) {
                this.setState({ Cell1State: 'yellow' })  //Ready
            } else if (this.state.CellState[9].State === 4) {
                this.setState({ Cell1State: 'green' })  //Running
            }
            //2号
            if (this.state.CellState[8].State === 1) {
                this.setState({ Cell2State: 'gray' })  //powerOff
            } else if (this.state.CellState[8].State === 2) {
                this.setState({ Cell2State: 'red' })  //Fault
            } else if (this.state.CellState[8].State === 3) {
                this.setState({ Cell2State: 'yellow' })  //Ready
            } else if (this.state.CellState[8].State === 4) {
                this.setState({ Cell2State: 'green' })  //Running
            }
            //3号
            if (this.state.CellState[5].State === 1) {
                this.setState({ Cell3State: 'gray' })  //powerOff
            } else if (this.state.CellState[5].State === 2) {
                this.setState({ Cell3State: 'red' })  //Fault
            } else if (this.state.CellState[5].State === 3) {
                this.setState({ Cell3State: 'yellow' })  //Ready
            } else if (this.state.CellState[5].State === 4) {
                this.setState({ Cell3State: 'green' })  //Running
            }
            //4号
            if (this.state.CellState[6].State === 1) {
                this.setState({ Cell4State: 'gray' })  //powerOff
            } else if (this.state.CellState[6].State === 2) {
                this.setState({ Cell4State: 'red' })  //Fault
            } else if (this.state.CellState[6].State === 3) {
                this.setState({ Cell4State: 'yellow' })  //Ready
            } else if (this.state.CellState[6].State === 4) {
                this.setState({ Cell4State: 'green' })  //Running
            }
            //5号
            if (this.state.CellState[7].State === 1) {
                this.setState({ Cell5State: 'gray' })  //powerOff
            } else if (this.state.CellState[7].State === 2) {
                this.setState({ Cell5State: 'red' })  //Fault
            } else if (this.state.CellState[7].State === 3) {
                this.setState({ Cell5State: 'yellow' })  //Ready
            } else if (this.state.CellState[7].State === 4) {
                this.setState({ Cell5State: 'green' })  //Running
            }
            //6号
            if (this.state.CellState[10].State === 1) {
                this.setState({ Cell6State: 'gray' })  //powerOff
            } else if (this.state.CellState[10].State === 2) {
                this.setState({ Cell6State: 'red' })  //Fault
            } else if (this.state.CellState[10].State === 3) {
                this.setState({ Cell6State: 'yellow' })  //Ready
            } else if (this.state.CellState[10].State === 4) {
                this.setState({ Cell6State: 'green' })  //Running
            }
            //7号
            if (this.state.CellState[4].State === 1) {
                this.setState({ Cell7State: 'gray' })  //powerOff
            } else if (this.state.CellState[4].State === 2) {
                this.setState({ Cell7State: 'red' })  //Fault
            } else if (this.state.CellState[4].State === 3) {
                this.setState({ Cell7State: 'yellow' })  //Ready
            } else if (this.state.CellState[4].State === 4) {
                this.setState({ Cell7State: 'green' })  //Running
            }
        }

        timer1 = setInterval(() => this.AjaxUpdateTotalRobotData(), 3000);
    }

    //定时任务持续刷新
    AjaxUpdateTotalRobotData = async () => {
        try {
            //所有cell的info
            let AjaxRobotCurrentInfoResponse = await crud.fanucKanbanAjaxRobotCurrentInfo();
            //三要素
            let AjaxTodayAllRobotsOutputsResponse = await crud.fanucKanbanAjaxTodayAllRobotsOutputs();
            let AjaxTodayAllRobotsRunningRatioResponse = await crud.fanucKanbanAjaxTodayAllRobotsRunningRatio();
            let AjaxPlantSafetyDaysResponse = await crud.fanucKanbanAjaxPlantSafetyDays();
            //机器人故障走马灯？
            let AjaxCurrentFaultRobotsResponse = await crud.fanucKanbanAjaxCurrentFaultRobots();
            let CurrentFaultRobotsResponseArray = AjaxCurrentFaultRobotsResponse.data.FaultRobots
            if (CurrentFaultRobotsResponseArray.length === 0) {
                arr2 = [<div>  <Segment inverted color='green' secondary >No Fault  </Segment></div>]
            } else {
                arr2 = CurrentFaultRobotsResponseArray.map(function (item, index, input) {
                    return <div><Segment inverted color='red' secondary> {item} Fault </Segment></div>;
                })
            }

            this.setState({
                TodayAllRobotsOutputs: AjaxTodayAllRobotsOutputsResponse.data.OutputsQuantity,
                TodayAllRobotsRunningRatio: AjaxTodayAllRobotsRunningRatioResponse.data.RunningRatio,
                TodayAllPlantSafetyDays: AjaxPlantSafetyDaysResponse.data.TillNowTotalSafetyDays,
                CurrentFaultRobotsArray: arr2,
                CellState: AjaxRobotCurrentInfoResponse.data,
            })

            if (this.state.CellState != undefined) {
                //1号
                if (this.state.CellState[9].State === 1) {
                    this.setState({ Cell1State: 'gray' })  //powerOff
                } else if (this.state.CellState[9].State === 2) {
                    this.setState({ Cell1State: 'red' })  //Fault
                } else if (this.state.CellState[9].State === 3) {
                    this.setState({ Cell1State: 'yellow' })  //Ready
                } else if (this.state.CellState[9].State === 4) {
                    this.setState({ Cell1State: 'green' })  //Running
                }
                //2号
                if (this.state.CellState[8].State === 1) {
                    this.setState({ Cell2State: 'gray' })  //powerOff
                } else if (this.state.CellState[8].State === 2) {
                    this.setState({ Cell2State: 'red' })  //Fault
                } else if (this.state.CellState[8].State === 3) {
                    this.setState({ Cell2State: 'yellow' })  //Ready
                } else if (this.state.CellState[8].State === 4) {
                    this.setState({ Cell2State: 'green' })  //Running
                }
                //3号
                if (this.state.CellState[5].State === 1) {
                    this.setState({ Cell3State: 'gray' })  //powerOff
                } else if (this.state.CellState[5].State === 2) {
                    this.setState({ Cell3State: 'red' })  //Fault
                } else if (this.state.CellState[5].State === 3) {
                    this.setState({ Cell3State: 'yellow' })  //Ready
                } else if (this.state.CellState[5].State === 4) {
                    this.setState({ Cell3State: 'green' })  //Running
                }
                //4号
                if (this.state.CellState[6].State === 1) {
                    this.setState({ Cell4State: 'gray' })  //powerOff
                } else if (this.state.CellState[6].State === 2) {
                    this.setState({ Cell4State: 'red' })  //Fault
                } else if (this.state.CellState[6].State === 3) {
                    this.setState({ Cell4State: 'yellow' })  //Ready
                } else if (this.state.CellState[6].State === 4) {
                    this.setState({ Cell4State: 'green' })  //Running
                }
                //5号
                if (this.state.CellState[7].State === 1) {
                    this.setState({ Cell5State: 'gray' })  //powerOff
                } else if (this.state.CellState[7].State === 2) {
                    this.setState({ Cell5State: 'red' })  //Fault
                } else if (this.state.CellState[7].State === 3) {
                    this.setState({ Cell5State: 'yellow' })  //Ready
                } else if (this.state.CellState[7].State === 4) {
                    this.setState({ Cell5State: 'green' })  //Running
                }
                //6号
                if (this.state.CellState[10].State === 1) {
                    this.setState({ Cell6State: 'gray' })  //powerOff
                } else if (this.state.CellState[10].State === 2) {
                    this.setState({ Cell6State: 'red' })  //Fault
                } else if (this.state.CellState[10].State === 3) {
                    this.setState({ Cell6State: 'yellow' })  //Ready
                } else if (this.state.CellState[10].State === 4) {
                    this.setState({ Cell6State: 'green' })  //Running
                }
                //7号
                if (this.state.CellState[4].State === 1) {
                    this.setState({ Cell7State: 'gray' })  //powerOff
                } else if (this.state.CellState[4].State === 2) {
                    this.setState({ Cell7State: 'red' })  //Fault
                } else if (this.state.CellState[4].State === 3) {
                    this.setState({ Cell7State: 'yellow' })  //Ready
                } else if (this.state.CellState[4].State === 4) {
                    this.setState({ Cell7State: 'green' })  //Running
                }
            }
        } catch (error) {
            console.log('fanucKanban/AjaxUpdateTotalRobotData/ajax:', error)
        }

    }


    //二层主界面菜单modal
    handleSetting() {
        this.setState({ size, openA: true });
    }

    handleSearchFuction(cell) {
        this.setState({ sizeB, openB: true });
        this.CloseInterval();
        // this.handleSearch(cell)
        // timer8 = setInterval(() => this.handleSearch(cell), 5000);
    }

    //这里打开序列号查询的模态框触发的AJAX方法
    // handleSearch = async (cell) => {
    //     this.setState({ sizeB, openB: true });
    //     let CRUDAjax = await crud.fanucKanbanAjaxSelectRobotIDPartSerial(10);
    //     console.log('CRUDAjax,', CRUDAjax)
    //     let TotalRes = CRUDAjax.data //总数据
    //     let OneRes = CRUDAjax.data.OnePassMeasurementRecord  //一条数据
    //     let PassNoArray = CRUDAjax.data.Pass_Nos  //焊缝号 
    //     console.log('TotalRes___________', TotalRes)
    //     CRUDAjax.data.Pass_Nos.forEach((value, index) => {
    //         CellPart_NumberOptionsArray.push(
    //             { key: index, value: value, text: value }
    //         )
    //     })
    //     this.setState({ CellhandleSearchRes: TotalRes, CellhandleSearchResFirst: OneRes, CellPart_Number: PassNoArray, CellPart_NumberOptions: CellPart_NumberOptionsArray });
    // }

    handleHome() {
        // this.setState({ size, openC: true });
        // location.href='http://172.16.29.188/FANUC/UnitListTrace.html'
        location.href = 'http://172.16.29.188/FANUC/UnitListTraceEN.html'
        // location.href = 'http://dsm.smart-flow.cn:6062/UnitListTrace.html'
    }

    handleHideLabel = async (e, obj) => {
        try {
            this.setState({ RadioValue: obj.checked });
            if (obj.checked == false) {
                this.setState({ HideLabel: 'none' })
                //  let CRUDAjax = await crud.fanucKanbanAjaxSelectPartSerial(Serial_Part, Pass_No);
            } else {
                //CellState
                this.setState({ HideLabel: 'block' })
            }
        } catch (error) {
            console.log('fanucKanban/handleHideLabel/Error:', error)
        }

    }

    handleChange1 = (e, { name, value }) => { this.setState({ Part_SerialValue: value }); }
    handleChange2 = (e, { name, value }) => { this.setState({ Part_NumberValue: value }); }

    handleSubmit = async (e) => {
        e.preventDefault()
        let Serial_Part = -1
        if (this.state.Part_SerialValue === -1) {
            alert('Part Serial Can not be empty!');
        } else {
            Serial_Part = this.state.Part_SerialValue
            // Part_Number = this.state.Part_NumberValue
            let CRUDAjax = await crud.fanucKanbanAjaxSelectPartSerial(Serial_Part, 1);

            let TotalRes = CRUDAjax.data //总数据
            let OneRes = CRUDAjax.data.OnePassMeasurementRecord  //一条数据
            //序列号和焊缝号数组
            Part_NumberOptionsArray = []
            CRUDAjax.data.Pass_Nos.forEach((value, index) => {
                Part_NumberOptionsArray.push(
                    { key: index, value: value, text: value } //递增index
                )
            })
            this.setState({ CellhandleSearchRes: TotalRes, CellhandleSearchResFirst: OneRes, Part_NumberOptions: Part_NumberOptionsArray })
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
            switch (this.state.CellhandleSearchRes.QualityGrade) {
                case 1: this.setState({ Grade: 'Good', GradeColor: '#21BA45' }); break;
                case 2: this.setState({ Grade: 'OK', GradeColor: 'yellow' }); break;
                case 3: this.setState({ Grade: 'NG', GradeColor: 'red' }); break;
                default: this.setState({ Grade: '-1', GradeColor: '#21BA45' }); break;
            }
        }
    }
    handleSubmitInsert = async (e) => {
        e.preventDefault()
        try {
            let CRUDAjaxPost = await crud.fanucKanbanAjaxInsertPartSerialRecord(this.state.CellhandleSearchResFirst.Part_Serial);
            if (CRUDAjaxPost.statusText == 'OK') {
                this.setState({ openD: true })
            } else {
                this.setState({ openE: true })
            }
        } catch (error) {
            console.log('fanucKanban/handleSubmitInsert/Ajax:', error)
        }

    }

    handlePassNoChange = async (e, { value }) => {
        let CRUDAjax = await crud.fanucKanbanAjaxSelectPartSerial(this.state.CellhandleSearchResFirst.Part_Serial, value);
        let TotalRes = CRUDAjax.data //总数据
        let OneRes = CRUDAjax.data.OnePassMeasurementRecord  //一条数据
        //序列号和焊缝号数组
        Part_NumberOptionsArray = []
        CRUDAjax.data.Pass_Nos.forEach((value, index) => {
            Part_NumberOptionsArray.push(
                { key: index, value: value, text: value } //递增index
            )
        })
        this.setState({ CellhandleSearchRes: TotalRes, CellhandleSearchResFirst: OneRes, Part_NumberOptions: Part_NumberOptionsArray })

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
        switch (this.state.CellhandleSearchRes.QualityGrade) {
            case 1: this.setState({ Grade: 'Good', GradeColor: '#21BA45' }); break;
            case 2: this.setState({ Grade: 'OK', GradeColor: 'yellow' }); break;
            case 3: this.setState({ Grade: 'NG', GradeColor: 'red' }); break;
            default: this.setState({ Grade: '-1', GradeColor: '#21BA45' }); break;
        }
    }

    CloseInterval() {
        console.log('CloseInterval(msg)')
        clearInterval(timer1);
    }
    OpenInterval() {
        console.log('OpenInterval(msg)')
        timer1 = setInterval(() => this.AjaxUpdateTotalRobotData(), 5000);
    }

    render() {

        const { openA, openB, openC, openD, openE, size, sizeB, HideLabel, CellhandleSearchRes } = this.state
        return (
            <div >


                <Cell CellState={this.state.CellState} HideLabel={this.state.HideLabel}
                    Cell1State={this.state.Cell1State}
                    Cell2State={this.state.Cell2State}
                    Cell3State={this.state.Cell3State}
                    Cell4State={this.state.Cell4State}
                    Cell5State={this.state.Cell5State}
                    Cell6State={this.state.Cell6State}
                    Cell7State={this.state.Cell7State}

                    CloseInterval={() => this.CloseInterval()}
                    OpenInterval={() => this.OpenInterval()}
                />

                <Grid columns={4} centered>
                    <Grid.Row verticalAlign='top'>
                        <Grid.Column width={1}>

                        </Grid.Column>
                        <Grid.Column width={7}>

                        </Grid.Column>
                        <Grid.Column width={3}>


                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row Column={4} >
                        <Grid.Column width={8}>

                        </Grid.Column>
                        <Grid.Column width={5}>

                        </Grid.Column>
                        <Grid.Column width={3}>


                        </Grid.Column>
                    </Grid.Row>


                </Grid>

                <Affix style={{ position: 'absolute', top: '0.3%', right: '43%' }}>
                    <div style={{ margin: '3%', width: '300px' }}>
                        <a style={{ color: 'black', fontWeight: 'bolder', fontSize: 26, marginLeft: '40%' }}>Plant</a>
                    </div>

                </Affix>

                <Affix style={{ position: 'absolute', top: '16%', right: '43%' }}>
                    <div style={{ margin: '3%', width: '300px' }}>
                        <Carousel autoplay vertical="true" style={{ margin: '3%' }}>
                            {this.state.CurrentFaultRobotsArray}
                        </Carousel>
                    </div>

                </Affix>

                <Affix style={{ position: 'absolute', bottom: '35%', left: '2%' }}>
                    <div>
                        <Badge status="success" style={{ textAlign: 'left' }} text="Running" />
                        <br />
                        <Badge status="error" style={{ marginLeft: '1%' }} text="Fault" />
                        <br />
                        <Badge status="default" style={{ marginLeft: '1%' }} text="PowerOff" />
                        <br />
                        <Badge status="warning" style={{ marginLeft: '1%' }} text="Ready" />
                    </div>
                </Affix>


                <Affix style={{ position: 'absolute', bottom: '4%', left: '2%' }}>
                    <Reveal animated='small fade' onClick={this.handleSetting.bind(this)}>
                        {/*<Reveal.Content visible>
                            <Image src='/assets/img/fanucLogo.png' size='big' />
                        </Reveal.Content>*/}
                        <Reveal.Content hidden  >
                            <Image src={fanucImage} size='small' />
                        </Reveal.Content>
                    </Reveal>

                </Affix>

                <Affix style={{ position: 'absolute', top: '3.1%', left: '6%' }}>
                    <Step.Group size='huge' >
                        <Step active  >
                            <Image src={fanucLogo} size='middle' />
                        </Step>
                        <Step active>
                            <Icon name='add to cart' />
                            <Step.Content>
                                <Step.Title>{this.state.TodayAllRobotsOutputs + 'pcs'}</Step.Title>
                                <Step.Description>Yield</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step active>
                            <Icon name='area chart' />
                            <Step.Content>
                                <Step.Title>46.8%</Step.Title>
                                <Step.Description>Completion Rate</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step active>
                            <Icon name='line chart' />
                            <Step.Content>
                                <Step.Title>{(this.state.TodayAllRobotsRunningRatio * 100).toFixed(1) + '%'}</Step.Title>
                                <Step.Description>Equipment Running Rate</Step.Description>
                            </Step.Content>
                        </Step>
                        <Step active>
                            <Icon name='area chart' />
                            <Step.Content>
                                <Step.Title>{this.state.TodayAllPlantSafetyDays + 'days'}</Step.Title>
                                <Step.Description>Safety Days</Step.Description>
                            </Step.Content>
                        </Step>


                        <Step active>
                            <img scr={SFLogo} />
                            <Step.Content>
                                <Image src={SFLogo} size='small' />
                            </Step.Content>
                        </Step>
                    </Step.Group>
                </Affix>


                {/*OpenA Kanban主页菜单   */}
                <Modal size={size} open={openA} onClose={this.closeA} closeIcon='close' basic>
                    <Modal.Header>
                        Setting
                     </Modal.Header>
                    <Modal.Content>
                        <Grid>
                            <Grid.Row columns={3}>
                                <Grid.Column >
                                    Part Serial Search<br />
                                    <Icon size='massive' name='search' onClick={this.handleSearchFuction.bind(this, 10)} />

                                </Grid.Column>
                                <Grid.Column  >
                                    <label >Traceability System</label><br />
                                    <Icon size='massive' name='file text outline' onClick={this.handleHome.bind(this)} />

                                </Grid.Column>
                                <Grid.Column >
                                    Show/Off Cell details
                                    <br />
                                    <Segment compact style={{ marginTop: '5%' }}>
                                        <Radio slider onChange={this.handleHideLabel.bind(this)} defaultChecked={this.state.RadioValue} size='massive' />
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.closeA}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>

                {/*OpenB 查询序列号  */}
                <Modal size={sizeB} open={openB} onClose={this.closeB} closeIcon='close' >
                    <Modal.Header>
                        Part Serial Search
                     </Modal.Header>
                    <Modal.Content>
                        <Grid>
                            <Grid.Row >
                                <Grid.Column width={16}>
                                    <Form onSubmit={this.handleSubmit}>
                                        <a style={{ width: '10%', fontSize: '1.6rem', color: 'black', marginRight: '1%' }}>Part Serial:</a>
                                        <Input placeholder='Input PartSerial Please...' style={{ width: '40%' }} onChange={this.handleChange1} />
                                        <Button style={{ marginLeft: '<1%></1%>' }} circular icon='search' />

                                    </Form>
                                </Grid.Column>

                            </Grid.Row>

                            <Grid.Row >
                                <Grid.Column width={12}>
                                    <VoltageLineChart CellhandleSearchRes={this.state.CellhandleSearchRes} />
                                    <CurrentLineChart CellhandleSearchRes={this.state.CellhandleSearchRes} />
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <a style={{ width: '10%', fontSize: '1.3rem', color: 'black', marginRight: '5%' }}>Pass No:</a>
                                    <Dropdown placeholder='Select PassNo' search selection options={this.state.Part_NumberOptions} style={{ width: '80%', marginBottom: '10px' }} onChange={this.handlePassNoChange} />
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>Part Serial</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{this.state.CellhandleSearchResFirst.Part_Serial || 0}</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>Pass No</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{this.state.CellhandleSearchResFirst.Pass_No || 0}</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>Start Time</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{this.state.CellhandleSearchResFirst.Start_Time || 0}</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>End Time</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{this.state.CellhandleSearchResFirst.End_Time || 0}</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>Acquisition Cycle</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>24ms</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>VoltageSetting Standard Value</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{this.state.CellhandleSearchResFirst.Standard_Voltage_AVGLine || 0 + 'V'}</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>Max&Min Voltage Fluctuation(%)</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>30%</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>CurrentSetting Standard Value</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{this.state.CellhandleSearchResFirst.Standard_Current_AVGLine || 0 + 'A'}</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>Max&Min Current Fluctuation(%)</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>30%</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>Voltage RealOver Percent</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{(this.state.CellhandleSearchResFirst.Voltage_Real_Over_Percent * 100 || 0 * 100).toFixed(2) + '%'}</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>Current RealOver Percent</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{(this.state.CellhandleSearchResFirst.Current_Real_Over_Percent * 100 || 0 * 100).toFixed(2) + '%'}</Button>
                                    </Button.Group>
                                    <Button.Group style={{ width: '100%' }}>
                                        <Button style={{ width: '45%', marginBottom: '10px' }}>DataUpload Time</Button>
                                        <Button positive style={{ width: '45%', marginBottom: '10px' }}>{this.state.CellhandleSearchResFirst.Insert_Time || 0}</Button>
                                    </Button.Group>


                                </Grid.Column>

                            </Grid.Row>
                        </Grid>

                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.closeB}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>





                {/*OpenC 车间选择   */}
                <Modal size={size} open={openC} onClose={this.closeC} closeIcon='close' basic>
                    <Modal.Header>
                        车间选择
                     </Modal.Header>
                    <Modal.Content>
                        <Grid>
                            <Grid.Row columns={3}>
                                <Grid.Column >
                                    <label href="">车间1</label><br />
                                    <Icon size='massive' name='windows' />
                                </Grid.Column>
                                <Grid.Column  >
                                    <label href="">车间2</label><br />
                                    <Icon size='massive' name='android' />
                                </Grid.Column>
                                <Grid.Column >
                                    <label href="">车间3</label><br />
                                    <Icon size='massive' name='apple' />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={3}>
                                <Grid.Column >
                                    <label href="">车间4</label><br />
                                    <Icon size='massive' name='linux' />
                                </Grid.Column>
                                <Grid.Column  >
                                    <label href="">车间5</label><br />
                                    <Icon size='massive' name='facebook square' />
                                </Grid.Column>
                                <Grid.Column >
                                    <label href="">车间6</label><br />
                                    <Icon size='massive' name='twitter' />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={3}>
                                <Grid.Column >
                                    <label href="">车间7</label><br />
                                    <Icon size='massive' name='qq' />
                                </Grid.Column>
                                <Grid.Column  >
                                    <label href="">车间8</label><br />
                                    <Icon size='massive' name='wordpress' />
                                </Grid.Column>
                                <Grid.Column >
                                    <label href="">车间9</label><br />
                                    <Icon size='massive' name='github' />
                                </Grid.Column>
                            </Grid.Row>

                        </Grid>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.closeC}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>

                {/*openD saved successfully*/}
                <Modal size='small' open={openD} onClose={this.closeD} closeIcon='close' basic>
                    <Header icon='archive' content='保存成功' />
                    <Modal.Content>
                        <p>您可以到数据库历史查询检索到此条记录，谢谢！</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' inverted onClick={this.closeD}>
                            <Icon name='checkmark' /> Yes
                         </Button>
                    </Modal.Actions>
                </Modal>

                {/*openE Save failed*/}
                <Modal size='small' open={openE} onClose={this.closeE} closeIcon='close' basic>
                    <Header icon='archive' content='保存失败' />
                    <Modal.Content>
                        <p>您可以联系系统管理员，谢谢！</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' inverted onClick={this.closeE}>
                            <Icon name='checkmark' /> Yes
                         </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }

}

export default fanucKanban;


