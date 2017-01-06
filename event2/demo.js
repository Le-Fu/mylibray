/**
*	Base是一个基础库的核心对象
*	Base. getId（‘box’）返回一个divElement。这个对象是没有css方法的
*	将Base.getId('box')返回Base即可，返回Base对象
*	在Base对象中，添加css方法，html方法，click方法
*/

window.onload = function () {
	var oBtn = document.getElementById('btn');
	var oA = document.getElementById('a');
	


	// addEvent(oA, 'click', fn3);

	addEvent(oBtn, 'click', fn1);
	addEvent(document, 'click', fn2);
	// removeEvent(oBtn, 'click', fn2);
}    



function fn1(e) {
	e.stopPropagation();
	alert('btn');
};
function fn2(e) {
	alert('doc');
};
function fn3(e) {
	e.preventDefault();
};