// pages/bookkeeping/index.js
// pages/addition/addition.js
const utils = require('../../utils/util.js');
const api = require('../../http/api.js');
let { c_out, c_in, users, mDetail } = getApp().globalData;
Page({
  data: {
    openid:'',
    current: 0,
    showtimes: 0,
    isUpdate: false,
    categories_in: [],
    categories_out: [],
    data_out: {
      date: utils.getDate(),
      week: utils.getWeek(),
      iconSelected: "",
      notes: '',
      money: '',
    },
    data_in: {
      date: utils.getDate(),
      week: utils.getWeek(),
      iconSelected: "",
      notes: '',
      money: '',
    },
  },

  onLoad: function () {
    if(mDetail.type == "0"){
      this.setData({
        current: 0,
        data_out: mDetail
      })
    }else if(mDetail.type == "1"){
      this.setData({
        current: 1,
        data_in: mDetail
      })
    }

    if(users.openid == ""){
      var self=this;
      wx.login({
        success(res) {
          //js调用登陆命令获取到code
          if (res.code) {
            //通过code调用自己服务接口获取到openid
            var url = 'https://www.chingchou.com/user/getOpenId';
            wx.request({
              url: url,
              data: {
                code: res.code
              },
              success:function(wxInfo){
                console.log(wxInfo);
                //self.data.openid = wxInfo.data.openid
                var body = JSON.parse(wxInfo.data.object.body);
                users.openid = body.openid;
                self.getPerson();
                self.loadData();
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  },

  onShow:function(){
    if(users.openid != ""){
      wx.showLoading({
        title: '加载中',
      })
      wx.hideLoading({
        complete: (res) => {
          this.loadData();
        },
      })
      
    }
  },

  loadData: function () {
    let data = {
      openid: users.openid
    };
    api.getCategories(data).then((res) => {
      let data = this.formatData(res);
      if(data.incomeIcon.length == 0){
        wx.showToast({
          duration: 4000,
          title: "您未设置收入类别，可先前往设置，默认其它",
          icon: 'none',
        })
      }else{
        if(mDetail.id == ""){
          this.setData({
            'data_in.iconSelected':data.incomeIcon[0].id
           })
        }
      }
      if(data.expenseIcon == 0){
        wx.showToast({
          duration: 4000,
          title: "您未设置支出类别，可先前往设置，默认其它",
          icon: 'none',
        })
      }else{
        if(mDetail.id == ""){
          this.setData({
            'data_out.iconSelected':data.expenseIcon[0].id
          })
        }
      }
      this.setData({
        categories_in: data.incomeIcon,
        categories_out: data.expenseIcon
      })
    }).catch((errMsg) => {
      console.log(errMsg);
    });
    // this.setData({
    //   categories_in: c_in,
    //   categories_out: c_out
    // })
  },
  formatData(data) {
    let expenseIcon = [];
    let incomeIcon = [];
    data.list.map((item) => {
        item.type === '0' ? expenseIcon.push(item) : incomeIcon.push(item);
    });
    return {
        expenseIcon,
        incomeIcon
    }
},
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '记一笔',
    });
  },
  outClick: function () {
    this.setData({
      current: 0
    });
  },
  inClick: function () {
    this.setData({
      current: 1
    });
  },
  changeCurrent: function (e) {
    this.setData({
      current: e.detail.current
    });
  },
  bindDateChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    const data_out = this.data.data_out;
    const data_in = this.data.data_in;
    if (this.data.current === 0) {
      data_out.date = e.detail.value;
      data_out.week = utils.getWeek(e.detail.value);
      this.setData({
        data_out
      })
    } else {
      data_in.date = e.detail.value;
      data_in.week = utils.getWeek(e.detail.value);
      this.setData({
        data_in
      })
    }
  },
  iconClick: function (e) {
    // console.log('current: ',this.data.current);
    let data_out = this.data.data_out;
    let data_in = this.data.data_in;
    // console.log(e.target.dataset.id)
    if (this.data.current === 0) {
      data_out.iconSelected = e.target.dataset.id;
      this.setData({
        data_out
      })
    }
    if (this.data.current === 1) {
      data_in.iconSelected = e.target.dataset.id;
      this.setData({
        data_in
      })
    }
  },
  watchNotes: function (e) {
    let data_out = this.data.data_out;
    let data_in = this.data.data_in;
    if (this.data.current === 0) {
      data_out.notes = e.detail.value;
      this.setData({
        data_out
      })
    } else {
      data_in.notes = e.detail.value;
      this.setData({
        data_in
      })
    }

  },
  watchMoney: function (e) {
    let data_out = this.data.data_out;
    let data_in = this.data.data_in;
    if (this.data.current === 0) {
      data_out.money = e.detail.value;
      this.setData({
        data_out
      })
    } else {
      data_in.money = e.detail.value;
      this.setData({
        data_in
      })
    }
  },
  handleSave: function (e) {
    wx.showLoading({
      title: '',
    });
    let data = this.data;
    let sendData;
    data.current === 0 ? sendData = data.data_out : sendData = data.data_in;
    sendData.openid = users.openid;
    sendData.type = data.current;
    if (sendData.money == '' || sendData.money == undefined) {
      wx.showToast({
        duration: 3000,
        title: "金额不能为空",
        icon: 'none',
      })
      return;
    }
   
    var check = sendData.money.split(".");
    if (check.length>2) {
      wx.showToast({
        duration: 3000,
        title: "请正确输入金额",
        icon: 'none',
      })
      return;
    }

    api['OpreateMoney'](sendData).then((res) => {
      getApp().globalData.isRefreshBills = true;
      let msg = res.retMsg;
      wx.showToast({
        duration: 3000,
        title: msg,
        icon: 'none',
      })
      let data_out = this.data.data_out;
      let data_in = this.data.data_in;
      if (this.data.current === 0) {
        data_out.id = '';
        data_out.money = '';
        data_out.notes = '';
        this.setData({
          data_out
        })
      } else {
        data_in.id = '';
        data_in.money = '';
        data_in.notes = '';
        this.setData({
          data_in
        })
      }
    }).catch((errMsg) => {
      wx.showToast({
        duration: 3000,
        title: "出错了",
        icon: 'none',
      })
    });
  },

  //入库用户信息操作
  getPerson:function(){
    var sendData = {};
    sendData.openid = users.openid;
    api['OpreateUser'](sendData).then((res) => {
      console.log("==========>openid保存成功");
    }).catch(() => {
      wx.showToast({
        duration: 3000,
        title: "出错了",
        icon: 'none',
      })
    }); 
  },

  onHide:function(){
      this.setData({
        current: 0,
        data_out: {
          id: "",
          date: utils.getDate(),
          week: utils.getWeek(),
          iconSelected: "",
          notes: '',
          money: '',
        },
        data_in: {
          id: "",
          date: utils.getDate(),
          week: utils.getWeek(),
          iconSelected: "",
          notes: '',
          money: '',
        }
      }),
      mDetail.id="";
  }

});
