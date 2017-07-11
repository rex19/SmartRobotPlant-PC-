import React from 'react';

// import { Statistic } from 'semantic-ui-react'
import { Affix } from 'antd';

import RobotRunningStatePieChart from '../chartEN/robotRunningStatePieChart.js'
import RobotUtilizationPieChart from '../chartEN/robotUtilizationPieChart.js'
import RobotAlarmPieChart from '../chartEN/robotAlarmPieChart.js'
import RobotProductionPieChart from '../chartEN/robotProductionPieChart.js'

import RobotDayDowntimeBarChart from '../chartEN/robotComprehensiveEfficiencyBarChart.js'
import RobotDayOutputBarChart from '../chartEN/robotQuanlityRateBarChart.js'
import RobotWeekOutputBarChart from '../chartEN/robotPlanRateBarChart.js'



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

              <Affix style={{ position: 'absolute', top: '62%', left: '1%' }}>
                    <RobotDayOutputBarChart  QuanlityRate3Years={this.props.QuanlityRate3Years} QuanlityRate3Mouths={this.props.QuanlityRate3Mouths} QuanlityRate3Weeks={this.props.QuanlityRate3Weeks}  />
                </Affix>
                <Affix style={{ position: 'absolute', top: '62%', left: '35%' }}>
                    <RobotWeekOutputBarChart  PlanRate3Years={this.props.PlanRate3Years} PlanRate3Mouths={this.props.PlanRate3Mouths} PlanRate3Weeks={this.props.PlanRate3Weeks}   />
                </Affix>
                <Affix style={{ position: 'absolute', top: '62%', right: '1%' }}>
                    <RobotDayDowntimeBarChart  ComprehensiveEfficiency3Years={this.props.ComprehensiveEfficiency3Years} ComprehensiveEfficiency3Mouths={this.props.ComprehensiveEfficiency3Mouths} ComprehensiveEfficiency3Weeks={this.props.ComprehensiveEfficiency3Weeks} />
                </Affix>
            </div>
        )
    }

}

export default fanucGMReportFooter;