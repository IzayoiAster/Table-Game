// pages/Game3/setting/setting.js
Page({
  data: {
    time:60
  },
  timeInput:function(e){
    this.setData({
      time:e.detail.value*1
    })
  },
  confirm:function(e){
    console.log(this.data.time)
    var that = this
    if(!/^\+?[1-9][0-9]*$/.test(this.data.time)){
      wx.showToast({
        title: '请输入正整数',
        icon: 'none', 
        duration: 2000     
      })    
    }else{
      wx.setStorage({
            data: this.data.time,
            key: "time",
            success: (res) => {console.log("success")},
            fail: (res) => {console.log("fail")},
            complete: (res) => {
              wx.navigateBack({
                delta: 1
              })
            },
          })
    }
    
  },
})