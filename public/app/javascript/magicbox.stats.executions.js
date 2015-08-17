/**
*
* Desarrollado por MagicBox
* author aromero@magicbox.es
*
* @module main
* Módulo de control de de la aplicación
*
*/
//var objDate=new Date();

if (typeof window.magicbox === "undefined") {
  window.magicbox = {};
}
if (!magicbox.stats){
  magicbox.stats = {};
}
if (!magicbox.stats.executions) {
  magicbox.stats.executions = {};
}
//var TAG="globalInstance";
magicbox.stats.executions = $.extend(magicbox.stats.executions,
		
(function ($,config,log) { 
	"use strict";
	var _config={
			view:"/views/executions.html",
			content:[{
		    	url:[
		    	     "http://localhost:3002/api/v1/getExecutionsToday",
		    	     "http://localhost:3002/api/v1/getExecutions30Days",
		    	     "http://localhost:3002/api/v1/getExecutions365Days"
		    	     ],
		    	params:{
		    		app:{
		    			name:"CVTEPortal",
		    			version:"*"
		    		},  
		    		metadata: {
		    		}
		    	},
		    	layout:{
		    		container:"myContainer",
		    		type:"Bar",
					width:"580",
					height:"420",
					legend:"Portal opennings",
					dataTable: true,
					legend: true
		    	}
		    },
		    {
		    	url:[
		    	     "http://localhost:3002/api/v1/getExecutionsCurrentMonth",
		    	     "http://localhost:3002/api/v1/getExecutions12Months"
		    	],
		    	params:{
		    		app:{
		    			name:"CVTEPortal",
		    			version:"*"
		    		},  
		    		metadata: {
		    		}
		    	},
		    	layout:{
		    		"container":"myContainer2",
		    		"type":"Line",
		    		"width":"580",
		    		"height":"420",
		    		"dataTable": true,
		    		"legend": true
		    	}
		    },
		    {
		    	url:[
		    	     "http://localhost:3002/api/v1/getExecutionsCurrentYear",
		    	     "http://localhost:3002/api/v1/getExecutions1Year"
		    	],
		    	params:{
		    		app:{
		    			name:"CVTEPortal",
		    			version:"*"
		    		},  
		    		metadata: {
		    		}
		    	},
		    	layout:{
		    		"container":"myContainer3",
		    		"type":"Bar",
					"width":"580",
					"height":"420",
					"dataTable": true,
					"legend": true
		    	}
		    },
		    {
		    	url:[
		    	     "http://localhost:3002/api/v1/getExecutionsVersion"
		    	],
		    	params:{
		    	},
		    	layout:{
		    		"container":"myContainer4",
		    		"type":"Pie",
					"width":"580",
					"height":"420",
					"dataTable": true
		    	}
		    },
		    {
		    	url:[
		    	     "http://localhost:3002/api/v1/getExecutionsApp"
		    	],
		    	params:{
		    	},
		    	layout:{
		    		"container":"myContainer5",
		    		"type":"Pie",
					"width":"580",
					"height":"420",
					"dataTable": true
		    	}
		    }]
		}	    

	function _getConfig(){
		return _config
	}

	function _getData(url,data){
		return $.ajax({
			url: url,
    		type: 'POST',
    		contentType:"application/json;charset=UTF-8",
    		data: JSON.stringify(data)
		}) 
	}    

	function _makeLabels(json){
		//var myJSON=json.data[0];
		var myJSON=json;
		var _labels=[];
		for (var k in myJSON) {
			if (myJSON.hasOwnProperty(k)) {
	       		_labels.push(k);
	       	}
	    }		
	    return _labels;		
	}



	function _makeDataset(json){
        var myJSON=json;
        //var myMetadata=json.metadata;
        var _dataset=[];
		for (var k in myJSON) {
			if (myJSON.hasOwnProperty(k)) {
				if ($.isNumeric(myJSON[k])){
					_dataset.push(Math.round(myJSON[k] * 100) / 100);	
				}
	       	}
	    }
	    return _dataset
	}
	
	function _createLayout(callback){
		document.getElementById("main-content").innerHTML="";
	    $.get(_config.view, function(data, status){
	    	document.getElementById("main-content").innerHTML=data;
	    	callback();
	    });
	}
	
	function _load(){
		_createLayout(_createContent)
	}

	function _createContent(){
		var _config=_getConfig().content;
		var _myArray;
		for (var i=0,max=_config.length;i<max;i+=1){
			_myArray=[];
			for (var j=0,maxj=_config[i].url.length;j<maxj;j+=1){
				_myArray.push(_getData(_config[i].url[j],_config[i].params))
			}
			_getChartData(_myArray,_config[i]);
		}
	}

	function _getChartData(myArray, _config){
			$.when.apply($, myArray).then(function() {
				var _sortedData;
				var myChart=new magicbox.magicChart();
				myChart.init(_config.layout);	
				if (_config.layout.type!=="Pie"){
					var _labels=[],
					_values=[],
					_dataset={}	
					for (var i=0,max=arguments.length;i<max;i+=1){
						_sortedData=arguments[i][0].data[0];
						_labels=_makeLabels(_sortedData);
						_dataset=_makeDataset(_sortedData)
						myChart.setLabels(_labels);
						myChart.setDataset(_dataset,arguments[i][0].metadata.abstract);
					}
				}else{
					var _labels=[],
					_values=[],
					_dataset={};
					for (var j=0,maxj=arguments[0].data.length;j<maxj;j+=1){
					  _labels.push(arguments[0].data[j].label);
					  _values.push(arguments[0].data[j].count);
					}
					_dataset.values=_values;
					//_dataset.labels=_labels;
					myChart.setLabels(_labels);
					//It's a PIE chart so labels and values goes together in an object
					myChart.setDataset(_dataset,arguments[0].metadata.abstract);					
				}
				myChart.render();
			}, function() {
					// Alguna ha fallado
			}, function() {
					// Pase lo que pase, siempre vamos a quitar el elemento cargando  
			});
		}		
	
	
	return {
		load:_load
		};
}($,magicbox.stats.config, magicbox.stats.log))
);