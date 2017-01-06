

(function (){	//闭包
	window.sys = {};	//让外部可以访问，保存浏览器信息对象
	var ua = navigator.userAgent.toLowerCase();	//获取历览器信息字符串
	var s;				//浏览器信息数组，浏览器名称+版本

	// alert(ua.match(/msie ([\d.]+)/));  //msie 8.0,8.0
	// alert(ua.match(/firefox\/([\d.]+)/)); //firefox/50.50
	// alert(ua.match(/chrome\/([\d.]+)/))
	// alert(window.opera.version());
	// alert(ua.match(/version\/([\d.]+).*safari/))
/*
	if ((/msie ([\d.]+)/).test(ua)) {
		s = ua.match(/msie ([\d.]+)/);
		sys.ie = s[1];
	} 

	if ((/firefox\/([\d.]+)/).test(ua)) {
		s = ua.match(/firefox\/([\d.]+)/);
		sys.firefox = s[1];
	}

	if ((/chrome\/([\d.]+)/).test(ua)) {
		s = ua.match(/chrome\/([\d.]+)/);
		sys.chrome = s[1];
	}

	if (window.opera.version()) {
		sys.opera = window.opera.version();
	}

	if ((/version\/([\d.]+).*safari/).test(ua)) {
		s = ua.match(/version\/([\d.]+).*safari/);
		sys.safari = s[1];
	}
*/
	( s = ua.match(/msie ([\d.]+)/) ) ? sys.ie = s[1] : 
	( s = ua.match(/firefox\/([\d.]+)/) ) ? sys.firefox = s[1] :
	( s = ua.match(/chrome\/([\d.]+)/) ) ? sys.chrome = s[1] :
	( s = ua.match(/version\/([\d.]+).*safari/) ) ? sys.safari = s[1] : 0;

})();


// alert(sys.firefox);
// alert(sys.ie);
alert(sys.chrome);