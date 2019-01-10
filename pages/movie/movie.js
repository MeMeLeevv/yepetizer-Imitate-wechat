var API_URL = 'http://baobab.kaiyanapp.com/api/v1/video/';
var requests = require('../../requests/request.js');
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
    requests.request(API_URL + params.id,{},(data)=>{
      that.setData({
        movie: data,
        src: data.playUrl
      })
    });
  },
})