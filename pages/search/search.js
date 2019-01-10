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
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function(e, inputFocus) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
    setInputLeft(that);
  },

  wxSearchKeyTap: function(e) {
    var that = this
    inputValue = e.target.dataset.key
    setValue(that);
    WxSearch.wxSearchKeyTap(e, that);

  },

  wxSearchDeleteAll: function(e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function(e) {
    var that = this
    if (inputValue === "") {
      setInputCenter(that);
    }
    WxSearch.wxSearchHiddenPancel(that);
  },
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
