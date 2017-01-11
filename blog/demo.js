/**
*	Base是一个基础库的核心对象
*	Base. getId（‘box’）返回一个divElement。这个对象是没有css方法的
*	将Base.getId('box')返回Base即可，返回Base对象
*	在Base对象中，添加css方法，html方法，click方法
*/
 
$(function () {
	$('.menu').hover(function(){
		$(this).css('color', 'red');
		$('ul').show();
	}, function(){
		$(this).css('color', 'green');
		$('ul').hide();
	});

	var loginBox = $('#login-box');

	//登陆框
	loginBox.resize(function(){});

	$('.close').click(function(){
		loginBox.css('display', 'none');
		$(this).unlock();
	});

	$('.login').click(function(){
		loginBox.setCenter();
		loginBox.css('display', 'block');
		$(this).lock();
	});


	// var oDiv = document.getElementById('login-box');	
	// var oLoginH = document.getElementsByTagName('h2')[0];

	loginBox.drag($('#login-box h2').first());


});