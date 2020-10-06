const api = require('../../http/api')
const utils = require('../../utils/util.js');

let {users} = getApp().globalData;
Page({
  data: {
    monthJE: '0',
    monthIn: '0',
    monthOut: '0',
    list: [],
    hiddenName:true, 
    current: "0",
    param:{
      pageNum:'1',
      pageSize:'10'
    },
    delBtnWidth: 160,
    isScroll: true,
    windowHeight: 0,
    date: utils.getDate().substring(0,7),
    year: utils.getDate().split("-")[0],
    month: utils.getDate().split("-")[1]
  },

  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });
  },

  drawStart: function (e) {
    // console.log("drawStart");  
    var touch = e.touches[0]

    for (var index in this.data.list) {
      var item = this.data.list[index]
      item.right = 0
    }
    this.setData({
      list: this.data.list,
      startX: touch.clientX,
    })

  },

  drawMove: function (e) {
    var touch = e.touches[0]
    var item = this.data.list[e.currentTarget.dataset.index]
    var disX = this.data.startX - touch.clientX

    if (disX >= 20) {
      if (disX > this.data.delBtnWidth) {
        disX = this.data.delBtnWidth
      }
      item.right = disX
      this.setData({
        isScroll: false,
        data: this.data.list
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        list: this.data.list
      })
    }
  },  

  drawEnd: function (e) {
    var item = this.data.list[e.currentTarget.dataset.index]
    if (item.right >= this.data.delBtnWidth / 2) {
      item.right = this.data.delBtnWidth
      this.setData({
        isScroll: true,
        list: this.data.list,
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        list: this.data.list,
      })
    }
  },

  // onReachBottom: function () { //触底开始下一页
  //   var that=this;
  //   var pagenum = Number(that.data.param.pageNum) +1; //获取当前页数并+1
  //   that.setData({
  //     param:{
  //       pageNum:pagenum.toString(),
  //       pageSize:'10'
  //     }
  //   })
  //   that.getJzList();//重新调用请求获取下一页数据
  // },

  onShow:function(){
    this.data.list = [];
    this.getJzList();
  },

  //查询记账信息
  getJzList:function(){
    wx.showLoading({
      title: '',
    });
    this.data.param.openid = users.openid;
    this.data.param.date = this.data.date;
    this.data.param.type = this.data.current;
    var sendData = this.data.param;
    var self = this;
    api['queryMonthList'](sendData).then((res) => {
      console.log("==========>查询成功");
        var list = res.list;
        var object = res.object;
        self.setData({
          list:list,
          hiddenName: true,
          monthOut:object.monthOut,
          monthIn:object.monthIn,
          monthJE:object.monthJE
        })
    }).catch(() => {
      wx.showToast({
        duration: 3000,
        title: "出错了",
        icon: 'none',
      })
    });
  },

  outClick: function () {
    this.setData({
      current: "0",
      list: []
    });
    this.onShow();
  },

  inClick: function () {
    this.setData({
      current: "1",
      list:[]
    });
    this.onShow();
  },

  bindDateChange: function(e) {
    console.log(e);
    var choseTime = e.detail.value.split("-");
    this.setData({
        date: e.detail.value.toString(),
        year:choseTime[0],
        month:choseTime[1],
        param:{pageNum:"1",pageSize:"10"}
    })
    this.onShow();
  },
  refresh() {
      this.getJzList(this);
  }
})
