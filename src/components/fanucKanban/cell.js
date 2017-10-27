import React from 'react';
import { Dropdown, Button, Modal, Label, Form } from 'semantic-ui-react'
import { Affix, Badge } from 'antd';
import CRUD from '../../unit/ajax.js';
import Gluing from './cellModal/gluing.js';
import SpotWelding from './cellModal/spotWelding.js';
import ArcWelding from './cellModal/arcWelding.js';
import Sanding from './cellModal/sanding.js';
import Stamping from './cellModal/stamping.js';
import fanucLogo from '../../img/fanucLogo1.png'

import './cell.css'
import './index.css';
const crud = new CRUD();
let ZDTsrc = 'http://www.baidu.com'
const cell1Options = [{ key: '1', icon: 'computer', text: 'ZDT', value: 'cell11' }, { key: '2', icon: 'pie graph', text: '工作站状态', value: 'cell12' }]
const cell2Options = [{ key: '1', icon: 'computer', text: 'ZDT', value: 'cell21' }, { key: '2', icon: 'pie graph', text: '工作站状态', value: 'cell22' }]
const cell3Options = [{ key: '1', icon: 'computer', text: 'ZDT', value: 'cell31' }, { key: '2', icon: 'pie graph', text: '工作站状态', value: 'cell32' }]
const cell4Options = [{ key: '1', icon: 'computer', text: 'ZDT', value: 'cell41' }, { key: '2', icon: 'pie graph', text: '工作站状态', value: 'cell42' }]
const cell5Options = [{ key: '1', icon: 'computer', text: 'ZDT', value: 'cell51' }, { key: '2', icon: 'pie graph', text: '工作站状态', value: 'cell52' }]
const cell6Options = [{ key: '1', icon: 'computer', text: 'ZDT', value: 'cell61' }, { key: '2', icon: 'pie graph', text: '工作站状态', value: 'cell62' }]
const cell7Options = [{ key: '1', icon: 'computer', text: 'ZDT', value: 'cell71' }, { key: '2', icon: 'pie graph', text: '工作站状态', value: 'cell72' }]

let CellStateModalTimer = {} //CellstateModal定时任务  10s
//工作站
let CellNo = 1

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open1: false, open2: false, open3: false, open4: false, open5: false,//open5是第二个ZDT模态框
      openD: false,
      GluingCellStateModalOpen: false, //涂胶 模态框
      GluingCellStateModalSize: 'fullscreen',
      SpotWeldingCellStateModalOpen: false, //点焊 模态框
      SpotWeldingCellStateModalSize: 'fullscreen',
      ArcWeldingCellStateModalOpen: false, //弧焊 模态框
      ArcWeldingCellStateModalSize: 'fullscreen',
      SandingCellStateModalOpen: false, //打磨 模态框
      SandingCellStateModalSize: 'fullscreen',
      StampingCellStateModalOpen: false, //冲压 模态框
      StampingCellStateModalSize: 'fullscreen',
      //单个Cell的产量
      CellOutput: 0,
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
    }
  }

  CloseGluingCellStateModal = () => {
    this.setState({ GluingCellStateModalOpen: false }), clearInterval(CellStateModalTimer);
  }
  CloseSpotWeldingCellStateModal = () => {
    this.setState({ SpotWeldingCellStateModalOpen: false }), clearInterval(CellStateModalTimer);
  }
  CloseArcWeldingCellStateModal = () => {
    this.setState({ ArcWeldingCellStateModalOpen: false }), clearInterval(CellStateModalTimer);
  }
  CloseSandingCellStateModal = () => {
    this.setState({ SandingCellStateModalOpen: false }), clearInterval(CellStateModalTimer);
  }
  CloseStampingCellStateModal = () => {
    this.setState({ StampingCellStateModalOpen: false }), clearInterval(CellStateModalTimer);
  }
  //打开chartsModal， 关闭外面的定时任务
  clearIntervalOther = () => {
    console.log('clear CellStateModalTimer')
    clearInterval(CellStateModalTimer);  //clear CellStateModalTimer
    this.props.CloseInterval() //clear timer1
  }
  OpenIntervalOther = () => {
    CellStateModalTimer = setInterval(() => this.AjaxCellStateModal(CellNo), 10000);
    this.props.OpenInterval(); //open timer1
  }

  ZdtModalClose = () => { this.setState({ open1: false }), console.log('ZdtModalClose') }

  //Cell下拉菜单触发对应模态框
  handleClick = async (e, obj) => {
    try {
      let DropdownValue = obj.value;
      let size = 'fullscreen'
      switch (DropdownValue) {
        case 'cell11':  //激光跟踪焊接单元  冲压 stamping
          ZDTsrc = 'http://172.16.29.15/ZDTWebPortal/RobotControllerDetails?controllerID=c962b37a-1ac0-eb2a-f1c7-8c6eb53a74b6&clusterName=LaserTracking&tabIndex=0&language=Chinese&ipAddress=192.168.2.2'
          CellNo = 16
          await this.setState({ size, open1: true });
          break;
        case 'cell12':
          CellNo = 31
          // await this.setState({ size, open2: true });
          await this.setState({ StampingCellStateModalSize: 'fullscreen', StampingCellStateModalOpen: true });
          this.AjaxCellStateModal(CellNo)
          CellStateModalTimer = setInterval(() => this.AjaxCellStateModal(CellNo), 10000);
          break;
        case 'cell21': //碳钢焊接单元  涂胶 Seal
          ZDTsrc = 'http://172.16.29.15/ZDTWebPortal/RobotControllerDetails?controllerID=c962b37a-1ac0-eb2a-f1c7-8c6eb5336a1e&clusterName=Smart%20ARC&tabIndex=0&language=Chinese&ipAddress=172.16.29.165'
          CellNo = 15
          await this.setState({ size, open1: true });
          break;
        case 'cell22':
          CellNo = 30
          await this.setState({ GluingCellStateModalSize: 'fullscreen', GluingCellStateModalOpen: true });
          // await this.setState({ size, open2: true });
          this.AjaxCellStateModal(CellNo)
          CellStateModalTimer = setInterval(() => this.AjaxCellStateModal(CellNo), 10000);
          break;
        case 'cell31': //镀锌板焊接单元   点焊 spot
          ZDTsrc = 'http://172.16.29.15/ZDTWebPortal/RobotControllerDetails?controllerID=c962b37a-1ac0-eb2a-f1c7-8c6eb53adeec&clusterName=Galvanized%20Plate%20Welding&tabIndex=0&language=Chinese&ipAddress=172.16.29.162'
          CellNo = 12
          await this.setState({ size, open1: true });
          break;
        case 'cell32':
          CellNo = 20
          await this.setState({ SpotWeldingCellStateModalSize: 'fullscreen', SpotWeldingCellStateModalOpen: true });
          this.AjaxCellStateModal(CellNo)
          CellStateModalTimer = setInterval(() => this.AjaxCellStateModal(CellNo), 10000);
          break;
        case 'cell41': //不锈钢焊接单元   弧焊 Arc
          ZDTsrc = 'http://172.16.29.15/ZDTWebPortal/RobotControllerDetails?controllerID=c962b37a-1ac0-eb2a-f1c7-8c6eb53adefc&clusterName=Stainless%20Steel%20Welding&tabIndex=0&language=Chinese&ipAddress=172.16.29.163'
          CellNo = 13
          await this.setState({ size, open1: true });
          break;
        case 'cell42':
          CellNo = 13
          // await this.setState({ StampingCellStateModalSize: 'fullscreen', StampingCellStateModalOpen: true });
          await this.setState({ ArcWeldingCellStateModalSize: 'fullscreen', ArcWeldingCellStateModalOpen: true });
          this.AjaxCellStateModal(CellNo)
          CellStateModalTimer = setInterval(() => this.AjaxCellStateModal(CellNo), 10000);
          break;
        case 'cell51': //铝合金焊接单元   弧焊 Arc 
          ZDTsrc = 'http://172.16.29.15/ZDTWebPortal/RobotControllerDetails?controllerID=c962b37a-1ac0-eb2a-f1c7-8c6eb53adefa&clusterName=Aluminium%20alloy%20Welding&tabIndex=0&language=Chinese&ipAddress=172.16.29.164'
          CellNo = 14
          await this.setState({ size, open1: true });
          break;
        case 'cell52':
          CellNo = 14
          // await this.setState({ SandingCellStateModalSize: 'fullscreen', SandingCellStateModalOpen: true });
          await this.setState({ ArcWeldingCellStateModalSize: 'fullscreen', ArcWeldingCellStateModalOpen: true });
          this.AjaxCellStateModal(CellNo)
          CellStateModalTimer = setInterval(() => this.AjaxCellStateModal(CellNo), 10000);
          break;
        case 'cell61': //智能焊接铣削打焊接单元  点焊 spot
          ZDTsrc = 'http://172.16.29.15/ZDTWebPortal/RobotControllerDetails?controllerID=c962b37a-1ac0-eb2a-f1c7-8c6eb53bc1c6&clusterName=Automobile%20Seat%20Welding&tabIndex=0&language=Chinese&ipAddress=172.16.29.161'
          CellNo = 17
          await this.setState({ size, open1: true });
          break;
        case 'cell62':
          CellNo = 20
          await this.setState({ SpotWeldingCellStateModalSize: 'fullscreen', SpotWeldingCellStateModalOpen: true });
          this.AjaxCellStateModal(CellNo);
          CellStateModalTimer = setInterval(() => this.AjaxCellStateModal(CellNo), 10000);
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
          CellStateModalTimer = setInterval(() => this.AjaxCellStateModal(CellNo), 10000);
          break;
        default:
          console.log('非正常值'); break;
      }
    } catch (error) {
      console.log('Cell.js/handleClick/Error:', error)
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

  render() {
    // this.props.transferMsg('rex')  let cell1Options = [{ key: '1',icon: 'computer', text: 'ZDT', value: 'cell11' }, { key: '2', icon: 'pie graph',text: '工作站状态', value: 'cell12' }]
    const { open1, open2, open3, open4, open5, openD, size } = this.state
    return (
      // style={{ boxShadow: '10px 10px 5px rgba(0,0,0,.3)' }}     style={{ borderRadius: '25px  0px 0px 25px', textShadow: '2px 2px 2px rgba(0,0,0,.3)' }}
      <div>
        <Affix style={{ position: 'absolute', top: '29%', left: '79%' }}>
          <Button.Group color={this.props.Cell1State} className='buttonGroup'>
            <Dropdown text='直线七轴冲压'  //不锈钢焊接单元
              search floating labeled button className='icon dropdownCell' options={cell1Options} color='red' onChange={this.handleClick.bind(this)} />
            <Button style={{ backgroundColor: 'orange' }}>冲压</Button>
          </Button.Group>
          <br />
          <Form.Field style={{ display: this.props.HideLabel }}>
            <Label basic pointing className='animated bounceInDown CellLabel' >
              {/*状态：{this.props.CellState[2].State === false ? '正常' : '故障'}<br />*/}
              <p>当班产量：{this.props.Cell1Output || 0 + '件'}
                <Badge status="success" text="计划完成率  98%" />
                <Badge status="error" text="设备开动率 30%" /></p>
              <Badge status="success" text="质量合格率 98%" />
              <Badge status="warning" text="停机率 80%" />
              <Badge status="success" text="安全生产98天" />
            </Label>
          </Form.Field>
        </Affix>

        <Affix style={{ position: 'absolute', top: '41%', left: '79%' }}>
          <Button.Group color={this.props.Cell2State} className='buttonGroup' >
            <Dropdown text='ISD 涂胶'  //激光跟踪焊接展示单元
              search floating labeled button className='icon dropdownCell' options={cell2Options} onChange={this.handleClick.bind(this)} >
            </Dropdown>
            <Button style={{ backgroundColor: 'orange' }}>涂胶</Button>
          </Button.Group>
          <br />
          <Form.Field style={{ display: this.props.HideLabel }}>
            <Label basic pointing className='animated bounceInDown CellLabel'>
              <p>当班产量：{this.props.Cell2Output || 0 + '件'}<Badge status="success" text="计划完成率  90%" />
                <Badge status="error" text="设备开动率 30%" /></p>
              <Badge status="success" text="质量合格率 98%" />
              <Badge status="warning" text="停机率 80%" />
              <Badge status="success" text="安全生产98天" />
            </Label>
          </Form.Field>
        </Affix>

        <Affix style={{ position: 'absolute', top: '53%', left: '79%' }}>
          <Button.Group color={this.props.Cell3State} className='buttonGroup'>
            <Dropdown text='柔性   点焊'  //智能焊接铣削打磨系统
              search floating labeled button className='icon dropdownCell' options={cell3Options} color='red' onChange={this.handleClick.bind(this)} />
            <Button style={{ backgroundColor: 'orange' }}>点焊</Button>
          </Button.Group>
          <br />
          <Form.Field style={{ display: this.props.HideLabel }}>
            <Label basic pointing className='animated bounceInDown CellLabel'>
              <p>当班产量：{this.props.Cell3Output || 0 + '件'}<Badge status="success" text="计划完成率  98%" />
                <Badge status="error" text="设备开动率 30%" /></p>
              <Badge status="success" text="质量合格率 98%" />
              <Badge status="warning" text="停机率 80%" />
              <Badge status="success" text="安全生产98天" />
            </Label>
          </Form.Field>
        </Affix>

        <Affix style={{ position: 'absolute', top: '65%', left: '79%' }}>
          <Button.Group color={this.props.Cell4State} className='buttonGroup'>
            <Dropdown text='不锈钢 焊接' //碳钢焊接单元
              search floating labeled button className='icon dropdownCell' options={cell4Options} color='red' onChange={this.handleClick.bind(this)} />
            <Button style={{ backgroundColor: 'orange' }}>弧焊</Button>
          </Button.Group>
          <br />
          <Form.Field style={{ display: this.props.HideLabel }}>
            <Label basic pointing className='animated bounceInDown CellLabel'>
              <p>当班产量：{this.props.Cell4Output || 0 + '件'}<Badge status="success" text="计划完成率  98%" />
                <Badge status="error" text="设备开动率 30%" /></p>
              <Badge status="success" text="质量合格率 98%" />
              <Badge status="warning" text="停机率 80%" />
              <Badge status="success" text="安全生产98天" />
            </Label>
          </Form.Field>
        </Affix>

        <Affix style={{ position: 'absolute', top: '77%', left: '79%' }}>
          <Button.Group color={this.props.Cell5State} className='buttonGroup'>
            <Dropdown text='铝合金 焊接' //碳钢焊接单元
              search floating labeled button className='icon dropdownCell' options={cell5Options} color='red' onChange={this.handleClick.bind(this)} />
            <Button style={{ backgroundColor: 'orange' }}>弧焊</Button>
          </Button.Group>
          <br />
          <Form.Field style={{ display: this.props.HideLabel }}>
            <Label basic pointing className='animated bounceInDown CellLabel'>
              <p>当班产量：{this.props.Cell5Output || 0 + '件'}<Badge status="success" text="计划完成率  98%" />
                <Badge status="error" text="设备开动率 30%" /></p>
              <Badge status="success" text="质量合格率 98%" />
              <Badge status="warning" text="停机率 80%" />
              <Badge status="success" text="安全生产98天" />
            </Label>
          </Form.Field>
        </Affix>

        {/*ZDT Modal1*/}
        <Modal size={size} open={open1} onClose={this.ZdtModalClose} closeIcon='close' basic>
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
            <Button negative onClick={this.ZdtModalClose}>
              Close
         </Button>
          </Modal.Actions>
        </Modal>

        <Gluing
          GluingCellStateModalSize={this.state.GluingCellStateModalSize} GluingCellStateModalOpen={this.state.GluingCellStateModalOpen}
          CellNo={CellNo}
          CellOutput={this.state.CellOutput}
          TodayRobotStateDistribution={this.state.TodayRobotStateDistribution}
          TodayRobotRunningRatio={this.state.TodayRobotRunningRatio}
          TodayRobotOutputsByPart={this.state.TodayRobotOutputsByPart}
          TodayRobotAlarmsDistribution={this.state.TodayRobotAlarmsDistribution}
          TodayRobotOutputPerHour={this.state.TodayRobotOutputPerHour}
          SevenDaysRobotOutputs={this.state.SevenDaysRobotOutputs}
          TodayRobotStopInMinutesPerHour={this.state.TodayRobotStopInMinutesPerHour}
          CloseGluingCellStateModal={this.CloseGluingCellStateModal} //子组件调用父组件方法
          clearIntervalOther={this.clearIntervalOther}  //子组件关闭父组件定时任务
          OpenIntervalOther={this.OpenIntervalOther} //子组件打开父组件定时任务
        />
        <SpotWelding
          SpotWeldingCellStateModalSize={this.state.SpotWeldingCellStateModalSize} SpotWeldingCellStateModalOpen={this.state.SpotWeldingCellStateModalOpen}
          CellNo={CellNo}
          CellOutput={this.state.CellOutput}
          TodayRobotStateDistribution={this.state.TodayRobotStateDistribution}
          TodayRobotRunningRatio={this.state.TodayRobotRunningRatio}
          TodayRobotOutputsByPart={this.state.TodayRobotOutputsByPart}
          TodayRobotAlarmsDistribution={this.state.TodayRobotAlarmsDistribution}
          TodayRobotOutputPerHour={this.state.TodayRobotOutputPerHour}
          SevenDaysRobotOutputs={this.state.SevenDaysRobotOutputs}
          TodayRobotStopInMinutesPerHour={this.state.TodayRobotStopInMinutesPerHour}
          CloseSpotWeldingCellStateModal={this.CloseSpotWeldingCellStateModal} //子组件调用父组件方法
          clearIntervalOther={this.clearIntervalOther}  //子组件关闭父组件定时任务
          OpenIntervalOther={this.OpenIntervalOther} //子组件打开父组件定时任务
        />
        <ArcWelding
          ArcWeldingCellStateModalSize={this.state.ArcWeldingCellStateModalSize} ArcWeldingCellStateModalOpen={this.state.ArcWeldingCellStateModalOpen}
          CellNo={CellNo}
          CellOutput={this.state.CellOutput}
          TodayRobotStateDistribution={this.state.TodayRobotStateDistribution}
          TodayRobotRunningRatio={this.state.TodayRobotRunningRatio}
          TodayRobotOutputsByPart={this.state.TodayRobotOutputsByPart}
          TodayRobotAlarmsDistribution={this.state.TodayRobotAlarmsDistribution}
          TodayRobotOutputPerHour={this.state.TodayRobotOutputPerHour}
          SevenDaysRobotOutputs={this.state.SevenDaysRobotOutputs}
          TodayRobotStopInMinutesPerHour={this.state.TodayRobotStopInMinutesPerHour}
          CloseArcWeldingCellStateModal={this.CloseArcWeldingCellStateModal} //子组件调用父组件方法
          clearIntervalOther={this.clearIntervalOther}  //子组件关闭父组件定时任务
          OpenIntervalOther={this.OpenIntervalOther} //子组件打开父组件定时任务
        />
        <Sanding
          SandingCellStateModalSize={this.state.SandingCellStateModalSize} SandingCellStateModalOpen={this.state.SandingCellStateModalOpen}
          CellNo={CellNo}
          CellOutput={this.state.CellOutput}
          TodayRobotStateDistribution={this.state.TodayRobotStateDistribution}
          TodayRobotRunningRatio={this.state.TodayRobotRunningRatio}
          TodayRobotOutputsByPart={this.state.TodayRobotOutputsByPart}
          TodayRobotAlarmsDistribution={this.state.TodayRobotAlarmsDistribution}
          TodayRobotOutputPerHour={this.state.TodayRobotOutputPerHour}
          SevenDaysRobotOutputs={this.state.SevenDaysRobotOutputs}
          TodayRobotStopInMinutesPerHour={this.state.TodayRobotStopInMinutesPerHour}
          CloseSandingCellStateModal={this.CloseSandingCellStateModal} //子组件调用父组件方法
          clearIntervalOther={this.clearIntervalOther}  //子组件关闭父组件定时任务
          OpenIntervalOther={this.OpenIntervalOther} //子组件打开父组件定时任务
        />
        <Stamping
          StampingCellStateModalSize={this.state.StampingCellStateModalSize} StampingCellStateModalOpen={this.state.StampingCellStateModalOpen}
          CellNo={CellNo}
          CellOutput={this.state.CellOutput}
          TodayRobotStateDistribution={this.state.TodayRobotStateDistribution}
          TodayRobotRunningRatio={this.state.TodayRobotRunningRatio}
          TodayRobotOutputsByPart={this.state.TodayRobotOutputsByPart}
          TodayRobotAlarmsDistribution={this.state.TodayRobotAlarmsDistribution}
          TodayRobotOutputPerHour={this.state.TodayRobotOutputPerHour}
          SevenDaysRobotOutputs={this.state.SevenDaysRobotOutputs}
          TodayRobotStopInMinutesPerHour={this.state.TodayRobotStopInMinutesPerHour}
          CloseStampingCellStateModal={this.CloseStampingCellStateModal} //子组件调用父组件方法
          clearIntervalOther={this.clearIntervalOther}  //子组件关闭父组件定时任务
          OpenIntervalOther={this.OpenIntervalOther} //子组件打开父组件定时任务
        />

      </div>
    )
  }
}

export default Cell;