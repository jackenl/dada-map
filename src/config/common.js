(function(doc, win) {
  var docEl = doc.documentElement, // 获取html标签
    // 页面大小改变事件
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function() {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        // 动态设置html标签字体大小，便于使用rem缩放
        docEl.style.fontSize = 32 * (clientWidth / 750) + 'px';
      };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);