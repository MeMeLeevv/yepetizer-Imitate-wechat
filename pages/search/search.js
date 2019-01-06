var WxSearch = require('../../wxSearch/wxSearch.js')
var inputValue = "";
Page({
  data: {
    inputShowed: false,
    left: 85,
    align: 'center',
    inputValue: "",
    wxSearchData: { //可注释掉？？？可以不先声明data的值！
      view: {
        isShow: true
      }
    },
  },

  onLoad: function() {
    var that = this;
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification', 'besu', 'hhahaha', 'Selina', '55555', 'what you', 'goodforyou', 'heyguy']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
  },
  onReady: function() {
    this.animation = wx.createAnimation()
  },

  refresh: function() {
    var that = this;
    //console.log(this)
    WxSearch.refresh(that)
  },
  arrowforward: function() {
    var that = this;
    WxSearch.arrowforward(that)
  },

  inputclear: function(e) {
    var that = this
    inputValue = ""
    WxSearch.clearInput(e, that)
    WxSearch.wxSearchFocus(e, that);
    setInputLeft(that);
  },
  wxSearchFn: function(e) { //点击搜索button后
    var that = this
    WxSearch.wxSearchAddHisKey(that);

  },
  wxSearchInput: function(e, inputTyping) { //bindinput——键盘输入时触发的事件
    var that = this
    inputValue = e.detail.value;
    setValue(that);
    //console.log(e.data.value)
    //WxSearch.wxSearchFocus(e, that);
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function(e, inputFocus) {
    var that = this
    //inputValue = e.data.value
    WxSearch.wxSearchFocus(e, that);
    setInputLeft(that);
  },
  /*wxSearchBlur: function (e, inputFocus) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
    if (e.detail.value === "") {
      this.setData({
        left: 85,
        align: "center",
        inputShowed: false
      });
    }
  },*/
  wxSearchKeyTap: function(e) {
    var that = this
    inputValue = e.target.dataset.key
    setValue(that);
    WxSearch.wxSearchKeyTap(e, that);

  },
  /*wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },*/
  wxSearchDeleteAll: function(e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function(e) {
    var that = this
    //console.log(WxSearch)
    if (inputValue === "") {
      setInputCenter(that);
    }
    //console.log("vv")
    WxSearch.wxSearchHiddenPancel(that);
    // WxSearch.wxSearchBlur(e, that);
  },
  /*clearInput: function () {
    //console.log("geieii")
    this.setData({
      inputVal: "",
      inputShowed: true
    });
  },*/


  /*
    inputFocus: function() {
      this.setData({
        left: 10,
        align: "left",
        inputShowed: true
      })
    },

    hideInput: function() {
      this.setData({
        inputVal: "",
        inputShowed: false
      });
    },
   
    inputTyping: function(e) {
      inputValue = e.detail.value;
      this.setData({
        inputVal: e.detail.value,

      });
    },

    inputBlur: function(e) {

      if (e.detail.value === "") {
        this.setData({
          left: 85,
          align: "center",
          inputShowed: false
        });
      }
    },
    */
});

function setInputCenter(that) {
  that.setData({
    left: 85,
    align: "center",
    inputShowed: false,
    inputValue: inputValue
  });
}

function setValue(that) {
  that.setData({
    inputValue: inputValue
  })
}

function setInputLeft(that) {
  that.setData({
    left: 10,
    align: "left",
    inputShowed: true,
    inputValue: inputValue
  })
}

// pages/search/search.js
/*
var API_URL = "https://api.apiopen.top/likePoetry";
Page({
  data: {
    lists:[]
  },
  search:function(e){
    if(!e.detail.value){
      return;
    }
    wx.showToast({
      title: '加载中...',
      icon:'loading',
      duration:1000,
    });
    var that = this;
    wx.request({
      url: API_URL+"?name="+e.detail.value,
      data:{},
      header:{
        'Content-Type':'application/json'
      },
      success:function(res){
        console.log(res.data);
        wx.hideToast();
        that.setData({
          lists:res.data.result,
        })
      }
    });
  },


  onLoad: function (options) {

  },

  onReady: function () {

  },


  onShow: function () {

  },


  onHide: function () {

  },


  onUnload: function () {

  },

  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  onShareAppMessage: function () {

  }
})
*/