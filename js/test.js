console.log('welcome to my page!');


console.log('               		 ***                  ***\n                    *****                *****\n                    *****                *****\n                     ***                  ***\n          ***                                        ***\n           ***                                      ***\n            ***                                    ***\n             ***                                  ***\n               ***                              ***\n                 ***                          ***\n                   ***                      ***\n                      **********************\n                         ****************\n')
$(function(){
	
	//speed reading
	var interval;
	var storedInput;
	var timeout;
	$('#startbutton').click(function(){
		//check for stopped, start becomes restart
		if(!$('#startbutton').hasClass('clicked')){
			$('#startbutton').addClass('clicked');
			if(!$('#startbutton').hasClass('stopped') && !$('#inputText').val() == ''){
				storedInput = $('#inputText').val();
			}
			input = storedInput.split(' ');
			$('#inputText').val('');
			var i = input.length + 1;
			var wpm = $('#inputSpeed').val() > 0 ? $('#inputSpeed').val() : 250;
			wpm = 60/wpm *1000;
			interval = setInterval(function(){
				var val = input.splice(0,1);
				$('#outputLabel').html(val);
			}, wpm)
			timeout = setTimeout(function(){
				clearInterval(interval);
				$('#startbutton').val('start')
				$('#startbutton').removeClass('clicked');
			}, i * wpm );
		}
	});
	$('#stopbutton').click(function(){
		clearInterval(interval);
		clearTimeout(timeout);
		$('#startbutton').addClass('stopped');
		$('#startbutton').val('restart');
		$('#startbutton').removeClass('clicked');
	})

	//typing test
	var textArray = $('#typingLabel').text().split(' ');
	var correctText;
	$('#typingText').keydown(function(e){
		if(e.which == 32 || e.which ==13){
			textInput = $('#typingText').val();
			var testWord = textArray.splice(0,1)
			var pattern = new RegExp(testWord)
			var correctText = textInput.test(pattern);
			$('#typingText').val('');
			//replace label with highlighted (green = 1, red =0)
			if(correctText){
				$('#typingLabel').text($('#typingLabel:not(.highlighted)').text().replace(testWord, "<span class='highlighted greenHighlight'>"+testWord+"</span>"));
			}
			else{
				$('#typingLabel').text($('#typingLabel:not(.highlighted)').text().replace(testWord, "<span class='highlighted redHighlight'>"+testWord+"</span>"));
			}
		}
	});
	var textInput = $('typingText').val();

});