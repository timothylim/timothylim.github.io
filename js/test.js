console.log('welcome to my page!');


console.log('               		 ***                  ***\n                    *****                *****\n                    *****                *****\n                     ***                  ***\n          ***                                        ***\n           ***                                      ***\n            ***                                    ***\n             ***                                  ***\n               ***                              ***\n                 ***                          ***\n                   ***                      ***\n                      **********************\n                         ****************\n')
$(document).ready(function(){
	$('#startbutton').click(function(){
		var input = $('#speedinput').val();
		input = input.split(' ');
		$('#speedinput').val('');
		var i = input.length;
		var interval;
		while(i){
			var val = input.splice(0,1);
			var setLabel = function(){
				$('#speedoutput').html(val);
			}
			window.setInterval(function(){
				setLabel();
			}, 1000)
			i--;
		}
		window.clearInterval(interval);
	});
});