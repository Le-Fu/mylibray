function addEvent(element, type, handler) {
	// 为每一个事件处理函数赋予一个独立的ID
	if (!handler.$$guid) {handler.$$guid = addEvent.guid++;}

	// 为元素建立一个使劲按类型的散列表
	if (!element.events) {element.events = {};}

	// 为每对元素/事件建立一个事件处理函数的散列表
	var handlers = element.events[type];
	if (!handlers) {
		handlers = element.events[type] = {};

		// 存储已有事件处理函数（如果已存在一个）
		if (element["on" + type]) {
			handlers[0] = element["on" + type];
		}
	}

	// 在散列表中存储该事件处理函数
	handlers[handler.$$guid] = handler;

	// 赋予一个全局事件处理函数来处理所有工作
	element["on" + type] = handleEvent;
}

//创建独立ID的计数器
addEvent.guid = 1;

function removeEvent(element, type, handler) {
	// 散列表中删除使事件处理函数
	if (element.events && element.events[type]) {
		delete element.events[type][handler.$$guid];
	}
}

function handleEvent(event) {
	var returnValue = true;

	// 获取事件对象 （IE使用全局的事件对象）
	event = event || fixEvent(window.event);

	// 获取事件处理函数散列表的引用
	var handlers = this.events[event.type];

	// 依次执行每个事件处理函数
	for (var i in handlers) {
		this.$$handleEvent = handlers[i];
		if (this.$$handleEvent(event) === false) {
			returnValue = false;
		}
	}

	return returnValue;
}

// 增加一些IE事件对象的缺乏的方法
function fixEvent(event) {
	// 增加对W3C标准事件方法
	event.preventDefault = fixEvent.preventDefault;
	event.stopPropagation = fixEvent.stopPropagation;
	return event;
}

fixEvent.preventDefault = function () {
	this.returnValue =false;
}

fixEvent.stopPropagation = function () {
	this.cancleBubble = true;
}