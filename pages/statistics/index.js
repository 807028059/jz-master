// 1、引入依赖脚本
import * as echarts from '../../ec-canvas/echarts';
const api = require('../../http/api');
let { mz, color,pieData,ym, jz, zc, sr,users} = getApp().globalData;
let Chart = [];

Page({
  data: {
    ec: {
      lazyLoad: true // 延迟加载
    },
    pie:{
      lazyLoad: true // 延迟加载
    },
    param:{
      openid:""
    },
    flag:false
  },

  onShow:function(){
    this.echartsComponnet1 = this.selectComponent('#mychart-dom-bar');
    this.echartsComponnet2 = this.selectComponent('#mychart-bin-bar');
    this.getMoneyEcharts();
    this.queryMoneyCount();
  },
  
  getMoneyEcharts:function(){
    wx.showLoading({
      title: '',
    });
    this.data.param.openid = users.openid;
    var sendData = this.data.param;
    var self = this;
    api['getMoneyEcharts'](sendData).then((res) => {
      console.log("==========>查询成功");
      var list = res.list;
      if (list.length == 0) {
        self.setData({
          flag: true
        })
        return;
      }
      self.setData({
        flag: false
      })
      ym = [];
      jz = [];
      sr = [];
      zc = [];
      for (var i = 0; i < list.length; i++) {
        ym.push(list[i].ym);
        jz.push(list[i].jz);
        sr.push(list[i].sr);
        zc.push(list[i].zc);
      }
      if (!Chart[0]) {
        this.init_echarts(1); //初始化图表
      } else {
        this.setOption(1); //更新数据
      }
    }).catch(() => {
      wx.showToast({
        duration: 3000,
        title: "出错了",
        icon: 'none',
      })
    });
  },

  queryMoneyCount: function () {
    wx.showLoading({
      title: '',
    });
    this.data.param.openid = users.openid;
    var sendData = this.data.param;
    var self = this;
    api['queryMoneyCount'](sendData).then((res) => {
      console.log("==========>查询成功");
      var list = res.list;
      mz=[];
      color=[];
      pieData = list;
      for (var i = 0; i < list.length; i++) {
        mz.push(list[i].name);
        color.push(self.getColor());
      }
      if (!Chart[1]) {
        this.init_echarts(2); //初始化图表
      } else {
        this.setOption(2); //更新数据
      }
    }).catch(() => {
      wx.showToast({
        duration: 3000,
        title: "出错了",
        icon: 'none',
      })
    });
  },

  getColor:function() {
    const rgb = []
    for(let i = 0; i< 3; ++i) {
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length === 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('');
  },

  //初始化图表
  init_echarts: function (i) {
    this['echartsComponnet' + i].init((canvas, width, height) => {
      // 初始化图表
      Chart[i - 1] = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(i);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart[i - 1];
    });
  },

  setOption: function (i) {
    Chart[i - 1].clear();  // 清除
    Chart[i - 1].setOption(this['getOption' + i]());  //获取新数据
  },

  getOption1: function () {
    var option = {
      color: ['#37a2da', '#32c5e9', '#67e0e3'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['净值', '收入', '支出']
      },
      grid: {
        left: 20,
        right: 20,
        height: 200,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ym,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      series: [
        {
          name: '净值',
          type: 'bar',
          barWidth: 20,
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: jz,
          itemStyle: {
            // emphasis: {
            //   color: '#37a2da'
            // }
          }
        },
        {
          name: '收入',
          type: 'bar',
          barWidth: 20,
          stack: '总量',
          label: {
            normal: {
              show: true
            }
          },
          data: sr,
          itemStyle: {
            // emphasis: {
            //   color: '#32c5e9'
            // }
          }
        },
        {
          name: '支出',
          type: 'bar',
          barWidth: 20,
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'left'
            }
          },
          data: zc,
          itemStyle: {
            // emphasis: {
            //   color: '#67e0e3'
            // }
          }
        }
      ]
    };
    return option;
  },
  getOption2: function () {
    // 指定图表的配置项和数据
    var option = {
      color: color,
      tooltip: {
        trigger: 'item',
        formatter: "{a} {b}: {c} ({d}%)"
      },
      legend: {
        orient: 'horizontal',
        top: '0',
        paddingTop: '50px',
        data: mz
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 10,
        containLabel: true
      },

      series: [
        {
          name: '',
          type: 'pie',
          radius: [0, '50%'],
          label: {
            normal: {
              show: true,
              position: 'outside',
              formatter: '{b}:{c}'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '20',
                fontWeight: 'bold'
              }
            }
          },
          data: pieData
        }
      ]
    };
    return option;
  }
});

