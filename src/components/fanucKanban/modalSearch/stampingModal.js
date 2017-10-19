import React from 'react';
import { Dropdown, Button, Modal, Grid, Form, Icon, Input } from 'semantic-ui-react'


import J1CurrentLineChart from '../../chart/sandingChart/j1CurrentLineChart'
import J2CurrentLineChart from '../../chart/sandingChart/j2CurrentLineChart'
import J3CurrentLineChart from '../../chart/sandingChart/j3CurrentLineChart'
import J4CurrentLineChart from '../../chart/sandingChart/j4CurrentLineChart'
import J5CurrentLineChart from '../../chart/sandingChart/j5CurrentLineChart'
import J6CurrentLineChart from '../../chart/sandingChart/j6CurrentLineChart'
import CRUD from '../../../unit/ajax.js';
const crud = new CRUD();
import '../index.css'


let Part_NumberOptionsArray = [];//焊缝号下拉菜单数组
export default class StampingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handleSearchResFirst: {},
      Part_SerialValue: '',
    }
  }

  StampingModalClose = () => {
    console.log('StampingModalClose')
    this.props.CloseStampingModal();
    this.setState({
      handleSearchResFirst: {},
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
    if (this.state.Part_SerialValue === '') {
      alert('序列号选项不能为空');
    } else {
      Serial_Part = this.state.Part_SerialValue
      let CRUDAjax = await crud.fanucKanbanAjaxSelectPartSerialByStamping(Serial_Part);
      if (CRUDAjax.data.J1_Current.length <= 1) {
        // this.setState({ AlertModalOpen: true })
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
    let CRUDAjax = await crud.fanucKanbanAjaxSelectPartSerialByStamping(this.state.handleSearchResFirst.Part_Serial, value);
    let OneRes = CRUDAjax.data //总数据

    this.setState({ handleSearchResFirst: OneRes, })
  }


  render() {
    const { StampingModalOpen } = this.props
    return (
      <Modal size='fullscreen' open={StampingModalOpen} onClose={this.StampingModalClose} closeIcon='close' basic>
        <Modal.Header className='ModalContentClass'>
          查询冲压
                     </Modal.Header>
        <Modal.Content className='ModalContentClass'>
          <Grid>
            <Grid.Row className='GridRowClass1' >
              <Grid.Column width={16}>
                <Form onSubmit={this.handleSubmit} style={{ marginLeft: '30%' }}>
                  <a style={{ width: '10%', fontSize: '1.6rem', color: 'white', marginRight: '1%' }}>序列号:</a>
                  <Input placeholder='请输入要查询的序列号...' style={{ width: '40%' }} onChange={this.handleChange1} />
                  <Button style={{ marginLeft: '1%' }} icon='search' />
                </Form>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='GridRowClass2'>
              <Grid.Column width={11} className='GridColumnClass1'>
                <div style={{ overflowX: 'auto', overflowY: 'auto', height: '705px', width: '100%' }}>
                  <J1CurrentLineChart CellhandleSearchRes={this.state.handleSearchResFirst} title='J1轴电流' />
                  <J2CurrentLineChart CellhandleSearchRes={this.state.handleSearchResFirst} title='J2轴电流' />
                  <J3CurrentLineChart CellhandleSearchRes={this.state.handleSearchResFirst} title='J3轴电流' />
                  <J4CurrentLineChart CellhandleSearchRes={this.state.handleSearchResFirst} title='J4轴电流' />
                  <J5CurrentLineChart CellhandleSearchRes={this.state.handleSearchResFirst} title='J5轴电流' />
                  <J6CurrentLineChart CellhandleSearchRes={this.state.handleSearchResFirst} title='J6轴电流' />
                </div>
              </Grid.Column>
              <Grid.Column width={4} className='GridColumnClass2'>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>工件序列号</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.Part_Serial || 0}</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>开始时间</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.Start_Time || 0}</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>结束时间</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.End_Time || 0}</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>采集周期</Button>
                  <Button positive className='ButtonRight'>24ms</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft' >灵敏度</Button>
                  <Button positive className='ButtonRight'>～</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>J1电流允许值</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.J1CurrentUSL || 0}&nbsp;~&nbsp;{this.state.handleSearchResFirst.J1CurrentLSL || 0}</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>J2电流允许值</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.J2CurrentUSL || 0}&nbsp;~&nbsp;{this.state.handleSearchResFirst.J2CurrentLSL || 0}</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>J3电流允许值</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.J3CurrentUSL || 0}&nbsp;~&nbsp;{this.state.handleSearchResFirst.J3CurrentLSL || 0}</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>J4电流允许值</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.J4CurrentUSL || 0}&nbsp;~&nbsp;{this.state.handleSearchResFirst.J4CurrentLSL || 0}</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>J5电流允许值</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.J5CurrentUSL || 0}&nbsp;~&nbsp;{this.state.handleSearchResFirst.J5CurrentLSL || 0}</Button>
                </Button.Group>
                <Button.Group style={{ width: '100%' }}>
                  <Button className='ButtonLeft'>J6电流允许值</Button>
                  <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.J6CurrentUSL || 0}&nbsp;~&nbsp;{this.state.handleSearchResFirst.J6CurrentLSL || 0}</Button>
                </Button.Group>

              </Grid.Column>
            </Grid.Row>
          </Grid>

        </Modal.Content>
        <Modal.Actions className='ModalContentClass' >
          <Button negative onClick={this.StampingModalClose}>
            关闭
                        </Button>
        </Modal.Actions>
      </Modal>

    )
  }
}