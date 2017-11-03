import React from 'react';
import { Affix } from 'antd';
import RobotDayDowntimeBarChart from '../chart/robotComprehensiveEfficiencyBarChart.js'
import RobotDayOutputBarChart from '../chart/robotQuanlityRateBarChart.js'
import RobotWeekOutputBarChart from '../chart/robotPlanRateBarChart.js'

import './index.css'
class fanucGMReportFooter extends React.Component {


  render() {
    return (
      <div>
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


