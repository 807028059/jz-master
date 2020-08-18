const api = require('../../http/api')

let {users} = getApp().globalData;
Page({
  data: {
    todaymoney: '1000',
    in: '0',
    out: '0',
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


  //入库用户信息操作
  onShow:function(){
    var list = this.data.list;
    this.data.param.openid = users.openid;
    this.data.param.type = this.data.current;
    var self = this;
    wx.request({
      url: 'http://127.0.0.1:8001/money/queryMoneyList',
      data: this.data.param,
      method:"POST",
      success:function(res){
        console.log("==========>查询成功");
        list = res.data.list;
        if(list.length == 0){
          self.setData({
            hiddenName:false
          })
        }else{
          self.setData({
            list,
            hiddenName: true
          })
        }
      }
    })
  },

  //记账删除
  delItem: function(e) {
    var id = e.currentTarget.id;
    var openid = users.openid;
    var self = this;
    wx.request({
      url: 'http://127.0.0.1:8001/money/removeMoney',
      data: { id:id,openid:openid,pageNum:"1",pageSize:"10"},
      method: "POST",
      success: function (res) {
        if(res.data.retCode == "0"){
          console.log("==========>删除成功");
          var list = res.data.list;
          if (list.length == 0) {
            self.setData({
              list:[],
              hiddenName: false
            })
          } else {
            self.setData({
              list:list,
              hiddenName: true
            })
          }
        }else{
          wx.showToast({
            duration: 3000,
            title: res.data.retMsg,
            icon: 'none',
          })
        }
      }
    })
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
