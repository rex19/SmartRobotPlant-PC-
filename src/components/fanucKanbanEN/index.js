import React from 'react'
import { Carousel, Affix, Badge } from 'antd';
import { Radio, Segment, Icon, Modal, Button, Grid, Step, Image, Reveal } from 'semantic-ui-react'
import Cell from './cell.js'
import CRUD from '../../unit/ajax.js'
import fanucImage from '../../img/fanuclogoTransparent.png'
import fanucLogo2 from '../../img/SMARTLINK.png'
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
import 'semantic-ui-css/semantic.min.css'
import './index.css'

const crud = new CRUD();
let UpdateTotalRobotDataTimer = {}  //kanban主界面 产量/开动率/安全时间/所有CellState/所有robot故障/ 3s
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
      TodayAllRobotsOutputs: 0, //所有产量
      TodayAllRobotsRunningRatio: 0, //所有Robot 开动率
      TodayAllPlantSafetyDays: 0, //安全生产天数
      SearchModalOpen: false,
      HideLabel: 'none',
      RadioValue: false,
      CellhandleSearchRes: {},
      CellhandleSearchResFirst: [], //OnePassMeasurementRecord
      CellPart_NumberOptions: [0], //Pass_Nos
      Part_NumberOptions: [],//焊缝号下拉菜单数组初始化
      //robot故障
      CurrentFaultRobotsArray: <div>  <Segment inverted color='green' secondary >No Fault </Segment></div>,
      Part_SerialValue: -1,
      Part_NumberValue: 1,
      ArcWeldingModalOpen: false,
      SandingModalOpen: false, //打磨查询模态框
      StampingModalOpen: false, //打磨查询模态框
      AlertModalOpen: false,  //查询提示无工件信息
    }
  }

  SearchModalClose = () => { this.setState({ SearchModalOpen: false }), console.log('SearchModalClose') }


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
      arr2 = [<div>  <Segment inverted color='green' secondary >No Fault </Segment></div>]
    } else {
      arr2 = CurrentFaultRobotsResponseArray.map(function (item, index, input) {
        return <div key={index}><Segment inverted color='red' secondary> {item} Fault </Segment></div>;
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

    UpdateTotalRobotDataTimer = setInterval(() => this.AjaxUpdateTotalRobotData(), 5000);
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
        arr2 = [<div>  <Segment inverted color='green' secondary >No Fault </Segment></div>]
      } else {
        arr2 = CurrentFaultRobotsResponseArray.map(function (item, index, input) {
          return <div key={index}><Segment inverted color='red' secondary> {item} Fault </Segment></div>;
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
    this.setState({ size, SearchModalOpen: true });
  }
  //二层查询序列号Modal
  handleSearchFuction = (key) => {
    this.setState({ sizeB, [key]: true });
    this.CloseInterval();
  }


  //跳转到第三层
  handleHome() {
    location.href = 'http://172.16.29.188/FANUC/UnitListTraceEN.html'
    // location.href = 'http://dsm.smart-flow.cn:7001/FANUC/UnitListTrace.html'
  }
  GoBack() {
    location.href = 'http://172.16.29.188:60/fanuc2EN'
  }
  //显示/隐藏 每个Cell的详细信息
  handleHideLabel = async (e, obj) => {
    try {
      this.setState({ RadioValue: obj.checked });
      if (obj.checked == false) {
        this.setState({ HideLabel: 'none' })
      } else {
        this.setState({ HideLabel: 'block' })
      }
    } catch (error) {
      console.log('fanucKanban/handleHideLabel/Error:', error)
    }
  }

  //由于子组件打开模态框，父组件定时任务取消。 子组件关闭模态框  父组件重开定时任务
  CloseInterval() {
    console.log('clear UpdateTotalRobotDataTimer')
    clearInterval(UpdateTotalRobotDataTimer);
  }
  OpenInterval() {
    console.log('open UpdateTotalRobotDataTimer')
    UpdateTotalRobotDataTimer = setInterval(() => this.AjaxUpdateTotalRobotData(), 5000);
  }
  AlertModalOpen = () => {
    this.setState({ AlertModalOpen: true })
  }
  AlertModalClose = () => {
    this.setState({ AlertModalOpen: false })
  }
  render() {
    const { SearchModalOpen, size, sizeB, HideLabel, CellhandleSearchRes } = this.state
    return (
      <div className='divClass'>
        <Cell CellState={this.state.CellState} HideLabel={this.state.HideLabel}
          Cell1State={this.state.Cell1State}
          Cell2State={this.state.Cell2State}
          Cell3State={this.state.Cell3State}
          Cell4State={this.state.Cell4State}
          Cell5State={this.state.Cell5State}
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
            <a className='topTextTitle text3D ' onClick={this.GoBack} >Plant</a>
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
            <Badge status="success" text={<a style={{ color: 'white' }}>Running</a>} />
            <br />
            <Badge status="error" text={<a style={{ color: 'white' }}>Fault</a>} />
            <br />
            <Badge status="default" text={<a style={{ color: 'white' }}>PowerOff</a>} />
            <br />
            <Badge status="warning" text={<a style={{ color: 'white' }}>Ready</a>} />
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
            </Step>
            <Step active>
              <Icon name='add to cart' />
              <Step.Content >
                <Step.Title>{this.state.TodayAllRobotsOutputs + '件'}</Step.Title>
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
                <Step.Title>{this.state.TodayAllPlantSafetyDays}</Step.Title>
                <Step.Description>Safety Days</Step.Description>
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
        <Modal size={size} open={SearchModalOpen} onClose={this.SearchModalClose} closeIcon='close' basic>
          <Modal.Header>
            Menu
                     </Modal.Header>
          <Modal.Content>
            <Grid>
              <Grid.Row columns={3}>
                <Grid.Column >
                  <div className='MenuSubDiv'>
                    <label className='MenuSubDivLabelName'> ArcWeld Search</label><br />
                    <img width='50%' className='MenuSubDivImg' onClick={this.handleSearchFuction.bind(this, 'ArcWeldingModalOpen')} src={arcWeldingImg} />
                  </div>
                </Grid.Column>
                <Grid.Column >
                  <div className='MenuSubDiv'>
                    <label className='MenuSubDivLabelName'>SpotWeld Search</label><br />
                    <img width='50%' className='MenuSubDivImg' onClick={this.handleSearchFuction.bind(this, 'SpotWeldingModalOpen')} src={spotWeldingImg} />
                  </div>
                </Grid.Column>
                <Grid.Column >
                  <div className='MenuSubDiv'>
                    <label className='MenuSubDivLabelName'>Seal Search</label><br />
                    <img width='50%' className='MenuSubDivImg' onClick={this.handleSearchFuction.bind(this, 'GluingModalOpen')} src={sealImg} />
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column >
                  {/*<div className='MenuSubDiv'>
                    <label className='MenuSubDivLabelName'>打磨搜索</label><br />
                    <img width='50%' className='MenuSubDivImg' onClick={this.handleSearchFuction.bind(this, 'SandingModalOpen')} src={polishImg} />
                  </div>*/}
                </Grid.Column>
                <Grid.Column >
                  <div className='MenuSubDiv'>
                    <label className='MenuSubDivLabelName'>Press Search</label><br />
                    <img width='50%' className='MenuSubDivImg' onClick={this.handleSearchFuction.bind(this, 'StampingModalOpen')} src={pressImg} />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Header>
            Setting
                       </Modal.Header>
          <Modal.Content>
            <Grid>
              <Grid.Row columns={3}>
                <Grid.Column  >
                  <div className='MenuSubDiv'>
                    <label className='MenuSubDivLabelName'>Traceability System</label><br />
                    <Icon name='table' size='massive' style={{ marginLeft: '32%' }} onClick={this.handleHome} />
                  </div>
                </Grid.Column>
                <Grid.Column >
                  <div className='MenuSubDiv'>
                    <label className='MenuSubDivLabelName'>  Show/Off Cell details</label><br />
                    <Segment compact className='MenuSubDivIcon' >
                      <Radio toggle onChange={this.handleHideLabel.bind(this)} defaultChecked={this.state.RadioValue} size='massive' />
                    </Segment>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.SearchModalClose}>
              Close
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


