// pages/share/share.js
import Notify from '../dist/notify/notify'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inviteInfo: {},
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options, 'share')
    if (options.hasOwnProperty('groupId')) {
      this.setData({
        inviteInfo: options
      })
    } else if (app.globalData.shareParam) {
      console.log("shareParam", app.globalData.shareParam)
      this.setData({
        inviteInfo: app.globalData.shareParam
      })
    } else {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  joinGroup () {
    const { inviteInfo } = this.data
    const self = this
    self.setData({
      loading: true
    })
    wx.cloud.callFunction({
      name: 'joinGroup',
      data: {
        groupId: inviteInfo.groupId
      },
      success (joinRes) {
        console.log('加入返回', joinRes)
        // 加入提示
        Notify({
          text: `${joinRes.result.msg}`,
          duration: 1500,
          selector: '#join-tips',
          backgroundColor: `${joinRes.result.code === 1 ? '#dc3545' : '#28a745'}`
        });
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/group/group',
          })
        }, 2000)
      },
      complete() {
        self.setData({
          loading: false
        })
      }
    })
  }
})