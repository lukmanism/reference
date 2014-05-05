<!doctype html>
<html>
	<head>
		<title>Reference Chart</title>
		<meta name = "viewport" content = "initial-scale = 1, user-scalable = no">
		<script src="js/Chart.min.js"></script>
		<link rel="stylesheet" href="css/jquery-ui.min.css">
		<link rel="stylesheet" href="css/style.css">
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.min.js"></script>
		<script src="js/jquery.ui.touch-punch.min.js"></script>
    	<script src="js/kendo.web.min.js"></script>
		<script src='js/include.js'></script>
		<script src='js/psMathStats.min.js'></script>
	</head>
	
<body style="background-color: transparent;">

<div class="container">
	<div class="content">
	<div class="comparison">
		<div class="widget_title top15">Reference Chart - Data Overview</div>
		<div class="widget_title_s">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet</div>

		<div class="filter top15">
			<input type="text" id="search" value="Filter" class="input"/>
		</div>

		<div class="bar top15" id="compare" ></div>	

	<div class="clear"></div>
		<div class="widget_title top15">Summarize main data</div>
		<div class="widget_title_s bottom15">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet</div>

			<div class="col1">
				<div class="widget_title top15">Admitted</div>

			    <dl class="top15 col5">
			        <dt class="grey50">Min.</dt>
			        <dd class="Bmin med">48</dd>
			    </dl>
			    <dl class="top15 col5">
			        <dt class="grey50">Median</dt>
			        <dd class="Bmedian med">48</dd>
			    </dl>
			    <dl class="top15 col5">
			        <dt class="grey50">Mean</dt>
			        <dd class="Bmean med">48</dd>
			    </dl>
			    <dl class="top15 col5">
			        <dt class="grey50">Max.</dt>
			        <dd class="Bmax med">48</dd>
			    </dl>
			    <dl class="top15 col5">
			        <dt class="grey50">Sum</dt>
			        <dd class="Bmode med">48</dd>
			    </dl>
			</div>

			<div class="col1 margin15">
				<div class="widget_title">Death</div>

			    <dl class="top15 col5">
			        <dt class="grey50">Min.</dt>
			        <dd class="Pmin med">48</dd>
			    </dl>
			    <dl class="top15 col5">
			        <dt class="grey50">Median</dt>
			        <dd class="Pmedian med">48</dd>
			    </dl>
			    <dl class="top15 col5">
			        <dt class="grey50">Mean</dt>
			        <dd class="Pmean med">48</dd>
			    </dl>
			    <dl class="top15 col5">
			        <dt class="grey50">Max.</dt>
			        <dd class="Pmax med">48</dd>
			    </dl>
			    <dl class="top15 col5">
			        <dt class="grey50">Sum</dt>
			        <dd class="Pmode med">48</dd>
			    </dl>
			</div>

	<div class="clear"></div>
	</div>
	</div>


</div>

<script>
	// webservice available at http://10.1.20.69/mi-bis/api/
	// assign your value to loaddata i.e. var loaddata = datafromandroid;
	// be careful with ' character, as it will break the data string. Make sure to escape the character with \'
	var loaddata;
	$.ajax({
			async: false,
			// diseaseChart3
			// diseaseChart2
			url: "http://10.1.20.69/mi-bis/api/?src=<?php echo $_GET['src']; ?>", // fetching webservice
			beforeSend: function(xhr) {}
		}).done(function(data) {
			loaddata = data;
	});

	window.seriecolor = {
		// 0: ["#D8D7DA", "#4DA3D5", "#1c638d"],
		0: ["#4DA3D5", "#1c638d"],
		1: ["#D8D7DA", "#bcbcbc", "#979797"],
		2: ["#4DA3D5", "#2b87bc", "#0c6ba3"],
	};

	if(loaddata){
		// console.log(loaddata)
		action(loaddata, 'onload');		
	} else {
		alert('Data not loaded!');
	}

</script>
<script src='js/action.js'></script>

	</body>
</html>
