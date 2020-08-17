const api = require('../../http/api')

let {users} = getApp().globalData;
Page({
  data: {
    todaymoney: '1000',
    in: '0',
    out: '0',
    list: [],
    hiddenName:true, 
    param:{
      pageNum:'1',
      pageSize:'10'
    }
  },

  //入库用户信息操作
  onShow:function(){
    var list = this.data.list;
    this.data.param.openid = users.openid;
    var self = this;
    wx.request({
      url: 'http://127.0.0.1:8001/money/queryMoneyList',
      data: this.data.param,
      method:"POST",
      success:function(res){
        console.log("==========>查询成功");
        list = res.data.list;
        if(list.length != 0){
          self.setData({
            hiddenName:false
          })
        }else{
          self.setData({
            list
          })
        }
      }
    })
  }
  
})
