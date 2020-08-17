let config = function () {
    let host = '127.0.0.1';// 图片服务器地址
    let uploadPort = '3000';//图片服务器端口
    return {
        appid: 'wx516d07a01bed9fe4',
        secret: '0955b142b8f0b0bd57dcc9de4c9e1854',
        TEL_REGEXP: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
        PWD_REGEXP: /^ (?=.* [a - zA - Z])(?=.* [0 - 9])[A - Za - z0 - 9]{ 8, 18 } $/,
        host: host + ":" + uploadPort
    };
}

module.exports = config();