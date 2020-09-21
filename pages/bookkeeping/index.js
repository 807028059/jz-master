// pages/bookkeeping/index.js
// pages/addition/addition.js
const utils = require('../../utils/util.js');
const api = require('../../http/api.js');
let { c_out, c_in, users, text } = getApp().globalData;
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
      getWeek: utils.getWeek(),
      iconSelected: 1,
      notes: '',
      money: '',
    },
    data_in: {
      date: utils.getDate(),
      getWeek: utils.getWeek(),
      iconSelected: 19,
      notes: '',
      money: '',
    },
  },
  onLoad: function (options) {
    if (options.data) {
      let res = JSON.parse(options.data);
      let { type } = res;
      let data = {};
      let current = 0;
      if (type === 0) {
        current = 0;
        data.data_out = res;
        this.setData({
          current,
          data_out: data.data_out,
          isUpdate: true,
          url: options.route
        })
      } else {
        current = 1;
        data.data_in = res;
        this.setData({
          current,
          data_in: data.data_in,
          isUpdate: true,
          url: options.route
        })
      }
    } else {
      this.setData({
        url: options.route
      })
    }

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
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

  },
  formatData(data) {
    let expenseIcon = [];
    let incomeIcon = [];
    Object.assign(expenseIcon, c_out);
    Object.assign(incomeIcon, c_in);
    data.map((item) => {
      item.data.id = item._id;
      item.type === 0 ? expenseIcon.push(item.data) : incomeIcon.push(item.data);
    });
    return {
      expenseIcon,
      incomeIcon
    }
  },
  loadData: function () {
    let data = {
      tel: users.tel
    };
    // api.getCategories(data).then((res) => {
    //   let data = this.formatData(res);
    //   this.setData({
    //     categories_in: data.incomeIcon,
    //     categories_out: data.expenseIcon
    //   })
    //   console.log(categories_in)
    // }).catch((errMsg) => {
    //   console.log(errMsg);
    // });
    this.setData({
      categories_in: c_in,
      categories_out: c_out
    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '记一笔',
    });
    this.loadData();
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
      data_out.getWeek = utils.getWeek(e.detail.value);
      this.setData({
        data_out
      })
    } else {
      data_in.date = e.detail.value;
      data_in.getWeek = utils.getWeek(e.detail.value);
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
    if (!(/(^[0-9]*$)/.test(sendData.money))) {
      wx.showToast({
        duration: 3000,
        title: "金额只能为数字",
        icon: 'none',
      })
      return;
    }

    api['OpreateMoney'](sendData).then((res) => {
      getApp().globalData.isRefreshBills = true;
      wx.showToast({
        duration: 3000,
        title: "记账成功",
        icon: 'none',
      })
      let data_out = this.data.data_out;
      let data_in = this.data.data_in;
      if (this.data.current === 0) {
        data_out.money = '';
        data_out.notes = '';
        data_out.iconSelected = '1';
        this.setData({
          data_out
        })
      } else {
        data_in.money = '';
        data_in.notes = '';
        data_in.iconSelected = '19';
        this.setData({
          data_in
        })
      }
    }).catch((errMsg) => {
      wx.showToast({
        duration: 3000,
        title: errMsg,
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
  }

});
