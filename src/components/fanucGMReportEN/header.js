import React from 'react';
import { Link } from 'react-router';

import { Step, Modal, Button, Grid, List, Segment, Message, Card, Icon, Image, Reveal, Header, Label } from 'semantic-ui-react'
import { Affix, Badge } from 'antd';


//三个车间图片引入
import fanucImage from '../../img/fanuc10Y.jpg'
//logo引入
import SFLogo from '../../img/SFLogo.png'
import smartLinkLogo from '../../img/SMART LINK.png'
import fanucLogo from '../../img/logo.png'

// let size = 'fullscreen'
class fanucGMReportHeader extends React.Component {
  //构造函数 
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }
  //关闭模态框的方法
  close = () => this.setState({ open: false })

  // 打开模态框
  handeleOpen() {
    this.setState({ size: 'fullscreen', open: true });
  }


  render() {

    // 从state解构赋值 取出变量
    const { open, size } = this.state
    return (
      <div>
        {/*//绝对定位 是标签栏  说明各个生产方面的参数*/}
        <Affix style={{ position: 'absolute', top: '13%', left: '6%' }}>
          <Step.Group size='huge' onClick={this.handeleOpen.bind(this)}>
            <Step active >
              <Step.Content  >
                {/*<Step.Title  as='huge'>FANUC</Step.Title>*/}
                <Image src={fanucLogo} size='middle' />
              </Step.Content>
            </Step>

            <Step active>
              <Icon name='area chart' />
              <Step.Content>
                <Step.Title>{this.props.TodayAllRobotsPlanRate || 86}%</Step.Title>
                <Step.Description>Completion Rate</Step.Description>
              </Step.Content>
            </Step>

            <Step active>
              <Icon name='line chart' />
              <Step.Content>
                <Step.Title>{this.props.TodayAllRobotsRunningRatio || 96}%</Step.Title>
                <Step.Description>Equipment Running Rate</Step.Description>
              </Step.Content>
            </Step>
            <Step active>
              <Icon name='area chart' />
              <Step.Content>
                <Step.Title>{this.props.TodayAllRobotsOutputs || 4000}pcs</Step.Title>
                <Step.Description>Yield</Step.Description>
              </Step.Content>
            </Step>

            <Step active>
              <Icon name='line chart' />
              <Step.Content>
                <Step.Title>{this.props.TodayAllPlantSafetyDays || 197}</Step.Title>
                <Step.Description>Safety Days</Step.Description>
              </Step.Content>
            </Step>
            <Step active>
              <img scr={SFLogo} />
              <Step.Content>
                {/*<Step.Title>翊流智能</Step.Title>*/}
                <Image src={SFLogo} size='small' />
              </Step.Content>
            </Step>
          </Step.Group>
        </Affix>



        {/*模态框  选择车间*/}
        <Modal size={size} open={open} onClose={this.close} basic>
          <Modal.Header>
            <a style={{ fontSize: '3rem', color: '#f5f5f5' }}>Select Plants</a>
          </Modal.Header>
          <Modal.Content>


            <Grid columns={5} divided>
              <Grid.Row>
                <Grid.Column>
                  <h1 style={{ fontSize: '2rem', color: '#f5f5f5', marginBottom: '17px', textAlign: 'center' }}>First Plant</h1>
                  <Card href='fanuc1EN' style={{ margin: 'auto' }}>
                    <Image src={fanucImage} />
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
                  <h1 style={{ fontSize: '2rem', color: '#f5f5f5', marginBottom: '17px', textAlign: 'center' }}>Second Plant</h1>
                  <Card href='fanuc1EN' style={{ margin: 'auto' }}>
                    <Image src={fanucImage} />
                    <Card.Content>
                      <Card.Header>
                        Second Plant
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
                  <h1 style={{ fontSize: '2rem', color: '#f5f5f5', marginBottom: '17px', textAlign: 'center' }}>Third Plant</h1>
                  <Card href='fanuc1EN' style={{ margin: 'auto' }}>
                    <Image src={fanucImage} />
                    <Card.Content>
                      <Card.Header>
                        Third Plant
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
                  <h1 style={{ fontSize: '2rem', color: '#f5f5f5', marginBottom: '17px', textAlign: 'center' }}>Fourth Plant</h1>
                  <Card href='fanuc1EN' style={{ margin: 'auto' }}>
                    <Image src={fanucImage} />
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
                  <h1 style={{ fontSize: '2rem', color: '#f5f5f5', marginBottom: '17px', textAlign: 'center' }}>Fifth Plant</h1>
                  <Card href='fanuc1EN' style={{ margin: 'auto' }}>
                    <Image src={fanucImage} />
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

        {/*//smartLinkLogo  */}
        <Affix style={{ position: 'absolute', top: '1%', left: '24%' }}>
          <Image src={smartLinkLogo} size='small' style={{ width: '90px' }} />
        </Affix>
        {/*SMARTLINK title
                <span style={{ fontFamily: 'book antiqua', fontStyle: 'italic', fontSize: '5.6rem', color: 'red' }}>i</span><span>A</span>
                */}
        <Affix style={{ position: 'absolute', top: '3%', left: '31%' }}>
          {/*<Label as='a' color='red' tag>集团</Label>*/}
          <div><span style={{ fontFamily: 'arial', fontSize: '4rem', color: 'red', fontWeight: 'bold' }}>SHANGHAI-FANUC Smart LINK</span></div>
        </Affix>

        {/*//切换语言*/}
        <Affix style={{ position: 'absolute', top: '26%', right: '1%' }}>
          <Header as='h3' icon textAlign='center'  >
            <Link to="/fanuc2">
              <Icon name='translate' circular color='white' />
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