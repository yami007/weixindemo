var postsDate = require('../../data/post-data.js');
Page({
  data: {},
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      post_key: postsDate.post_list
    });
  },
  onPostDetatl: function(event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }
})