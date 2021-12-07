Page({
  data: {

  },
  gameStart:function(){
    wx.navigateTo({
      url: '/pages/Game3/Game3',
    })
  },
  gameSetting:function(){
    wx.navigateTo({
      url: '../setting/setting',
    })
  }
})