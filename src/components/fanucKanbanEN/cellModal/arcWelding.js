import React from 'react';
import { Dropdown, Button, Modal, Grid, Table, Icon, Segment, Label } from 'semantic-ui-react'
import { Carousel } from 'antd';
import CRUD from '../../../unit/ajax.js';
import RobotRunningStatePieChart from '../../chartEN/robotRunningStatePieChart.js'
import RobotUtilizationPieChart from '../../chartEN/robotUtilizationPieChart.js'
import RobotAlarmPieChart from '../../chartEN/robotAlarmPieChart.js'
import RobotProductionPieChart from '../../chartEN/robotProductionPieChart.js'
import RobotDayDowntimeBarChart from '../../chartEN/robotDayDowntimeBarChart.js'
import RobotDayOutputBarChart from '../../chartEN/robotDayOutputBarChart.js'
import RobotWeekOutputBarChart from '../../chartEN/robotWeekOutputBarChart.js'
import VoltageLineChart from '../../chartEN/voltageLineChart.js';
import CurrentLineChart from '../../chartEN/currentLineChart.js';
import '../index.css'

const crud = new CRUD();
let Part_NumberOptionsArray = [];
let OldCellPart_Serial = [<div><Segment inverted color='green' secondary >Nothing</Segment></div>]//判断新工件生产 声明旧工件变量
let NewCellPart_Serial = [<div key={0}><Segment inverted color='green' secondary >Nothing</Segment></div>]
let SetIntervalTime = 15000 //实时焊接数据定时任务默认刷新频率 初始值10s
let SetIntervalTimeOption = [{ key: '1', text: '5s', value: '5000' }, { key: '2', text: '10s', value: '10000' }, { key: '3', text: '15s', value: '15000' }]
// let PassNoTable = []  //焊缝Table
let CellstateModalSettimeout = {} //CellstateModal定时任务  10s
let AlarmRecordModalSettimeout = {} //AlarmRecordTable定时任务 10s
let AjaxCellSerialNoModalSettimeout = {} //AjaxCellSerialNoModal序列号查询定时任务 5s 10s 15s


export default class ArcWelding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ArcWeldingAlermRecordModalOpen: false,  //弧焊报警模态框
      ArcWeldingChartsModalOpen: false,  //弧焊图标模态框
      NoDataModalOpen: false, //无数据提示模态框
      dataTable: [], //报警记录
      handleSearchRes: [], //OnePassMeasurementRecord
      handleSearchResFirst: [],
      Part_Number: 1,
      Part_NumberOptions: [0],//焊缝号下拉菜单数组初始化
      ButtonColor: '#EB3F2F',//停止刷新按钮
      ButtonValue: 'Stop Real-time',
      ButtonIcon: 'pause',
      PassNoTable: [<Table.Row>
        <Table.Cell>No data</Table.Cell>
        <Table.Cell>No data</Table.Cell>
      </Table.Row>]//新工件s
    }
  }
  //CellStateModal Close
  ArcWeldingCellStateModalClose = () => {
    clearInterval(AlarmRecordModalSettimeout), clearInterval(AjaxCellSerialNoModalSettimeout);
    this.props.CloseArcWeldingCellStateModal();
  }

  //报警信息Modal 打开/Close/AJAX
  ArcWeldingAlermRecordModalShow = (size, CellNo) => () => {
    this.setState({ size, ArcWeldingAlermRecordModalOpen: true })
    this.AjaxCellAlermRecordModal(CellNo)
    AlarmRecordModalSettimeout = setInterval(() => this.AjaxCellAlermRecordModal(CellNo), 10000);
  }
  ArcWeldingAlermRecordModalClose = () => { this.setState({ ArcWeldingAlermRecordModalOpen: false }), clearInterval(AlarmRecordModalSettimeout); }
  AjaxCellAlermRecordModal = async (cell) => {
    console.log('AlarmRecordModalSettimeout-timer3')
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

  //弧焊图表Modal 打开/Close/AJAX
  ArcWeldingChartsModalShow = (size, CellNo) => () => {
    this.setState({ size, ArcWeldingChartsModalOpen: true });
    this.AjaxArcWeldingChartsModal(CellNo);
    clearInterval(AlarmRecordModalSettimeout), clearInterval(AjaxCellSerialNoModalSettimeout);
    this.props.clearIntervalOther();
    AjaxCellSerialNoModalSettimeout = setInterval(() => this.AjaxArcWeldingChartsModal(this.props.CellNo), SetIntervalTime);
    this.setState({ ButtonColor: '#EB3F2F', ButtonValue: 'Stop Real-time', ButtonIcon: 'pause' })
  }
  ArcWeldingChartsModalClose = () => {
    this.setState({ ArcWeldingChartsModalOpen: false })
    clearInterval(AjaxCellSerialNoModalSettimeout)
    this.props.OpenIntervalOther()
  }
  AjaxArcWeldingChartsModal = async (CellNo) => {
    console.log('AjaxArcWeldingChartsModal-timer4')
    try {
      let CRUDAjax = await crud.fanucKanbanAjaxSelectUnitMeasurementHistoryByRobotID(CellNo);
      console.log('crudxxx', CRUDAjax)
      if (CRUDAjax.data.Standard_Data_Voltage.length <= 1) {
        console.log('CRUDAjax.data.J1_Current.length <= 1')
        this.NoDataModalShow('fullscreen')
      } else {
        let TotalRes = CRUDAjax.data//总数据
        let OneRes = CRUDAjax.data.OnePassMeasurementRecord//一条数据

        //判断是否来了新工件
        if (OneRes.Part_Serial === OldCellPart_Serial) {
          console.log('仍旧旧工件')
          NewCellPart_Serial = [<div><Segment inverted color='green' secondary >{OldCellPart_Serial}</Segment></div>]
        } else if (OneRes.Part_Serial != OldCellPart_Serial) {
          console.log('来了新工件')
          NewCellPart_Serial = [<div><Segment inverted color='teal' secondary >New {OneRes.Part_Serial}</Segment></div>]
          OldCellPart_Serial = OneRes.Part_Serial
        }

        //序列号和焊缝号数组
        Part_NumberOptionsArray = []
        CRUDAjax.data.Pass_Nos.forEach((value, index) => {
          Part_NumberOptionsArray.push(
            { key: index, value: value, text: value } //递增index
          )
        })
        this.setState({ handleSearchRes: TotalRes, handleSearchResFirst: OneRes, Part_NumberOptions: Part_NumberOptionsArray });
      }
    } catch (error) {
      console.log('Cell.js/AjaxArcWeldingChartsModal/Ajax:', error)
    }
  }

  //更换焊缝号重新获取数据
  handlePassNoChange = async (e, { value }) => {
    let CRUDAjax = await crud.fanucKanbanAjaxSelectPartSerialByArc(this.state.handleSearchResFirst.Part_Serial, value);
    let TotalRes = CRUDAjax.data//总数据
    let OneRes = CRUDAjax.data.OnePassMeasurementRecord//一条数据

    //判断是否来了新工件
    if (OneRes.Part_Serial === OldCellPart_Serial) {
      console.log('仍旧旧工件')
      NewCellPart_Serial = [<div><Segment inverted color='green' secondary >{OldCellPart_Serial}</Segment></div>]
    } else if (OneRes.Part_Serial != OldCellPart_Serial) {
      console.log('来了新工件')
      NewCellPart_Serial = [<div><Segment inverted color='teal' secondary >New {OneRes.Part_Serial}</Segment></div>]
      OldCellPart_Serial = OneRes.Part_Serial
    }

    //序列号和焊缝号数组
    Part_NumberOptionsArray = []
    CRUDAjax.data.Pass_Nos.forEach((value, index) => {
      Part_NumberOptionsArray.push(
        { key: index, value: value, text: value } //递增index
      )
    })
    this.setState({ handleSearchRes: TotalRes, handleSearchResFirst: OneRes, Part_NumberOptions: Part_NumberOptionsArray });
  }



  //无数据提示Modal 打开/Close/AJAX
  NoDataModalShow = (size) => {
    this.setState({ handleSearchRes: '', handleSearchResFirst: '' });
    this.setState({ size, NoDataModalOpen: true })
  }
  NoDataModalClose = () => {
    this.setState({ NoDataModalOpen: false });
    clearInterval(AjaxCellSerialNoModalSettimeout);
    this.ArcWeldingChartsModalClose();
  }

  //停止定时任务更新电压电流
  PauseUpdate = async () => {
    if (this.state.ButtonColor === '#EB3F2F') { //关掉定时任务
      clearInterval(AjaxCellSerialNoModalSettimeout);  //关掉图表Modal数据刷新
      this.setState({ ButtonColor: '#21BA45', ButtonValue: 'Start Real-time', ButtonIcon: 'play' })
    } else if (this.state.ButtonColor === '#21BA45') { //打开定时任务
      clearInterval(AjaxCellSerialNoModalSettimeout);  //关掉可能残留到图表Modal数据刷新
      AjaxCellSerialNoModalSettimeout = setInterval(() => this.AjaxArcWeldingChartsModal(this.props.CellNo), SetIntervalTime);
      this.setState({ ButtonColor: '#EB3F2F', ButtonValue: 'Stop Real-time', ButtonIcon: 'pause' })
    }
  }
  //更换刷新频率
  handleChangeUpdataFrequency = async (e, { value }) => {
    clearInterval(AjaxCellSerialNoModalSettimeout);
    SetIntervalTime = value
    AjaxCellSerialNoModalSettimeout = setInterval(() => this.AjaxArcWeldingChartsModal(this.props.CellNo), SetIntervalTime);
    this.setState({ ButtonColor: '#EB3F2F', ButtonValue: 'Stop Real-time', ButtonIcon: 'pause' })
  }


  render() {
    const { ArcWeldingAlermRecordModalOpen, ArcWeldingChartsModalOpen, NoDataModalOpen, size } = this.state
    return (
      <div>
        {/*CellState  ArcWelding Modal     */}
        <Modal size={'fullscreen'} open={this.props.ArcWeldingCellStateModalOpen} onClose={this.ArcWeldingCellStateModalClose} closeIcon='close' basic>
          <Modal.Header>
            <a style={{ color: 'red', fontSize: '2rem' }}>FANUC</a> &nbsp;&nbsp;Arc CellState
                     </Modal.Header>
          <Modal.Content>
            <Grid>
              <Grid.Row columns={4}>
                <Grid.Column>
                  <Button.Group fluid>
                    <Button>OEE</Button>
                    <Button positive>95%</Button>
                  </Button.Group>
                </Grid.Column>
                <Grid.Column>
                  <Button onClick={this.ArcWeldingAlermRecordModalShow('fullscreen', this.props.CellNo)} fluid>Robot AlarmRecord</Button>
                </Grid.Column>
                <Grid.Column>
                  <Button onClick={this.ArcWeldingChartsModalShow('fullscreen', this.props.CellNo)} fluid>Real-time ProcessData</Button>
                </Grid.Column>
                <Grid.Column>
                  <Button.Group fluid>
                    <Button>Yield</Button>
                    <Button positive>{this.props.CellOutput}</Button>
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={4}>
                <Grid.Column>
                  <RobotRunningStatePieChart TodayAllRobotsStateDistribution={this.props.TodayRobotStateDistribution} />
                </Grid.Column>
                <Grid.Column>
                  <RobotUtilizationPieChart TodayAllRobotsRunningRatioPieChart={this.props.TodayRobotRunningRatio} />
                </Grid.Column>
                <Grid.Column>
                  <RobotProductionPieChart TodayAllRobotsOutputsByPart={this.props.TodayRobotOutputsByPart} />
                </Grid.Column>
                <Grid.Column>
                  <RobotAlarmPieChart TodayAllRobotsAlarmsDistribution={this.props.TodayRobotAlarmsDistribution} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row columns={3}>
                <Grid.Column>
                  <RobotDayOutputBarChart TodayAllRobotsOutputPerHour={this.props.TodayRobotOutputPerHour} />
                </Grid.Column>
                <Grid.Column>
                  <RobotWeekOutputBarChart TodayAllRobotsxSevenDaysAllRobotsOutputs={this.props.SevenDaysRobotOutputs} />
                </Grid.Column>
                <Grid.Column>
                  <RobotDayDowntimeBarChart TodayTodayAllRobotsStopInMinutesPerHour={this.props.TodayRobotStopInMinutesPerHour} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.ArcWeldingCellStateModalClose} >
              Close
                        </Button>
          </Modal.Actions>
        </Modal>

        {/*ArcWeldingAlermRecordModal*/}
        <Modal size={size} open={ArcWeldingAlermRecordModalOpen} onClose={this.ArcWeldingAlermRecordModalClose} closeIcon='close' basic>
          <Modal.Header >
            <a style={{ color: 'red' }}>RobotAlarm Record</a>
          </Modal.Header>
          <Modal.Content>
            <Table inverted color={'red'}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>ID</Table.HeaderCell>
                  <Table.HeaderCell>Robot YH No.</Table.HeaderCell>
                  <Table.HeaderCell>Alarm Code</Table.HeaderCell>
                  <Table.HeaderCell>Alarm Info</Table.HeaderCell>
                  <Table.HeaderCell>Alarm Severity</Table.HeaderCell>
                  <Table.HeaderCell>Alarm Reason</Table.HeaderCell>
                  <Table.HeaderCell>Alarm Time</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.state.dataTable}
              </Table.Body>
            </Table>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.ArcWeldingAlermRecordModalClose}>
              Close
                        </Button>
          </Modal.Actions>
        </Modal>


        {/*ArcWeldingChartsModal  */}
        <Modal size={size} open={ArcWeldingChartsModalOpen} onClose={this.ArcWeldingChartsModalClose} closeIcon='close' basic>
          <Modal.Header className='ModalContentClass'>
            Arc Real-time ProcessData
                     </Modal.Header>
          <Modal.Content className='ModalContentClass'>
            <Grid>
              <Grid.Row className='GridRowClass2'>
                <Grid.Column width={11} className='GridColumnClass1'>
                  <div style={{ overflowX: 'auto', overflowY: 'auto', height: '805px', width: '100%' }}>
                    <VoltageLineChart CellhandleSearchRes={this.state.handleSearchResFirst} title='Voltage' />
                    <CurrentLineChart CellhandleSearchRes={this.state.handleSearchResFirst} title='Current' />
                  </div>
                </Grid.Column>
                <Grid.Column width={4} className='GridColumnClass2'>
                  <Carousel autoplay vertical="true" style={{ width: '50%', marginLeft: '3%' }} >
                    {NewCellPart_Serial}
                  </Carousel>
                  <div style={{ width: '100%', height: '45px', marginBottom: '0px', marginRight: '0%', marginTop: '20px', marginBottom: '20px' }} >
                    <Button content={this.state.ButtonValue} icon={this.state.ButtonIcon} labelPosition='left' style={{ width: '45%', height: '100%', borderRadius: '10px 0px 0px 10px', marginBottom: '0px', marginLeft: '0%', fontSize: '13px', float: 'left', backgroundColor: this.state.ButtonColor }} onClick={this.PauseUpdate.bind(this)} />
                    <Dropdown placeholder='RefreshFrequency' search selection options={SetIntervalTimeOption} defaultValue={SetIntervalTime} style={{ width: '45%', height: '100%', borderRadius: '0px 10px 10px 0px', marginRight: '0%', float: 'right' }} onChange={this.handleChangeUpdataFrequency.bind(this)} />
                  </div>
                  <div style={{ marginLeft: '13%', width: '100%', marginBottom: '20px' }}>
                    <a style={{ width: '45%', fontSize: '1.3rem', color: 'white', marginRight: '5%' }}>Pass No:</a>
                    <Dropdown placeholder='Select PassNo' search selection options={this.state.Part_NumberOptions} style={{ width: '45%', marginBottom: '10px' }} onChange={this.handlePassNoChange} />
                  </div>
                  <Button.Group style={{ width: '100%' }}>
                    <Button className='ButtonLeft'>Part Serial</Button>
                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.Part_Serial || 0}</Button>
                  </Button.Group>
                  <Button.Group style={{ width: '100%' }}>
                    <Button className='ButtonLeft'>Pass No</Button>
                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.Pass_No || 0}</Button>
                  </Button.Group>
                  <Button.Group style={{ width: '100%' }}>
                    <Button className='ButtonLeft'>Start Time</Button>
                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.Start_Time || 0}</Button>
                  </Button.Group>
                  <Button.Group style={{ width: '100%' }}>
                    <Button className='ButtonLeft'>End Time</Button>
                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.End_Time || 0}</Button>
                  </Button.Group>
                  <Button.Group style={{ width: '100%' }}>
                    <Button className='ButtonLeft'>Accquisition Cycle</Button>
                    <Button positive className='ButtonRight'>24ms</Button>
                  </Button.Group>
                  <Button.Group style={{ width: '100%' }}>
                    <Button className='ButtonLeft'>VoltageSetting Standard Value</Button>
                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.Standard_Voltage_AVGLine || 0}V</Button>
                  </Button.Group>
                  <Button.Group style={{ width: '100%' }}>
                    <Button className='ButtonLeft'>Max&Min Voltage Fluctuation(%)</Button>
                    <Button positive className='ButtonRight'>30%</Button>
                  </Button.Group>
                  <Button.Group style={{ width: '100%' }}>
                    <Button className='ButtonLeft'>CurrentSetting Standard Value</Button>
                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.Standard_Current_AVGLine || 0}A</Button>
                  </Button.Group>
                  <Button.Group style={{ width: '100%' }}>
                    <Button className='ButtonLeft'>Max&Min Current Fluctuation(%)</Button>
                    <Button positive className='ButtonRight'>30%</Button>
                  </Button.Group>
                  <Button.Group style={{ width: '100%' }}>
                    <Button className='ButtonLeft'>Voltage RealOver Percent</Button>
                    <Button positive className='ButtonRight'>{(this.state.handleSearchResFirst.Voltage_Real_Over_Percent * 100).toFixed(2) || 0}%</Button>
                  </Button.Group>
                  <Button.Group style={{ width: '100%' }}>
                    <Button className='ButtonLeft'>Current RealOver Percent</Button>
                    <Button positive className='ButtonRight'>{(this.state.handleSearchResFirst.Current_Real_Over_Percent * 100).toFixed(2) || 0}%</Button>
                  </Button.Group>
                  <Button.Group style={{ width: '100%' }}>
                    <Button className='ButtonLeft'>DataUpload Time</Button>
                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.Insert_Time || 0}</Button>
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions className='ModalContentClass'>
            <Button negative onClick={this.ArcWeldingChartsModalClose}>
              Close
                        </Button>
          </Modal.Actions>
        </Modal>


        <Modal size='small' open={NoDataModalOpen} onClose={this.NoDataModalClose} closeIcon='close' basic>
          <Modal.Header icon='archive' content='Notice' />
          <Modal.Content>
            <p>This workstation has no work data today, thanks!</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' inverted onClick={this.NoDataModalClose}>
              <Icon name='checkmark' /> Quit
                         </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
