$(function(){
	
	//navigation
	function gotoScroll(id){
    	var id = id.replace("Nav", "");
    	$('html,body').animate({
        	scrollTop: ($("#"+id).offset().top - 155)},
        	'slow');
	}
	$("#nav > span").click(function(e) { 
	      // Prevent a page reload when a link is pressed
	    e.preventDefault(); 
	      // Call the scroll function
	    gotoScroll($(this).attr("id"));           
	});

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
