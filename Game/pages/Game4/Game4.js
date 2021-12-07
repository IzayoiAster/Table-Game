// pages/Game4/Game4.js
const tools = require('../../utils/tools.js');

Page({
  data: {
    curStatus: 1,
    inputpro: '',
    answear: '',
    number: 0,
    timer: '', //定时器名字
    countDownNum: '60' //倒计时初始值
  },

  getProposition(a) { //设置命题
    this.setData({
      inputpro: a.detail.value
    })

  },



  showRule() { //展示游戏规则
    tools.showModal(
      '游戏规则',
      `答题者回答题目，每人回答5次，答案从一个字开始，回答字数随次数增加，在规定时间未答完者，接受惩罚。
      `
    )
  },
  getAnswear(b) {
    let length = b.detail.value.length;
    this.setData({
      answear: b.detail.value,
      number: length
    })
  },

  submit() {
    var number = parseInt(this.data.number);
    var that = this;
    if (number != 5) {
      that.setData({
        answear: ''
      })
      wx.showToast({
        title: '游戏继续',
      })
    } else {
      wx.showModal({
        title: "游戏结束",
        content: "恭喜恭喜恭喜你！是否返回主页",
        confirmText: "返回主页",

        success(res) {
          if (res.confirm) { //再来一局
            /*that.setData({
                curStatus: 1,
                countDownNum:'60',
                number : 0
            })*/
            wx.navigateBack()
          }
        }
      })
    }

  },
  start: function () {
    //什么时候触发倒计时，就在什么地方调用这个函数
    this.setData({
      curStatus: 2
    })
    this.countDown();
  },

  countDown: function () {
    let that = this;
    let countDownNum = that.data.countDownNum; //获取倒计时初始值
    //如果将定时器设置在外面，那么用户就看不到countDownNum的数值动态变化，所以要把定时器存进data里面
    that.setData({
      timer: setInterval(function () { //这里把setInterval赋值给变量名为timer的变量
        //每隔一秒countDownNum就减一，实现同步
        countDownNum--;
        //然后把countDownNum存进data，好让用户知道时间在倒计着
        that.setData({
          countDownNum: countDownNum
        })
        //在倒计时还未到0时，这中间可以做其他的事情，按项目需求来
        if (countDownNum == 0 && number !== 5) {
          //这里特别要注意，计时器是始终一直在走的，如果你的时间为0，那么就要关掉定时器！不然相当耗性能
          //因为timer是存在data里面的，所以在关掉时，也要在data里取出后再关闭
          clearInterval(that.data.timer);
          //关闭定时器之后，可作其他处理codes go here
          wx.showModal({
            title: "游戏结束",
            content: "恭喜恭喜恭喜你！是否返回主页",
            confirmText: "返回主页",

            success(res) {
              if (res.confirm) { //再来一局
                /*that.setData({
                    curStatus: 1,
                    countDownNum:'60',
                    number : 0
                })*/
                wx.navigateBack()
              }
              /* else { //返回主页
                                 
                              }*/
            }
          })
        }
      }, 1000)
    })
  }

  /*————————————————
  此处倒计时为借鉴
  原文链接：https://blog.csdn.net/Charles_Tian/article/details/80669221
  */
})