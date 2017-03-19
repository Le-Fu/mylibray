

$(function () {

	//��������
	$('#header .member').hover(function () {
		$(this).css('background', 'url(images/arrow2.png) no-repeat 55px center');
		$('#header .member_ul').show();
	}, function () {
		$(this).css('background', 'url(images/arrow.png) no-repeat 55px center');
		$('#header .member_ul').hide();
	});
	
	//��¼��
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
	
	//��ק
	login.drag($('#login h2').last());
	
	//�ٶȷ����ʼ��λ��
	$('#share').css('top', (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2 + 'px');
	
	//�ٶȷ�������Ч��
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
















