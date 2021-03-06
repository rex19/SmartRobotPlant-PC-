import React from 'react';
import { Dropdown, Button, Modal, Grid, Form, Icon, Input } from 'semantic-ui-react'


import VoltageLineChart from '../../chartEN/voltageLineChart.js';
import CurrentLineChart from '../../chartEN/currentLineChart.js';
import CRUD from '../../../unit/ajax.js';
const crud = new CRUD();
import '../index.css'


let Part_NumberOptionsArray = [];//焊缝号下拉菜单数组
export default class ArcWeldingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CellhandleSearchRes: {},
      CellhandleSearchResFirst: {},
      Part_NumberOptions: [],
      Part_SerialValue: '',
    }
  }

  ArcWeldingModalClose = () => {
    console.log('ArcWeldingModalClose')
    this.props.CloseArcWeldingModal();
    this.setState({
      CellhandleSearchRes: {},
      CellhandleSearchResFirst: {},
      Part_NumberOptions: [],
      Part_SerialValue: ''
    })
  }

  // handleSubmit = (e) => {
  //     console.log('handleSubmit0', e)
  //     // e.preventDefault();
  //     this.props.handleSubmit(e);
  // }

  handleSubmit = async (e) => {
    console.log('handleSubmit', e)
    e.preventDefault()
    let Serial_Part = -1
    if (this.state.Part_SerialValue === -1) {
      alert('Part Serial Can not be empty');
    } else {
      Serial_Part = this.state.Part_SerialValue
      // Part_Number = this.state.Part_NumberValue
      let CRUDAjax = await crud.fanucKanbanAjaxSelectPartSerialByArc(Serial_Part, 1);
      if (CRUDAjax.data.Standard_Data_Voltage.length <= 1) {
        this.props.AlertModalOpen()
      } else {
        let TotalRes = CRUDAjax.data //总数据
        let OneRes = CRUDAjax.data.OnePassMeasurementRecord  //一条数据
        //序列号和焊缝号数组
        Part_NumberOptionsArray = []
        CRUDAjax.data.Pass_Nos.forEach((value, index) => {
          Part_NumberOptionsArray.push(
            { key: index, value: value, text: value } //递增index
          )
        })
        console.log('弧焊数据', CRUDAjax)
        this.setState({ CellhandleSearchRes: TotalRes, CellhandleSearchResFirst: OneRes, Part_NumberOptions: Part_NumberOptionsArray })
      }
    }
  }
  handleChange1 = (e, { name, value }) => { this.setState({ Part_SerialValue: value }); }
  // handleChange1 = () => {
  //     // handleChange1 = (e, { name, value }) => { this.setState({ Part_SerialValue: value }); }
  //     this.props.handleChangeSearch()
  // }
  handleChangeSearch = (e, { name, value }) => {
    console.log('handleChangeSearch2', value)
    this.props.handleChangeSearch(value)
  }

  //更换焊缝号重新获取数据
  handlePassNoChange = async (e, { value }) => {
    let CRUDAjax = await crud.fanucKanbanAjaxSelectPartSerialByArc(this.state.CellhandleSearchResFirst.Part_Serial, value);
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
  }


  render() {
    const { ArcWeldingModalOpen } = this.props
    return (
      <Modal size='fullscreen' open={ArcWeldingModalOpen} onClose={this.ArcWeldingModalClose} closeIcon='close' basic>
        <Modal.Header className='ModalContentClass'>
          ArcWeld Search
                     </Modal.Header>
        <Modal.Content className='ModalContentClass'>
          <Grid>
            <Grid.Row className='GridRowClass1' >
              <Grid.Column width={16}>
                <Form onSubmit={this.handleSubmit} style={{ marginLeft: '30%' }}>
                  <a style={{ width: '10%', fontSize: '1.6rem', color: 'white', marginRight: '1%' }}>Part Serial:</a>
                  <Input placeholder='Input PartSerial Please...' style={{ width: '40%' }} onChange={this.handleChange1} />
                  <Button style={{ marginLeft: '1%' }} icon='search' />
                </Form>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='GridRowClass2'>
              <Grid.Column width={11} className='GridColumnClass1'>
                <div style={{ overflowX: 'auto', overflowY: 'auto', height: '705px', width: '100%' }}>
                  <VoltageLineChart CellhandleSearchRes={this.state.CellhandleSearchResFirst} title='Voltage' />
                  <CurrentLineChart CellhandleSearchRes={this.state.CellhandleSearchResFirst} title='Current' />
                </div>
              </Grid.Column>
              <Grid.Column width={4} className='GridColumnClass2'>
                <div style={{ marginLeft: '13%', width: '100%', marginBottom: '20px' }}>
                  <a style={{ width: '45%', fontSize: '1.3rem', color: 'white', marginRight: '5%' }}>Pass No:</a>
                  <Dropdown placeholder='Select PassNo' search selection options={this.state.Part_NumberOptions} style={{ width: '45%', marginBottom: '10px' }} onChange={this.handlePassNoChange} />
                </div>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Part Serial</Button>
                  <Button positive className='ButtonRight'>{this.state.CellhandleSearchResFirst.Part_Serial || 0}</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Pass No</Button>
                  <Button positive className='ButtonRight'>{this.state.CellhandleSearchResFirst.Pass_No || 0}</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Start Time</Button>
                  <Button positive className='ButtonRight'>{this.state.CellhandleSearchResFirst.Start_Time || 0}</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>End Time</Button>
                  <Button positive className='ButtonRight'>{this.state.CellhandleSearchResFirst.End_Time || 0}</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Accquisition Cycle</Button>
                  <Button positive className='ButtonRight'>24ms</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>VoltageSetting Standard Value</Button>
                  <Button positive className='ButtonRight'>{this.state.CellhandleSearchResFirst.Standard_Voltage_AVGLine || 0}V</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Max&Min Voltage Fluctuation(%)</Button>
                  <Button positive className='ButtonRight'>30%</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>CurrentSetting Standard Value</Button>
                  <Button positive className='ButtonRight'>{this.state.CellhandleSearchResFirst.Standard_Current_AVGLine || 0}A</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Max&Min Current Fluctuation(%)</Button>
                  <Button positive className='ButtonRight'>30%</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Voltage RealOver Percent</Button>
                  <Button positive className='ButtonRight'>{(this.state.CellhandleSearchResFirst.Voltage_Real_Over_Percent * 100 || 0 * 100).toFixed(2)}%</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Current RealOver Percent</Button>
                  <Button positive className='ButtonRight'>{(this.state.CellhandleSearchResFirst.Current_Real_Over_Percent * 100 || 0 * 100).toFixed(2)}%</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>DataUpload Time</Button>
                  <Button positive className='ButtonRight'>{this.state.CellhandleSearchResFirst.Insert_Time || 0}</Button>
                </Button.Group>

              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Modal.Content>
        <Modal.Actions className='ModalContentClass' >
          <Button negative onClick={this.ArcWeldingModalClose}>
            关闭
                        </Button>
        </Modal.Actions>
      </Modal>

    )
  }
}