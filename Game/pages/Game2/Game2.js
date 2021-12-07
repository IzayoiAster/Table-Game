// pages/Game2/Game2.js
const tools = require("../../utils/tools");

Page({
    data: {
        tapIgnore: false,
        btns: [{
            id: 0,
            clr: '#fc9',
            border: 'white',
            isSelect: false
        },
        {
            id: 1,
            clr: '#cf9',
            border: 'white',
            isSelect: false
        },
        {
            id: 2,
            clr: '#dea',
            border: 'white',
            isSelect: false
        },
        {
            id: 3,
            clr: '#ead',
            border: 'white',
            isSelect: false
        },
        {
            id: 4,
            clr: '#9fc',
            border: 'white',
            isSelect: false
        },
        {
            id: 5,
            clr: '#c9f',
            border: 'white',
            isSelect: false
        },
        {
            id: 6,
            clr: '#9cf',
            border: 'white',
            isSelect: false
        },
        {
            id: 7,
            clr: '#ade',
            border: 'white',
            isSelect: false
        }],
    },

    initialize() {
        var i;
        this.setData({
            tapIgnore: true,
        })
        for(i = 0; i < 8; i++) {
            this.setData({
                ['btns[' + i + '].border']: 'white',
            });
        }
    },

    changeBorder(now) {
        var order = new Array(3, 0, 1, 2, 4, 7, 6, 5, 3);
        this.setData({
            ['btns[' + order[now] + '].border']: 'black',
            ['btns[' + order[(now-1)] + '].border']: 'white',
        });
        return order[now];
    },

    returnStatus(e) {
        this.setData({
            ['btns[' + e.detail[0] + '].isSelect']: e.detail[1],
        })
    },

    showResult(id) {
        this.setData({
            tapIgnore: false,
        });
        wx.showModal({
            title: '游戏结束',
            content: '请' + id + '号喝酒',
            confirmText: '返回主页',
            cancelText: '再来一局',
            success(res) {
                if(!res.cancel) {
                    wx.navigateBack();
                }
            }
        })
    },

    startGame() {
        if(this.checkNum()) {
            var now = 8+Math.floor(Math.random()*8);
            var t = 25;
            var dt = 1;
            var interval = setInterval(fn, t);
            var that = this;
            that.initialize();
            function fn() {
                var id = that.changeBorder(now%8+1);
                now++;
                t += dt;
                dt += Math.floor(Math.random()*3)
                clearInterval(interval);
                if(t <= 70 || !that.data.btns[id].isSelect) {
                    interval = setInterval(fn, t);
                }
                //事件出口
                else {
                    //function
                    setTimeout(that.showResult, 500, (now-1)%8+1);
                }
            }
        }
        else {
            this.showError();
        }
        //事件锁定
    },

    showRule() {
        wx.showModal({
            title: '游戏规则',
            content: '点击参与大转盘的人的对应位置，将在选中的人里随机选取一名罚酒',
            confirmText: '确认',
            showCancel: false,
        })
    },

    checkNum() {
        var cnt = 0;
        var i;
        for(i = 0; i < 8; i++) {
            if(this.data.btns[i].isSelect) {
                cnt++;
            }
        }
        return cnt > 1;
    },

    showError() {
        tools.showModal(
            '错误',
            '至少选择两名玩家'
        )
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})