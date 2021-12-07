// pages/Game5/Game5.js
const tools = require('../../utils/tools.js');

Page({
    data: {
        curStatus: 0, // 0 : 未开始 1 : 开始
        lastWord: '暂无', // 上一次作答的成语
        ans: '', //用户的作答
        plchd: ["请输入初始四字成语", "请输入要接龙的四字成语"],
        btntext: ["开始", "确认"]
    },
    setAns(e) {
        this.setData({
            ans: e.detail.value
        })
    },
    nextStep() {
        const that = this;
        var ans = this.data.ans;
        if (this.data.curStatus == 0) {
            // 刚开始游戏
            this.setData({
                curStatus: 1,
                lastWord: ans,
                ans: ''
            })
        } else {
            var lastWord = this.data.lastWord;
            var flag = this.isIdiom(ans);
            console.log(flag);
            if (ans[0] == lastWord[3] && flag) {
                tools.showModal("接龙成功", "游戏继续");
                this.setData({
                    lastWord: ans,
                    ans: '',
                })
            } else {
                wx.showModal({
                    title: '接龙失败',
                    content: '游戏结束',
                    cancelText: '回到主页',
                    confirmText: "再来一局",
                    success: function (res) {
                        if (res.cancel) {
                            wx.navigateBack({});
                        } else {
                            that.setData({
                                curStatus: 0,
                                ans: '',
                                lastWord: ''
                            })
                        }
                    }
                })
            }
        }
    },
    isIdiom(s) { //检测是否是成语
        const that = this;
        var flag = new Boolean();
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            method: 'GET',
            url: 'https://api.jisuapi.com/chengyu/detail',
            data: {
                appkey: 'cf71cdcc5681d2cf',
                chengyu: s,
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res);
                console.log(res.data.msg);
                wx.hideLoading();
                if (res.data.msg == 'ok') {
                    flag = Boolean(1);
                } else {
                    flag = Boolean(0);
                }
            }
        })
        console.log(flag);
        return flag;
    },
})