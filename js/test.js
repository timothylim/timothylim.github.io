$(function(){
	
	//navigation
	function gotoScroll(id){
    	var id = id.replace("Nav", "");
    	$('html,body').animate({
        	scrollTop: ($("#"+id).offset().top - 155)},
        	'slow');
	}
});
