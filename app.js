//app.js
var utils = require('./utils/util.js');
var config = require('./config/config.js');
App({
    globalData: {
        ym: [],
        jz: [],
        sr: [],
        zc: [],
        mz:[],
        color:[],
        pieData:[],
        users: {
            openid:'',
            tel: '',
            pwd: '',
            nickname: '',
            avatarUrl: '',
        },
        c_out: [{
            id:1,
            text: '餐饮',
            icon: '../../images/main/zc_1.svg'
        },
        {
            id:2,
            text: '交通',
            icon: '../../images/main/zc_2.svg'
        },
        {
            id:3,
            text: '住房',
            icon: '../../images/main/zc_3.svg'
        },
        {
            id:4,
            text: '美容',
            icon: '../../images/main/zc_4.svg'
        },
        {
            id:5,
            text: '服饰',
            icon: '../../images/main/zc_5.svg'
        },
        {
            id:6,
            text: '运动',
            icon: '../../images/main/zc_6.svg'
        },
        {
            id:7,
            text: '旅游',
            icon: '../../images/main/zc_7.svg'
        },
        {
            id:8,
            text: '娱乐',
            icon: '../../images/main/zc_8.svg'
        },
        {
            id:9,
            text: '生活',
            icon: '../../images/main/zc_9.svg'
        },
        {
            id:10,
            text: '医疗',
            icon: '../../images/main/zc_10.svg'
        },
        {
            id:11,
            text: '通讯',
            icon: '../../images/main/zc_11.svg'
        },
        {
            id:12,
            text: '学习',
            icon: '../../images/main/zc_12.svg'
        },
        {
            id:13,
            text: '礼物',
            icon: '../../images/main/zc_13.svg'
        },
        {
            id:14,
            text: '母婴',
            icon: '../../images/main/zc_14.svg'
        },
        {
            id:15,
            text: '数码',
            icon: '../../images/main/zc_15.svg'
        },
        {
            id:16,
            text: '零食',
            icon: '../../images/main/zc_16.svg'
        },
        {
            id:17,
            text: '购物',
            icon: '../../images/main/zc_17.svg'
        },
        {
            id:18,
            text: '其它',
            icon: '../../images/main/zc_18.svg'
        }
        ],
        c_in: [{
            id:19,
            text: '工资',
            icon: '../../images/main/sr_1.svg'
        },
        {
            id:20,
            text: '兼职',
            icon: '../../images/main/sr_2.svg'
        },
        {
            id:21,
            text: '礼金',
            icon: '../../images/main/sr_3.svg'
        },
        {
            id:22,
            text: '奖金',
            icon: '../../images/main/sr_4.svg'
        },
        {
            id:23,
            text: '其它',
            icon: '../../images/main/sr_5.svg'
        }
        ]
    },
    onLaunch: function () { },
})
