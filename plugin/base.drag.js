$().extend('drag', function(handler){
	for (var i = 0; i < this.elements.length; i++) {
		// this.elements[i].onmousedown = function (e) {
			addEvent(this.elements[i], 'mousedown', function(e) {			
			var e = e || window.event;
			if (e.target == handler) {
				var that = this;
				var oDivX = e.clientX - that.offsetLeft;
				var oDivY = e.clientY - that.offsetTop;

				addEvent(document, 'mousemove', move);
				addEvent(document, 'mouseup', up);
			

				function move(e) {
					var outLeft = e.clientX - oDivX;
					var outTop = e.clientY - oDivY;

					if (outLeft < 0) {
						outLeft = 0;
					} else if (outLeft > getInner().width - that.offsetWidth) {
						outLeft = getInner().width - that.offsetWidth;
					}
					if (outTop < 0) {
						outTop = 0;
					} else if (outTop > getInner().height - that.offsetHeight) {
						outTop = getInner().height - that.offsetHeight;
					}
					that.style.left = outLeft + 'px';
					that.style.top = outTop + 'px';
				}

				function up(e) {
					removeEvent(document, 'mousemove', move);
					removeEvent(document, 'mouseup', up);
				}
			};

		});
	}
})