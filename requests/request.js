var utils = require('../utils/util.js');
/**
 * 网路请求
 */
function request(url, data, successCb, errorCb, completeCb) {
    wx.request({
        url: url,
        data: data,
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
            if (res.statusCode == 200) {
                successCb(res.data);//对应(data)=>{ }
            }else
                console.log('请求异常', res);
        }
    });
}

module.exports = {
  request: request,
}

