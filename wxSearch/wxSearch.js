// 定义数据格式

/***
 * 
 * "wxSearchData":{
 *  configconfig:{
 *    style: "wxSearchNormal"
 *  },
 *  view:{
 *    hidden: true,
 *    searchbarHeght: 20
 *  }
 *  keys:[],//自定义热门搜索
 *  his:[]//历史搜索关键字
 *  value
 *  rotate
 * }
 * 
 * 
 */
var __keysColor = [];
var n = 1;//记录旋转次数

var keysInit = [];//保存keys初始化的值，全局可引用
var __mindKeys = []; //关键字提示
//现在只是在模板里编辑，search页面才是真正引用它的时候


function initColors(colors) {
  __keysColor = colors;
}

function initMindKeys(keys) {
  __mindKeys = keys;
}

function init(that, barHeight, keys, isShowKey, isShowHis, callBack) {
  keysInit = keys.slice(0); //保存初始keys值，可在其他函数中引用(深拷贝，浅拷贝只会引用数组)
  var keysOrigin = keys.slice(0);//深拷贝，在本函数使用，不改变keys的值
  var keysRandom = [];//保存keys随机筛选后的值
  var temData = {
    //keys
    //view
    //value
  };
  var view = {
    barHeight: barHeight,
    isShow: false
    //isShowSearchKey
    //isShowSearchHistory
    //seachHeight
  }

  if (typeof(isShowKey) == 'undefined') {
    view.isShowSearchKey = true;
  } else {
    view.isShowSearchKey = isShowKey;
  }

  if (typeof(isShowHis) == 'undefined') {
    view.isShowSearchHistory = true;
  } else {
    view.isShowSearchHistory = isShowHis;
  }
  
  var keysNum = keys.length / 2;//只展示初始化keys数目的一半
  //随机抽取关键字
  for (var i = 0; i < keysNum; i++) {
    // console.log(keysOrigin.length)
    var j = getRandomInt(0, keysOrigin.length);//取随机索引值
    keysRandom.push(keysOrigin[j]);
    keysOrigin.splice(j, 1);//去掉已展示的值，防止重复
  }
  temData.arrow = 0; //箭头旋转角度
  temData.arrowNum = 0;//记录旋转次数
  temData.arrowHeight=80;//keyslist的高，为了使transition的过渡效果生效
  temData.keys = keysRandom;

  wx.getSystemInfo({ //微信小程序API-设备-系统信息
    success: function(res) { //接口调用成功
      var wHeight = res.windowHeight;
      view.seachHeight = wHeight - barHeight;
      temData.view = view;
      temData.see = 20;
      that.setData({
        wxSearchData: temData
      });
    }
  })
  if (typeof(callBack) == "function") {
    callBack();
  }
  getHisKeys(that);
}
//返回一个在指定值之间的随机整数。这个值比min大（如果min不是整数，那就不小于比min大的整数），但小于（但不等于）max
function getRandomInt(min, max) {
  //console.log(keysInit);
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
//刷新
function refresh(that) {
  var keysOri = keysInit.slice(0);//深拷贝
  var keysRan = [];
  var temData = that.data.wxSearchData;
  var keysNum = keysInit.length / 2;
   //随机抽取关键字
  for (var i = 0; i < keysNum; i++) {
    var j = getRandomInt(0, keysOri.length);
    keysRan.push(keysOri[j]);
    keysOri.splice(j, 1);
  }
  temData.keys = keysRan;
  temData.rotate = 360 * n;
  n++;
  that.setData({
    wxSearchData: temData
  })
}


//展開或者收起
function arrowforward(that) {
  var temData = that.data.wxSearchData;
  temData.arrow = temData.arrowNum * 180;//旋转角度
  temData.arrowNum++;
  var keysOri = keysInit.slice(0);
  var keysOriNum = keysOri.length;

  if(temData.keys.length<keysInit.length){//判断是收起状态
    temData.arrowHeight=160;//重置css高度
    for(var i=0;i< temData.keys.length;i++){
      removeByValue(keysOri, temData.keys[i]);//先移除掉已展示的值
    }
    temData.keys = temData.keys.concat(keysOri);//两数组合并连接，concat 會返回值，需要載體去承接
  }else{//否则是展开状态
    temData.arrowHeight = 80;
    temData.keys.splice(-keysOriNum/2,keysOriNum/2);//移除掉后一半，keys最好是偶數……
    
  }
  that.setData({
    wxSearchData: temData
  })
}

//从数组中删除指定值元素
function removeByValue(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}

function wxSearchInput(e, that, callBack) { //键盘输入时触发
  var temData = that.data.wxSearchData;
  var text = e.detail.value;
  var mindKeys = []; // mindKeys即为所要检索内容的集合
  // var mindKeys = ['weappdev.com','微信小程序开发','微信开发','微信小程序']; 关键字提示
  //WxSearch.initMindKeys(mindKeys);
  if (typeof(text) == "undefined" || text.length == 0) {


  } else {
    for (var i = 0; i < __mindKeys.length; i++) {
      var mindKey = __mindKeys[i];
      if (mindKey.indexOf(text) > -1) {
        mindKeys.push(mindKey);
      }
    }
  }
  temData.value = text;
  temData.mindKeys = mindKeys;
  that.setData({
    wxSearchData: temData
  });
}

function clearInput(e, that) {
  var temData = that.data.wxSearchData;
  e.detail.value = "";
  temData.value = e.detail.value;
  that.setData({
    wxSearchData: temData
  });

}

function wxSearchFocus(e, that, callBack) {
  var temData = that.data.wxSearchData;
  temData.view.isShow = true;
  that.setData({
    wxSearchData: temData
  });
  //回调
  if (typeof(callBack) == "function") {
    callBack();
  }
  // if(typeof(temData) != "undefined"){
  //   temData.view.hidden= false;
  //   that.setData({
  //     wxSearchData:temData
  //   });
  // }else{

  // }
}

function wxSearchBlur(e, that, callBack) {
  var temData = that.data.wxSearchData;
  temData.value = e.detail.value;
  that.setData({
    wxSearchData: temData
  });
  if (typeof(callBack) == "function") {
    callBack();
  }
}

function wxSearchHiddenPancel(that) {
  var temData = that.data.wxSearchData;
  temData.view.isShow = false;
  that.setData({
    wxSearchData: temData
  });
}

function wxSearchKeyTap(e, that, callBack) {
  //回调
  var temData = that.data.wxSearchData;
  temData.value = e.target.dataset.key; //data-key="{{item}}"
  that.setData({
    wxSearchData: temData
  });
  if (typeof(callBack) == "function") {
    callBack();
  }
}

function getHisKeys(that) {
  var value = [];
  try {
    value = wx.getStorageSync('wxSearchHisKeys')
    if (value) {
      // Do something with return value
      var temData = that.data.wxSearchData;
      temData.his = value;
      that.setData({
        wxSearchData: temData
      });
    }
  } catch (e) {
    // Do something when catch error
  }

}

function wxSearchAddHisKey(that) {
  wxSearchHiddenPancel(that);
  var text = that.data.wxSearchData.value;
  if (typeof(text) == "undefined" || text.length == 0) {
    return;
  }
  var value = wx.getStorageSync('wxSearchHisKeys');
  //可以通过 wx.setStorage（wx.setStorageSync）、wx.getStorage（wx.getStorageSync）、
  //wx.clearStorage（wx.clearStorageSync）可以对本地缓存进行设置、获取和清理
  if (value) {
    if (value.indexOf(text) < 0) {
      value.unshift(text);
    }
    wx.setStorage({
      key: "wxSearchHisKeys",
      data: value,
      success: function() {
        getHisKeys(that);
      }
    })
  } else {
    value = [];
    value.push(text);
    wx.setStorage({
      key: "wxSearchHisKeys",
      data: value,
      success: function() {
        getHisKeys(that);
      }
    })
  }


}

/*function wxSearchDeleteKey(e, that) {
  var text = e.target.dataset.key;
  var value = wx.getStorageSync('wxSearchHisKeys');
  value.splice(value.indexOf(text), 1);
  wx.setStorage({
    key: "wxSearchHisKeys",
    data: value,
    success: function() {
      getHisKeys(that);
    }
  })
}
*/
function wxSearchDeleteAll(that) {
  wx.removeStorage({
    key: 'wxSearchHisKeys',
    success: function(res) {
      var value = [];
      var temData = that.data.wxSearchData;
      temData.his = value;
      that.setData({
        wxSearchData: temData
      });
    }
  })
}


//保护数据，只允许调用函数
module.exports = {
  init: init,
  initColor: initColors,
  refresh: refresh,
  initMindKeys: initMindKeys,
  wxSearchInput: wxSearchInput,
  wxSearchFocus: wxSearchFocus,
  wxSearchBlur: wxSearchBlur,
  wxSearchKeyTap: wxSearchKeyTap,
  wxSearchAddHisKey: wxSearchAddHisKey,
  //wxSearchDeleteKey: wxSearchDeleteKey,
  wxSearchDeleteAll: wxSearchDeleteAll,
  wxSearchHiddenPancel: wxSearchHiddenPancel,
  clearInput: clearInput,
  arrowforward: arrowforward,
}