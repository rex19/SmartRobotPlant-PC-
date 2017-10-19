import React from 'react';
import { Dropdown, Button, Modal, Grid, Form, Icon, Input } from 'semantic-ui-react'


import WeldingTorchPressureLineChart from '../../chart/spotWeldingChart/weldingTorchPressureLineChart.js'
import PrimaryCurrentLineChart from '../../chart/spotWeldingChart/primaryCurrentLineChart.js'
import RealTimeResistenceLineChart from '../../chart/spotWeldingChart/realTimeResistenceLineChart.js'
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
            alert('序列号选项不能为空');
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
                    查询点焊
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
                                    <WeldingTorchPressureLineChart title='焊枪压力' CellhandleSearchRes={this.state.handleSearchResFirst} />
                                    <PrimaryCurrentLineChart title='初级电流' CellhandleSearchRes={this.state.handleSearchResFirst} />
                                    <RealTimeResistenceLineChart title='初级电阻' CellhandleSearchRes={this.state.handleSearchResFirst} />
                                </div>
                            </Grid.Column>
                            <Grid.Column width={4} className='GridColumnClass2'>
                                <div style={{ marginLeft: '13%', width: '100%', marginBottom: '20px' }}>
                                    <a style={{ width: '45%', fontSize: '1.3rem', color: 'white', marginRight: '5%' }}>焊点号:</a>
                                    <Dropdown placeholder='请选择焊点号' search selection options={this.state.Part_NumberOptions} style={{ width: '45%', marginBottom: '10px' }} onChange={this.handlePassNoChange} />
                                </div>
                                <Button.Group style={{ width: '100%' }}>
                                    <Button className='ButtonLeft'>工件序列号</Button>
                                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.Part_Serial}</Button>
                                </Button.Group>
                                <Button.Group style={{ width: '100%' }}>
                                    <Button className='ButtonLeft'>焊点号</Button>
                                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.Pass_No}</Button>
                                </Button.Group>
                                <Button.Group style={{ width: '100%' }}>
                                    <Button className='ButtonLeft'>开始时间</Button>
                                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.StartTime}</Button>
                                </Button.Group>
                                <Button.Group style={{ width: '100%' }}>
                                    <Button className='ButtonLeft'>结束时间</Button>
                                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.EndTime}</Button>
                                </Button.Group>
                                <Button.Group style={{ width: '100%' }}>
                                    <Button className='ButtonLeft'>采集周期</Button>
                                    <Button positive className='ButtonRight'>24ms</Button>
                                </Button.Group>
                                <Button.Group style={{ width: '100%' }}>
                                    <Button className='ButtonLeft'>板厚</Button>
                                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.PlateThickness}</Button>
                                </Button.Group>
                                <Button.Group style={{ width: '100%' }}>
                                    <Button className='ButtonLeft'>设定压力</Button>
                                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.StandardStress}</Button>
                                </Button.Group>
                                <Button.Group style={{ width: '100%' }}>
                                    <Button className='ButtonLeft'>设定电流</Button>
                                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.StandardCurrent}</Button>
                                </Button.Group>
                                <Button.Group style={{ width: '100%' }}>
                                    <Button className='ButtonLeft'>设定电阻</Button>
                                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.StandardResistence}</Button>
                                </Button.Group>
                                <Button.Group style={{ width: '100%' }}>
                                    <Button className='ButtonLeft'>扭矩转压力比例</Button>
                                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.TorqueToStressRate}</Button>
                                </Button.Group>
                                <Button.Group style={{ width: '100%' }}>
                                    <Button className='ButtonLeft'>步增计数</Button>
                                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.StepCount}</Button>
                                </Button.Group>
                                <Button.Group style={{ width: '100%' }}>
                                    <Button className='ButtonLeft'>步增电流</Button>
                                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.StepCurrent}</Button>
                                </Button.Group>
                                <Button.Group style={{ width: '100%' }}>
                                    <Button className='ButtonLeft'>步增号</Button>
                                    <Button positive className='ButtonRight'>{this.state.handleSearchResFirst.SteperNumber}</Button>
                                </Button.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </Modal.Content>
                <Modal.Actions className='ModalContentClass' >
                    <Button negative onClick={this.SpotWeldingModalClose}>
                        关闭
                        </Button>
                </Modal.Actions>
            </Modal>

        )
    }
}