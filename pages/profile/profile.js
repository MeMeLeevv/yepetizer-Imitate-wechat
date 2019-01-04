Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickName:'',
    avatarUrl:'',
    gender:'',
    province:'',
    city:'',
    country:''
  },
  onLoad: function () {
    var that=this;
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              var userInfo=res.userInfo;
              console.log(res.userInfo);
              that.setData({
                
                nickName : userInfo.nickName,
                avatarUrl : userInfo.avatarUrl,
                gender : userInfo.gender ,//性别 0：未知、1：男、2：女
                province : userInfo.province,
                city : userInfo.city,
                country : userInfo.country,
              })

              
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
  }
})