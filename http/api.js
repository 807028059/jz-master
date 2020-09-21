const {http, uploadFile} = require('./http.js');
const tokenStorage = wx.getStorageSync('token');

const method = {
    get: 'GET',
    post: 'POST',
    patch: 'PATCH',
};
const host = "www.chingchou.com"; // 服务器地址
<<<<<<< HEAD
const baseURL = `https://${ host }/`;
//const baseURL = `http://127.0.0.1:8001/`;
=======
const port = "8001";    // 服务器端口
const baseURL = `https://${ host }/`;
>>>>>>> 8e5a006f3f5acd52ead8bbf14721df8e2c4c130c

exports.getToken = function (tel) {
    return http({
        url: baseURL + 'oauth2/token',
        method: method.get,
        data: {
            tel
        }
    });
};

exports.login = function (data) {
    return http({
        url: baseURL + 'login',
        method: method.post,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        },
    });
};

exports.register = function (users) {
    return http({
        url: baseURL + 'users/sign_up',
        method: method.post,
        data: users,
    });
};

exports.forgetPwd = function (users) {
    return http({
        url: baseURL + 'users/update_pwd',
        method: method.post,
        data: users,
    });
};

exports.getBills = function (data) {
    return http({
        url: baseURL + 'bills',
        method: method.get,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        },
    })
};

exports.delBills = function (id) {
    return http({
        url: baseURL + 'bills/del_bill',
        method: method.post,
        data: {
            _id: id
        },
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        },
    })
};

exports.search = function (data) {
    return http({
        url: baseURL + 'bills/search',
        method: method.get,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        },
    })
};

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



exports.updateBills = function (data) {
    return http({
        url: baseURL + 'bills/update_bill',
        method: method.post,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};

exports.updateNickname = function (data) {
    return http({
        url: baseURL + 'users/nickname',
        method: method.post,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        }
    })
};

exports.avatar = function ({data, fileOptions}) {
    return uploadFile({
        url: baseURL + 'users/avatar',
        fileOptions,
        data,
        headers: {
            token: tokenStorage.token,
            expiresIn: tokenStorage.expiresIn
        },
    });
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
