var API_URL = 'https://api.apiopen.top/musicBroadcasting';
var requires = require('../../requests/request.js');

Page({
    data: {
        title: ["社区", "分类"],
        titleClick: 0,//点击导航条文字点击index
       // windowHeight: 0,
        searchHeight: 50,//搜索图片高度
        swiperHeight: 0,//瀑布流可视高度
        titleWidth:0,//导航标题
        titleHeight:0,
        flowData: {
            winWidth: 0,//设备宽度
            winHeight: 0,
            Wscale: 0.45,
            oriImg: [],
            height: 0,//图片高度
            loadNum: 0,//计算加载数据的次数
            des: '一行很敷衍的描述词呼呼~',
            column:[0,1]//列数index
      
          },
          hideLoadIcon: true,//加载图标
          hideLoad: true,//隐藏加载图标块,
          background: [{//幻灯片图片
            class: 'demo-text-1',
            url: '../../images/1.jpg'
          }, {
            class: 'demo-text-2',
            url: '../../images/2.jpg'
          }, {
            class: 'demo-text-3',
            url: '../../images/3.jpg'
          }],
    },
    //导航下划线：点击title传入对应的index
    titleClick: function (e) {
        var that = this;
        var clickNum = e.target.dataset.titleclick;
        //console.log(e);
        if (e.target.id !== "") {
            that.setData({
                titleClick: clickNum,
            })
        }
    },
    //切换tab
    switchTab: function (e) {
        var that = this;
        that.setData({
            titleClick: e.detail.current
        })
    },
    onLoad: function () {
        var that = this;
        var temData = this.data.flowData;
        temData.scale = 0.442;
        wx.getSystemInfo({ //微信小程序API-设备-系统信息
            success: function (res) { //接口调用成功
                var wHeight = res.windowHeight;
               // console.log(wHeight);
                temData.winWidth = res.windowWidth;
                //temData.winHeight = res.windowHeight;
                temData.height = temData.winWidth * temData.Wscale; //设置图片的高度，因为加载的图片比例为1，故设置为高=宽
                that.setData({
                    flowData: temData,
                    swiperHeight: wHeight - that.data.searchHeight,
                });
                
            }
           
        })
        that.loadData();
    },

    //请求数据
  loadData: function () {
    var that = this;
    var temData = this.data.flowData;

    //数据请求
    requires.request(API_URL, {}, (data) => {
      var imgLoading =  data.result[0].channellist;//每次加载的数据
      var originImg = temData.oriImg;//赋值Data中已有的img对象的数据
      var imgList = originImg.slice(0);//克隆
      var imgAll = imgList.concat(imgLoading);//合并原有的+加载数据
      temData.oriImg = imgAll; 
      //console.log(temData.oriImg);
      temData.loadNum += 1;//记录加载次数
      that.setData({
        flowData: temData,
        hideLoadIcon: true,
        hideLoad: true
      })
      //
    });
  },
  /* 下拉刷新 */
  scrollToLower: function (e) {
    var that = this;  
    //加载3条数据项后结束请求
    if (this.data.flowData.loadNum >= 3) {//加载次数大于3则显示no more提示
      that.setData({
        hideLoadIcon: false,
        hideLoad: false,
      })
    } else {//否则继续加载
      that.setData({
        hideLoadIcon: true,
        hideLoad: false,
      })
      that.loadData();
    }

  },
/* 获取指定元素的css高度和宽度 */
  onShow: function (e) {
    var that = this;
        setTimeout(function(e){
          //获得col的高
          const obj = wx.createSelectorQuery();
          obj.select('.title').boundingClientRect()
          obj.exec(function (rect) {
            that.setData({
                titleWidth:rect[0].width,
                titleHeight:rect[0].height,
            })
           // console.log(rect[0],'hehe')
            //console.log(rect[0].width)
          });
        },500) //500ms延时需要，不然获取不到数据
  },

  goSearchPage:function(e){
    wx.navigateTo({
      url:'../search/search'
    })
  },

  //图片加载函数，更改外部api，换成适合的信息
  onImageLoad: function (e) {//在每个图片数据对象中修改数据，更换成可用信息
    //console.log(e.target.id);
    var index=e.target.id;
    var info = '';
    var temData = this.data.flowData;
  /* 随机描述词 */
    for (var i = 0; i < getRandomInt(0, 7); i++) {
      info = info.concat(temData.des);
    }   
    temData.oriImg[index].cate_sname = info;
    this.setData({
      flowData: temData
    })
    //console.log(this.data.flowData,"onShow");
  }
  
  
})

//这个例子返回了一个在指定值之间的随机整数。这个值比min大（如果min不是整数，那就不小于比min大的整数），但小于（但不等于）max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
    

