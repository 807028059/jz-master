import * as echarts from '../../ec-canvas/echarts';

let chart = null;

function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  let chartsData = {
    title: '',
    xData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],         //x轴刻度数据
    yData: {            //y轴刻度数据
      min: 0,
      max: 80,
      unit: '元/天'
    },
    sData: [0]          //实际数据
  }
  var option = getOption(chartsData);
  chart.setOption(option);
  return chart;
};

function getOption({ title, xData, yData, sData } = chartsData) {
  var option = {
    title: {
      text: title,
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      },

    },
    color: ["#FDD835"],
    legend: {
      data: ['A'],
      top: 0,
      bottom: 'bottom',
      z: 100
    },
    grid: {
      containLabel: true,
      left: 20,
    },
    tooltip: {                         //提示
      position: function (point, params, dom, rect, size) {
        // 固定在顶部
        return [point[0], '10%'];
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        }
      },
    },
    xAxis: {                        //x轴
      axisPointer: {
        show: true
      },
      type: 'category',
      boundaryGap: true,
      data: xData,
      show: true
    },
    yAxis: {                        //y轴
      name: yData.unit,
      type: 'value',
      min: 0,
      max: 80,
      interval: 20,
    },
    visualMap: {                    //视觉映射组件
      show: false,
      dimension: 0,

      dimension: 1,
      continuous: {
        orient: 'horizontal'
      },
      pieces: [{
        lt: yData.min,
        color: '#FDD835'
      }, {
        gte: yData.min,
        lte: yData.max,
        color: '#FDD835'
      }, {
        gt: yData.max,
        color: '#FDD835'
      },]
    },
    series: [{                      //图表类型
      type: 'line',
      symbol: 'circle',
      symbolSize: 8,
      smooth: false,
      data: [10, 18, 25, 9, 48, 19, 45],
    }]
  };
  return option;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  }
})
