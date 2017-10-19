import React from 'react';

import { Button, Card } from 'semantic-ui-react'

import { Affix } from 'antd'

import './index.css';
import ChinaMap from './chinaMap.js'
import FanucGMReportHeader from './header.js'
import FanucGMReportFooter from './footer.js'
import CRUD from '../../unit/ajax.js';

const crud = new CRUD();
let timer1 = {};

class fanucGMReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TodayAllRobotsOutputs: 4000, //所有产量
            TodayAllRobotsRunningRatio: 76.9, //所有Robot 开动率
            TodayAllPlantSafetyDays: 198, //安全生产天数
            TodayAllRobotsPlanRate: 56.9, //计划完成率
            TodayAllQuanlityRate: 98.3, //质量合格率
            //饼图
            TodayAllRobotsStateDistribution: { FaultRatio: 0, PowerOffRatio: 0, ReadyRatio: 0, RunningtRatio: 0 },
            TodayAllRobotsAlarmsDistribution: [{ value: 0, name: '0' }],
            TodayAllRobotsOutputsByPart: [{ value: 0, name: 'PartNumber' }],
            TodayAllRobotsRunningRatioPieChart: { "RunningRatio": 0, "StopRatio": 0 },
            //柱形图
            TodayAllRobotsOutputPerHour: [78.0, 78.9, 0, 77.0, 60.2, 47, 0, 52.6, 76.7, 95.6, 92.2, 92.6, 97.7, 95.6, 92.2, 95.6, 86.7, 95.6, 99.2],
            TodayAllRobotsxSevenDaysAllRobotsOutputs: [95.0, 98.9, 0, 97.0, 90.2, 97, 0, 92.6, 96.7, 95.6, 92.2, 92.6, 97.7, 95.6, 92.2, 95.6, 86.7, 95.6, 99.2],
            TodayTodayAllRobotsStopInMinutesPerHour: [95.0, 98.9, 0, 97.0, 90.2, 97, 0, 92.6, 96.7, 95.6, 92.2, 92.6, 97.7, 95.6, 92.2, 95.6, 86.7, 95.6, 99.2],
            // TodayTodayAllRobotsStopInMinutesPerHour: [,],
            PlanRate3Years: [95.0, 96.9, 94.0, 0, 0, 0, 0, 0, 0, 0, 0],
            PlanRate3Mouths: [0, 0, 0, 0, 94.2, 95.3, 95.6, 0, 0, 0, 0],
            PlanRate3Weeks: [0, 0, 0, 0, 0, 0, 0, 0, 95.6, 95.7, 95.9,],

            QuanlityRate3Years: [95.0, 96.9, 94.0, 0, 0, 0, 0, 0, 0, 0, 0],
            QuanlityRate3Mouths: [0, 0, 0, 0, 94.2, 95.3, 95.6, 0, 0, 0, 0],
            QuanlityRate3Weeks: [0, 0, 0, 0, 0, 0, 0, 0, 95.6, 95.7, 95.9,],

            ComprehensiveEfficiency3Years: [95.0, 96.9, 94.0, 0, 0, 0, 0, 0, 0, 0, 0],
            ComprehensiveEfficiency3Mouths: [0, 0, 0, 0, 94.2, 95.3, 95.6, 0, 0, 0, 0],
            ComprehensiveEfficiency3Weeks: [0, 0, 0, 0, 0, 0, 0, 0, 95.6, 95.7, 95.9,],

            //chinaMap传值
            msg: 'start',

        }
    }

    // componentWillMount = async () => {
    //     //产量，生产时间，开动率
    //     let AjaxTodayAllRobotsOutputsResponse = await crud.fanucKanbanAjaxTodayAllRobotsOutputs();
    //     let AjaxTodayAllRobotsRunningRatioResponse = await crud.fanucKanbanAjaxTodayAllRobotsRunningRatio();
    //     let AjaxPlantSafetyDaysResponse = await crud.fanucKanbanAjaxPlantSafetyDays();

    //     //饼图
    //     let AjaxTodayAllRobotsStateDistributionResponse = await crud.fanucKanbanAjaxTodayAllRobotsStateDistribution();
    //     let AjaxTodayAllRobotsAlarmsDistributionResponse = await crud.fanucKanbanAjaxTodayAllRobotsAlarmsDistribution();
    //     let AjaxTodayAllRobotsOutputsByPartResponse = await crud.fanucKanbanAjaxTodayAllRobotsOutputsByPart();

    //     //柱形图
    //     let AjaxTodayAllRobotsOutputPerHourResponse = await crud.fanucKanbanAjaxTodayAllRobotsOutputPerHour();
    //     let AjaxTodayAllRobotsxSevenDaysAllRobotsOutputsResponse = await crud.fanucKanbanAjaxSevenDaysAllRobotsOutputs();
    //     let AjaxTodayTodayAllRobotsStopInMinutesPerHourResponse = await crud.fanucKanbanAjaxTodayAllRobotsStopInMinutesPerHour();


    //     let TodayRobotAlarmsDistributionArray = AjaxTodayAllRobotsAlarmsDistributionResponse.data.SlicesInfo
    //     let arr4 = TodayRobotAlarmsDistributionArray.map(function (item, index, input) {
    //         console.log('item', item)
    //         return { value: item.Ratio, name: item.AlarmCode }
    //     })
    //     console.log('arr4', arr4)
    //     //产品类型饼图处理
    //     let TodayRobotOutputsByPartArray = AjaxTodayAllRobotsOutputsByPartResponse.data.SlicesInfo
    //     console.log('TodayRobotOutputsByPartArray', TodayRobotOutputsByPartArray)
    //     let arr5 = TodayRobotOutputsByPartArray.map(function (item, index, input) {
    //         return { value: item.Ratio, name: item.PartNumber }
    //     })

    //     //饼图的legend




    //     this.setState({
    //         TodayAllRobotsOutputs: AjaxTodayAllRobotsOutputsResponse.data.OutputsQuantity,
    //         TodayAllRobotsRunningRatio: AjaxTodayAllRobotsRunningRatioResponse.data.RunningRatio,
    //         TodayAllPlantSafetyDays: AjaxPlantSafetyDaysResponse.data.TillNowTotalSafetyDays,

    //         TodayAllRobotsStateDistribution: AjaxTodayAllRobotsStateDistributionResponse.data,
    //         TodayAllRobotsAlarmsDistribution: arr4,
    //         TodayAllRobotsOutputsByPart: arr5,
    //         TodayAllRobotsRunningRatioPieChart: AjaxTodayAllRobotsRunningRatioResponse.data,

    //         TodayAllRobotsOutputPerHour: AjaxTodayAllRobotsOutputPerHourResponse.data.SlicesInfo,
    //         TodayAllRobotsxSevenDaysAllRobotsOutputs: AjaxTodayAllRobotsxSevenDaysAllRobotsOutputsResponse.data,
    //         TodayTodayAllRobotsStopInMinutesPerHour: AjaxTodayTodayAllRobotsStopInMinutesPerHourResponse.data.BarsInfo
    //     })
    //     //更新数据
    //     // timer1 = setInterval(() => this.ajaxDataUpdate(), 15000);
    // }
    //chinaMap传值方法
    transferMsg(msg, TodayAllRobotsOutputs, TodayAllRobotsRunningRatio, TodayAllPlantSafetyDays,
        TodayAllRobotsStateDistribution, TodayAllRobotsAlarmsDistribution, TodayAllRobotsOutputsByPart, TodayAllRobotsRunningRatioPieChart,
        TodayAllRobotsOutputPerHour, TodayAllRobotsxSevenDaysAllRobotsOutputs, TodayTodayAllRobotsStopInMinutesPerHour,PlanRate3Years,PlanRate3Mouths,PlanRate3Weeks,QuanlityRate3Years,QuanlityRate3Mouths,QuanlityRate3Weeks,ComprehensiveEfficiency3Years,ComprehensiveEfficiency3Mouths,ComprehensiveEfficiency3Weeks) {
        this.setState({
            msg, TodayAllRobotsOutputs: TodayAllRobotsOutputs, TodayAllRobotsRunningRatio: TodayAllRobotsRunningRatio, TodayAllPlantSafetyDays: TodayAllPlantSafetyDays,
            TodayAllRobotsStateDistribution: TodayAllRobotsStateDistribution, TodayAllRobotsAlarmsDistribution: TodayAllRobotsAlarmsDistribution, TodayAllRobotsOutputsByPart: TodayAllRobotsOutputsByPart, TodayAllRobotsRunningRatioPieChart: TodayAllRobotsRunningRatioPieChart,
            TodayAllRobotsOutputPerHour: TodayAllRobotsOutputPerHour, TodayAllRobotsxSevenDaysAllRobotsOutputs: TodayAllRobotsxSevenDaysAllRobotsOutputs, TodayTodayAllRobotsStopInMinutesPerHour: TodayTodayAllRobotsStopInMinutesPerHour,
            PlanRate3Years:PlanRate3Years,PlanRate3Mouths:PlanRate3Mouths,PlanRate3Weeks:PlanRate3Weeks,
            QuanlityRate3Years:QuanlityRate3Years,QuanlityRate3Mouths:QuanlityRate3Mouths,QuanlityRate3Weeks:QuanlityRate3Weeks,
            ComprehensiveEfficiency3Years:ComprehensiveEfficiency3Years,ComprehensiveEfficiency3Mouths:ComprehensiveEfficiency3Mouths,ComprehensiveEfficiency3Weeks:ComprehensiveEfficiency3Weeks
    });
    }
    ajaxDataUpdate = async () => {
        //产量，生产时间，开动率
        let AjaxTodayAllRobotsOutputsResponse = await crud.fanucKanbanAjaxTodayAllRobotsOutputs();
        let AjaxTodayAllRobotsRunningRatioResponse = await crud.fanucKanbanAjaxTodayAllRobotsRunningRatio();
        let AjaxPlantSafetyDaysResponse = await crud.fanucKanbanAjaxPlantSafetyDays();

        //饼图
        let AjaxTodayAllRobotsStateDistributionResponse = await crud.fanucKanbanAjaxTodayAllRobotsStateDistribution();
        let AjaxTodayAllRobotsAlarmsDistributionResponse = await crud.fanucKanbanAjaxTodayAllRobotsAlarmsDistribution();
        let AjaxTodayAllRobotsOutputsByPartResponse = await crud.fanucKanbanAjaxTodayAllRobotsOutputsByPart();

        //柱形图
        let AjaxTodayAllRobotsOutputPerHourResponse = await crud.fanucKanbanAjaxTodayAllRobotsOutputPerHour();
        let AjaxTodayAllRobotsxSevenDaysAllRobotsOutputsResponse = await crud.fanucKanbanAjaxSevenDaysAllRobotsOutputs();
        let AjaxTodayTodayAllRobotsStopInMinutesPerHourResponse = await crud.fanucKanbanAjaxTodayAllRobotsStopInMinutesPerHour();


        this.setState({
            TodayAllRobotsOutputs: AjaxTodayAllRobotsOutputsResponse.data.OutputsQuantity,
            TodayAllRobotsRunningRatio: AjaxTodayAllRobotsRunningRatioResponse.data.RunningRatio,
            TodayAllPlantSafetyDays: AjaxPlantSafetyDaysResponse.data.TillNowTotalSafetyDays,

            TodayAllRobotsStateDistribution: AjaxTodayAllRobotsStateDistributionResponse.data,
            TodayAllRobotsAlarmsDistribution: AjaxTodayAllRobotsAlarmsDistributionResponse.data.SlicesInfo,
            TodayAllRobotsOutputsByPart: AjaxTodayAllRobotsOutputsByPartResponse.data.SlicesInfo,
            TodayAllRobotsRunningRatioPieChart: AjaxTodayAllRobotsRunningRatioResponse.data,

            TodayAllRobotsOutputPerHour: AjaxTodayAllRobotsOutputPerHourResponse.data.SlicesInfo,
            TodayAllRobotsxSevenDaysAllRobotsOutputs: AjaxTodayAllRobotsxSevenDaysAllRobotsOutputsResponse.data,
            TodayTodayAllRobotsStopInMinutesPerHour: AjaxTodayTodayAllRobotsStopInMinutesPerHourResponse.data.BarsInfo
        })
    }

    render() {
        // console.log('Index.js  this.state.TodayAllRobotsOutputs', this.state.TodayAllRobotsOutputs)
        return (
            <div>
               
                {/*<ChinaMap id='chinaMap'  transferMsg = {msg => this.transferMsg(msg,TodayAllRobotsOutputs,TodayAllRobotsRunningRatio,TodayAllPlantSafetyDays,
        TodayAllRobotsStateDistribution,TodayAllRobotsAlarmsDistribution,TodayAllRobotsOutputsByPart,TodayAllRobotsRunningRatioPieChart,
        TodayAllRobotsOutputPerHour,TodayAllRobotsxSevenDaysAllRobotsOutputs,TodayTodayAllRobotsStopInMinutesPerHour)} />*/}
                <ChinaMap id='chinaMap' transferMsg={(msg, TodayAllRobotsOutputs, TodayAllRobotsRunningRatio, TodayAllPlantSafetyDays,
                    TodayAllRobotsStateDistribution, TodayAllRobotsAlarmsDistribution, TodayAllRobotsOutputsByPart, TodayAllRobotsRunningRatioPieChart,
                    TodayAllRobotsOutputPerHour, TodayAllRobotsxSevenDaysAllRobotsOutputs, TodayTodayAllRobotsStopInMinutesPerHour, PlanRate3Years, PlanRate3Mouths, PlanRate3Weeks, QuanlityRate3Years, QuanlityRate3Mouths, QuanlityRate3Weeks, ComprehensiveEfficiency3Years, ComprehensiveEfficiency3Mouths, ComprehensiveEfficiency3Weeks) => this.transferMsg(msg, TodayAllRobotsOutputs, TodayAllRobotsRunningRatio, TodayAllPlantSafetyDays,
                        TodayAllRobotsStateDistribution, TodayAllRobotsAlarmsDistribution, TodayAllRobotsOutputsByPart, TodayAllRobotsRunningRatioPieChart,
                        TodayAllRobotsOutputPerHour, TodayAllRobotsxSevenDaysAllRobotsOutputs, TodayTodayAllRobotsStopInMinutesPerHour, PlanRate3Years, PlanRate3Mouths, PlanRate3Weeks, QuanlityRate3Years, QuanlityRate3Mouths, QuanlityRate3Weeks, ComprehensiveEfficiency3Years, ComprehensiveEfficiency3Mouths, ComprehensiveEfficiency3Weeks)} />
                <FanucGMReportHeader TodayAllRobotsOutputs={this.state.TodayAllRobotsOutputs} TodayAllRobotsRunningRatio={this.state.TodayAllRobotsRunningRatio} TodayAllPlantSafetyDays={this.state.TodayAllPlantSafetyDays} TodayAllRobotsPlanRate={this.state.TodayAllRobotsPlanRate} TodayAllQuanlityRate={this.state.TodayAllQuanlityRate} />

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

// TodayAllRobotsOutputPerHour = { this.state.TodayAllRobotsOutputPerHour }
// TodayAllRobotsxSevenDaysAllRobotsOutputs = { this.state.TodayAllRobotsxSevenDaysAllRobotsOutputs }
// TodayTodayAllRobotsStopInMinutesPerHour = { this.state.TodayTodayAllRobotsStopInMinutesPerHour }

export default fanucGMReport;