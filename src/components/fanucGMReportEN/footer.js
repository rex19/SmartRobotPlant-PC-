import React from 'react';

// import { Statistic } from 'semantic-ui-react'
import { Affix } from 'antd';

// import RobotRunningStatePieChart from '../chart/robotRunningStatePieChart.js'
// import RobotUtilizationPieChart from '../chart/robotUtilizationPieChart.js'
// import RobotAlarmPieChart from '../chart/robotAlarmPieChart.js'
// import RobotProductionPieChart from '../chart/robotProductionPieChart.js'

import RobotDayDowntimeBarChart from '../chartEN/robotComprehensiveEfficiencyBarChart.js'
import RobotDayOutputBarChart from '../chartEN/robotQuanlityRateBarChart.js'
import RobotWeekOutputBarChart from '../chartEN/robotPlanRateBarChart.js'

import './index.css'
/**
 * 代码尸体不确定客户是否会再加上去
 */

class fanucGMReportFooter extends React.Component {


  render() {
    return (
      <div>
        {/*<Affix style={{ position: 'absolute', top: '20%', left: '5%' }}>
                    <RobotRunningStatePieChart TodayAllRobotsStateDistribution={this.props.TodayAllRobotsStateDistribution} />
                </Affix>
                <Affix style={{ position: 'absolute', top: '20%', left: '25%' }}>
                    <RobotUtilizationPieChart  TodayAllRobotsRunningRatioPieChart={this.props.TodayAllRobotsRunningRatioPieChart}  />
                </Affix>
                <Affix style={{ position: 'absolute', top: '20%', left: '50%' }}>
                    <RobotAlarmPieChart TodayAllRobotsAlarmsDistribution={this.props.TodayAllRobotsAlarmsDistribution} />
                </Affix>
                <Affix style={{ position: 'absolute', top: '20%', left: '75%' }}>
                    <RobotProductionPieChart TodayAllRobotsOutputsByPart={this.props.TodayAllRobotsOutputsByPart} />
                </Affix>*/}

        {/*<Affix style={{ position: 'absolute', top: '62%', left: '1%' }}>
                    <RobotDayOutputBarChart  TodayAllRobotsOutputPerHour={this.props.TodayAllRobotsOutputPerHour} />
                </Affix>
                <Affix style={{ position: 'absolute', top: '62%', left: '35%' }}>
                    <RobotWeekOutputBarChart   TodayAllRobotsxSevenDaysAllRobotsOutputs={this.props.TodayAllRobotsxSevenDaysAllRobotsOutputs} />
                </Affix>
                <Affix style={{ position: 'absolute', top: '62%', right: '1%' }}>
                    <RobotDayDowntimeBarChart  TodayTodayAllRobotsStopInMinutesPerHour={this.props.TodayTodayAllRobotsStopInMinutesPerHour} />
                </Affix>*/}
        {/*子组件-质量合格率 柱形图*/}
        <Affix style={{ position: 'absolute', top: '55%', left: '1%' }}>
          <div className='footerRobotDayOutputBarChartClass'>
            <RobotDayOutputBarChart QuanlityRate3Years={this.props.QuanlityRate3Years} QuanlityRate3Mouths={this.props.QuanlityRate3Mouths} QuanlityRate3Weeks={this.props.QuanlityRate3Weeks} />
          </div>
        </Affix>
        {/*子组件-计划完成率 柱形图*/}
        <Affix style={{ position: 'absolute', top: '55%', left: '35%' }}>
          <div className='footerRobotDayOutputBarChartClass'>
            <RobotWeekOutputBarChart PlanRate3Years={this.props.PlanRate3Years} PlanRate3Mouths={this.props.PlanRate3Mouths} PlanRate3Weeks={this.props.PlanRate3Weeks} />
          </div>
        </Affix>
        {/*子组件-综合效率 柱形图*/}
        <Affix style={{ position: 'absolute', top: '55%', right: '1%' }}>
          <div className='footerRobotDayOutputBarChartClass'>
            <RobotDayDowntimeBarChart ComprehensiveEfficiency3Years={this.props.ComprehensiveEfficiency3Years} ComprehensiveEfficiency3Mouths={this.props.ComprehensiveEfficiency3Mouths} ComprehensiveEfficiency3Weeks={this.props.ComprehensiveEfficiency3Weeks} />
          </div>
        </Affix>
      </div>
    )
  }

}

export default fanucGMReportFooter;


