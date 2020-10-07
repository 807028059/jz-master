// pages/addcatalog/addcatalog.js
const api = require('./../../http/api.js');
var c_out = getApp().globalData.c_out;
var c_in = getApp().globalData.c_in;

Page({
    data: {
        categoryid: '',
        name: '',
        id: ""
    },
    onLoad: function (options) {
        wx.showLoading({
            title: '',
        })
        var categoryid = options.categoryid == null||options.categoryid == undefined?
                            options.current == 0?c_out[0].id:c_in[0].id:options.categoryid;
        if (options.current == 0) {
            this.setData({
                icons: c_out,
                categoryid: categoryid
            });
        }
        if (options.current == 1) {
            this.setData({
                icons: c_in,
                categoryid: categoryid
            });
        }
        
        this.setData({
            current: parseInt(options.current),
            name: options.name,
            id: options.id
        });
    },
    onReady: function () {
        wx.hideLoading();
        wx.setNavigationBarTitle({
            title: '类别设置',
        })
    },
    iconClick: function (e) {
        this.setData({
            categoryid: e.target.dataset.value
        });
    },
    watchName: function (e) {
        this.setData({
            name: e.detail.value
        });
    },
    saveClick: function () {
        if ( this.data.name == '' ||  this.data.name == undefined) {
            wx.showToast({
                duration: 3000,
                title: "名称不能为空哦~",
                icon: 'none',
            })
            return;
        }
        const data = {
            openid: getApp().globalData.users.openid,
            type: this.data.current,
            name: this.data.name,
            categoryid: this.data.categoryid,
            id: this.data.id
        };
        api.saveCategories(data).then((res) => {
            wx.navigateBack({
                delta: 1
            });
            getApp().globalData.isRefreshCategories = true;
        }).catch((errMsg) => {
            console.log(errMsg);
        });
    }
});