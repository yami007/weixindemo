var postsDates = require('../../../data/post-data.js');
Page({
  onLoad: function(option) {
    var postId = option.id;
    var postDate = postsDates.post_list[postId];
    this.setData({
      postDate: postDate,
      currentPostId: postId
    });
    try {
      var postsCollected = wx.getStorageSync('postsCollected')
      if (postsCollected) {
        var postCollected = postsCollected[postId];
        this.setData({
          collected: postCollected
        })
      } else {
        var postsCollected = {};
        postsCollected[postId] = false;
        wx.setStorageSync('postsCollected', postsCollected);
      }
    } catch (e) {

    }
  },
  onPostCollected: function(event) {
    var postsCollected = wx.getStorageSync('postsCollected');
    var postCollected = !postsCollected[this.data.currentPostId];
    postsCollected[this.data.currentPostId] = postCollected;
    wx.setStorageSync('postsCollected', postsCollected);
    this.setData({
      collected: postCollected
    })
    var title = "取消成功"
    if (postCollected) {
      title = "收藏成功"
    }
    wx.showToast({
      title: title,
      icon: 'success',
      duration: 500
    })
  },
  onPostShare: function(event) {
    var itemList = ['分享给好友', '分享到朋友圈', '分享到微博']
    wx.showActionSheet({
      itemList: itemList,
      success(res) {
        wx.showToast({
          title: itemList[res.tapIndex],
          icon: 'success',
          duration: 2000
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  onPostStartMusic: function(event) {
    wx.playBackgroundAudio({
      //播放地址
      dataUrl: 'https://app.yatibang.com/weixin/smalllogin/getSystemRecover',
      title: '青云志',
      //图片地址
      coverImgUrl: 'http://r1.ykimg.com/050E0000576B75F667BC3C136B06E4E7'
    })
  }
})