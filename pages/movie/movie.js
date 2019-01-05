var API_URL = 'http://baobab.kaiyanapp.com/api/v1/video/';
// pages/movie/movie.js
Page({
  data: { 
    movie:{},
    src:''
  },
  listenerVideo: function (e) {
    console.log(e.detail.errMsg);
  },
  onLoad: function (params) {
    this.videoCtx = wx.createVideoContext('myVideo');
    this.videoCtx.requestFullScreen({direction:90});
    var that=this;
    //console.log(params);
    wx.request({
      url: API_URL+params.id,
      data:{},
      header:{
        'Content-Type':'application/json'
      },
      success:function(res){
        console.log(res.data);
        that.setData({
          movie:res.data,
          src: res.data.playUrl
        }),
        console.log("Url=" + res.data.playUrl);
      },
      
    });
  },

  
})