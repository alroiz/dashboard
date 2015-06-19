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
if (!magicbox.stats.main) {
  magicbox.stats.main = {};
}
//var TAG="globalInstance";
magicbox.stats.main = $.extend(magicbox.stats.main,
		
(function ($,config,domainTransformer,log) { 
	"use strict";
	var _enviroment = "";
	var TAG = "main.js"; //TAG para el las trazas del log
	var data;
	var _myChart;
	var d = new Date();
	
	var myConfig={
	    	"conn":{
	    		"url":"http://192.168.1.146:3002/api/v1/getConnects",
	    		"params":{
					"scope": "d",
		    		"type":"range",
					"from": "06-16-2015",
					"to": "06-16-2015",
		    		"app":{
		    			"name":"CVTEPortal",
		    			"version":"*"
		    		},  
					"metadata": {
					}
	    		}
	    	},
	    	"layout":{
	    		"container":"myContainer",
	    		"type":"Bar",
				"width":"700",
				"height":"400"		    		
	    	}
		}
	
	var myConfig2={
	    	"conn":{
	    		"url":"http://192.168.1.146:3002/api/v1/getConnects",
	    		"params":{
					"scope": "m",
		    		"type":"range",
					"from": "06-16-2015",
					"to": "06-16-2015",
		    		"app":{
		    			"name":"CVTEPortal",
		    			"version":"*"
		    		},  
					"metadata": {
					}
	    		}
	    	},
	    	"layout":{
	    		"container":"myContainer2",
	    		"type":"Line",
				"width":"700",
				"height":"400"		    		
	    	}
		}
	
	var myConfig3={
	    	"conn":{
	    		"url":"http://192.168.1.146:3002/api/v1/getConnects",
	    		"params":{
					"scope": "y",
		    		"type":"range",
					"from": "06-16-2015",
					"to": "06-16-2015",
		    		"app":{
		    			"name":"CVTEPortal",
		    			"version":"*"
		    		},  
					"metadata": {
					}
	    		}
	    	},
	    	"layout":{
	    		"container":"myContainer3",
	    		"type":"Pie",
				"width":"700",
				"height":"400"		    		
	    	}
		}
	
	var myConfig4={
	    	"conn":{
	    		"url":"http://192.168.1.146:3002/api/v1/getDownloads",
	    		"params":{
					"scope": "d",
		    		"type":"range",
					"from": "06-16-2014",
					"to": "06-16-2015",
		    		"app":{
		    			"name":"CVTEPortal",
		    			"version":"*"
		    		},  
					"metadata": {
					}
	    		}
	    	},
	    	"layout":{
	    		"container":"myContainer",
	    		"type":"Bar",
				"width":"700",
				"height":"400"		    		
	    	}
		}
	
	var myConfig5={
	    	"conn":{
	    		"url":"http://192.168.1.146:3002/api/v1/getDownloads",
	    		"params":{
					"scope": "m",
		    		"type":"range",
					"from": "06-16-2014",
					"to": "06-16-2015",
		    		"app":{
		    			"name":"CVTEPortal",
		    			"version":"*"
		    		},  
					"metadata": {
					}
	    		}
	    	},
	    	"layout":{
	    		"container":"myContainer2",
	    		"type":"Line",
				"width":"700",
				"height":"400"		    		
	    	}
		}
	
	var myConfig6={
	    	"conn":{
	    		"url":"http://192.168.1.146:3002/api/v1/getDownloads",
	    		"params":{
					"scope": "y",
		    		"type":"range",
					"from": "06-16-2014",
					"to": "06-16-2015",
		    		"app":{
		    			"name":"CVTEPortal",
		    			"version":"*"
		    		},  
					"metadata": {
					}
	    		}
	    	},
	    	"layout":{
	    		"container":"myContainer3",
	    		"type":"Pie",
				"width":"700",
				"height":"400"		    		
	    	}
		}
	
	var myConfig7={
	    	"conn":{
	    		"url":"http://192.168.1.146:3002/api/v1/getExecutions",
	    		"params":{
					"scope": "d",
		    		"type":"range",
					"from": "06-16-2014",
					"to": "06-16-2015",
		    		"app":{
		    			"name":"CVTEPortal",
		    			"version":"*"
		    		},  
					"metadata": {
					}
	    		}
	    	},
	    	"layout":{
	    		"container":"myContainer",
	    		"type":"Bar",
				"width":"700",
				"height":"400"		    		
	    	}
		}
	
	var myConfig8={
	    	"conn":{
	    		"url":"http://192.168.1.146:3002/api/v1/getExecutions",
	    		"params":{
					"scope": "m",
		    		"type":"range",
					"from": "06-16-2014",
					"to": "06-16-2015",
		    		"app":{
		    			"name":"CVTEPortal",
		    			"version":"*"
		    		},  
					"metadata": {
					}
	    		}
	    	},
	    	"layout":{
	    		"container":"myContainer2",
	    		"type":"Line",
				"width":"700",
				"height":"400"		    		
	    	}
		}
	
	var myConfig9={
	    	"conn":{
	    		"url":"http://192.168.1.146:3002/api/v1/getExecutions",
	    		"params":{
					"scope": "y",
		    		"type":"range",
					"from": "06-16-2014",
					"to": "06-16-2015",
		    		"app":{
		    			"name":"CVTEPortal",
		    			"version":"*"
		    		},  
					"metadata": {
					}
	    		}
	    	},
	    	"layout":{
	    		"container":"myContainer3",
	    		"type":"Pie",
				"width":"700",
				"height":"400"		    		
	    	}
		}
	
	var myConfig10={
	    	"conn":{
	    		"url":"http://192.168.1.146:3002/api/v1/getDevices",
	    		"params":{
					"scope": "d",
		    		"type":"range",
					"from": "06-01-2015",
					"to": "06-19-2015",
		    		"app":{
		    			"name":"CVTEPortal",
		    			"version":"*"
		    		},  
					"metadata": {
					}
	    		}
	    	},
	    	"layout":{
	    		"container":"myContainer",
	    		"type":"Bar",
				"width":"700",
				"height":"400"		    		
	    	}
		}
	
	var myConfig11={
	    	"conn":{
	    		"url":"http://192.168.1.146:3002/api/v1/getDevices",
	    		"params":{
					"scope": "m",
		    		"type":"range",
		    		"from": "06-01-2014",
					"to": "06-19-2015",
		    		"app":{
		    			"name":"CVTEPortal",
		    			"version":"*"
		    		},  
					"metadata": {
					}
	    		}
	    	},
	    	"layout":{
	    		"container":"myContainer2",
	    		"type":"Line",
				"width":"700",
				"height":"400"		    		
	    	}
		}
	
	var myConfig12={
	    	"conn":{
	    		"url":"http://192.168.1.146:3002/api/v1/getDevices",
	    		"params":{
					"scope": "y",
		    		"type":"range",
		    		"from": "06-01-2014",
					"to": "06-19-2015",
		    		"app":{
		    			"name":"CVTEPortal",
		    			"version":"*"
		    		},  
					"metadata": {
					}
	    		}
	    	},
	    	"layout":{
	    		"container":"myContainer3",
	    		"type":"Pie",
				"width":"700",
				"height":"400"		    		
	    	}
		}
    
	/**
	 * Función privada para inicializar la aplicación 
	 * @method _onLoad
	 */	
	function _onLoad() {		
		try {			
			
			//set calendar		    
    		$('#datepicker').datepicker({
    			language: "es",
    			todayHighlight: true
    		});
    	    var currentDate = new Date();  
			$("#datepicker").datepicker("setDate",currentDate);


			_viewChartsConnects(myConfig);
			_viewChartsConnects(myConfig2);
			_viewChartsConnects(myConfig3);    		
    		
			//domainTransformer.getConnects(config.URL_CONNECTS, data, magicbox.stats.main.onLoadConnects);
		} catch (e) {
			log.e(TAG, "Error en _onLoad " + e);
		}
	}
	
	
	
	function _getData(myConfig,callback){
		$.ajax({
			url: myConfig.conn.url,
		    type: 'POST',
		    contentType:"application/json;charset=UTF-8",
		    data: JSON.stringify(myConfig.conn.params)
		}).done(function (data) {    
		    callback(myConfig,data);
		}).fail(function(jqXHR, textStatus, errorThrown){
		    log.v(TAG,"Error en AJAX _postProfileUpdate " + textStatus);
		    callback(errorThrown);
		});     
	}
	
	
	function randomColorFactor(){
		return Math.round(Math.random()*255);
	};

	function pad (str, max) {
		str = str.toString();
 		return str.length < max ? pad("0" + str, max) : str;
	};
	
	
	function _makeChart(myConfig,data){
		var myData=_makeChartData(myConfig,data);
		_myChart=new magicbox.magicChart();
		_myChart.init(myData,myConfig);
	}
	
	function _makeChartDevices(myConfig,data){
		var myData=_makeChartDataDevices(myConfig,data);
		_myChart=new magicbox.magicChart();
		_myChart.init(myData,myConfig);
	}
	
	
	function _makeChartData(myConfig,json){
        var myJSON=json.data;
        var myMetadata=json.metadata;
        var _chartDataItem;

   		var max;


   		if (myMetadata.scope==="d"){
   			max=23;
   		}else if (myMetadata.scope==="m"){
   			max=30;
   		}else if (myMetadata.scope==="y"){
   			max=11;
   		};

   		if (myConfig.layout.type==="Line" || myConfig.layout.type==="Bar"){
   			_chartDataItem={};
        	_chartDataItem.labels=[];
        	_chartDataItem.datasets=[];
	        for (var i=0;i<=max;i+=1){
	        	_chartDataItem.labels.push(i)
	        }


	       	for (var k=0,maxk=myJSON.length;k<maxk;k+=1){
		        var dataset={};
		        dataset.label="New";
				dataset.fillColor= "rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",0.5)";
				dataset.strokeColor= "rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",0.8)";
				dataset.highlightFill= "rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",0.75)";
				dataset.highlightStroke= "rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",1)";
	       		dataset.data=[];
	       		for (var i=0;i<=max;i+=1){
	       			dataset.data.push(myJSON[k][pad(i,2)])
	       		}
	       		_chartDataItem.datasets.push(dataset);
	       	}
	    }
	    else if (myConfig.layout.type==="Pie" || myConfig.layout.type==="Doughnut"){
	    	_chartDataItem=[];
	        for (var i=0;i<=max;i+=1){
	        	var _dataItem={};
	        	_dataItem.label=i;
	        	_dataItem.hihglight="rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",0.5)";
	        	_dataItem.color="rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",1)";
	        	_dataItem.value=myJSON[0][pad(i,2)];
	        	_chartDataItem.push(_dataItem);	
	        }	    	
	    }
	    if (myConfig.layout.dataTable){
	    	_makeDataTable(myJSON[0]);
	    }

	    return _chartDataItem
		//_render(_chartDataItem);
	}    
	
	
	function _makeChartDataDevices(myConfig,json){
        var myJSON=json.data;
        var myMetadata=json.metadata;
        var _chartDataItem;
        //var myDateInt= json.data[i].dateInt;

   		var max;


   		if (myMetadata.scope==="d"){
   			max=23;
   		}else if (myMetadata.scope==="m"){
   			max=30;
   		}else if (myMetadata.scope==="y"){
   			max=11;
   		};

   		if (myConfig.layout.type==="Line" || myConfig.layout.type==="Bar"){
   			_chartDataItem={};
        	_chartDataItem.labels=[];
        	_chartDataItem.datasets=[];
	        for (var i=0;i<myJSON.length;i+=1){
	        	_chartDataItem.labels.push(myJSON[i].dateInt)
	        }


	       	//for (var k=0,maxk=myJSON.length;k<maxk;k+=1){
		        var dataset={};
		        dataset.label="New";
				dataset.fillColor= "rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",0.5)";
				dataset.strokeColor= "rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",0.8)";
				dataset.highlightFill= "rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",0.75)";
				dataset.highlightStroke= "rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",1)";
	       		dataset.data=[];
	       		for (var i=0;i<myJSON.length;i+=1){
	       			dataset.data.push(myJSON[i].devices)
	       		}
	       		_chartDataItem.datasets.push(dataset);
	       	//}
	    }
	    else if (myConfig.layout.type==="Pie" || myConfig.layout.type==="Doughnut"){
	    	_chartDataItem=[];
	        for (var i=0;i<myJSON.length;i+=1){
	        	var _dataItem={};
	        	_dataItem.label=myJSON[i].dateInt;
	        	_dataItem.hihglight="rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",0.5)";
	        	_dataItem.color="rgba("+randomColorFactor()+","+randomColorFactor()+","+randomColorFactor()+",1)";
	        	_dataItem.value=myJSON[i].devices;
	        	_chartDataItem.push(_dataItem);	
	        }	    	
	    }
	    if (myConfig.layout.dataTable){
	    	_makeDataTable(myJSON[0]);
	    }

	    return _chartDataItem
		//_render(_chartDataItem);
	}        	
	
	 function _onLoadDownloads() {
	        try {
	        	_viewChartsDownloads(myConfig4);
	        	_viewChartsDownloads(myConfig5);
	        	_viewChartsDownloads(myConfig6);   
	        } catch(e) {
	        	log.e(TAG, "Error en _onLoadDownloads " + e);
	        }
	    }
	 
	 function _onLoadExecutions() {
	        try {
	        	_viewChartsExecutions(myConfig7);
	        	_viewChartsExecutions(myConfig8);
	        	_viewChartsExecutions(myConfig9);   
	        } catch(e) {
	        	log.e(TAG, "Error en _onLoadExecutions " + e);
	        }
	    }
	 
	 function _onLoadDevices() {
	        try {
	        	_viewChartsDevices(myConfig10);
	        	_viewChartsDevices(myConfig11); 
	        	_viewChartsDevices(myConfig12); 
	        } catch(e) {
	        	log.e(TAG, "Error en _onLoadDevices " + e);
	        }
	    }
	 
	 function _viewChartsConnects(myConfig) {
	        try {
	        	
	        	//_getData(myConfig.conn.url,myConfig.conn.params,_makeChart);
	        	_getData(myConfig,_makeChart);
	        	
	        } catch(e) {
	        	log.e(TAG, "Error en _viewChartsConnects " + e);
	        }
	    } 
	 
	 function _viewChartsDownloads(myConfig) {
	        try {
	        	
	        	_getData(myConfig,_makeChart);
     		
	        } catch(e) {
	        	log.e(TAG, "Error en _viewChartsDownloads " + e);
	        }
	    }
	 
	 function _viewChartsExecutions(myConfig) {
	        try {
	        	
	        	_getData(myConfig,_makeChart);
  		
	        } catch(e) {
	        	log.e(TAG, "Error en _viewChartsExecutions " + e);
	        }
	    }
	 
	 function _viewChartsDevices(myConfig) {
	        try {
	        	
	        	_getData(myConfig,_makeChartDevices);
		
	        } catch(e) {
	        	log.e(TAG, "Error en _viewChartsDevices " + e);
	        }
	    }
	 
	
	    
	


	/**********************************
	 *
	 * Mï¿½todos publicos
	 *
	 **********************************/
	return {
		onLoad : _onLoad,
		onLoadDownloads: _onLoadDownloads,
		onLoadExecutions: _onLoadExecutions,
		onLoadDevices: _onLoadDevices
		};
}($,magicbox.stats.config,magicbox.stats.domainTransformer, magicbox.stats.log))
);