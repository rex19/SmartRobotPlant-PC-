import React from 'react';
import { Button, Card } from 'semantic-ui-react'
import { Affix } from 'antd'
import './index.css';
import ChinaMap from './chinaMap.js'
import FanucGMReportHeader from './header.js'
import FanucGMReportFooter from './footer.js'
import CRUD from '../../unit/ajax.js';


class fanucGMReport extends React.Component {
  constructor(props) {
    super(props);
    // 初始化state
    this.state = {
      TodayAllRobotsOutputs: 4000, //所有产量
      TodayAllRobotsRunningRatio: 90.5, //所有Robot 开动率
      TodayAllPlantSafetyDays: 198, //安全生产天数
      TodayAllRobotsPlanRate: 96.8, //计划完成率
      TodayAllQuanlityRate: 98.7, //质量合格率
      //计划完成率/质量合格率/综合效率  最近三年三个月三周的初始化值
      PlanRate3Years: [95.0, 96.9, 94.0, 0, 0, 0, 0, 0, 0, 0, 0],
      PlanRate3Mouths: [0, 0, 0, 0, 94.2, 95.3, 95.6, 0, 0, 0, 0],
      PlanRate3Weeks: [0, 0, 0, 0, 0, 0, 0, 0, 95.6, 95.7, 95.9,],
      QuanlityRate3Years: [95.0, 96.9, 94.0, 0, 0, 0, 0, 0, 0, 0, 0],
      QuanlityRate3Mouths: [0, 0, 0, 0, 94.2, 95.3, 95.6, 0, 0, 0, 0],
      QuanlityRate3Weeks: [0, 0, 0, 0, 0, 0, 0, 0, 95.6, 95.7, 95.9,],
      ComprehensiveEfficiency3Years: [95.0, 96.9, 94.0, 0, 0, 0, 0, 0, 0, 0, 0],
      ComprehensiveEfficiency3Mouths: [0, 0, 0, 0, 94.2, 95.3, 95.6, 0, 0, 0, 0],
      ComprehensiveEfficiency3Weeks: [0, 0, 0, 0, 0, 0, 0, 0, 95.6, 95.7, 95.9,],

      //chinaMap传值例子
      msg: 'start',

    }
  }

  //chinaMap传值方法
  transferMsg(msg, TodayAllRobotsOutputs, TodayAllRobotsRunningRatio, TodayAllPlantSafetyDays, TodayAllRobotsPlanRate, TodayAllQuanlityRate,
    PlanRate3Years, PlanRate3Mouths, PlanRate3Weeks, QuanlityRate3Years, QuanlityRate3Mouths, QuanlityRate3Weeks, ComprehensiveEfficiency3Years, ComprehensiveEfficiency3Mouths, ComprehensiveEfficiency3Weeks) {
    console.log('TodayAllRobotsOutputs, TodayAllRobotsRunningRatio, TodayAllPlantSafetyDays, TodayAllRobotsPlanRate, TodayAllQuanlityRate,', TodayAllRobotsOutputs, TodayAllRobotsRunningRatio, TodayAllPlantSafetyDays, TodayAllRobotsPlanRate, TodayAllQuanlityRate)
    this.setState({
      msg, TodayAllRobotsOutputs: TodayAllRobotsOutputs, TodayAllRobotsRunningRatio: TodayAllRobotsRunningRatio, TodayAllPlantSafetyDays: TodayAllPlantSafetyDays, TodayAllRobotsPlanRate: TodayAllRobotsPlanRate, TodayAllQuanlityRate: TodayAllQuanlityRate,
      PlanRate3Years: PlanRate3Years, PlanRate3Mouths: PlanRate3Mouths, PlanRate3Weeks: PlanRate3Weeks,
      QuanlityRate3Years: QuanlityRate3Years, QuanlityRate3Mouths: QuanlityRate3Mouths, QuanlityRate3Weeks: QuanlityRate3Weeks,
      ComprehensiveEfficiency3Years: ComprehensiveEfficiency3Years, ComprehensiveEfficiency3Mouths: ComprehensiveEfficiency3Mouths, ComprehensiveEfficiency3Weeks: ComprehensiveEfficiency3Weeks
    });
  }


  render() {
    return (
      <div>
        {/*中国地图组件   transferMsg目的实现子组件向父组件传值*/}
        <ChinaMap id='chinaMap' transferMsg={(msg, TodayAllRobotsOutputs, TodayAllRobotsRunningRatio, TodayAllPlantSafetyDays, TodayAllRobotsPlanRate, TodayAllQuanlityRate,
          PlanRate3Years, PlanRate3Mouths, PlanRate3Weeks, QuanlityRate3Years, QuanlityRate3Mouths, QuanlityRate3Weeks, ComprehensiveEfficiency3Years, ComprehensiveEfficiency3Mouths, ComprehensiveEfficiency3Weeks) => this.transferMsg(msg,
            TodayAllRobotsOutputs, TodayAllRobotsRunningRatio, TodayAllPlantSafetyDays, TodayAllRobotsPlanRate, TodayAllQuanlityRate,
            PlanRate3Years, PlanRate3Mouths, PlanRate3Weeks, QuanlityRate3Years, QuanlityRate3Mouths, QuanlityRate3Weeks, ComprehensiveEfficiency3Years, ComprehensiveEfficiency3Mouths, ComprehensiveEfficiency3Weeks)} />
        {/*总经理看板  header组件 标题栏和一些绝对定位的组件都在这里 */}
        <FanucGMReportHeader TodayAllRobotsOutputs={this.state.TodayAllRobotsOutputs} TodayAllRobotsRunningRatio={this.state.TodayAllRobotsRunningRatio} TodayAllPlantSafetyDays={this.state.TodayAllPlantSafetyDays} TodayAllRobotsPlanRate={this.state.TodayAllRobotsPlanRate} TodayAllQuanlityRate={this.state.TodayAllQuanlityRate} />
        {/*总经理看板  footer组件所有charts都在此组件 */}
        <FanucGMReportFooter
          TodayAllRobotsStateDistribution={this.state.TodayAllRobotsStateDistribution}
          TodayAllRobotsAlarmsDistribution={this.state.TodayAllRobotsAlarmsDistribution}
          TodayAllRobotsOutputsByPart={this.state.TodayAllRobotsOutputsByPart}
          TodayAllRobotsRunningRatioPieChart={this.state.TodayAllRobotsRunningRatioPieChart}


          PlanRate3Years={this.state.PlanRate3Years}
          PlanRate3Mouths={this.state.PlanRate3Mouths}
          PlanRate3Weeks={this.state.PlanRate3Weeks}
          QuanlityRate3Years={this.state.QuanlityRate3Years}
          QuanlityRate3Mouths={this.state.QuanlityRate3Mouths}
          QuanlityRate3Weeks={this.state.QuanlityRate3Weeks}
          ComprehensiveEfficiency3Years={this.state.ComprehensiveEfficiency3Years}
          ComprehensiveEfficiency3Mouths={this.state.ComprehensiveEfficiency3Mouths}
          ComprehensiveEfficiency3Weeks={this.state.ComprehensiveEfficiency3Weeks}
        />
      </div>
    )
  }
}


export default fanucGMReport;