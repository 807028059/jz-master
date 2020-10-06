// components/bill-list/bill-list.js
const api = require('./../../http/api.js');
let {mDetail} = getApp().globalData;

Component({
    /**
     * Component properties
     */
    properties: {
        data: Array
    },

    /**
     * Component initial data
     */
    data: {},

    /**
     * Component methods
     */
    methods: {
        handleDelete(e) {
            const id = e.target.dataset.id;
            const that = this;
            wx.showModal({
                title: '警告',
                content: '您确定要删除此条记录',
                success(res) {
                    if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.showLoading({
                            title: '',
                        });
                        that.del(that, id);
                    }
                }
            })
        },
        del(that, id) {
            api.delMoney(id).then((res) => {
                this.triggerEvent('refresh');
                wx.showToast({
                    title: '删除成功',
                    duration: 1000
                })
            }).catch((errMsg) => {
                console.log(errMsg);
                wx.showToast({
                    title: errMsg,
                    duration: 1000
                })
            });
        },
        handleModify(e) {
            let {id, week, date, notes, money, type, iconSelected} = e.target.dataset.item;
            mDetail.id=id;
            mDetail.week=week;
            mDetail.date=date;
            mDetail.notes=notes;
            mDetail.money=money;
            mDetail.type=type;
            mDetail.iconSelected=iconSelected;
            wx.switchTab({
                url: '/pages/bookkeeping/index',
                success: function (e) {
                    var page = getCurrentPages().pop();
                    if (page == undefined || page == null) return;
                    page.onLoad();
                  }
            });
        }
    }
});
