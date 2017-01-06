/**
*	Base是一个基础库的核心对象
*	Base. getId（‘box’）返回一个divElement。这个对象是没有css方法的
*	将Base.getId('box')返回Base即可，返回Base对象
*	在Base对象中，添加css方法，html方法，click方法
*/

window.onload = function () {
	// $().getId('box').css('color', 'red');
	// console.log($('#box').css('color'));
	// $('div').find('span').css('color', 'red');
	// $('.a').css('color', 'red');
	$('div').find('.a').css('color', 'blue');
}    