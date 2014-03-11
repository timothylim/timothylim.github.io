console.log('welcome to my page!');


console.log('               		 ***                  ***\n                    *****                *****\n                    *****                *****\n                     ***                  ***\n          ***                                        ***\n           ***                                      ***\n            ***                                    ***\n             ***                                  ***\n               ***                              ***\n                 ***                          ***\n                   ***                      ***\n                      **********************\n                         ****************\n')
$(document).ready(function(){
	var interval;
	var storedInput;
	$('#startbutton').click(function(){
		if(!$('#startbutton').hasClass('stopped') && !$('#inputText').val('') == '')
			storedInput = $('#inputText').val();
		input = storedInput.split(' ');
		$('#inputText').val('');
		var i = input.length + 1;
		var wpm = $('#inputSpeed').val() > 0 ? $('#inputSpeed').val() : 250;
		wpm = 60/wpm *1000;
		interval = setInterval(function(){
			var val = input.splice(0,1);
			$('#outputLabel').html(val);
		}, wpm)
		setTimeout(function(){
			clearInterval(interval);
		}, i * wpm );
	});
	$('#stopbutton').click(function(){
		clearInterval(interval);
		$('#startbutton').addClass('stopped');
	})
});