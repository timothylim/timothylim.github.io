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
	});


	//typing test
	var textArray = $('#typingLabel').text().split(' ');
	var storedTextArray = $('#typingLabel').text()
	var correctText;
	var timer = null;
	$('#typingText').keydown(function(e){
		if(!timer){
			timerStart();
		}
		if(e.which == 32 || e.which ==13){
			textInput = $('#typingText').val().replace(' ', '');
			var testWord = textArray.splice(0,1);
			var correctText = textInput == testWord;
			$('#typingText').val('');
			//replace label with highlighted (green = 1, red =0)
			if(!$('.highlighted').length){
				if(correctText){
					//remove this word from the label, then add highlighted span
					$('#typingLabel').text($('#typingLabel:not(.highlighted)').text().replace(testWord, ' '));
					$('#typingOutput').prepend( $("<span class='highlighted greenHighlight'>"+testWord+" </span>"))
				}
				else{
					$('#typingLabel').text($('#typingLabel:not(.highlighted)').text().replace(testWord, ' '));
					$('#typingOutput').prepend( $("<span class='highlighted redHighlight'>"+testWord+" </span>"))
				}
			}
			else{
				if(correctText){
					$('#typingLabel').text($('#typingLabel:not(.highlighted)').text().replace(testWord, ' '));
					$('#typingOutput span').last().append( $("<span class='highlighted greenHighlight'>"+testWord+" </span>"))
				}
				else{
					$('#typingLabel').text($('#typingLabel:not(.highlighted)').text().replace(testWord, ' '));
					$('#typingOutput span').last().append( $("<span class='highlighted redHighlight'>"+testWord+" </span>"))
				}
			}
			if(!textArray.length){
				//at the end of input, stop timer
				clearInterval(timer);
				timer = null;
			}
		}
	});
	$('#restartTest').click(function(){
		// remove highlighted spans, clear label and replace with stored value
		$('.highlighted').remove();
		$('#typingLabel').text('');
		$('#typingLabel').text(storedTextArray);
		textArray = storedTextArray.split(' ');
		clearInterval(timer);
		timer = null;
	});

	var timerStart = function(){
		var start = new Date().getTime(),
	    elapsed = '0.0';

		timer = setInterval(function(){
		    var time = new Date().getTime() - start;

		    elapsed = Math.floor(time / 100) / 10;
		    if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }

		    $('#timer').text(elapsed);

		}, 100);
	};

});