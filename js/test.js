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
	var wordStringArray = "house|river|water|said|hear|for|study|example|him|write|got|sentence|play|learn|too|one|way|work|too|light|animal|eat|at|they|father|up|hard|add|move|state|kind|boy|most|sea|its|made|after|year|hand|your|this|so|just|its|without|your|at|call|so|of|did|by|story|until|close|been|letter|off|not|house|life|let|show|land|name|show|than|are|he|away|learn|start|men|thought|carry|group|world|side|children|place|man|carry|but|how|for|important|hard|two|never|ask|people|make|left|also|earth|often|you|may|feet|will|all|their|again|white|just|move|food|watch|mountain|can|has|why|an|set|now|then|feet|could|think|began|small|way|about|her|her|long|as|went|here|tree|seem|keep|his|say|old|us|last|close|water|tree|answer|little|long|say|its|stop|enough|change|add|example|name|over|back|must|close|light|learn|good|picture|left|book|eye|turn|turn|each|had|might|walk|men|song|end|then|me|word|until|found|new|no|spell|him|would|second|book|let|without|form|of|work|young|right|it's|white|off|find|or|sound|your|quick|well|most|must|what|important|should|face|in|now|watch|car|follow|add|next|very|cut|into|if|want|after|you|different|think|talk|never|might|between|while|idea|by|over|keep|often|example|kind|about|man|thing|mountain|mountain|point|head|car|people|face|mean|this|other|live|to|here|should|them|do|together|page|form|school|first|near|sound|them|right|say|left|other|their|these|near|such|begin|down|was|too|night|from|that|come|away|four|where|big|old|over|along|school|know|and|one|more|do|above|put|line|plant|another|carry|sentence|really|mile|sometimes|been|man|made|or|thought|leave|being|still|once|quickly|got|in|all|family|to|know|people|thing|put|that|miss|much|night|one|think|write|him|very|does|into|idea|just|few|mother|word|why|through|small|made|might|second|group|go|seem|par".split('|');
	var textArray = shuffleArray(wordStringArray);//$('#typingLabel').text().split(' ');
	$('#typingLabel').text(textArray.join(' '));
	var storedTextArray = textArray.join(' ');
	var correctText;
	var timer = null;
	var timeElapsed;
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
					$('#typingOutput span').last().after( $("<span class='highlighted greenHighlight'>"+testWord+" </span>"))
				}
				else{
					$('#typingLabel').text($('#typingLabel:not(.highlighted)').text().replace(testWord, ' '));
					$('#typingOutput span').last().after( $("<span class='highlighted redHighlight'>"+testWord+" </span>"))
				}
			}
			if(timeElapsed == 60.0){//!textArray.length){
				//at the end of input, stop timer
				clearInterval(timer);
				timer = null;
				$("#typingText").prop('disabled', true);
				var totalCorrectChars = $('.greenHighlight').text().replace(/ /g, '').length;
				// In general, there are 5 characters in words
				var averageWords = totalCorrectChars / 5;
				var wpm = averageWords/($('#timer').text()/60);
				$('#wpm').text(Math.ceil(wpm));
			}
			if($('.highlighted').last().position().top > $('.highlighted').position().top){
				$('.toprowText').hide();
			}
			else{
				$('.highlighted').last().addClass('toprowText');
			}

		}
	});
	$('#restartTest').click(function(){
		// remove highlighted spans, clear label and replace with stored value
		$('.highlighted').remove();
		$('#typingLabel').text('');
		var newTextArray = shuffleArray(wordStringArray);
		$('#typingLabel').text(newTextArray.split(' '));
		textArray = storedTextArray;
		clearInterval(timer);
		timer = null;
		$("#typingText").prop('disabled', false);
	});

	function timerStart(){
		var start = new Date().getTime();
	    timeElapsed = '0.0';

		timer = setInterval(function(){
		    var time = new Date().getTime() - start;

		    timeElapsed = Math.floor(time / 100) / 10;
		    if(Math.round(timeElapsed) == timeElapsed) { timeElapsed += '.0'; }

		    $('#timer').text(timeElapsed);

		}, 100);
	};

	function shuffleArray(array) {
		//Fisher-Yates shuffle algorithm
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}


});