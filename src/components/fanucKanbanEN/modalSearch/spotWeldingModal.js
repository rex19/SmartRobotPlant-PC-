import React from 'react';
import { Dropdown, Button, Modal, Grid, Form, Icon, Input } from 'semantic-ui-react'


import WeldingTorchPressureLineChart from '../../chartEN/spotWeldingChart/weldingTorchPressureLineChart.js'
import PrimaryCurrentLineChart from '../../chartEN/spotWeldingChart/primaryCurrentLineChart.js'
import RealTimeResistenceLineChart from '../../chartEN/spotWeldingChart/realTimeResistenceLineChart.js'
import CRUD from '../../../unit/ajax.js';
const crud = new CRUD();
import '../index.css'


let Part_NumberOptionsArray = [];//焊缝号下拉菜单数组
export default class SpotWeldingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handleSearchResFirst: {},
      Part_NumberOptions: [],
      Part_SerialValue: '',
    }
  }

  SpotWeldingModalClose = () => {
    console.log('SpotWeldingModalClose')
    this.props.CloseSpotWeldingModal();
    this.setState({
      handleSearchResFirst: {},
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
      let CRUDAjax = await crud.fanucKanbanAjaxSelectPartSerialBySpot(Serial_Part, 1);
      if (CRUDAjax.data.RealTime1stCurrent.length <= 1) {
        this.props.AlertModalOpen()
      } else {
        let OneRes = CRUDAjax.data //总数据
        //序列号和焊缝号数组
        Part_NumberOptionsArray = []
        CRUDAjax.data.Pass_Nos.forEach((value, index) => {
          Part_NumberOptionsArray.push(
            { key: index, value: value, text: value } //递增index
          )
        })
        this.setState({ handleSearchResFirst: OneRes, Part_NumberOptions: Part_NumberOptionsArray })
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
    let CRUDAjax = await crud.fanucKanbanAjaxSelectPartSerialBySpot(this.state.handleSearchResFirst.Part_Serial, value);
    let OneRes = CRUDAjax.data //总数据
    //序列号和焊缝号数组
    Part_NumberOptionsArray = []
    CRUDAjax.data.Pass_Nos.forEach((value, index) => {
      Part_NumberOptionsArray.push(
        { key: index, value: value, text: value } //递增index
      )
    })
    this.setState({ handleSearchResFirst: OneRes, Part_NumberOptions: Part_NumberOptionsArray })
  }


  render() {
    const { SpotWeldingModalOpen } = this.props
    return (
      <Modal size='fullscreen' open={SpotWeldingModalOpen} onClose={this.SpotWeldingModalClose} closeIcon='close' basic>
        <Modal.Header className='ModalContentClass'>
          Spot Search
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
                  <WeldingTorchPressureLineChart title='Welding torch Pressure' CellhandleSearchRes={this.state.handleSearchResFirst} />
                  <PrimaryCurrentLineChart title='Primary Current' CellhandleSearchRes={this.state.handleSearchResFirst} />
                  <RealTimeResistenceLineChart title='Primary Resistance' CellhandleSearchRes={this.state.handleSearchResFirst} />
                </div>
              </Grid.Column>
              <Grid.Column width={4} className='GridColumnClass2'>
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
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.StartTime || 0}</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>End Time</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.EndTime || 0}</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Accquisition Cycle</Button>
                  <Button positive className='ButtonRight'>24ms</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Plate Thickness</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.PlateThickness || 0}mm</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Standard Pressure</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.StandardStress || 0}N</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Standard Current</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.StandardCurrent || 0}A</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Standard Resistance</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.StandardResistence || 0}Ω</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Torque To Pressure Ratio</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.TorqueToStressRate || 0}</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Step By Step Count</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.StepCount || 0}</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Step By Step Current</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.StepCurrent || 0}A</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Step By Step Number</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.SteperNumber || 0}</Button>
                </Button.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Modal.Content>
        <Modal.Actions className='ModalContentClass' >
          <Button negative onClick={this.SpotWeldingModalClose}>
            Close
                        </Button>
        </Modal.Actions>
      </Modal>

    )
  }
}