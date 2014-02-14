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
	var data_0 = new Array;
	var data_1 = new Array;
	var left, right, Ldiff, Ldiffpct, Rdiff, Rdiffpct, Lrank, Rrank, total;

	summarize(datas['b']);

	left = window.left;
	right = window.right;

	var Lmax = left.max();
	var Rmax = right.max();

	$.each(datas['b'], function(key, val){
		left = val['t'][0]['v'];
		right = val['t'][1]['v'];

		Ldiff = left-right;
		Ldiffpct = output((Ldiff/ left * 100),1);
		Rdiffpct = output((100 - Ldiffpct),1);

		Lrank = (left/ Lmax * 100);
		Rrank = (right/ Rmax * 100);

		tableData[key] = {
			id: key,
			series_0: val['r'][0]['v'],
			series_1: val['r'][1]['v'],
			data_0: left,
			data_1: right,
			Ldiffpct: Ldiffpct,
			Rdiff: Rdiff,
			Rdiffpct: Rdiffpct,
			Lstyle: indicator(Lrank),
			Rstyle: indicator(Rrank),
			Lrank: output(Lrank,9),
			Rrank: output(Rrank,9)
		};
	});

	var fullpercentage = '<div class="tddiv pcnt_container fullpercentage"><div class="tddiv data">${ Ldiffpct }%</div><div class="tddiv percentage aleft" id="Ldiffpct_${ id }" style="width: ${ Ldiffpct }%"></div></div>';

	var Rrank = '<div class="tddiv pcnt_container"><div class="tddiv data">${ data_1 }</div><div class="tddiv percentage ${ Rstyle } aright" id="Rpcnt_${ id }" style="width: ${ Rrank }%"></div></div>';

	var Lrank = '<div class="tddiv pcnt_container"><div class="tddiv data">${ data_0 }</div><div class="tddiv percentage ${ Lstyle } aleft" id="Lpcnt_${ id }" style="width: ${ Lrank }%"></div></div>';	

	var name = '<div class="tddiv title_container">${ series_1 }</div><span class="hide">@@${ id }</span><div class="info_container" id="ic_${ id }"><div class="info"></div></div>';	


	var grid = $("#compare").kendoGrid({
	    dataSource: {
	        data: tableData
	        // ,pageSize: 10
	        , schema: {
				model: {
					id: "id",
				    fields: {
				        series_1: { type: "string" },
				        data_0: { type: "number" },
				        data_1: { type: "number" },
				        Rdiffpct: { type: "number" }
				    }
				}
			},
			autoBind: false
	    },
		change: subInfo,
		dataBound: onDataBound,
		dataBinding: onDataBinding,
		selectable: "row",
	    sortable:{
            mode: "single",
            allowUnsort: false
        },
        scrollable: false,
	    pageable: false,
	    columns: [{
	        field: "series_1",
	        title: "Disease",
            filterable: false, 
	        template: kendo.template(name)
	    }, {
	        field: "data_0",
	        title: "Admitted",
	        width: 100, 
	        template: kendo.template(Lrank)
	    }, {
	        field: "Rdiffpct",
	        title: "Percentage",
	        template: kendo.template(fullpercentage),
	        width: 100
	    }, {
	        field: "data_1",
	        title: "Death",
	        width: 100, 
	        template: kendo.template(Rrank)
	    }]
	});

	var autocompleteSymbol = $("#search").kendoAutoComplete({
	    dataTextField: "series_1",
	    dataValueField: "series_1",
	    dataSource: tableData,
	    change: function () {

	    	var filtered;
	        var value = this.value();
	        if (value) {
	            grid.data("kendoGrid").dataSource.filter({ field: "series_1", operator: "contains", value: value });
	        } else {
	            grid.data("kendoGrid").dataSource.filter({});
	        }

		    filtered = grid.data("kendoGrid")["_data"];
	    	if(filtered.length){
		        summarize(filtered);
		        resetRank(filtered);
		        grid.data("kendoGrid").dataSource.filter({ field: "series_1", operator: "contains", value: value });
	    	}   
	    }
	});
}

function summarize(data){
	window.left = Array();
	window.right = Array();

	$.each(data, function(key, val){
		window.left[key] = (check(val['t']))? val['t'][0]['v'] : val['data_0'];
		window.right[key] = (check(val['t']))? val['t'][1]['v'] : val['data_1'];
    });

	$('.Bmean').text(output(window.left.mean(),2));
	$('.Bmode').text(output(window.left.sum(),0));
	$('.Bmedian').text(window.left.median());
	$('.Bmin').text(output(window.left.min(),0));
	$('.Bmax').text(output(window.left.max(),0));

	$('.Pmean').text(output(window.right.mean(),2));
	$('.Pmode').text(output(window.right.sum(),0));
	$('.Pmedian').text(window.right.median());
	$('.Pmin').text(output(window.right.min(),0));
	$('.Pmax').text(output(window.right.max(),0));
}

function resetRank(data){
	var left, right, Lrank, Rrank, total;

	var Lmax = window.left.max();
	var Rmax = window.right.max();

	$.each(data, function(key, val){
		left = (check(val['t']))? val['t'][0]['v'] : val['data_0'];
		right = (check(val['t']))? val['t'][1]['v'] : val['data_1'];
		Lrank = (left/ Lmax * 100);
		Rrank = (right/ Rmax * 100);
		data[key]['Lrank'] = Lrank;
		data[key]['Rrank'] = Rrank;
	});
}


function subInfo(arg) {
    var selected = $.map(this.select(), function(item) {
    	var el = $(item).html();
    	var result;
    	$(el, "td").each(function(index){
    		if(index == 0){
    			result = $(this).text().split("@@");
    			getSubInfo(result[1]);
    		}
    	});
    });
    return false;
}

function getSubInfo(thatval){	
	var div = $('#ic_'+thatval);
	var linechart;
	var series1 = Array();

	if(div.hasClass('active')){
		div.removeClass('active');
	} else {
		var data = window.loaddata['b'][thatval]['s'];
		linechart = $(drawlinechart(data));
		$('.info', div).append(linechart);

		$('.info_container').removeClass('active');
		div.addClass('active');
	}

}

function drawlinechart(data){
	// console.log(data);
	var table = '<table class="subdata" cellspacing="1" cellpadding="0">';
	var sr1 = {};
	var th = {};
	var td = {};
	var td2 = {};
	var i = 0;

	$.each(data[0]['b'], function(key, val) { //r10
		rowid = val['r'][0]['v']; // agegroupcode
		th[rowid] = th[rowid] || new Array();
		td[rowid] = td[rowid] || new Array();
		td2[rowid] = td2[rowid] || new Array();

		th[rowid].push(val['r'][1]['d']);
		td[rowid].push(val['r'][1]['v']);

		$.each(val['t'], function(Tkey, Tval) { //td1(t)
			th[rowid].push(Tval['d']);
			td[rowid].push(Tval['v']);
		});

		$.each(val['s'], function(Skey, Sval) { //td2(s)(agegroupcode)

			$.each(Sval['b'], function(Bkey, Bval) { //td20(s)(genderengdesc)
				sr1[i] = Bval['r'][0]['v'];

				$.each(Bval['t'], function(tkey, tval) { //td200(s)(death & discharge value)
					td2[rowid][sr1[i]] = td2[rowid][sr1[i]] || new Array();
					td2[rowid][sr1[i]].push(tval['v']);
				});
				i++;

			});

		});

	});

	sr1Filtered = unique(sr1);

	$.each(td2, function(key1,val1){ // sub values pushed into parent tr
		$.each(sr1Filtered, function(key, val){
			v = (typeof val1[val] != 'undefined')? val1[val]: 0;
			td[key1].push(v);
			th[key1].push(val);
		});
	});			

	i = 0;

	console.log(td, td2);
	$.each(td, function(key, val){
		if(i==0){
			table += '<thead>';
			$.each(th[1], function(key2, val2){
				table += '<th>'+val2+'</th>';
			});
			table += '</thead>';
		}
		i++;

		table += '<tr>';
		$.each(val, function(key1, val1){
			table += '<td><div class="tddiv title_container">'+val1+'</div></td>';
		});
		table += '</tr>';
	});

	table += '</table>';
	return table;
}

function calc(data){
	var s = data.sum();
	var r = Array();

	$.each(data, function(key, val){
		r[key] = output(val/s*100,1);
	});
	return r;
}


function onDataBound(arg) {
	// console.log("Grid data bound");
}

function onDataBinding(arg) {
	// console.log("Grid data binding");
}

function check(that){
	if (typeof that == 'undefined'){
		return false;
	} else {
		return true;
	}
}

function unique(array) {
	var unique = {};
	var distinct = [];
	for( var i in array ){
		if( typeof(unique[array[i]]) == "undefined"){
			distinct.push(array[i]);
		}
		unique[array[i]] = 0;
	}
	return distinct;
}