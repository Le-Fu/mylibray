function getScrollPosition(){
	var position = [0, 0];
	if(typeof window.pageYOffset != 'undefined'){
		position = [
			window.pageXOffset,
			window.pageYOffset
		];
	}else if(typeof document.documentElement.scrollTop != 'undefined' && document.documentElement.scrollTop>0){
		position=[
			document.documentElement.scrollLeft,
			document.documentElement.scrollTop
		];
	}else if(typeof document.body.scrollTop != 'undefined'){
		position=[
			document.body.scrollLeft,
			document.body.scrollTop
		];
	}
	return position;
}

//trigger
window.onscroll = function(){
	var scrollPos =getScrollPosition();
	document.title = 'left=' + scrollPos[0] + 'top=' + scrollPos[1];
};

