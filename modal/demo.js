/**
*	Base是一个基础库的核心对象
*	Base. getId（‘box’）返回一个divElement。这个对象是没有css方法的
*	将Base.getId('box')返回Base即可，返回Base对象
*	在Base对象中，添加css方法，html方法，click方法
*/

window.onload = function () {
	$().getClass('menu').hover(function(){
		$(this).css('color', 'red');
		$().getTag('ul').show();
	}, function(){
		$(this).css('color', 'green');
		$().getTag('ul').hide();
	});

	var loginBox = $().getId('login-box');

	//登陆框
	loginBox.resize(function(){});

	$().getClass('close').click(function(){
		loginBox.css('display', 'none');
		$(this).unlock();
	});

	$().getClass('login').click(function(){
		loginBox.setCenter();
		loginBox.css('display', 'block');
		$(this).lock();
	});


	var oDiv = document.getElementById('login-box');	
	var oLoginH = document.getElementsByTagName('h2')[0];

	loginBox.drag(oLoginH);
	/*oLoginH.onmousedown = function (e) {
		var that = this;
		var oDivX = e.clientX - oDiv.offsetLeft;
		var oDivY = e.clientY - oDiv.offsetTop;

		document.onmousemove = function (e) {
			var e = e || window.event;
			oDiv.style.left = e.clientX -oDivX + 'px';
			oDiv.style.top = e.clientY -oDivY+ 'px';
		}
		document.onmouseup = function () {
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}*/



}    