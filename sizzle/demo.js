/**
*	Base是一个基础库的核心对象
*	Base. getId（‘box’）返回一个divElement。这个对象是没有css方法的
*	将Base.getId('box')返回Base即可，返回Base对象
*	在Base对象中，添加css方法，html方法，click方法
*/

window.onload = function () {
	// $('#box').css('color', 'red');
	// $('#box').find('p').css('color', 'red');

	$('#box div').css('color', 'red');
}