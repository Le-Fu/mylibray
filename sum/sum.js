		console.log(sum('1.0', 3, "a"));

		function sum(){
			var rs=0;
			for(var i=0; i<arguments.length; i++){
				if( !isNaN(arguments[i])){
					console.log(12);
					rs += arguments[i]*1;
				}
			}
			return rs;
		}
