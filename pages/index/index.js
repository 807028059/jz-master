const app = getApp()

Page({
  data: {
    openid:""
  },
  //按钮回调的方法
  getPerson:function(e){
    console.log(this.data.openid);
    console.log(e);
    var title = this.data.openid == undefined?"1":"2222";
    wx.showToast({  
      title: title,  
      icon: 'success',  
      duration: 2000  
  })  
  },



  onLoad: function () {
    var self=this;
    wx.login({
      success(res) {
        //js调用登陆命令获取到code
        if (res.code) {
          //通过code调用自己服务接口获取到openid
          wx.request({
            url: 'https://api.sopans.com/third/wxOpenId.php',
            data: {
              code: res.code
            },
            success:function(wxInfo){
              console.log(wxInfo);
              self.data.openid = wxInfo.data.openid
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
})