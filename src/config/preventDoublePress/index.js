let preventDoublePress = {
  lastPressTime: 1,  //  上次点击时间
  onPress(callback,wait=500) {
    let curTime = Date.now();
    if (curTime - this.lastPressTime > wait) {
      this.lastPressTime = curTime;
      callback();
    }
  },
};
module.exports = preventDoublePress;