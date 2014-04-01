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
	//var storedTextArray = textArray.join(' ');
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
			if(timeElapsed > 60.0){//!textArray.length){
				//at the end of input, stop timer
				clearInterval(timer);
				timer = null;
				$("#typingText").prop('disabled', true);
				var totalCorrectChars = $('.greenHighlight').text().replace(/ /g, '').length;
				// In general, there are 5 characters in words
				var averageWords = totalCorrectChars / 5;
				var wpm = averageWords/(60/60);
				$('#wpm').text(Math.ceil(wpm));
			}
			if($('.highlighted:visible').last().position().top > $('.highlighted:visible').position().top){
				$('.toprowText').hide();
				$('.highlighted').last().addClass('toprowText');
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
		$('#typingLabel').text(newTextArray.join(' '));
		textArray = newTextArray;
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

		    $('#timer').text((60-timeElapsed).toFixed(1));

		    if(timeElapsed == 60){
		    	clearInterval(timer);
				timer = null;
				$("#typingText").prop('disabled', true);
				var totalCorrectChars = $('.greenHighlight').text()/*.replace(/ /g, '')*/.length;
				// In general, there are 5 characters in words
				var averageWords = totalCorrectChars / 5;
				var wpm = averageWords/(60/60);
				$('#wpm').text(Math.ceil(wpm));
		    }

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



		// define dimensions of graph
	var m = [80, 80, 80, 80]; // margins
	var w = 1000 - m[1] - m[3]; // width
	var h = 400 - m[0] - m[2]; // height
	
	var twelveOz = [];
	var sevenfiveOz = [];

	for(var x = 1; x < 23; x++){
		twelveOz.push(getSA(x*.25, 21.656));
		sevenfiveOz.push(getSA(x*.25, 13.535));
	}
	function getSA(r, v){
		var rsq = Math.pow(r, 2);
		return 2*3.141*rsq + (2*3.141*r *v /(3.141 * rsq))
	}

	// create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
	//var data = [3, 6, 2, 7, 5, 2, 0, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7];
	//var data2 = [4, 5, 1, 9, 2, 1, 6, 2, 2, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7];

	// X scale will fit all values from data[] within pixels 0-w
	var x = d3.scale.linear().domain([.25, 5.5]).range([0, w]);
	// Y scale will fit values from 0-10 within pixels h-0 (Note the inverted domain for the y-scale: bigger is up!)
	var y = d3.scale.linear().domain([0,200]).range([h, 0]);
		// automatically determining max range can work something like this
		// var y = d3.scale.linear().domain([0, d3.max(data)]).range([h, 0]);

	// create a line function that can convert data[] into x and y points
	var line = d3.svg.line()
		// assign the X function to plot our line as we wish
		.x(function(d,i) { 
			// verbose logging to show what's actually being done
			console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
			// return the X coordinate where we want to plot this datapoint
			return x(i*.25) + 43; 
		})
		.y(function(d) { 
			// verbose logging to show what's actually being done
			console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
			// return the Y coordinate where we want to plot this datapoint
			return y(d); 
		})

		// Add an SVG element with the desired dimensions and margin.
	var graph = d3.select("#graph").append("svg:svg")
	      .attr("width", w + m[1] + m[3])
	      .attr("height", h + m[0] + m[2])
		      .append("svg:g")
	      .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

		// create yAxis
	var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);
		// Add the x-axis.
	graph.append("svg:g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + h + ")")
	      .call(xAxis);


		// create left yAxis
	var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");
		// Add the y-axis to the left
	graph.append("svg:g")
	      .attr("class", "y axis")
	      .attr("transform", "translate(-25,0)")
	      .call(yAxisLeft);
		
			// Add the line by appending an svg:path element with the data line we created above
		// do this AFTER the axes above so that the line is above the tick-lines
	graph.append("svg:path").attr("d", line(twelveOz));
	graph.append("svg:path").attr("d", line(sevenfiveOz));
	$('path').last().css('stroke', 'red')
//maze logic

	var lastCell = 0, pathCount = 0;
    var size = 0;
    $('#applySize').click(function () {
    	if($('.cell').length)
    		$('tbody').remove();

        size = parseFloat($('#tableSize').val());
        var cellID = 0;
        for (var x = 0; x < size; x++) {
            var td = '<tr>'
            for(var y=0; y < size; y++){
                td += '<td class="cell" id="'+cellID+'"></td>'
                cellID++;
            }
            td += '</tr>';                
            $('#grid').append(td);
        }
        $('.cell').mousedown(function (e) {
            e.originalEvent.preventDefault();
            $(this).css({ background: "yellow" });
            lastCell = parseFloat($(this).attr('id'));//++pathCount;
            pathCount += 1;
            $(this).addClass("" + pathCount + "");
        });
        depthFirstSearch();
        //randomWalk(0);
    });

	function depthFirstSearch(){
		var cellStack = [];
        var totalCells = size*size;
        var curCell = 0;
        var visitedCells = 1;
        while (visitedCells < totalCells) {
            var neighbor = checkAllWalls(curCell);
            if (neighbor) {
                removeWall(curCell, neighbor);
                cellStack.push(curCell);
                curCell = neighbor;
                visitedCells++;
            }
            else {
                var poppedVal = cellStack.pop();
                curCell = poppedVal;
            }
        }
	}

    $(document).mousedown(function () {
        $(".cell").bind('mouseover', function () {
            var currentCell = parseFloat($(this).attr('id'));
            var lastClass = $(this).attr('class').split(' ').pop();
            if (lastClass == pathCount - 1) {
                $('.' + pathCount).css({ background: "lightgrey" })
                $('.' + pathCount).removeClass("" + pathCount + "");
                pathCount -= 1;
                lastCell = currentCell;
            }
            else{
            	switch(currentCell){
	            	case lastCell+1:
	            		if($('#' + currentCell).css('border-left-style') == "none")
	            			$(this).css({ background: "yellow" });
	            		break;
	            	case lastCell-1:
	            	    if($('#' + currentCell).css('border-right-style')== "none")
	            			$(this).css({ background: "yellow" });
	            		break;
	            	case lastCell-size:
	            		if($('#' + currentCell).css('border-bottom-style')== "none")
	            			$(this).css({ background: "yellow" });
	            		break;
	            	case lastCell+size:
						if($('#' + currentCell).css('border-top-style') == "none")
	            			$(this).css({ background: "yellow" });
	            		break;
	            	default:
	            		console.log('not over active cell: ' + currentCell);
	            }
	            lastCell = currentCell;//++pathCount;
	            pathCount += 1;
	            $(this).addClass("" + pathCount + "");
        	}
        });
    })
    .mouseup(function () {
        $(".cell").unbind('mouseover');
    });

    var directionEnum = Object.freeze({
    	"Right": 1,
    	"Down":2,
    	"Left":3,
    	"Up":4
    });

    function randomWalk(currentCell){
    	
    	//need to check if the rando direction is valid
    	var randomDir = Math.floor(Math.random() * 4) +1;
    	var newCell;
    	switch(randomDir){
    		case directionEnum.Right:
    			if ($('#' + (currentCell + 1)) && currentCell % size != (size-1) && $('#' + (currentCell + 1)).css('border')  && !$('#' + (currentCell + 1)).css('border').match('none')) {
	    			removeWall(currentCell, currentCell+1);
	    			newCell = currentCell+1;
	    			if (checkAllWalls(currentCell+1) == undefined){
	    				hunt();
	    				return;
	    			}
    			}
    			else{
    				if (checkAllWalls(currentCell+1) == undefined) 
	    				hunt();
    				newCell = currentCell;
    			}
    			break;
    		case directionEnum.Down:
    		    if ($('#' + (currentCell + size)) && $('#' + (currentCell + size)).css('border') && !$('#' + (currentCell + size)).css('border').match('none')) {
	    		    removeWall(currentCell, currentCell+size);
	    			newCell = currentCell+size;
	    			if (checkAllWalls(currentCell+size) == undefined){
	    				hunt();
	    				return;
	    			}
    			}
    			else{
    				if (checkAllWalls(currentCell+size) == undefined) 
	    				hunt();
    				newCell = currentCell;
    			}
    			break;
    		case directionEnum.Left:
    		    if ($('#' + (currentCell - 1)) && currentCell % size != 0 && $('#' + (currentCell - 1)).css('border') && !$('#' + (currentCell - 1)).css('border').match('none')) {
	    		    removeWall(currentCell, currentCell-1);
	    			newCell = currentCell-1;
	    			if (checkAllWalls(currentCell-1) == undefined) {
	    				hunt();
	    				return;
	    			}
    			}
    			else{
    				if (checkAllWalls(currentCell-1) == undefined) 
	    				hunt();
    				newCell = currentCell;
    			}
    			break;
    		case directionEnum.Up:
		        if ($('#' + (currentCell - size)) && $('#' + (currentCell - size)).css('border') && !$('#' + (currentCell - size)).css('border').match('none')) {
	    		    removeWall(currentCell, currentCell-size);
	    			newCell = currentCell-size;
	    			if (checkAllWalls(currentCell-size) == undefined){ 
	    				hunt();
	    				return;
					}
     			}
    			else{
    				if (checkAllWalls(currentCell-size) == undefined) 
	    				hunt();
    				newCell = currentCell;
    			}
    			break;    			
      	}
      	randomWalk(newCell);
    }

    function hunt(){
    	for(var i=0; i<size; i++){
	    	for(var j=0; j<size; j++){
	    		//if there is a neighbor with intact walls
	    		var wallLength = checkAllWalls(i*10 + j, true).length
    			if(wallLength != undefined){
    				//if there is a neighbor with missing walls
    				if(wallLength < 4 && wallLength >0){
    					randomWalk(i*10 + j);
    				}
    				return;
    			}
			}
		}
    }

    // checks for neighbors with all walls intact and returns random one
    function checkAllWalls(currentCell, returnArray) {
        var wallsIntact = [];
        if ($('#' + (currentCell + 1)) && currentCell % size != (size-1) && $('#' + (currentCell + 1)).css('border')  && !$('#' + (currentCell + 1)).css('border').match('none')) {
            wallsIntact.push(currentCell + 1);
        }
        if ($('#' + (currentCell - 1)) && currentCell % size != 0 && $('#' + (currentCell - 1)).css('border') && !$('#' + (currentCell - 1)).css('border').match('none')) {
            wallsIntact.push(currentCell - 1);
        }
        if ($('#' + (currentCell + size)) && $('#' + (currentCell + size)).css('border') && !$('#' + (currentCell + size)).css('border').match('none')) {
            wallsIntact.push(currentCell + size);
        }
        if ($('#' + (currentCell - size)) && $('#' + (currentCell - size)).css('border') && !$('#' + (currentCell - size)).css('border').match('none')) {
            wallsIntact.push(currentCell - size);
        }
        if(returnArray){
        	return wallsIntact;
        }
        return wallsIntact[Math.floor(Math.random() * wallsIntact.length)]
    }

    function removeWall(currentCell, neighbor) {
        var separation = currentCell - neighbor;
        switch (separation) {
            case size:
                $('#' + neighbor).css('border-bottom-style', 'none');
                $('#' + currentCell).css('border-top-style', 'none');
                break;
            case 1:
                $('#' + neighbor).css('border-right-style', 'none');
                $('#' + currentCell).css('border-left-style', 'none');
                break;
            case -1:
                $('#' + neighbor).css('border-left-style', 'none');
                $('#' + currentCell).css('border-right-style', 'none');
                break;
            case -size:
                $('#' + currentCell).css('border-bottom-style', 'none');
                $('#' + neighbor).css('border-top-style', 'none');
                break;
            default:
        console.log('not a valid wall neighbor');
    	}
	}
	$('#applySize').click();

	//analytics
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-49593509-1', 'timothylim.github.io');
	  ga('send', 'pageview');
});