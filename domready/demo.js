 //从传统的DOM加载
/*window.onload = function () {
	 var box = document.getElementById('box');
	 alert(box.innerHTML);
}*/

//现代DOM加载
/*addEvent(document, 'DOMContentLoaded', function () {
	var box = document.getElementById('box');
	// alert(box.innerHTML);
})*/


//IE678模拟DOMContentLoaded
/*document.write('<script id="ie_loaded" defer="defer" src="javascript:void(0)"></script>');
var ie_loaded = document.getElementById('ie_loaded');
//判断是否完全加载完毕DOM了
ie_loaded.onreadystatechange = function () {
	var box = document.getElementById('box');
	 alert(box.innerHTML);
}
*/

//使用doScroll检测
 /*var timer = null;
timer = setInterval(function () {
	try {
		document.documentElement.doScroll('left');
		var box = document.getElementById('box');
		alert(box.innerHTML);
	} catch(e) {

	}
})*/


function addDomLoaded(fn) {
	if (document.addEventListener) {
		addEvent(document, 'DOMContentLoaded', function () {
			fn();
			removeEvent(document, 'DOMContentLoaded', arguments.callee);
		});
	} else {
		var timer = null;
		timer = setInterval(function () {
			try {
				document.documentElement.doScroll('left');
				fn();
				
			} catch(e) {

			}
		});		
	}
}


addDomLoaded(function () {
	var box = document.getElementById('box');
	alert(box.innerHTML);
})