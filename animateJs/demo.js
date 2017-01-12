/*$(function () {
		var box = document.getElementById('box');
	// alert(box);	
	setInterval(function () {
		var oLeft = getStyle(box, 'left');
		if (0) {
			box.style.left = oLeft + 2 + 'px';
		}
	}, 16);
	// box.style.left = 500 + 'px';
});*/
$(function () {
	$('input').click(function() {
		$("#box").animate({
			'attr': 'h',
			// 'start': 200,
			// 'alter': 50,
			'target': 300,
			'step': 3,
			'speed': 10
		});
	});
});
 
