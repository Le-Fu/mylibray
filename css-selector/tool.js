/*
	实现累加，并且清晰的指出使转给addEvent用的
	JS一切皆为对象，所以addEvent.ID语法正确，实际上是个全局变量
	alert(addEvent.ID)
	addEvent.ID++
*/

//跨浏览器事件处理
function addEvent(obj, type, fn ) {
	if (typeof obj.addEventListener != 'undefined') {
		obj.addEventListener(type, fn, false);	
	} else {
		//创建一个存放事件的哈希表（散列表）
		if (!obj.events) {	obj.events = {}; }
		if (!obj.events[type]) {
			//创建一个存放事件处理函数的数组
			obj.events[type] = [];
			//把第一次的事件处理函数先储蓄到第一个位置上
			if (obj['on'+type]) { obj.events[type][0] = fn; }
		} else {
			//同一个注册函数进行屏蔽，添加到事件处理函数中
			if (addEvent.equal(obj.events[type], fn) == true) { return false; }
		}
		//从第二次开始我们用事件计数器存储
		obj.events[type][addEvent.ID++] = fn;
		//执行事件处理函数
		obj['on'+type] = addEvent.exec;

	}
} 

//为每一个事件分配一个计数器
addEvent.ID = 1;

//执行事件处理函数
addEvent.exec = function (event) {
	var e = event || addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for (var i in es) {
		es[i].call(this, e);
	}
};

//同一个注册函数进行屏蔽
addEvent.equal = function (es, fn) {
	for (var i in es) {
		if(es[i] == fn) { return true; }
	}
	return false;
}

//删除事件
function removeEvent(obj, type, fn) {
	if (typeof obj.removeEventListener != 'undefined') {
		obj.removeEventListener(type, fn, false);
	}else {
		if (obj.events) {
			for (var i in obj.events[type]) {
				if (obj.events[type][i] == fn) {
					delete obj.events[type][i];
				}
			}
		}
	}

}

//把IE常用的Event对象配对到W3C中
addEvent.fixEvent = function (event) {
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
}

//IE阻止默认行为
addEvent.fixEvent.preventDefault = function () {
	this.returnValue = false;	
}

//IE取消冒泡
addEvent.fixEvent.stopPropagation = function () {
	this.cancelBubble = true;	
}

/*
//阻止默认行为
function preDef(event) {
	var e = event || window.event;
	if (typeof e.preventDefault != 'undefined') {//W3C
		e.preventDefault();
	} else {
		e.returnValue = false;	
	}
}*/

//获取浏览器视口大小
function getInner() {
	if (typeof windowWidth != 'undefined') {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	} else {
		return {
			width: document.documentElement.wclientWidth,
			height: document.documentElement.clientHeight
		}
	}
}

function getStyle(ele, attr) {
	if (typeof window.getComputedStyle != 'undefined') {
		return window.getComputedStyle(ele, null)[attr];
	} else if (typeof ele.currentStyle != 'undefined') {
		return ele.currentStyle[attr];
	}

}

//trim 删除前后空格
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, '')
}