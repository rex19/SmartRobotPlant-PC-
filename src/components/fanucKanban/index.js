import React from 'react';
import './index.css';

import { Carousel, Affix, Badge } from 'antd';
import { Radio, Segment, Header, Icon, Modal, Button, Grid, Step, Image, Reveal, Rating, Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import Cell from './cell.js';

import VoltageLineChart from '../chart/voltageLineChart.js';
import CurrentLineChart from '../chart/currentLineChart.js';
import CRUD from '../../unit/ajax.js';

import fanucImage from '../../img/fanuclogoTransparent.png'
import fanucLogo2 from '../../img/SMARTLINK.png'
/**
 * tracebilityImg  追溯图片
 */
import tracebilityImg from '../../img/tracebilityImg.png'

import SFLogo from '../../img/SFLogo.png'
import fanucLogo from '../../img/logo.png'

import arcWeldingImg from '../../img/arcWelding2.jpg'
import spotWeldingImg from '../../img/spotWelding.jpg'
import sealImg from '../../img/seal.jpg'
import polishImg from '../../img/polish.jpg'
import pressImg from '../../img/press.jpg'


import ArcWeldingModal from './modalSearch/arcWeldingModal'
import SpotWeldingModal from './modalSearch/spotWeldingModal'
import GluingModal from './modalSearch/gluingModal'
import SandingModal from './modalSearch/sandingModal'
import StampingModal from './modalSearch/stampingModal'

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
    //初始化state
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
      Part_NumberOptions: [],//焊缝号下拉菜单数组初始化
      //robot故障
      CurrentFaultRobotsArray: <div>  <Segment inverted color='green' secondary >机器人无故障 </Segment></div>,
      Part_SerialValue: -1,
      Part_NumberValue: 1,
      //多个焊缝号Table
      PassNoTable: [<Table.Row>
        <Table.Cell>暂无数据</Table.Cell>
        <Table.Cell>暂无数据</Table.Cell>
      </Table.Row>],
      ArcWeldingModalOpen: false,
      SandingModalOpen: false, //打磨查询模态框
      StampingModalOpen: false, //打磨查询模态框
      AlertModalOpen: false,  //查询提示无工件信息
    }
  }
  //show为打开模态框的方法，close关闭模态框
  show1 = (size) => () => { this.setState({ size, openA: true }), console.log('show1') }
  // showB = (sizeB) => () => { this.setState({ sizeB, openB: true }), console.log('showB'), this.OpenInterval() }

  closeA = () => { this.setState({ openA: false }), console.log('closeA') }
  closeB = () => { this.setState({ openB: false, CellhandleSearchRes: {}, CellhandleSearchResFirst: [] }), console.log('closeB'), clearInterval(timer8); }
  closeC = () => { this.setState({ openC: false }), console.log('closeC') }
  closeD = () => { this.setState({ openD: false }), console.log('closeD') }
  closeE = () => { this.setState({ openE: false }), console.log('closeE') }

  //关掉弧焊模查询模态框
  CloseArcWeldingModal = () => {
    this.setState({ ArcWeldingModalOpen: false, CellhandleSearchRes: {}, CellhandleSearchResFirst: [] })
  }
  //关掉打磨模查询模态框
  CloseSpotWeldingModal = () => {
    this.setState({ SpotWeldingModalOpen: false, CellhandleSearchRes: {}, CellhandleSearchResFirst: [] })
  }
  //关掉冲压模查询模态框
  CloseGluingModal = () => {
    this.setState({ GluingModalOpen: false, CellhandleSearchRes: {}, CellhandleSearchResFirst: [] })
  }
  //关掉打磨模查询模态框
  CloseSandingModal = () => {
    this.setState({ SandingModalOpen: false, CellhandleSearchRes: {}, CellhandleSearchResFirst: [] })
  }
  //关掉冲压模查询模态框
  CloseStampingModal = () => {
    this.setState({ StampingModalOpen: false, CellhandleSearchRes: {}, CellhandleSearchResFirst: [] })
  }


  handleChangeSearch = (value) => {
    console.log('handleChangeSearch1', value)
    this.setState({ Part_SerialValue: value });
  }

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
      arr2 = [<div>  <Segment inverted color='green' secondary >机器人无故障 </Segment></div>]
    } else {
      arr2 = CurrentFaultRobotsResponseArray.map(function (item, index, input) {
        return <div key={index}><Segment inverted color='red' secondary> {item} 故障中 </Segment></div>;
      })
    }
    this.setState({
      TodayAllRobotsOutputs: AjaxTodayAllRobotsOutputsResponse.data.OutputsQuantity,
      TodayAllRobotsRunningRatio: AjaxTodayAllRobotsRunningRatioResponse.data.RunningRatio,
      TodayAllPlantSafetyDays: AjaxPlantSafetyDaysResponse.data.TillNowTotalSafetyDays,
      CurrentFaultRobotsArray: arr2,
      CellState: AjaxRobotCurrentInfoResponse.data
    })
    //判断每个Cell对应的状态 更新到state
    if (this.state.CellState !== undefined) {
      //1号
      if (this.state.CellState[20].State === 1) {
        this.setState({ Cell1State: 'grey', Cell1Output: this.state.CellState[20].Output })  //powerOff
      } else if (this.state.CellState[20].State === 2) {
        this.setState({ Cell1State: 'red', Cell1Output: this.state.CellState[20].Output })  //Fault
      } else if (this.state.CellState[20].State === 3) {
        this.setState({ Cell1State: 'yellow', Cell1Output: this.state.CellState[20].Output })  //Ready
      } else if (this.state.CellState[20].State === 4) {
        this.setState({ Cell1State: 'green', Cell1Output: this.state.CellState[20].Output })  //Running
      }
      //2号
      if (this.state.CellState[19].State === 1) {
        this.setState({ Cell2State: 'grey', Cell2Output: this.state.CellState[19].Output })  //powerOff
      } else if (this.state.CellState[19].State === 2) {
        this.setState({ Cell2State: 'red', Cell2Output: this.state.CellState[19].Output })  //Fault
      } else if (this.state.CellState[19].State === 3) {
        this.setState({ Cell2State: 'yellow', Cell2Output: this.state.CellState[19].Output })  //Ready
      } else if (this.state.CellState[19].State === 4) {
        this.setState({ Cell2State: 'green', Cell2Output: this.state.CellState[19].Output })  //Running
      }
      //3号
      if (this.state.CellState[12].State === 1) {
        this.setState({ Cell3State: 'grey', Cell3Output: this.state.CellState[12].Output })  //powerOff
      } else if (this.state.CellState[12].State === 2) {
        this.setState({ Cell3State: 'red', Cell3Output: this.state.CellState[12].Output })  //Fault
      } else if (this.state.CellState[12].State === 3) {
        this.setState({ Cell3State: 'yellow', Cell3Output: this.state.CellState[12].Output })  //Ready
      } else if (this.state.CellState[12].State === 4) {
        this.setState({ Cell3State: 'green', Cell3Output: this.state.CellState[12].Output })  //Running
      }
      //4号
      if (this.state.CellState[6].State === 1) {
        this.setState({ Cell4State: 'grey', Cell4Output: this.state.CellState[6].Output })  //powerOff
      } else if (this.state.CellState[6].State === 2) {
        this.setState({ Cell4State: 'red', Cell4Output: this.state.CellState[6].Output })  //Fault
      } else if (this.state.CellState[6].State === 3) {
        this.setState({ Cell4State: 'yellow', Cell4Output: this.state.CellState[6].Output })  //Ready
      } else if (this.state.CellState[6].State === 4) {
        this.setState({ Cell4State: 'green', Cell4Output: this.state.CellState[6].Output })  //Running
      }
      //5号
      if (this.state.CellState[7].State === 1) {
        this.setState({ Cell5State: 'grey', Cell5Output: this.state.CellState[7].Output })  //powerOff
      } else if (this.state.CellState[7].State === 2) {
        this.setState({ Cell5State: 'red', Cell5Output: this.state.CellState[7].Output })  //Fault
      } else if (this.state.CellState[7].State === 3) {
        this.setState({ Cell5State: 'yellow', Cell5Output: this.state.CellState[7].Output })  //Ready
      } else if (this.state.CellState[7].State === 4) {
        this.setState({ Cell5State: 'green', Cell5Output: this.state.CellState[7].Output })  //Running
      }

    }

    timer1 = setInterval(() => this.AjaxUpdateTotalRobotData(), 5000);
  }

  //定时任务持续刷新
  AjaxUpdateTotalRobotData = async () => {
    console.log('time1,5s')
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
        arr2 = [<div>  <Segment inverted color='green' secondary >Robot无故障 </Segment></div>]
      } else {
        arr2 = CurrentFaultRobotsResponseArray.map(function (item, index, input) {
          return <div key={index}><Segment inverted color='red' secondary> {item} 故障中 </Segment></div>;
        })
      }

      this.setState({
        TodayAllRobotsOutputs: AjaxTodayAllRobotsOutputsResponse.data.OutputsQuantity,
        TodayAllRobotsRunningRatio: AjaxTodayAllRobotsRunningRatioResponse.data.RunningRatio,
        TodayAllPlantSafetyDays: AjaxPlantSafetyDaysResponse.data.TillNowTotalSafetyDays,
        CurrentFaultRobotsArray: arr2,
        CellState: AjaxRobotCurrentInfoResponse.data,
      })
      //判断每个Cell对应的状态 更新到state
      if (this.state.CellState !== undefined) {
        //1号
        if (this.state.CellState[20].State === 1) {
          this.setState({ Cell1State: 'grey', Cell1Output: this.state.CellState[20].Output })  //powerOff
        } else if (this.state.CellState[20].State === 2) {
          this.setState({ Cell1State: 'red', Cell1Output: this.state.CellState[20].Output })  //Fault
        } else if (this.state.CellState[20].State === 3) {
          this.setState({ Cell1State: 'yellow', Cell1Output: this.state.CellState[20].Output })  //Ready
        } else if (this.state.CellState[20].State === 4) {
          this.setState({ Cell1State: 'green', Cell1Output: this.state.CellState[20].Output })  //Running
        }
        //2号
        if (this.state.CellState[19].State === 1) {
          this.setState({ Cell2State: 'grey', Cell2Output: this.state.CellState[19].Output })  //powerOff
        } else if (this.state.CellState[19].State === 2) {
          this.setState({ Cell2State: 'red', Cell2Output: this.state.CellState[19].Output })  //Fault
        } else if (this.state.CellState[19].State === 3) {
          this.setState({ Cell2State: 'yellow', Cell2Output: this.state.CellState[19].Output })  //Ready
        } else if (this.state.CellState[19].State === 4) {
          this.setState({ Cell2State: 'green', Cell2Output: this.state.CellState[19].Output })  //Running
        }
        //3号
        if (this.state.CellState[12].State === 1) {
          this.setState({ Cell3State: 'grey', Cell3Output: this.state.CellState[12].Output })  //powerOff
        } else if (this.state.CellState[12].State === 2) {
          this.setState({ Cell3State: 'red', Cell3Output: this.state.CellState[12].Output })  //Fault
        } else if (this.state.CellState[12].State === 3) {
          this.setState({ Cell3State: 'yellow', Cell3Output: this.state.CellState[12].Output })  //Ready
        } else if (this.state.CellState[12].State === 4) {
          this.setState({ Cell3State: 'green', Cell3Output: this.state.CellState[12].Output })  //Running
        }
        //4号
        if (this.state.CellState[6].State === 1) {
          this.setState({ Cell4State: 'grey', Cell4Output: this.state.CellState[6].Output })  //powerOff
        } else if (this.state.CellState[6].State === 2) {
          this.setState({ Cell4State: 'red', Cell4Output: this.state.CellState[6].Output })  //Fault
        } else if (this.state.CellState[6].State === 3) {
          this.setState({ Cell4State: 'yellow', Cell4Output: this.state.CellState[6].Output })  //Ready
        } else if (this.state.CellState[6].State === 4) {
          this.setState({ Cell4State: 'green', Cell4Output: this.state.CellState[6].Output })  //Running
        }
        //5号
        if (this.state.CellState[7].State === 1) {
          this.setState({ Cell5State: 'grey', Cell5Output: this.state.CellState[7].Output })  //powerOff
        } else if (this.state.CellState[7].State === 2) {
          this.setState({ Cell5State: 'red', Cell5Output: this.state.CellState[7].Output })  //Fault
        } else if (this.state.CellState[7].State === 3) {
          this.setState({ Cell5State: 'yellow', Cell5Output: this.state.CellState[7].Output })  //Ready
        } else if (this.state.CellState[7].State === 4) {
          this.setState({ Cell5State: 'green', Cell5Output: this.state.CellState[7].Output })  //Running
        }

      }
    } catch (error) {
      console.log('fanucKanban/AjaxUpdateTotalRobotData/ajax:', error)
    }
  }


  //二层主界面菜单Modal
  handleSetting() {
    this.setState({ size, openA: true });
  }
  //二层查询序列号Modal
  handleSearchFuction = (key) => {
    this.setState({ sizeB, [key]: true });
    this.CloseInterval();
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

  //跳转到第三层
  handleHome() {
    location.href = 'http://172.16.29.188/FANUC/UnitListTrace.html'
    // location.href = 'http://dsm.smart-flow.cn:7001/FANUC/UnitListTrace.html'
  }
  GoBack(){
    location.href = 'http://172.16.29.188:60/fanuc2'
  }
  //显示/隐藏 每个Cell的详细信息
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
  //序列号和焊缝号变更触发方法
  // handleChange1 = (e, { name, value }) => { this.setState({ Part_SerialValue: value }); }
  // handleChange2 = (e, { name, value }) => { this.setState({ Part_NumberValue: value }); }
  //点击查询根据序列号和焊缝号获取数据
  handleSubmit = async (e) => {
    console.log('handleSubmit', e)
    e.preventDefault()
    let Serial_Part = -1
    if (this.state.Part_SerialValue === -1) {
      alert('序列号选项不能为空');
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
  //插入一条记录
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
  //更换焊缝号重新获取数据
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


  //由于子组件打开模态框，父组件定时任务取消。 子组件关闭模态框  父组件重开定时任务
  CloseInterval() {
    console.log('clear timer1')
    clearInterval(timer1);
  }
  OpenInterval() {
    console.log('open timer1')
    timer1 = setInterval(() => this.AjaxUpdateTotalRobotData(), 5000);
  }
  AlertModalOpen = () => {
    this.setState({ AlertModalOpen: true })
  }
  AlertModalClose = () => {
    this.setState({ AlertModalOpen: false })
  }
  render() {
    const { openA, openB, openC, openD, openE, size, sizeB, HideLabel, CellhandleSearchRes } = this.state
    return (
      <div className='divClass'>


        <Cell CellState={this.state.CellState} HideLabel={this.state.HideLabel}
          Cell1State={this.state.Cell1State}
          Cell2State={this.state.Cell2State}
          Cell3State={this.state.Cell3State}
          Cell4State={this.state.Cell4State}
          Cell5State={this.state.Cell5State}
          // Cell6State={this.state.Cell6State}
          // Cell7State={this.state.Cell7State}
          Cell1Output={this.state.Cell1Output}
          Cell2Output={this.state.Cell2Output}
          Cell3Output={this.state.Cell3Output}
          Cell4Output={this.state.Cell4Output}
          Cell5Output={this.state.Cell5Output}
          CloseInterval={() => this.CloseInterval()}
          OpenInterval={() => this.OpenInterval()}
        />

        {/*顶部文字说明 */}
        <Affix style={{ position: 'absolute', top: '17%', right: '4%' }}>
          <div className=' topTextTitleDiv ' onMouseOver={() => console.log('yesyesyes')}>
            <a className='topTextTitle text3D ' onClick={this.GoBack} >车间</a>
            {/* <h1 class="text3D"><span>Gradient 3D text</span></h1> */}
          </div>
        </Affix>
        {/*机器人故障走马灯*/}
        <Affix style={{ position: 'absolute', top: '13%', right: '22%' }}>
          <div style={{ margin: '3%', width: '300px' }}>
            <Carousel autoplay vertical="true" style={{ margin: '3%', boxShadow: '0 15px 20px rgba(0, 0, 0, 1)' }}>
              {this.state.CurrentFaultRobotsArray}
            </Carousel>
          </div>
        </Affix>
        {/*左边每个颜色的注释*/}
        <Affix style={{ position: 'absolute', bottom: '5%', right: '3%' }}>
          <div >
            <Badge status="success" text={<a style={{ color: 'white' }}>运行中</a>} />
            <br />
            <Badge status="error" text={<a style={{ color: 'white' }}>故障中</a>} />
            <br />
            <Badge status="default" text={<a style={{ color: 'white' }}>停机中</a>} />
            <br />
            <Badge status="warning" text={<a style={{ color: 'white' }}>等待中</a>} />
          </div>
        </Affix>

        {/*机器人按钮 打开Setting模态框*/}
        <Affix style={{ position: 'absolute', bottom: '4%', left: '2%' }}>
          <Reveal animated='small fade' onClick={this.handleSetting.bind(this)}>
            <Reveal.Content hidden  >
              <Image src={fanucImage} width='90px' className="robotLogo" />
            </Reveal.Content>
          </Reveal>
        </Affix>
        {/*Label标签*/}
        <Affix style={{ position: 'absolute', top: '1.1%', left: '8%' }}>
          <Step.Group size='huge' style={{ borderRadius: '50%', boxShadow: '0 55px 16px rgba(0, 0, 0, 0.4)' }} >
            <Step active style={{ borderRadius: '50px 0 0 50px' }}>
              <Image src={fanucLogo} />
              {/* <Image src={fanucLogo} size='medium' /> */}
            </Step>
            <Step active>
              <Icon name='add to cart' />
              <Step.Content >
                <Step.Title>{this.state.TodayAllRobotsOutputs + '件'}</Step.Title>
                <Step.Description>产量</Step.Description>
              </Step.Content>
            </Step>

            <Step active>
              <Icon name='area chart' />
              <Step.Content>
                <Step.Title>16.5%</Step.Title>
                <Step.Description >计划完成率</Step.Description>
              </Step.Content>
            </Step>
            <Step active>
              <Icon name='area chart' />
              <Step.Content>
                <Step.Title>96.8%</Step.Title>
                <Step.Description>质量合格率</Step.Description>
              </Step.Content>
            </Step>

            <Step active>
              <Icon name='line chart' />
              <Step.Content>
                <Step.Title>{(this.state.TodayAllRobotsRunningRatio * 100).toFixed(1) + '%'}</Step.Title>
                <Step.Description>设备开动率</Step.Description>
              </Step.Content>
            </Step>
            <Step active>
              <Icon name='area chart' />
              <Step.Content>
                <Step.Title>{this.state.TodayAllPlantSafetyDays + '日'}</Step.Title>
                <Step.Description>安全生产时间</Step.Description>
              </Step.Content>
            </Step>
            <Step active style={{ borderRadius: '0px 50px 50px 0px' }}>
              <Step.Content>
                <Image src={SFLogo} size='small' />
              </Step.Content>
            </Step>
          </Step.Group>
        </Affix>


        {/*OpenA Kanban主页菜单   */}
        <Modal size={size} open={openA} onClose={this.closeA} closeIcon='close' basic>
          <Modal.Header>
            搜索
                     </Modal.Header>
          <Modal.Content>
            <Grid>
              <Grid.Row columns={3}>
                <Grid.Column >
                  <div className='MenuSubDiv'>
                    <label className='MenuSubDivLabelName'>弧焊搜索</label><br />
                    <img width='50%' className='MenuSubDivImg' onClick={this.handleSearchFuction.bind(this, 'ArcWeldingModalOpen')} src={arcWeldingImg} />
                  </div>
                </Grid.Column>
                <Grid.Column >
                  <div className='MenuSubDiv'>
                    <label className='MenuSubDivLabelName'>点焊搜索</label><br />
                    <img width='50%' className='MenuSubDivImg' onClick={this.handleSearchFuction.bind(this, 'SpotWeldingModalOpen')} src={spotWeldingImg} />
                  </div>
                </Grid.Column>
                <Grid.Column >
                  <div className='MenuSubDiv'>
                    <label className='MenuSubDivLabelName'>涂胶搜索</label><br />
                    <img width='50%' className='MenuSubDivImg' onClick={this.handleSearchFuction.bind(this, 'GluingModalOpen')} src={sealImg} />
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column >
                  <div className='MenuSubDiv'>
                    <label className='MenuSubDivLabelName'>打磨搜索</label><br />
                    {/* <Icon size='massive' name='search' onClick={this.handleSearchFuction.bind(this, 10)} /> */}
                    <img width='50%' className='MenuSubDivImg' onClick={this.handleSearchFuction.bind(this, 'SandingModalOpen')} src={polishImg} />
                  </div>
                </Grid.Column>
                <Grid.Column >
                  <div className='MenuSubDiv'>
                    <label className='MenuSubDivLabelName'>冲压搜索</label><br />
                    <img width='50%' className='MenuSubDivImg' onClick={this.handleSearchFuction.bind(this, 'StampingModalOpen')} src={pressImg} />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Header>
            设置
                       </Modal.Header>
          <Modal.Content>
            <Grid>
              <Grid.Row columns={3}>
                <Grid.Column  >
                  <div className='MenuSubDiv'>
                    <label className='MenuSubDivLabelName'>追溯系统</label><br />
                    <Icon name='table' size='massive' style={{ marginLeft: '32%' }} onClick={this.handleHome} />
                  </div>
                </Grid.Column>
                <Grid.Column >
                  <div className='MenuSubDiv'>
                    <label className='MenuSubDivLabelName'> 工作站明细</label><br />
                    <Segment compact className='MenuSubDivIcon' >
                      <Radio toggle onChange={this.handleHideLabel.bind(this)} defaultChecked={this.state.RadioValue} size='massive' />
                    </Segment>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.closeA}>
              关闭
                        </Button>
          </Modal.Actions>
        </Modal>


        {/*openD saved successfully
           <img width='50%' className='MenuSubDivImg' onClick={this.handleHome} src={tracebilityImg} />
        */}
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
        <ArcWeldingModal
          ArcWeldingModalOpen={this.state.ArcWeldingModalOpen}
          CloseArcWeldingModal={this.CloseArcWeldingModal}
          CellhandleSearchResFirst={this.state.CellhandleSearchResFirst}
          Part_NumberOptions={this.state.Part_NumberOptions}
          handleSubmit={e => this.handleSubmit(e)}
          handleChangeSearch={value => this.handleChangeSearch(value)}
          AlertModalOpen={() => this.AlertModalOpen()}
        />
        <SpotWeldingModal
          SpotWeldingModalOpen={this.state.SpotWeldingModalOpen}
          CloseSpotWeldingModal={this.CloseSpotWeldingModal}
          CellhandleSearchResFirst={this.state.CellhandleSearchResFirst}
          Part_NumberOptions={this.state.Part_NumberOptions}
          handleSubmit={e => this.handleSubmit(e)}
          handleChangeSearch={value => this.handleChangeSearch(value)}
          AlertModalOpen={() => this.AlertModalOpen()}
        />
        <GluingModal
          GluingModalOpen={this.state.GluingModalOpen}
          CloseGluingModal={this.CloseGluingModal}
          CellhandleSearchResFirst={this.state.CellhandleSearchResFirst}
          Part_NumberOptions={this.state.Part_NumberOptions}
          handleSubmit={e => this.handleSubmit(e)}
          handleChangeSearch={value => this.handleChangeSearch(value)}
          AlertModalOpen={() => this.AlertModalOpen()}
        />
        <SandingModal
          SandingModalOpen={this.state.SandingModalOpen}
          CloseSandingModal={this.CloseSandingModal}
          CellhandleSearchResFirst={this.state.CellhandleSearchResFirst}
          Part_NumberOptions={this.state.Part_NumberOptions}
          handleSubmit={e => this.handleSubmit(e)}
          handleChangeSearch={value => this.handleChangeSearch(value)}
          AlertModalOpen={() => this.AlertModalOpen()}
        />
        <StampingModal
          StampingModalOpen={this.state.StampingModalOpen}
          CloseStampingModal={this.CloseStampingModal}
          CellhandleSearchResFirst={this.state.CellhandleSearchResFirst}
          Part_NumberOptions={this.state.Part_NumberOptions}
          handleSubmit={e => this.handleSubmit(e)}
          handleChangeSearch={value => this.handleChangeSearch(value)}
          AlertModalOpen={() => this.AlertModalOpen()}
        />

        <Modal size='small' open={this.state.AlertModalOpen} onClose={this.AlertModalClose} closeIcon='close' basic>
          <Modal.Header icon='archive' content='警告' />
          <Modal.Content>
            <p>无此工件信息，谢谢！</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' inverted onClick={this.AlertModalClose}>
              <Icon name='checkmark' /> 退出
         </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }

}

export default fanucKanban;


