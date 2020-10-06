const {http, uploadFile} = require('./http.js');
const tokenStorage = wx.getStorageSync('token');

const method = {
    get: 'GET',
    post: 'POST',
    patch: 'PATCH',
};
const host = "www.chingchou.com"; // 服务器地址
const baseURL = `https://${ host }/`;
//const baseURL = `http://127.0.0.1:8001/`;


exports.getCategories = function (data) {
    return http({
        url: baseURL + 'categories',
        method: method.get,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};

exports.delCategories = function (_id) {
    return http({
        url: baseURL + 'categories/del',
        method: method.post,
        data: {_id},
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};

exports.saveCategories = function (data) {
    return http({
        url: baseURL + 'categories',
        method: method.post,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};

//=================  zhouj start =======================

exports.OpreateMoney = function (data) {
    return http({
        url: baseURL + '/money/OpreateMoney',
        method: method.post,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};

exports.removeMoney = function (data) {
    return http({
        url: baseURL + '/money/removeMoney',
        method: method.post,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};


exports.queryMoneyList = function (data) {
    return http({
        url: baseURL + '/money/queryMoneyList',
        method: method.post,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};

exports.OpreateUser = function (data) {
    return http({
        url: baseURL + '/user/OpreateUser',
        method: method.post,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};

//意见反馈提交
exports.feedBack = function (data) {
    return http({
        url: baseURL + '/user/feedBck',
        method: method.post,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};


//意见反馈提交
exports.queryFeedBackList = function (data) {
    return http({
        url: baseURL + '/user/queryFeedBackList',
        method: method.post,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};

//统计视图查询
exports.getMoneyEcharts = function (data) {
  return http({
    url: baseURL + '/money/getMoneyEcharts',
    method: method.post,
    data,
    headers: {
      token: tokenStorage.token,
      expiresIn: tokenStorage.expiresIn
    }
  })
};

exports.queryMoneyCount = function (data) {
  return http({
    url: baseURL + '/money/queryMoneyCount',
    method: method.post,
    data,
    headers: {
      token: tokenStorage.token,
      expiresIn: tokenStorage.expiresIn
    }
  })
};

exports.queryMonthList = function (data) {
    return http({
        url: baseURL + '/money/queryMonthList',
        method: method.post,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};

exports.delMoney = function (_id) {
    return http({
        url: baseURL + 'money/delMoney',
        method: method.post,
        data: {
            id: _id
        },
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};