/**
*
* Desarrollado por MagicBox
* 
* @module config
* Módulo con los valores de configuración y constantes de de la aplicación
*
 */

if (typeof window.magicbox === "undefined") {
	window.magicbox = {};
}
if (!magicbox.magicChart){
	magicbox.magicChart = {};
}


//magicbox.magicChart = $.extend(magicbox.magicChart,
magicbox.magicChart=function () {
"use strict";
	var d = new Date();
    var dataDefault={
    	"layout":{
    		"container":"chartContainer",
    		"type":"Line",
    		"width":"800",
    		"height":"500"
    	}
	}

	var _config={};	
	var _chart={}; //Stor generated chart
	var _datasets=[];
	var _labels;

	function pad (str, max) {
		str = str.toString();
 		return str.length < max ? pad("0" + str, max) : str;
	}

	function randomColorFactor(){
		return Math.round(Math.random()*255);
	};


	function _getChart(){
		return _chart;
	}

	function _init(config){
		_config=config;
	}

	function _createCanvasElement(layout){
		var canvas = document.createElement('canvas');
		var _container=document.getElementById(layout.container);
		var d=new Date();
		var _ts=d.getTime();
		canvas.id     = "myGraph_"+_ts;
		canvas.width  = layout.width;
		canvas.height = layout.height;
		_container.appendChild(canvas);
		return document.getElementById("myGraph_"+_ts);
	}

	function _render(){
		var _myBar;
		var objDom=_createCanvasElement(_config);
		var ctx = objDom.getContext("2d");
		var d=new Date();
		var _ts=d.getTime();		

		var _chartData ={};
		if (_config.type==="Line"){
			_chartData.labels =_labels;
			_chartData.datasets =_datasets;			
			_chart = new Chart(ctx).Line(_chartData, {
				responsive : true
			});		
		}
		if (_config.type==="Bar"){
			_chartData.labels =_labels;
			_chartData.datasets =_datasets;			
			_chart = new Chart(ctx).Bar(_chartData, {
				responsive : true
			});			
		}
		if (_config.type==="Pie"){
			_chart = new Chart(ctx).Pie(_datasets, {
				responsive : true
			});			
		}		
		//then you just need to generate the legend
		if (_config.legend){
  			var _legend = _chart.generateLegend();
  			$('#'+_config.container).append(_legend);
  		}
  		
  		if (_config.dataTable){
  			_renderDataTable(_config.container)
  		}
  		
	}

	function _renderDataTable(container){
		var i,j,max,maxj;
		var _container;
		var div, tbl, tbl_head, tbl_body, tbl_row, cell;
		tbl = document.createElement("table");
		tbl.id="myTable";
	    tbl_body = document.createElement("tbody");
	    var odd_even = false;
		tbl_row = tbl_body.insertRow();

		for (i=0,max=_labels.length;i<max;i+=1){
			cell = tbl_row.insertCell();
			cell.appendChild(document.createTextNode(_labels[i].toString()));
		}

		if (_config.type!=="Pie"){
	    	for (i=0,max=_datasets.length;i<max;i+=1){
	        	tbl_row = tbl_body.insertRow();
	        	for (j=0,maxj=_datasets[i].data.length;j<maxj;j+=1){
	            	cell = tbl_row.insertCell();
	            	cell.appendChild(document.createTextNode(_datasets[i].data[j].toString()));
	        	}
	        	odd_even = !odd_even;               	    	
	    	}
	    }else{
	    	tbl_row = tbl_body.insertRow();
	    	for (i=0,max=_datasets.length;i<max;i+=1){
            	cell = tbl_row.insertCell();
            	cell.appendChild(document.createTextNode(_datasets[i].value.toString()));
	        	odd_even = !odd_even;               	    	
	    	}
	    }

	    tbl.appendChild(tbl_body);
		div = document.createElement("div");
		div.className="table37";
		div.appendChild(tbl);
		var _container=document.getElementById(container);
		_container.appendChild(div);

	}
	
    function _setDataset(data,label){
    	if (_config.type==="Bar" || _config.type==="Line"){
	      	//var chartTest=myChart.getChart();
		    var _dataset={};
	    	_dataset.label=label;
			_dataset.fillColor= "rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",0.5)";
			_dataset.strokeColor= "rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",0.8)";
			_dataset.highlightFill= "rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",0.75)";
			_dataset.highlightStroke= "rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",1)";
	   		_dataset.data=[];
			for (var k in data) {
    			if (data.hasOwnProperty(k)) {	       			
	   				_dataset.data.push(data[k]);
	   			}
	   		}
	   		//Check data null
	   		if (_dataset.data.length===0){
	   			for (var i=0,max=_getLabels().length;i<max;i+=1){
	   				_dataset.data.push(0);
	   			}
	   		}
	   		_datasets.push(_dataset);
	   	}
	   	if (_config.type==="Pie"){
	   		var _dataset={};
	   		//var _pieLabels=[];
	   		for (var i=0;i<data.values.length;i+=1){
	   			_dataset={};
	   			_dataset.value=data.values[i];
	   			_dataset.color="rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",0.5)";
	   			_dataset.highlight="rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",0.75)";
	   			//_dataset.label=data.labels[i];
	   			_dataset.label=_labels[i];
	   			//_datasets.push(_dataset);
	   			//_pieLabels.push(data.labels[i]);
	   			_datasets.push(_dataset);
	   		}
	   		//_labels=_setLabels(_pieLabels);
	   	}
	   	
	   	
	   	return _datasets;
    }


    function _setLabels(labels){
      	if (!_labels){
      		 _labels=labels;
      	}
      	return _labels    		
    }

    function _getLabels(){
      	return _labels    		
    }    

	return {
		init : _init,
		createCanvasElement:_createCanvasElement,
		render: _render,
		setDataset:_setDataset,
		setLabels:_setLabels,
		getLabels:_getLabels,
		getChart: _getChart
	};
}

