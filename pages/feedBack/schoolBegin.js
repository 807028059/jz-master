// pages/schoolBegin/schoolBegin.js
const api = require('../../http/api')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    param:{
      pageNum:'',
      pageSize:''
    }
  },

  //查询反馈信息
  onShow:function(){
    wx.showLoading({
      title: '',
    });
    this.data.param.pageNum = "1";
    this.data.param.pageSize = "10";
    var sendData = this.data.param;
    var self = this;
    api['queryFeedBackList'](sendData).then((res) => {
      console.log("==========>查询成功");
        var list = res.list;
        self.setData({
          list:list
        })
    }).catch(() => {
      wx.showToast({
        duration: 3000,
        title: "出错了",
        icon: 'none',
      })
    });
  }

})