// setTimeout 和 setInterval 的区别
setTimeout(function(){
	//a long block of code
	alert(666);
	setTimeout(arguments.callee,100);
},100);

//the same as the above
setInterval(function(){
	//a long block of code
},100);

//第一眼看上去这两段代码在功能上是等价的，但事实上却不是。值得注意的是，
//setTimeout 这段代码会在每次回调函数执行之后至少需要延时10ms再去执行一次（可能是更多，但是不会少）。
//但是setInterval会每隔10ms就去尝试执行一次回调函数，不管上一个回调函数是不是还在执行。

