// pages/Game1/Game1.js
const tools = require('../../utils/tools.js');
//引入了一个tools，用到了里面的自定义弹窗
//其实就是wxwx.showModal()啦

Page({
    data: {
        curStatus: 1, //用来切换状态
        ans: '' //记录当前作答
    },
    getTarget(e) { //获取目标数字
        this.setData({
            target: e.detail.value
        })
    },
    getLower(e) { //获取下界
        this.setData({
            lower: e.detail.value
        })
    },
    getUpper(e) { //获取上界
        this.setData({
            upper: e.detail.value
        })
    },
    start() { //设置数据之后，开始游戏
        this.setData({
            curStatus: 2
        })
    },
    showRule() { //展示游戏规则
        tools.showModal(
            '游戏规则',
            `游戏开始前，设定一个范围（不含上下界），并在范围内选取一个目标数字，
            告知其他人初始范围之后开始游戏，其他人在范围内依次猜数，
            若猜中了则罚喝一杯，游戏结束。若猜的数X比目标数字大，
            则把范围上界下调到X，并由下一个人继续猜，反之同理
            `
        )
    },
    getAns(e) { //获取当前作答
        this.setData({
            ans: e.detail.value
        })
    },
    checkAns() { //检查答案
        if (this.data.ans == '') { //还没有输入答案
            tools.showModal("错误！", "请输入作答");
            return;
        }
        // （竟然还要转数字……）
        var ans = parseInt(this.data.ans);
        var lower = parseInt(this.data.lower);
        var upper = parseInt(this.data.upper);
        var target = parseInt(this.data.target);
        var that = this;
        if (ans <= lower || upper <= ans) { //不在范围内
            tools.showModal("错误！", "必须在范围内猜数");
        } else if (ans == target) { //猜中了
            that.setData({
                ans: '' //清空输入框
            })
            wx.showModal({
                title: "游戏结束",
                content: "当前玩家罚酒一杯",
                confirmText: "返回主页",
                cancelText: "再来一局",
                success(res) {
                    if (res.cancel) { //再来一局
                        that.setData({
                            curStatus: 1
                        })
                    } else { //返回主页
                        wx.navigateBack()
                    }
                }
            })
        } else if (ans < target) {
            that.setData({
                lower: ans,
                ans: ''
            })
            wx.showToast({
                title: '游戏继续',
            })
        } else {
            that.setData({
                upper: ans,
                ans: ''
            })
            wx.showToast({
                title: '游戏继续',
            })
        }
    }
})