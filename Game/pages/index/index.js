// pages/index/index.js
Page({
    data: {
        btns: [{ //这个数组存放各个按钮的相关数据
                name: '猜数小游戏', //名字
                opt: 'openGame1', //点击之后执行的函数叫啥名
                clr: '#F08080' //颜色
            },
            {
                name: '幸运大转盘',
                opt: 'openGame2',
                clr: '#F0E68C'
            },
            {
                name: '你演我猜',
                opt: 'openGame3',
                clr: '#87CEEB'
            },
            {
                name: '问答接龙',
                opt: 'openGame4',
                clr: '#3CB371'
            },
            {
                name: '成语接龙',
                opt: 'openGame5',
                clr: '#C0C0C0'
            }
        ]
    },
    openGame1() {
        wx.navigateTo({ //跳转到xx页面
            url: '/pages/Game1/Game1'
        })
    },
    openGame2() {
        wx.navigateTo({
            url: '/pages/Game2/Game2'
        })
    },
    openGame3() {
        wx.navigateTo({
            url: '/pages/Game3/head/head'
        })
    },
    openGame4() {
        wx.navigateTo({
            url: '/pages/Game4/Game4'
        })
    },
    openGame5() {
        wx.navigateTo({
            url: '/pages/Game5/Game5'
        })
    }
})