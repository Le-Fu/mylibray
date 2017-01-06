//前台调用
function $(args) {
	return new Base(args);
}

//基础库
function Base(args) {
	//创建 一个数组，来保存获取的节点和节点数组
	this.elements = [];

	if (typeof args === 'string') {
		switch(args.charAt(0)) {
			case '#':
				this.elements.push(this.getId(args.substring(1)));
				break;
			case '.':
				this.elements = this.getClass(args.substring(1));
				break;
			default:
				this.elements = this.getTag(args);
		}
	} else if (typeof args === 'object') {
		alert('object');
		if(args != undefined) {//args是一个对象，undefined是一个对象，区别于typeof返回的‘undefined’
			this.elements[0] = args;
		}
	}
}

//获取ID节点
Base.prototype.getId = function (id) {
	return document.getElementById(id);
};

//获取元素节点
Base.prototype.getTag = function (tag, context) {
	var temps = [];
	context = context || document;
	var tags = context.getElementsByTagName(tag);
	for (var i = 0; i < tags.length; i++) {
		temps.push(tags[i]);
	}
	return temps;
};

//获取class
Base.prototype.getClass = function(clsName, context, tag){
	var temps = [];
	context = context || document;
	tag = tag || '*';
	var arr = context.getElementsByTagName(tag);
	for(var i=0; i<arr.length; i++){
		var re = new RegExp("\\b"+clsName+"\\b", 'g');
		if(re.test(arr[i].className)){
			temps.push(arr[i]);
		}
	}
	return temps;
};

//设置CSS选择器子节点
Base.prototype.find = function (str) {
	var childElements = [];
	for (var i = 0; i < this.elements.length; i++) {
		switch(str.charAt(0)) {
			case '.':
				/*var arr = this.elements[i].getElementsByTagName('*');
				for(var j=0; j<arr.length; j++){
					var re = new RegExp("\\b"+str.substring(1)+"\\b", 'g');
					if(re.test(arr[j].className)){
						childElements.push(arr[j]);
					}
				}*/
				var temps = this.getClass(str.substring(1), this.elements[i]);
				for (var j = 0; j < temps.length; j++) {
					childElements.push(temps[j]);
				}
				break;
			default:
				var temps = this.getTag(str, this.elements[i]);
				for (var j = 0; j < temps.length; j++) {
					childElements.push(temps[j]);
				}
		}
	}
	this.elements = childElements;
	return this;
}

//添加Class
Base.prototype.addClass = function(clsName) {
	for (var i = 0; i < this.elements.length; i++) {
		if (!this.elements[i].className.match(new RegExp('(\\s|^)'+clsName+'(\\s|$)'))) {
			this.elements[i].className += ' '+clsName;
		}
	}
	return this;
}

//删除Class
Base.prototype.removeClass = function(clsName) {
	for (var i = 0; i < this.elements.length; i++) {
		if (this.elements[i].className.match(new RegExp('(\\s|^)'+clsName+'(\\s|$)'))) {
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+clsName+'(\\s|$)'), '');
		}
	}
	return this;
}

//获取某一个节点，并返回这个节点对象
Base.prototype.getEle = function(num) {
	return this.elements[num];
	
}

//获取某一个节点, 并返回Base对象
Base.prototype.eq = function(num) {
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
}


//添加link或style的CSS规则
Base.prototype.addRule = function (num, selectorText, cssText, position) {
	var sheet = document.styleSheets[num];
	if (typeof sheet.insertRule != 'undefined') {//W3C
		sheet.insertRule(selectorText+'{'+cssText+'}', position);
	} else if (typeof sheet.addRule != 'undefined') {//IE
		sheet.addRule(selectorText, cssText, position);
	}
	
	return this;
}

//移除link或style的CSS规则
Base.prototype.removeRule = function (num, index) {
	var sheet = document.styleSheets[num];
	if (typeof sheet.deleteRule != 'undefined') {//W3C
		sheet.deleteRule(index);
	} else if (typeof sheet.removeRule != 'undefined') {//IE
		sheet.removeRule(index);
	}

	return this;
}


Base.prototype.css = function (attr, value) {
	for(var i=0; i<this.elements.length; i++){
		if (arguments.length == 1) {
			getStyle(this.elements[i], attr)
		}
		this.elements[i].style[attr] = value;	
	}
	return this;
}

Base.prototype.html = function (value) {
	for(var i=0; i<this.elements.length; i++){
		if (arguments.length == 0) {
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = value;	
	}
	return this;
}

Base.prototype.click = function (fn) {
	for(var i=0; i<this.elements.length; i++){
		this.elements[i].onclick = fn;	
	}
	return this;
}

Base.prototype.hover = function (over, out) {
	for (var i = 0; i < this.elements.length; i++) {
		/*this.elements[i].onmouseover = over;
		this.elements[i].onmouseout = out;*/
		addEvent(this.elements[i], 'mouseover', over);
		addEvent(this.elements[i], 'mouseout', out);
	}
	return this;
}

Base.prototype.show = function () {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = 'block';
	}
	return this;
}

Base.prototype.hide = function () {
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.display = 'none';
	}
	return this;
}
//居中
Base.prototype.setCenter = function () {
	var cLeft = (getInner().width -350) / 2;	
	var cTop = (getInner().height -250) / 2;	
	for (var i = 0; i < this.elements.length; i++) {
		this.elements[i].style.left = cLeft + 'px';
		this.elements[i].style.top = cTop+ 'px';
	}
	return this;
}

/*锁屏*/
Base.prototype.lock = function () {
	document.getElementById('mask').style.display = 'block';
}
Base.prototype.unlock = function () {
	document.getElementById('mask').style.display = 'none';
}

//resize
Base.prototype.resize = function (fn) {
	for (var i = 0; i < this.elements.length; i++) {
		var element = this.elements[i];
		/*window.onresize = function () {
			fn();
			if (element.offsetLeft > getInner().width - element.offsetWidth) {
				element.style.left = getInner().width - element.offsetWidth + 'px';
			}
			if (element.offsetTop > getInner().height - element.offsetHeight) {
				element.style.top = getInner().height - element.offsetHeight + 'px';
			}
		};	*/	
		addEvent(window, 'resize', function() {
			fn();
			if (element.offsetLeft > getInner().width - element.offsetWidth) {
				element.style.left = getInner().width - element.offsetWidth + 'px';
			}
			if (element.offsetTop > getInner().height - element.offsetHeight) {
				element.style.top = getInner().height - element.offsetHeight + 'px';
			}
		});
	}
	return this;
}

//拖拽功能
/*Base.prototype.drag = function (handler) {

}*/

//插件入口
Base.prototype.extend = function (name, fn) {
	Base.prototype[name] = fn;
}

