
function $() {
	return new Base();
}

function Base() {
	//创建 一个数组，来保存获取的节点和节点数组
	this.elements = [];
}

//获取ID节点
Base.prototype.getId = function (id) {
	this.elements.push(document.getElementById(id));
	return this;
};

//获取元素节点
Base.prototype.getTag = function (tag, context) {
	context = context || document;
	var tags = context.getElementsByTagName(tag);
	for (var i = 0; i < tags.length; i++) {
		this.elements.push(tags[i]);
	}
	return this;
	};

//获取class
Base.prototype.getClass = function(clsName, context, tag){
	context = document.getElementById(context) || document;
	tag = tag || '*';
	var arr = context.getElementsByTagName(tag);
	for(var i=0; i<arr.length; i++){
		var re = new RegExp("\\b"+clsName+"\\b", 'g');
		if(re.test(arr[i].className)){
				this.elements.push(arr[i]);
			}
		}
		return this;
	};

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

//获取某一个
Base.prototype.getEle = function(num) {
	var element = this.elements[num];
	this.elements = [];
	this.elements.push(element);
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
			if (typeof window.getComputedStyle != 'undefined') {
				return window.getComputedStyle(this.elements[i], null)[attr];
			} else if (typeof this.elements[i].currentStyle != 'undefined') {
				return this.elements[i].currentStyle[attr];
			}
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
		this.elements[i].onmouseover = over;
		this.elements[i].onmouseout = out;
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