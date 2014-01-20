function pie(data, target) {
	var options = {		
		segmentShowStroke : false,	
		segmentStrokeColor : "#fff",	
		segmentStrokeWidth : 20,	
		animation : true,	
		animationSteps : 60,	
		animationEasing : "easeOutBounce",	
		animateRotate : true,
		animateScale : true,	
		onAnimationComplete : null
	}
	new Chart(document.getElementById(target).getContext("2d")).Pie(data, options);	
	$('#'+target).attr("width","100").attr("height","100"); //forced size
}


function linechart(datas){
	window.labels = new Array;
	window.data1 = new Array;
	window.data2 = new Array;
	$.each(datas, function(key, val){
		labels[key] = val[2]['district'];
		data1[key] = val[0]['data'][5];
		data2[key] = val[1]['data'][5];

	});

	var options = {	
		scaleOverlay : false,
		scaleOverride : false,
		scaleSteps : window.scaleSteps,
		scaleStepWidth : window.scaleStepWidth,
		scaleStartValue : window.scaleStartValue,
		scaleLineColor : "rgba(0,0,0,0)",			
		scaleLineWidth : 1,
		scaleShowLabels : true,			
		scaleLabel : "<%=value%>",			
		scaleFontFamily : "'Helvetica'",			
		scaleFontSize : 12,			
		scaleFontStyle : "normal",			
		scaleFontColor : "#666",				
		scaleShowGridLines : false,			
		scaleGridLineColor : "rgba(0,0,0,.05)",	
		scaleGridLineWidth : 1,				
		bezierCurve : true,			
		pointDot : true,			
		pointDotRadius : 3,			
		pointDotStrokeWidth : 1,			
		datasetStroke : true,			
		datasetStrokeWidth : 2,			
		datasetFill : true,			
		animation : true,
		animationSteps : 60,			
		animationEasing : "easeOutQuart",
		onAnimationComplete : null			
	}
	var lineChartData = {
		labels : labels,
		datasets : [
			{
				fillColor : "#1c638d",
				strokeColor : "#454447",
				pointColor : "#ffffff",
				pointStrokeColor : "#454447",
				data : data1
			},
			{
				fillColor : "#4DA3D5",
				strokeColor : "#454447",
				pointColor : "#ffffff",
				pointStrokeColor : "#454447",
				data : data2
			}
		]			
	}
	var myLine = new Chart(document.getElementById("linechart").getContext("2d")).Line(lineChartData,options);
	window.slideval = lineChartData.datasets;
}

function loadDiffHome(penduduk,belia,belia_diff,belia_diff_pcnt,belia_diff_bfr,belia_diff_bfr_pcnt,belia_diff_aft,belia_diff_aft_pcnt,district){
	$(".belia_total").text(output(belia,0));
	$(".pop_total").text(output(penduduk,0));
	$(".belia_pcnt").text(output(belia_diff_pcnt,0)+'%');
	$(".pop_pcnt").text(output((100 - belia_diff_pcnt),0)+'%');

	$(".belia_diff").text(output(belia_diff,0));
	$(".belia_diff_pcnt").text(output(belia_diff_pcnt,0)+'%');

	$(".belia_diff_bfr").text(output(belia_diff_bfr,0));
	$(".belia_diff_bfr_pcnt").text(output(belia_diff_bfr_pcnt,0)+'%');

	$(".belia_diff_aft").text(output(belia_diff_aft,0));
	$(".belia_diff_aft_pcnt").text(output(belia_diff_aft_pcnt,0)+'%');

	if(belia_diff_bfr < 0){
		$('.home .belia_diff_bfr_pcnt').removeClass('up').addClass('down');
	} else {
		$('.home .belia_diff_bfr_pcnt').removeClass('down').addClass('up');
	}
	if(belia_diff_aft < 0){
		$('.home .belia_diff_aft_pcnt').removeClass('up').addClass('down');
	} else {
		$('.home .belia_diff_aft_pcnt').removeClass('down').addClass('up');
	}	
	$(".thisdistrict").text(district);
}


function calculate(min, yearindex, dataset){
	window.labels;
	window.data1;
	window.data2;

	var newData = new Array;

	$.each(labels, function(key,val){
		newData[key] = {district: val, data1: data1[key], data2: data2[key]};
	});
	newData.sort(function(a, b){ return b.data2-a.data2 });


	var index = yearindex - min;

	var penduduk, penduduk_bfr, penduduk_aft, belia_diff, belia_diff_pcnt, belia_diff_bfr, belia_diff_bfr_pcnt, belia_diff_aft, belia_diff_aft_pcnt;

	penduduk 	= newData[0]['data1'];
	belia 		= newData[0]['data2'];

	belia_diff = penduduk - belia;
	belia_diff_pcnt = (belia/penduduk) * 100;

	loadDiffHome(penduduk,belia,belia_diff,belia_diff_pcnt,belia_diff_bfr,belia_diff_bfr_pcnt,belia_diff_aft,belia_diff_aft_pcnt,newData[0]['district']);
}

function output(number, dec)	{
	number = (isNaN(number))? 0 : number;
    number = number.toFixed(dec) + '';
    x = number.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function bar(stats_set,datas,thisyear){
	window.labels;
	window.data1;
	window.data2;

	var newData = new Array;

	$.each(labels, function(key,val){
		newData[key] = {district: val, data1: data1[key], data2: data2[key]};
	});
	newData.sort(function(a, b){ return b.data2-a.data2 });

	var cat = Array();
	var Bbelia = Array();
	var Bpenduduk = Array();

	var index = (typeof thisyear != 'undefined')? ((thisyear-window.min_year)): (window.year-window.min_year);
	var bardata = Array();

	for (var i = 0; i < 5; i++) {
		cat.push(newData[i]['district']);
		Bbelia.push(newData[i]['data2']);
		Bpenduduk.push(newData[i]['data1']);
	};	
}



function setSparklines(getData){
	window.labels;
	window.data1;
	window.data2;

	var newData = new Array;

	$.each(labels, function(key,val){
		newData[key] = {district: val, data1: data1[key], data2: data2[key]};
	});
	newData.sort(function(a, b){ return b.data2-a.data2 });

	var pushdata;
	window.pushdatas = [];
	pushdata = newData.filter(function (d) {
		return d['district'] == getData;
	});

	$.each(pushdata, function(key, val){
		pushdatas[key]= [{data: val.data1}, {data: val.data2}, {district: val.district}, {state: 'Johor'}];
	});

	pushSparklines1(window.stats_set, window.pushdatas, window.min_year, window.selected_year);
}

function pushSparklines1(stats_set, getdata, min_year, thisyear){

	var thisdata = getdata[0];

	var Bbelia = thisdata[1]['data'];
	var BPenduduk = thisdata[0]['data'];

	var title = (thisdata[2]['district'])? thisdata[2]['district'] : thisdata[3]['state'];
	$('.thatdistrict').text(title);

	var belia_diff_pcnt = (Bbelia/BPenduduk) * 100;

	$(".Bbelia_total").text(output(Bbelia));
	$(".Bpop_total").text(output(BPenduduk));
	$(".Bbelia_pcnt").text(output(belia_diff_pcnt,0)+'%');
	$(".Bpop_pcnt").text(output((100 - belia_diff_pcnt),0)+'%');

	var home_total = window.belia;
	var away_total = Bbelia;
	var home_pcnt = (home_total/(home_total + away_total)) * 100;
	var away_pcnt = (away_total/(home_total + away_total)) * 100;

	$(".home_diff .Dbelia_diff_total").text(output(home_total));
	$(".away_diff .Dbelia_diff_total").text(output(away_total));
	$(".home_diff .Dbelia_diff_pcnt").text(output(home_pcnt)+'%');
	$(".away_diff .Dbelia_diff_pcnt").text(output(away_pcnt)+'%');	
}

function pushSparklines(stats_set, getdata, min_year, thisyear){
	window.labels;
	window.data1;
	window.data2;

	var newData = new Array;

	$.each(labels, function(key,val){
		newData[key] = {district: val, data1: data1[key], data2: data2[key], state: 'Johor'};
		// newData[key]= [{data: data1[key}, {data: data2[key]}, {district: val}, {state: 'Johor'}];
	});
	newData.sort(function(a, b){ return b.data2-a.data2 });




	var thisdata = newData[1];

	var Bbelia = thisdata['data2'];
	var BPenduduk = thisdata['data1'];

	var title = thisdata['district'];
	$('.thatdistrict').text(title);
	var belia_diff_pcnt = (Bbelia/BPenduduk) * 100;

	$(".Bbelia_total").text(output(Bbelia));
	$(".Bpop_total").text(output(BPenduduk));
	$(".Bbelia_pcnt").text(output(belia_diff_pcnt,0)+'%');
	$(".Bpop_pcnt").text(output((100 - belia_diff_pcnt),0)+'%');

	var home_total = window.belia;
	var away_total = Bbelia;
	var home_pcnt = (home_total/(home_total + away_total)) * 100;
	var away_pcnt = (away_total/(home_total + away_total)) * 100;

	$(".home_diff .Dbelia_diff_total").text(output(home_total));
	$(".away_diff .Dbelia_diff_total").text(output(away_total));
	$(".home_diff .Dbelia_diff_pcnt").text(output(home_pcnt)+'%');
	$(".away_diff .Dbelia_diff_pcnt").text(output(away_pcnt)+'%');
}

function veriNum(z){
	return (z != 'Infinity')? z: 0;
}

function summary(stats_set,datas,val){
	bar(stats_set,datas,val);
	pushSparklines(window.stats_set, datas, window.min_year, val);

	if(typeof val != 'undefined'){
		$('.widget_tahun').html(val);
		$('.widget_tahun_prev').html(val-1);
		$('.widget_tahun_aft').html(val+1);		
	}
}

function getYearBfr(){
	$('.getYearBfr').tooltip({ content: "Awesome title!" });
}
function getYearAft(){
	$('.getYearAft').tooltip({ content: "Awesome title!" });
}

function indicator(x) {
	x = output(x,0);
	var style = '';
	if (x >= 0 && x <= 25) {
		style = 'low';
	} else if (x >= 26 && x <= 50) {
		style = 'medlow';
	} else if (x >= 51 && x <= 75) {
		style = 'medhigh';
	} else if (x >= 76 && x <= 100) {
		style = 'high';
	}
	return style;
}

function tableData(datas){
	var tableData = new Array;
	var belia = new Array;
	var penduduk = new Array;
	var Bdiff, Bdiffpct, Pdiff, Pdiffpct, Brank, Prank;

	$.each(datas, function(key, val){
		belia[key] = val['belia'][5];
		penduduk[key] = val['penduduk'][5];

	});
	$('.Bmean').text(output(belia.mean()));
	$('.Bmode').text(output(belia.sum()));
	$('.Bmedian').text(output(belia.median()));
	$('.Bmin').text(output(belia.min()));
	$('.Bmax').text(output(belia.max()));

	$('.Pmean').text(output(penduduk.mean()));
	$('.Pmode').text(output(penduduk.sum()));
	$('.Pmedian').text(output(penduduk.median()));
	$('.Pmin').text(output(penduduk.min()));
	$('.Pmax').text(output(penduduk.max()));

	$.each(datas, function(key, val){
		Bdiff = val['penduduk'][5]-val['belia'][5];
		Pdiffpct = output((Bdiff/ val['penduduk'][5] * 100),0);
		Bdiffpct = (100 - Pdiffpct);
		Brank = (val['belia'][5]/ belia.max() * 100);
		Prank = (val['penduduk'][5]/ penduduk.max() * 100);

		tableData[key] = {state: val['state'], district: val['district'], data1: val['penduduk'][5], data2: val['belia'][5], Bdiffpct: Bdiffpct+'%', Pdiff: Pdiff, Pdiffpct: Pdiffpct+'%', Bstyle: indicator(Brank), Pstyle: indicator(Prank), Brank: Brank+'%', Prank: Prank+'%'};
	});

	// console.log(belia.mean());


	var fullpercentage = '<div class="fullpercentage"><span style="width: ${ Bdiffpct }">${ Bdiffpct }</span><span style="width: ${ Pdiffpct }; background-color:transparent;">${ Pdiffpct }</span></div>';
	var prank = '<div class="pcnt_container left"><div class="data">${ data1 }</div><div class="percentage prank ${ Pstyle } left" style="width: ${ Prank }"></div></div>';
	var brank = '<div class="pcnt_container left"><div class="data">${ data2 }</div><div class="percentage brank ${ Bstyle }" style="width: ${ Brank }"></div></div>';


	$("#compare").kendoGrid({
	    dataSource: {
	        data: tableData
	        // ,pageSize: 10
	    },
	    sortable:{
            mode: "single",
            allowUnsort: false
        },
        scrollable: false,
	    pageable: false,
	    columns: [{
	        field: "state",
	        title: "State"
	    }, {
	        field: "district",
	        title: "District"
	    }, {
	        field: "data2",
	        title: "Kes Denggi",
	        width: 100,
	        template: kendo.template(brank)
	    }, {
	        field: "Pdiffpct",
	        title: "Percentage",
	        template: kendo.template(fullpercentage)
	    }, {
	        field: "data1",
	        title: "Penduduk",
	        width: 100,
	        template: kendo.template(prank)
	    }]
	});
}