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
		    		"params":{
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
    				"width":"580",
    				"height":"420",
    				"legend":"Portal opennings",
    				"dataTable": true,
    				"legend": true
		    	}
			}
		    var myConfig2={
		    	"conn":{
		    		"params":{
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
    				"width":"580",
    				"height":"420",
    				"dataTable": true,
    				"legend": true
		    	}
			}
		    var myConfig3={
		    	"conn":{
		    		"params":{
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
		    		"type":"Bar",
    				"width":"580",
    				"height":"420",
    				"dataTable": true,
    				"legend": true
		    	}
			}

		    var myConfig4={
		    	"conn":{
		    		"params":{
		    		}
		    	},
		    	"layout":{
		    		"container":"myContainer4",
		    		"type":"Pie",
    				"width":"580",
    				"height":"420",
    				"dataTable": true
		    	}
			}			
	

	
	var myConfig5={
	    	"conn":{
	    		"url":"http://dashboardcvte.herokuapp.com/api/v1/getDownloads",
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
	    		"url":"http://dashboardcvte.herokuapp.com/api/v1/getDownloads",
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
	    		"url":"http://dashboardcvte.herokuapp.com/api/v1/getExecutions",
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
	    		"url":"http://dashboardcvte.herokuapp.com/api/v1/getExecutions",
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
	    		"url":"http://dashboardcvte.herokuapp.com/api/v1/getExecutions",
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
	    		"url":"http://dashboardcvte.herokuapp.com/api/v1/getDevices",
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
	    		"url":"http://dashboardcvte.herokuapp.com/api/v1/getDevices",
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
	    		"url":"http://dashboardcvte.herokuapp.com/api/v1/getDevices",
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
		        var myMetadata=json.metadata;
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

        		/*var myData=_getData("http://magicdashboard.herokuapp.com/api/v1/getConnectsToday",myConfig.conn.params);
        		var myData2=_getData("http://magicdashboard.herokuapp.com/api/v1/getConnects30Days",myConfig.conn.params);
        		var myData3=_getData("http://magicdashboard.herokuapp.com/api/v1/getConnects365Days",myConfig.conn.params);
        		var myData4=_getData("http://magicdashboard.herokuapp.com/api/v1/getConnectsCurrentMonth",myConfig2.conn.params);
				var myData5=_getData("http://magicdashboard.herokuapp.com/api/v1/getConnects12Months",myConfig2.conn.params);        		
        		var myData6=_getData("http://magicdashboard.herokuapp.com/api/v1/getConnectsCurrentYear",myConfig3.conn.params);
				var myData7=_getData("http://magicdashboard.herokuapp.com/api/v1/getConnects1Year",myConfig3.conn.params);*/
        		var myData=_getData("http://localhost:3002/api/v1/getConnectsToday",myConfig.conn.params);
        		var myData2=_getData("http://localhost:3002/api/v1/getConnects30Days",myConfig.conn.params);
        		var myData3=_getData("http://localhost:3002/api/v1/getConnects365Days",myConfig.conn.params);
        		var myData4=_getData("http://localhost:3002/api/v1/getConnectsCurrentMonth",myConfig2.conn.params);
				var myData5=_getData("http://localhost:3002/api/v1/getConnects12Months",myConfig2.conn.params);        		
        		var myData6=_getData("http://localhost:3002/api/v1/getConnectsCurrentYear",myConfig3.conn.params);
				var myData7=_getData("http://localhost:3002/api/v1/getConnects1Year",myConfig3.conn.params);
				var myData8=_getData("http://localhost:3002/api/v1/getConnectsVersion",myConfig4.conn.params);
  

				$.when(myData, myData2, myData3).then(function() {
				  var _sortedData;
				  // Ambas habrán tenido éxito
				  var myChart=new magicbox.magicChart();
				  myChart.init(myConfig.layout);
				  //var myCanvas=myChart.createCanvasElement(myConfig.layout);
				  for (var i=0,max=arguments.length;i<max;i+=1){
					//_sortedData=_sortObject(arguments[i][0].data[0]);
					_sortedData=arguments[i][0].data[0];
				  	myChart.setLabels(_makeLabels(_sortedData));
				  	myChart.addDataset(_makeDataset(_sortedData),arguments[i][0].metadata.abstract);
				  }
				  myChart.render();
				}, function() {
				  // Alguna ha fallado
				}, function() {
				  // Pase lo que pase, siempre vamos a quitar el elemento cargando
				  
				});

				$.when(myData4, myData5).then(function() {
				  var _sortedData;
				  // Ambas habrán tenido éxito
				  var myChart2=new magicbox.magicChart();
				  myChart2.init(myConfig2.layout);
				  //var myCanvas=myChart.createCanvasElement(myConfig.layout);
				  for (var i=0,max=arguments.length;i<max;i+=1){
					_sortedData=arguments[i][0].data[0];
				  	myChart2.setLabels(_makeLabels(_sortedData));
				  	myChart2.addDataset(_makeDataset(_sortedData),arguments[i][0].metadata.abstract);
				  }
				  myChart2.render();
				}, function() {
				  // Alguna ha fallado
				}, function() {
				  // Pase lo que pase, siempre vamos a quitar el elemento cargando
				  
				});		

				$.when(myData6, myData7).then(function() {
				  var _sortedData;
				  // Ambas habrán tenido éxito
				  var myChart3=new magicbox.magicChart();
				  myChart3.init(myConfig3.layout);
				  //var myCanvas=myChart.createCanvasElement(myConfig.layout);
				  for (var i=0,max=arguments.length;i<max;i+=1){
					_sortedData=arguments[i][0].data[0];
				  	myChart3.setLabels(_makeLabels(_sortedData));
				  	myChart3.addDataset(_makeDataset(_sortedData),arguments[i][0].metadata.abstract);
				  }
				  myChart3.render();
				}, function() {
				  // Alguna ha fallado
				}, function() {
				  // Pase lo que pase, siempre vamos a quitar el elemento cargando
				  
				});
				

				$.when(myData8).then(function() {
				  var _sortedData,_labels,_values,_dataset;
				  // Ambas habrán tenido éxito
				  var myChart4=new magicbox.magicChart();
				  myChart4.init(myConfig4.layout);
				  //var myCanvas=myChart.createCanvasElement(myConfig.layout);
			  	  //myChart3.setLabels(_makeLabels(_sortedData));
				  _values=[];
				  _labels=[];
				  _dataset={};
				  for (var j=0,maxj=arguments[0].data.length;j<maxj;j+=1){
				  	_labels.push(arguments[0].data[j].version);
				  	_values.push(arguments[0].data[j].count);
				  }
				  _dataset.values=_values;
				  _dataset.labels=_labels;
				  //It's a PIE chart so labels and values goes together in an object
				  myChart4.addDataset(_dataset,arguments[0].metadata.abstract);
				  myChart4.render();
				}, function() {
				  // Alguna ha fallado
				}, function() {
				  // Pase lo que pase, siempre vamos a quitar el elemento cargando
				  
				});				
			//domainTransformer.getConnects(config.URL_CONNECTS, data, magicbox.stats.main.onLoadConnects);
		} catch (e) {
			log.e(TAG, "Error en _onLoad " + e);
		}
	}
	

	
	function _makeChartDevices(myConfig,data){
		var myData=_makeChartDataDevices(myConfig,data);
		_myChart=new magicbox.magicChart();
		_myChart.init(myData,myConfig);
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
	 
	 
	 function _viewChartsDevices(myConfig) {
	        try {
	        	
	        	_getData(myConfig,_makeChartDevices);
		
	        } catch(e) {
	        	log.e(TAG, "Error en _viewChartsDevices " + e);
	        }
	    }
	 
	function _sortObject(o) {
	    var sorted = {},
	    key, a = [];

	    for (key in o) {
	    	if (o.hasOwnProperty(key)) {
	    		a.push(key);
	    	}
	    }

	    a.sort();

	    for (key = 0; key < a.length; key++) {
	    	sorted[a[key]] = o[a[key]];
	    }
	    return sorted;
	}	
	function _sortObject2(o) {
		var objResult={};
		Object.keys(o)
      	.sort()
      	.forEach(function (k) {
      		 objResult[k]=o[k]
        	// console.log(o[k]);
      	});	
      	return objResult;
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