console.log('welcome to my page!');


console.log('               		 ***                  ***\n                    *****                *****\n                    *****                *****\n                     ***                  ***\n          ***                                        ***\n           ***                                      ***\n            ***                                    ***\n             ***                                  ***\n               ***                              ***\n                 ***                          ***\n                   ***                      ***\n                      **********************\n                         ****************\n')
$(document).ready(function(){
	$('#startbutton').click(function(){
		var input = $('#inputText').val();
		input = input.split(' ');
		$('#inputText').val('');
		var i = input.length + 1;
		var wpm = $('#inputSpeed').val() > 0 ? $('#inputSpeed').val() : 60;
		wpm = 60/wpm *1000;
		var interval = setInterval(function(){
			var val = input.splice(0,1);
			$('#outputLabel').html(val);
		}, wpm)
		setTimeout(function(){
			clearInterval(interval);
		}, i * wpm );
	});
});