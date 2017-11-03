// import React from 'react';
import axios from 'axios';

// 发布环境
const port = 7001
const ip = 'smart-flow.diskstation.me'
const api = 'FANUC/api'

// // 开发环境
// const port = 80
// const ip = '172.16.29.188'
// const api = 'FANUC/api'

// // 开发环境
// const port = 80
// const ip = '192.168.1.117'
// const api = 'FANUC/api'

export default class CRUD {

  /**
   * fanucGMReport Ajax
   */

  //工厂所有机器人的当天实时的总加工数(数字标签)
  fanucKanbanAjaxTodayAllRobotsOutputs() {
    return axios.get(`http://${ip}:${port}/${api}/TodayAllRobotsOutputs`, {})
  }

  //工厂所有机器人当天实时的开动率(数字百分数标签)
  fanucKanbanAjaxTodayAllRobotsRunningRatio() {
    return axios.get(`http://${ip}:${port}/${api}/TodayAllRobotsRunningRatio`, {})
  }

  //显示安全天数 (数字标签)
  fanucKanbanAjaxPlantSafetyDays() {
    return axios.get(`http://${ip}:${port}/${api}/PlantSafetyDays`, {})
  }

  //所有机器人当天的运行状态饼图
  fanucKanbanAjaxTodayAllRobotsStateDistribution() {
    return axios.get(`http://${ip}:${port}/${api}/TodayAllRobotsStateDistribution`, {})
  }


  //工厂所有机器人Alarm类型分布饼图
  fanucKanbanAjaxTodayAllRobotsAlarmsDistribution() {
    return axios.get(`http://${ip}:${port}/${api}/TodayAllRobotsAlarmsDistribution`, {})
  }

  //工厂所有机器人生产产品类型分布饼图
  fanucKanbanAjaxTodayAllRobotsOutputsByPart() {
    return axios.get(`http://${ip}:${port}/${api}/TodayAllRobotsOutputsByPart`, {})
  }

  //所有机器人当天每小时的总加工量趋势柱状图
  fanucKanbanAjaxTodayAllRobotsOutputPerHour() {
    return axios.get(`http://${ip}:${port}/${api}/TodayAllRobotsOutputPerHour`, {})
  }

  //所有机器人前7天每天的总加工量趋势柱状图
  fanucKanbanAjaxSevenDaysAllRobotsOutputs() {
    return axios.get(`http://${ip}:${port}/${api}/SevenDaysAllRobotsOutputs`, {})
  }

  //所有机器人当天每小时停机总量趋势柱状图
  fanucKanbanAjaxTodayAllRobotsStopInMinutesPerHour() {
    return axios.get(`http://${ip}:${port}/${api}/TodayAllRobotsStopInMinutesPerHour`, {})
  }





  /**
   * fanucKanban Ajax
   */
  //最近出问题机器人
  fanucKanbanAjaxCurrentFaultRobots() {
    return axios.get(`http://${ip}:${port}/${api}/CurrentFaultRobots`, {})
  }

  //单个Cell的产量
  fanucKanbanAjaxTodayRobotOutputs(Cell) {
    return axios.get(`http://${ip}:${port}/${api}/TodayRobotOutputs/` + Cell, {})
  }

  //显示CellInfoLabel (隐藏/显示)
  fanucKanbanAjaxRobotCurrentInfo() {
    return axios.get(`http://${ip}:${port}/${api}/RobotCurrentInfo`, {})
  }

  //单一robot当天的运行状态饼图
  fanucKanbanAjaxTodayRobotStateDistribution(Cell = 1) {
    console.log(Cell, 'cellAJAX_______')
    return axios.get(`http://${ip}:${port}/${api}/TodayRobotStateDistribution/` + Cell, {})
  }

  //机器人开动率饼图
  fanucKanbanAjaxTodayRobotRunningRatio(Cell = 1) {
    return axios.get(`http://${ip}:${port}/${api}/TodayRobotRunningRatio/` + Cell, {})
  }

  //报警信息饼图
  fanucKanbanAjaxTodayRobotAlarmsDistribution(Cell = 1) {
    return axios.get(`http://${ip}:${port}/${api}/TodayRobotAlarmsDistribution/` + Cell, {})
  }

  //单一robot生产产品类型分布饼图
  fanucKanbanAjaxTodayRobotOutputsByPart(Cell = 1) {
    return axios.get(`http://${ip}:${port}/${api}/TodayRobotOutputsByPart/` + Cell, {})
  }

  //单一robot当天每小时的总加工量趋势柱状图
  fanucKanbanAjaxTodayRobotOutputPerHour(Cell = 1) {
    return axios.get(`http://${ip}:${port}/${api}/TodayRobotOutputPerHour/` + Cell, {})
  }

  //单一robot前7天每天的总加工量趋势柱状图
  fanucKanbanAjaxSevenDaysRobotOutputs(Cell = 1) {
    return axios.get(`http://${ip}:${port}/${api}/SevenDaysRobotOutputs/` + Cell, {})
  }

  //单一robot当天每小时停机总量趋势柱状图
  fanucKanbanAjaxTodayRobotStopInMinutesPerHour(Cell = 1) {
    return axios.get(`http://${ip}:${port}/${api}/TodayRobotStopInMinutesPerHour/` + Cell, {})
  }

  //报警信息记录
  fanucKanbanAjaxTodayRobotCurrentAlarm(Cell = 1) {
    return axios.get(`http://${ip}:${port}/${api}/RobotCurrentAlarm/` + Cell, {})
  }

  //查询序列号  带两个参数  弧焊
  fanucKanbanAjaxSelectPartSerialByArc(Serial_Part, Pass_No) {
    return axios.get(`http://${ip}:${port}/${api}/UnitMeasurementHistory?Part_Serial=` + Serial_Part + `&Pass_No=` + Pass_No, {})
  }
  //查询序列号  带两个参数  点焊
  fanucKanbanAjaxSelectPartSerialBySpot(Serial_Part, Pass_No) {
    return axios.get(`http://${ip}:${port}/${api}/SpotUnitMeasurementHistory?Part_Serial=` + Serial_Part + `&Pass_No=` + Pass_No, {})
  }
  //查询序列号  带两个参数  涂胶
  fanucKanbanAjaxSelectPartSerialByGluing(Serial_Part, Pass_No) {
    return axios.get(`http://${ip}:${port}/${api}/SealUnitMeasurementHistory?Part_Serial=` + Serial_Part + `&Pass_No=` + Pass_No, {})
  }
  //查询序列号  带两个参数  打磨
  fanucKanbanAjaxSelectPartSerialBySanding(Serial_Part) {
    return axios.get(`http://${ip}:${port}/${api}/PolishUnitMeasurementHistory?Part_Serial=` + Serial_Part, {})
  }
  //查询序列号  带两个参数  冲压
  fanucKanbanAjaxSelectPartSerialByStamping(Serial_Part) {
    return axios.get(`http://${ip}:${port}/${api}/PressUnitMeasurementHistory?Part_Serial=` + Serial_Part, {})
  }

  //查询序列号  1个参数 CellID
  fanucKanbanAjaxSelectRobotIDPartSerial(Cell) {
    return axios.get(`http://${ip}:${port}/${api}/UnitMeasurementHistory/` + Cell, {})
  }

  //电流电压 1个参数 CellID   弧焊
  fanucKanbanAjaxSelectUnitMeasurementHistoryByRobotID(Cell) {
    return axios.get(`http://${ip}:${port}/${api}/UnitMeasurementHistory/` + Cell, {})
  }

  //电流电压 1个参数 CellID   点焊
  fanucKanbanAjaxSelectSpotUnitMeasurementHistoryByRobotID(Cell) {
    return axios.get(`http://${ip}:${port}/${api}/SpotUnitMeasurementHistory/` + Cell, {})
  }

  //电流电压 1个参数 CellID   涂胶
  fanucKanbanAjaxSelectSealUnitMeasurementHistoryByRobotID(Cell) {
    return axios.get(`http://${ip}:${port}/${api}/SealUnitMeasurementHistory/` + Cell, {})
  }

  //电流电压 1个参数 CellID   打磨
  fanucKanbanAjaxSelectPolishUnitMeasurementHistoryByRobotID(Cell) {
    return axios.get(`http://${ip}:${port}/${api}/PolishUnitMeasurementHistory/` + Cell, {})
  }

  //电流电压 1个参数 CellID   冲压
  fanucKanbanAjaxSelectPressUnitMeasurementHistoryByRobotID(Cell) {
    return axios.get(`http://${ip}:${port}/${api}/PressUnitMeasurementHistory/` + Cell, {})
  }
  // //post ,保存序列号相关参数
  // fanucKanbanAjaxInsertPartSerialRecord(obj) {
  //     return axios.post(`http://${ip}:${port}/${api}/UnitMeasurementHistory/`, { "": obj })
  // }

  //post ,保存序列号相关参数
  fanucKanbanAjaxInsertPartSerialRecord(id) {
    return axios.get(`http://${ip}:${port}/${api}/StandardUnitMeasurement/` + id, {})
  }




  /**
   * /chinaMapDATA
   * @param {*} province 
   */
  //chinaMapDATA
  fanucKanbanAjaxChinaMap(province) {
    return axios.get(`http://${ip}:${port}/${api}/fanucKanbanAjaxChinaMap/?province=` + province, {})
  }

  //工厂所有机器人的当天实时的总加工数(数字标签)
  fanucKanbanAjaxTodayAllRobotsOutputsChinaMap(province) {
    return axios.get(`http://${ip}:${port}/${api}/TodayAllRobotsOutputsChinaMap/?province=` + province, {})
  }

  //工厂所有机器人当天实时的开动率(数字百分数标签)
  fanucKanbanAjaxTodayAllRobotsRunningRatioChinaMap(province) {
    return axios.get(`http://${ip}:${port}/${api}/TodayAllRobotsRunningRatioChinaMap/?province=` + province, {})
  }

  //显示安全天数 (数字标签)
  fanucKanbanAjaxPlantSafetyDaysChinaMap(province) {
    return axios.get(`http://${ip}:${port}/${api}/PlantSafetyDaysChinaMap/?province=` + province, {})
  }

  //所有机器人当天的运行状态饼图
  fanucKanbanAjaxTodayAllRobotsStateDistributionChinaMap(province) {
    return axios.get(`http://${ip}:${port}/${api}/TodayAllRobotsStateDistributionChinaMap/?province=` + province, {})
  }

  //工厂所有机器人Alarm类型分布饼图
  fanucKanbanAjaxTodayAllRobotsAlarmsDistributionChinaMap(province) {
    return axios.get(`http://${ip}:${port}/${api}/TodayAllRobotsAlarmsDistributionChinaMap/?province=` + province, {})
  }

  //工厂所有机器人生产产品类型分布饼图
  fanucKanbanAjaxTodayAllRobotsOutputsByPartChinaMap(province) {
    return axios.get(`http://${ip}:${port}/${api}/TodayAllRobotsOutputsByPartChinaMap/?province=` + province, {})
  }

  //所有机器人当天每小时的总加工量趋势柱状图
  fanucKanbanAjaxTodayAllRobotsOutputPerHourChinaMap(province) {
    return axios.get(`http://${ip}:${port}/${api}/TodayAllRobotsOutputPerHourChinaMap/?province=` + province, {})
  }

  //所有机器人前7天每天的总加工量趋势柱状图
  fanucKanbanAjaxSevenDaysAllRobotsOutputsChinaMap(province) {
    return axios.get(`http://${ip}:${port}/${api}/SevenDaysAllRobotsOutputsChinaMap/?province=` + province, {})
  }

  //所有机器人当天每小时停机总量趋势柱状图
  fanucKanbanAjaxTodayAllRobotsStopInMinutesPerHourChinaMap(province) {
    return axios.get(`http://${ip}:${port}/${api}/TodayAllRobotsStopInMinutesPerHourChinaMap/?province=` + province, {})
  }
  // var timer1 = setInterval(function () {  }, 5000);

}


