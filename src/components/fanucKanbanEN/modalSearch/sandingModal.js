import React from 'react';
import { Dropdown, Button, Modal, Grid, Form, Icon, Input } from 'semantic-ui-react'


import J1CurrentLineChart from '../../chartEN/sandingChart/j1CurrentLineChart'
import J2CurrentLineChart from '../../chartEN/sandingChart/j2CurrentLineChart'
import J3CurrentLineChart from '../../chartEN/sandingChart/j3CurrentLineChart'
import J4CurrentLineChart from '../../chartEN/sandingChart/j4CurrentLineChart'
import J5CurrentLineChart from '../../chartEN/sandingChart/j5CurrentLineChart'
import J6CurrentLineChart from '../../chartEN/sandingChart/j6CurrentLineChart'
import CRUD from '../../../unit/ajax.js';
const crud = new CRUD();
import '../index.css'


let Part_NumberOptionsArray = [];//焊缝号下拉菜单数组
export default class SandingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handleSearchResFirst: {},
      Part_SerialValue: '',
    }
  }

  SandingModalClose = () => {
    console.log('SandingModalClose')
    this.props.CloseSandingModal();
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
      let CRUDAjax = await crud.fanucKanbanAjaxSelectPartSerialBySanding(Serial_Part, 1);
      if (CRUDAjax.data.J1_Current.length <= 1) {
        this.props.AlertModalOpen()
      } else {
        let OneRes = CRUDAjax.data //总数据

        this.setState({ handleSearchResFirst: OneRes })
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
    let CRUDAjax = await crud.fanucKanbanAjaxSelectPartSerialBySanding(this.state.handleSearchResFirst.Part_Serial, value);
    let OneRes = CRUDAjax.data //总数据

    this.setState({ handleSearchResFirst: OneRes, })
  }


  render() {
    const { SandingModalOpen } = this.props
    return (
      <Modal size='fullscreen' open={SandingModalOpen} onClose={this.SandingModalClose} closeIcon='close' basic>
        <Modal.Header className='ModalContentClass'>
          Polish Search
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
                  <J1CurrentLineChart CellhandleSearchRes={this.state.handleSearchResFirst} title='J1 axis current' />
                  <J2CurrentLineChart CellhandleSearchRes={this.state.handleSearchResFirst} title='J2 axis current' />
                  <J3CurrentLineChart CellhandleSearchRes={this.state.handleSearchResFirst} title='J3 axis current' />
                  <J4CurrentLineChart CellhandleSearchRes={this.state.handleSearchResFirst} title='J4 axis current' />
                  <J5CurrentLineChart CellhandleSearchRes={this.state.handleSearchResFirst} title='J5 axis current' />
                  <J6CurrentLineChart CellhandleSearchRes={this.state.handleSearchResFirst} title='J6 axis current' />
                </div>
              </Grid.Column>
              <Grid.Column width={4} className='GridColumnClass2'>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>Part Serial</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.Part_Serial || 0}</Button>
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
                  <Button className='ButtonLeft' >Sensitivity</Button>
                  <Button positive className='ButtonRight'>～</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>J1 Current USL</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.J1CurrentUSL || 0}A&nbsp;~&nbsp;{this.state.handleSearchResFirst.J1CurrentLSL || 0}A</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>J2 Current USL</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.J2CurrentUSL || 0}A&nbsp;~&nbsp;{this.state.handleSearchResFirst.J2CurrentLSL || 0}A</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>J3 Current USL</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.J3CurrentUSL || 0}A&nbsp;~&nbsp;{this.state.handleSearchResFirst.J3CurrentLSL || 0}A</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>J4 Current USL</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.J4CurrentUSL || 0}A&nbsp;~&nbsp;{this.state.handleSearchResFirst.J4CurrentLSL || 0}A</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>J5 Current USL</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.J5CurrentUSL || 0}A&nbsp;~&nbsp;{this.state.handleSearchResFirst.J5CurrentLSL || 0}A</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>J6 Current USL</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.J6CurrentUSL || 0}A&nbsp;~&nbsp;{this.state.handleSearchResFirst.J6CurrentLSL || 0}A</Button>
                </Button.Group>

              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Modal.Content>
        <Modal.Actions className='ModalContentClass' >
          <Button negative onClick={this.SandingModalClose}>
            关闭
                        </Button>
        </Modal.Actions>
      </Modal>

    )
  }
}