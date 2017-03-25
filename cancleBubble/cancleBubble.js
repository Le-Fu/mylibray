//处理键盘和鼠标事件时经常用	
function stopBubble(e) {
	var e = e || window.event;
	if (e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancleBubble = true;
	}
}