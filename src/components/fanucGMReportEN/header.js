import React from 'react';
import { Link } from 'react-router';
import { Step, Modal, Button, Grid, List, Segment, Message, Card, Icon, Image, Reveal, Header, Flag, Label } from 'semantic-ui-react'
import { Affix, Badge } from 'antd';

import { createHashHistory } from 'history'
const history = createHashHistory()

import fanucImage1 from '../../img/fanucLayout.png'
import fanucImage2 from '../../img/fanucLayout.png'
import fanucImage3 from '../../img/fanucLayout.png'

import SFLogo from '../../img/SFLogo.png'
import smartLinkLogo from '../../img/SMARTLINK.png'
import fanucLogo from '../../img/logo.png'

let simpleSteps1 = {}
class fanucGMReportHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    close = () => this.setState({ open: false })

    handeleOpen() {
        this.setState({ size:'fullscreen', open: true });
    }


    render() {
        console.log('this.props.TodayAllRobotsOutputs', this.props.TodayAllRobotsOutputs)
        simpleSteps1 = [
            { active: true, title: 'FANUC' },
            { active: true, icon: 'bar chart', title: this.props.TodayAllQuanlityRate + '%', description: '质量合格率' },
            { active: true, icon: 'area chart', title: this.props.TodayAllRobotsPlanRate + '%', description: '计划完成率' },
            { active: true, icon: 'line chart', title: '86%', description: '设备开动率' },
            { active: true, icon: 'add to cart', title: this.props.TodayAllRobotsOutput || 1001 + '件', description: '产量' },
            { active: true, icon: 'time', title: this.props.TodayAllPlantSafetyDays || 70 + '日', description: '安全生产时间' },
            { active: true, icon: 'time', title: '翊流智能', description: 'SmartFlowIntelligent' }
        ]
        const { open, size } = this.state
        return (
            <div>
                <Affix style={{ position: 'absolute', top: '12%', left: '4%' }}>
                    <Step.Group size='big' onClick={this.handeleOpen.bind(this)}>
                        <Step active>
                            <Image src={fanucLogo} size='middle' />
                        </Step>
                        <Step active>
                            <Icon name='bar chart' />
                            <Step.Content>
                                <Step.Title>{this.props.TodayAllQuanlityRate + '%'}</Step.Title>
                                <Step.Description>Percent Of Pass</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step active>
                            <Icon name='area chart' />
                            <Step.Content>
                                <Step.Title>{this.props.TodayAllRobotsPlanRate + '%'}</Step.Title>
                                <Step.Description>Completion Rate</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step active>
                            <Icon name='line chart' />
                            <Step.Content>
                                <Step.Title>86.6%</Step.Title>
                                <Step.Description>Equipment Running Rate</Step.Description>
                            </Step.Content>
                        </Step>
                        <Step active>
                            <Icon name='area chart' />
                            <Step.Content>
                                <Step.Title>{this.props.TodayAllRobotsOutputs + 'pcs'}</Step.Title>
                                <Step.Description>Yield</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step active>
                            <Icon name='line chart' />
                            <Step.Content>
                                <Step.Title>{this.props.TodayAllPlantSafetyDays + 'Days'}</Step.Title>
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




                <Modal size={size} open={open} onClose={this.close} basic>
                    <Modal.Header>
                        <a style={{fontSize:'3rem',color:'#f5f5f5'}}>Selection Plant</a>
          </Modal.Header>
                    <Modal.Content>


                        <Grid columns={5} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    <h1 style={{fontSize:'2rem',color:'#f5f5f5',marginBottom:'17px',textAlign:'center'}}>First Plant</h1>
                                    <Card href='fanuc1EN' style={{margin:'auto'}}>
                                        <Image src={fanucImage1} />
                                        <Card.Content>
                                            <Card.Header>
                                                First Plant
                                        </Card.Header>
                                        </Card.Content>
                                    </Card>

                                    <Message negative>
                                        <Message.Header>Output:10pcs</Message.Header>
                                    </Message>
                                    <Message positive>
                                        <Message.Header>Completion Rate:95%</Message.Header>
                                    </Message>
                                    <Message warning>
                                        <Message.Header >Equipment Running Rate: 88%</Message.Header>
                                    </Message>
                                    <Message positive>
                                        <Message.Header>Percent Of Pass:99%</Message.Header>
                                    </Message>
                                    <Message positive>
                                        <Message.Header>Safety :99Days</Message.Header>
                                    </Message>
                                </Grid.Column>
                                <Grid.Column>
                                    <h1 style={{fontSize:'2rem',color:'#f5f5f5',marginBottom:'17px',textAlign:'center'}}>Second Plant</h1>
                                    <Card href='fanuc1EN' style={{margin:'auto'}}>
                                        <Image src={fanucImage2} />
                                        <Card.Content>
                                            <Card.Header>
                                                Second Plant
                                        </Card.Header>
                                        </Card.Content>
                                    </Card>

                                    <Message negative>
                                        <Message.Header>Output:20pcs</Message.Header>
                                    </Message>
                                    <Message negative>
                                        <Message.Header>Completion Rate:45%</Message.Header>
                                    </Message>
                                    <Message warning>
                                        <Message.Header>Equipment Running Rate:87%</Message.Header>
                                    </Message>
                                    <Message positive>
                                        <Message.Header>Percent Of Pass:98%</Message.Header>
                                    </Message>
                                    <Message positive>
                                        <Message.Header>Safety:99Days</Message.Header>
                                    </Message>
                                </Grid.Column>
                                <Grid.Column>
                                    <h1 style={{fontSize:'2rem',color:'#f5f5f5',marginBottom:'17px',textAlign:'center'}}>Third Plant</h1>
                                    <Card href='fanuc1EN' style={{margin:'auto'}}>
                                        <Image src={fanucImage1} />
                                        <Card.Content>
                                            <Card.Header>
                                                Third Plant
                                        </Card.Header>
                                        </Card.Content>
                                    </Card>

                                    <Message negative>
                                        <Message.Header>Output:10pcs</Message.Header>
                                    </Message>
                                    <Message warning>
                                        <Message.Header>Completion Rate:75%</Message.Header>
                                    </Message>
                                    <Message warning>
                                        <Message.Header>Equipment Running Rate:87%</Message.Header>
                                    </Message>
                                    <Message positive>
                                        <Message.Header>Percent Of Pass:98%</Message.Header>
                                    </Message>
                                    <Message positive>
                                        <Message.Header>Safety:99Days</Message.Header>
                                    </Message>
                                </Grid.Column>
                                <Grid.Column>
                                    <h1 style={{fontSize:'2rem',color:'#f5f5f5',marginBottom:'17px',textAlign:'center'}}>Fourth Plant</h1>
                                    <Card href='fanuc1EN' style={{margin:'auto'}}>
                                        <Image src={fanucImage1} />
                                        <Card.Content>
                                            <Card.Header>
                                                Fourth Plant
                                        </Card.Header>
                                        </Card.Content>
                                    </Card>

                                    <Message negative>
                                        <Message.Header>Output:10pcs</Message.Header>
                                    </Message>
                                    <Message positive>
                                        <Message.Header>Completion Rate:95%</Message.Header>
                                    </Message>
                                    <Message warning>
                                        <Message.Header >Equipment Running Rate: 88%</Message.Header>
                                    </Message>
                                    <Message positive>
                                        <Message.Header>Percent Of Pass:99%</Message.Header>
                                    </Message>
                                    <Message positive>
                                        <Message.Header>Safety :99Days</Message.Header>
                                    </Message>
                                </Grid.Column>
                                <Grid.Column>
                                    <h1 style={{fontSize:'2rem',color:'#f5f5f5',marginBottom:'17px',textAlign:'center'}}>Fifth Plant</h1>
                                    <Card href='fanuc1EN' style={{margin:'auto'}}>
                                        <Image src={fanucImage1} />
                                        <Card.Content>
                                            <Card.Header>
                                                Fifth Plant
                                        </Card.Header>
                                        </Card.Content>
                                    </Card>

                                    <Message negative>
                                        <Message.Header>Output:10pcs</Message.Header>
                                    </Message>
                                    <Message positive>
                                        <Message.Header>Completion Rate:95%</Message.Header>
                                    </Message>
                                    <Message warning>
                                        <Message.Header >Equipment Running Rate: 88%</Message.Header>
                                    </Message>
                                    <Message positive>
                                        <Message.Header>Percent Of Pass:99%</Message.Header>
                                    </Message>
                                    <Message positive>
                                        <Message.Header>Safety :99Days</Message.Header>
                                    </Message>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Content>
                </Modal>

             

                <Affix style={{ position: 'absolute', top: '1%', left: '24%' }}>
                    <Image src={smartLinkLogo} size='small' style={{ width: '90px' }} />
                </Affix>

                <Affix style={{ position: 'absolute', top: '3%', left: '30%' }}>
                    {/*<Label as='a' color='red' tag>集团</Label>*/}
                     <div><span style={{fontFamily:'arial',fontSize:'4rem',color:'red', fontWeight:'bold'}}>SHANGHAI-FANUC Smart LINK<span style={{fontFamily:'book antiqua',fontStyle:'italic',fontSize:'5.6rem',color:'red'}}>i</span><span>A</span></span></div>
                </Affix>

                {/*//切换语言*/}
                <Affix style={{ position: 'absolute', top: '26%', right: '1%' }}>
                    <Header as='h3' icon textAlign='center'  >
                        <Link to="/fanuc2">
                            <Icon name='translate' circular color='black' />
                            {/*<Flag name='ae' as='big' circular />*/}
                            <Header.Content >
                                Chinese
                         </Header.Content>
                        </Link>
                    </Header>
                </Affix>

            </div>
        )
    }

}

export default fanucGMReportHeader;