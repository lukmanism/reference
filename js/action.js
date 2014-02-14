$(function() {
	window.scaleSteps = 5;
	window.scaleStepWidth = 50000;
	window.scaleStartValue = 50000;
	// window.loaddata = $.parseJSON(window.javData);
	window.loaddata = window.javData;
	var datas = [];

	window.stats_set = loaddata.length; // check data set

	window.year = 2013;
	window.min_year = 2008;
	var step = 1;

	// Load Page
	// linechart(datas); //draw line chart
	tableData(loaddata);

	var close = '<span class="closebtn">X</span>';
	var cflag;
	var el = $(".input");
    el.focus(function(e) {
        if (e.target.value == e.target.defaultValue){
        	e.target.value = '';
    		// cflag = 0;
    		// console.log('1',cflag);
    	}
    	// if(cflag == 0 && e.target.value != ''){
    	// 	el.append(close);
    	// 	cflag = 1;
    	// 	console.log('2',cflag);
    	// } else {
    	// 	$('.closebtn').remove();
    	// 	cflag = 0;
    	// 	console.log('3',cflag);
    	// } 
    });
    el.blur(function(e) {
        if (e.target.value == ''){
            e.target.value = e.target.defaultValue;
    		// cflag = 1;
    		// console.log('4',cflag);
        }
    	// if(cflag == 0 && e.target.value != ''){
    	// 	el.append(close);
    	// 	cflag = 1;
    	// 	console.log('5',cflag);
    	// } else {
    	// 	$('.closebtn').remove();
    	// 	cflag = 0;
    	// 	console.log('6',cflag);
    	// } 
    });

	
});
	window.comparex = 1;
