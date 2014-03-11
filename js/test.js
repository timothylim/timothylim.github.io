console.log('welcome to my page!');


console.log('               		 ***                  ***\n                    *****                *****\n                    *****                *****\n                     ***                  ***\n          ***                                        ***\n           ***                                      ***\n            ***                                    ***\n             ***                                  ***\n               ***                              ***\n                 ***                          ***\n                   ***                      ***\n                      **********************\n                         ****************\n')
$(document).ready(function(){
	$('#startbutton').click(function(){
		var input = $('#speedinput').val();
		input = input.split(' ');
		$('#speedinput').val('');
		var i = input.length;
		var interval = setInterval(function(){
			var val = input.splice(0,1);
			$('#speedoutput').html(val);
		}, 1000)
		setTimeout(function(){
			clearInterval(interval);
		}, i * 1000);
	});
});