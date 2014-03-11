console.log('welcome to my page!');


console.log('               		 ***                  ***\n                    *****                *****\n                    *****                *****\n                     ***                  ***\n          ***                                        ***\n           ***                                      ***\n            ***                                    ***\n             ***                                  ***\n               ***                              ***\n                 ***                          ***\n                   ***                      ***\n                      **********************\n                         ****************\n')
$(document).ready(function(){
	$('#startbutton').click(function(){
		var input = $('#speedinput').val();
		input = input.split(' ');
		$('#speedinput').val('');
		var i = input.length;
		while(i){
			window.setTimeout(function(){
				$('#speedoutput').html(input[i]);
				i--;
			}, 1000)
		}

	});
});