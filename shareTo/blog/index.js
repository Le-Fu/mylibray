

$(function () {

	//个人中心
	$('#header .member').hover(function () {
		$(this).css('background', 'url(images/arrow2.png) no-repeat 55px center');
		$('#header .member_ul').show();
	}, function () {
		$(this).css('background', 'url(images/arrow.png) no-repeat 55px center');
		$('#header .member_ul').hide();
	});
	
	//登录框
	var login = $('#login');
	var screen = $('#screen');
	login.center(350, 250).resize(function () {
		if (login.css('display') == 'block') {
			screen.lock();
		}
	});
	$('#header .login').click(function () {
		login.center(350, 250);
		login.css('display', 'block');
		screen.lock();
	});
	$('#login .close').click(function () {
		login.css('display', 'none');
		screen.unlock();
	});
	
	//拖拽
	login.drag($('#login h2').last());
	
	//百度分享初始化位置
	$('#share').css('top', (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2 + 'px');
	
	//百度分享收缩效果
	$('#share').hover(function () {
		$(this).animate({
			attr : 'x',
			target : 0
		});
	}, function () {
		$(this).animate({
			attr : 'x',
			target : -211
		});
	});
});
















