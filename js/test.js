console.log('welcome to my page!');


console.log('               		 ***                  ***\n                    *****                *****\n                    *****                *****\n                     ***                  ***\n          ***                                        ***\n           ***                                      ***\n            ***                                    ***\n             ***                                  ***\n               ***                              ***\n                 ***                          ***\n                   ***                      ***\n                      **********************\n                         ****************\n')
$(document).ready(function(){
	$('#startbutton').click(function(){
		var input = $('#speedinput').val();
		input = input.split(' ');
		$('#speedinput').val('');
		var i = input.length;
		while(i){
			var setLabel = function(){
				$('#speedoutput').html(input.splice(0,1));
			}
			window.setTimeout(function(){
				setLabel();
			}, 1000)
			i--;
		}
	});
});