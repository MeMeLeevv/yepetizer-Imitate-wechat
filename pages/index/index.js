var API_URL = 'https://api.apiopen.top/videoCategoryDetails?id=14';
var requests = require('../../requests/request.js');
Page({
  data: {
    title: "加载中...",
    movies: []
  },
  //事件处理函数
  onLoad: function() {
    var that = this;
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 3000
    });
    requests.request(API_URL,{},(data)=>{
      wx.hideToast();
      that.setData({
        title: "今日社区精选",
        movies: data.result
      })
    });

  }
})