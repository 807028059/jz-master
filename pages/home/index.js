const api = require('../../http/api')

let {users} = getApp().globalData;
Page({
  data: {
    monthJE: '1000',
    todayIn: '0',
    todayOut: '0',
    list: [],
    hiddenName:true, 
    current: "0",
    param:{
      pageNum:'1',
      pageSize:'10'
    },
    delBtnWidth: 160,
    isScroll: true,
    windowHeight: 0
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


  //查询记账信息
  onShow:function(){
    wx.showLoading({
      title: '',
    });
    this.data.param.openid = users.openid;
    this.data.param.type = this.data.current;
    var sendData = this.data.param;
    var self = this;
    api['queryMoneyList'](sendData).then((res) => {
      console.log("==========>查询成功");
        var list = res.list;
        var object = res.object;
        if(list.length == 0){
          self.setData({
            hiddenName:false,
            list:[],
            todayOut:object.todayOut,
            todayIn:object.todayIn,
            monthJE:object.monthJE
          })
        }else{
          self.setData({
            list:list,
            hiddenName: true,
            todayOut:object.todayOut,
            todayIn:object.todayIn,
            monthJE:object.monthJE
          })
        }
    }).catch(() => {
      wx.showToast({
        duration: 3000,
        title: "出错了",
        icon: 'none',
      })
    });
  },

  //记账删除
  delItem: function(e) {
    wx.showLoading({
      title: '',
    });
    var sendData = {};
    sendData.id = e.currentTarget.id;
    sendData.openid = users.openid;
    sendData.pageNum = "1";
    sendData.pageSize = "10";
    var self = this;
    api['removeMoney'](sendData).then((res) => {
      if(res.retCode == "0"){
        console.log("==========>删除成功");
        var list = res.list;
        var object = res.object;
        if (list.length == 0) {
          self.setData({
            list:[],
            hiddenName: false,
            todayOut:object.todayOut,
            todayIn:object.todayIn,
            monthJE:object.monthJE
          })
        } else {
          self.setData({
            list:list,
            hiddenName: true,
            todayOut:object.todayOut,
            todayIn:object.todayIn,
            monthJE:object.monthJE
          })
        }
      }else{
        wx.showToast({
          duration: 3000,
          title: res.data.retMsg,
          icon: 'none',
        })
      }
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
  }

  
})
