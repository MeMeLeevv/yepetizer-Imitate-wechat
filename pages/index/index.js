var API_URL = 'https://api.apiopen.top/videoCategoryDetails?id=14';

Page({
  data: {
    title:"加载中...",
    movies:[]
  },
  //事件处理函数
  onLoad:function(){
    var that=this;
    wx.showToast({
      title: '加载中...',
      icon:'loading',
      duration:3000
    });
    wx.request({
      url: API_URL,
      data:{},
      header:{
        'Content-Type':'application/json'
      },
      success:function(res){
        wx.hideToast();
        var dataA=res.data;
        that.setData({
          title:"今日社区精选",
          movies:dataA.result
        })
        console.log(res.data);
       // console.log(dataA[1].data.content.data.cover.detail)
      }
    });
  }
  
})
