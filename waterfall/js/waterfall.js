window.onload = function () {
	var dataSource = {"data":[{"src": 'img/P_00.jpg'},{"src": 'img/P_01.jpg'},{"src": 'img/P_02.jpg'},{"src": 'img/P_03.jpg'},{"src": 'img/P_04.jpg'},{"src": 'img/P_05.jpg'},{"src": 'img/P_06.jpg'},{"src": 'img/P_07.jpg'},{"src": 'img/P_08.jpg'},{"src": 'img/P_09.jpg'},{"src": 'img/P_010.jpg'},{"src": 'img/P_011.jpg'},{"src": 'img/P_012.jpg'},{"src": 'img/P_013.jpg'},{"src": 'img/P_014.jpg'},{"src": 'img/P_015.jpg'},{"src": 'img/P_016.jpg'},{"src": 'img/P_017.jpg'},{"src": 'img/P_018.jpg'},{"src": 'img/P_019.jpg'},{"src": 'img/P_00.jpg'},]} 
	waterFall('container', 'box');
	window.onscroll = function () {
		var oParent = document.getElementById('container');
		if (checkScrollSlide) {
			for (var i = 0; i < dataSource.data.length; i++) {
				var oBox = document.createElement('div');
				oBox.className = 'box';
				oParent.appendChild(oBox);
				var oPic = document.createElement("div");
				oPic.className = 'pic';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src= dataSource.data[i].src;
				oPic.appendChild(oImg);
			}
			waterFall('container', 'box');
		}
	}
}

function waterFall(parent, child) {
	var oParent = document.getElementById(parent);
	var aBox = oParent.getElementsByClassName(child);
	var sigleWidth = aBox[0].offsetWidth;
	var cols = Math.floor(document.documentElement.offsetWidth / sigleWidth);
	oParent.style.cssText = "width: "+ sigleWidth*cols +"px";
	var aHeight = [];
	for (var i = 0; i < aBox.length; i++) {
		if (i < cols) {
			aHeight.push(aBox[i].offsetHeight);
		} else {
			var minH = Math.min.apply(null, aHeight);
			var index = getMinHeightIndex(aHeight, minH);
			aBox[i].style.position = 'absolute';
			aBox[i].style.top = minH +'px';
			aBox[i].style.left = index*sigleWidth + 'px';
			aHeight[index] +=  aBox[i].offsetHeight;
		}
	}
}

function getMinHeightIndex(arr, val) {
	for ( var i in arr) {
		if ( arr[i] === val ) {
			return i;
		}
	}
}

function checkScrollSlide() {
	var oParent = document.getElementById(parent);
	var aBox = oParent.getElementsByClassName(child);
	var lastBox = aBox[aBox.length-1];
	var lastBoxTop =  Math.floor(lastBox.offsetHeight/2) + lastBox.offsetTop;
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var pageHeight = document.body.clientHeiht || document.documentElement.clientHeiht;
	return (lastBox <= pageHeight+scrollTop) ? true : false;
}