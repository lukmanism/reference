$(function() {
	window.scaleSteps = 5;
	window.scaleStepWidth = 50000;
	window.scaleStartValue = 50000;
	window.loaddata = $.parseJSON(window.javData);
	var datas = [];

	window.stats_set = loaddata.length; // check data set

	// construct data from json
	$.each(loaddata, function(key, val){
		datas[key]= [{data: val.penduduk}, {data: val.belia}, {district: val.district}, {state: val.state}, {datas: val.datas}];
	});

	var main_title = (datas[0][2]['district'])? datas[0][2]['district'] + ', ' + datas[0][3]['state']: datas[0][3]['state'];
	var title = (datas[0][2]['district'])? datas[0][2]['district'] : datas[0][3]['state'];
	// $('.title').text(main_title);
	$('.thisdistrict').text(title);

	window.year = 2013;
	window.min_year = 2008;
	var step = 1;

	// Load Page
	linechart(datas); //draw line chart
	tableData(loaddata);
	calculate(min_year, year, window.slideval); // render summary
	summary(stats_set,datas);

	// var slider = $( "#slider" ).slider({
	// 	value: year, //slider default value
	// 	min: min_year,
	// 	max: year,
	// 	step: step,
	// 	slide: function( event, ui ) {
	// 		window.selected_year = ui.value;
	// 		calculate(min_year, ui.value, window.slideval);
	// 		summary(stats_set,datas,ui.value);
	// 	}
	// });
	
});
	window.comparex = 1;
