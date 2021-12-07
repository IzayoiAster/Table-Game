// pages/Game3/Game3.js
Page({
    data: {
        time:60,
        successNum:0,
        words:['掩耳盗铃', '乒乓球', '漫画','互联网','白雪公主','钻石','玫瑰','东张西望','跳水','唐僧','兔子','樱花','打气筒','武术','洗衣机','猩猩','仙人掌','千军万马','跳棋','温度计','京剧','圣诞老人','电梯','香蕉','老虎','柠檬','手舞足蹈','击剑','手表','看电影','灰太狼','青蛙','篮球','冰箱','飞机'],
        word:'0',
        wordID : 1
    },
    onShow:function(){
        var time = wx.getStorageSync('time')
        
        this.setData({
            time
        })
        for (let i = 1; i < this.data.words.length; i++) {
            const random = Math.floor(Math.random() * (i + 1)); [
            this.data.words[i], 
            this.data.words[random]] = [this.data.words[random], 
            this.data.words[i]]; 
        } 
        this.setData({
            word: this.data.words[0]
        })
        this.countdown()   
    },
    countdown:function(){
        let time = this.data.time
        var that = this
        that.setData({
            timer: setInterval(function () {
              time--;
              that.setData({
                time
              })
              if(time==0){
                  clearInterval(that.data.timer);
                  wx.showModal({
                    title: '时间到',
                    content: '正确数 '+that.data.successNum,
                    showCancel:false,
                    success: function (res) {
                      wx.navigateTo({
                        url: './head/head',
                      })
                    }
                  })
              }
            }, 1000)
        })
    },
    suc:function(){
        var successNum = ++this.data.successNum
        console.log(this.data.successNum)
        this.setData({
            successNum
        })
        console.log(this.data.words)
        this.setData({
            word:this.data.words[this.data.wordID]
        })
        this.data.wordID++
        if(this.data.wordID==this.data.words.length)
        wx.showModal({
            title: '词汇已尽',
            content: '正确数 '+this.data.successNum,
            showCancel:false,
            success: function (res) {
                wx.navigateTo({
                    url: './head/head',
                  })
            }
          })
    },
    skip:function(){
        this.setData({
            word:this.data.words[this.data.wordID]
        })
        this.data.wordID++
    }
})