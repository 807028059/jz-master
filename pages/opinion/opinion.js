// pages/opinion/opinion.js
let {users} = getApp().globalData;
const api = require('../../http/api.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: ""
  },
  clcikGood:function(e){
    var sendData = {};
    sendData.content = e.detail.value.textarea;
    sendData.openid = users.openid;
    if(sendData.content == undefined){
      wx.showToast({
        duration: 3000,
        title: "请填写后保存",
        icon: 'none',
      })
      return;
    }
    api['feedBack'](sendData).then((res) => {
      var title = "提交成功";
      if(res.retCode != "0"){
        title = "提交失败";
      }
      wx.showToast({
        title: title,
        icon: 'success',
        duration: 2000,//持续的时间
        success:function(){
          wx.switchTab({
            url:"/pages/home/index",
          })
        }
      })
    }).catch((errMsg) => {
      wx.showToast({
        duration: 3000,
        title: errMsg,
        icon: 'none',
      })
    });
  },
  
})