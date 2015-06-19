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
    	"conn":{
    		"url":"http://localhost:3002/api/v1/getConnects",
    		"params":{
				"scope": "d",
	    		"type":"range",
				"from": "06-01-2015",
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
    		"container":"chartContainer",
    		"type":"Line",
    		"width":"800",
    		"height":"500"
    	}
	}

	var _config={};	
	var _chart={}; //Stor generated chart



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


	function _init(json,config){
		_config=config;
		//_getData(config.conn.url,config.conn.params,_makeChartData)
		//_makeChartData(json);
		_render(json);
	}


	function _makeChartData(json){
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

   		if (_config.layout.type==="Line" || _config.layout.type==="Bar"){
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
	    else if (_config.layout.type==="Pie" || _config.layout.type==="Doughnut"){
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
	    if (_config.layout.dataTable){
	    	_makeDataTable(myJSON[0]);
	    }

	    //return _chartDataItem
		_render(_chartDataItem);
	}		

	function _getData(url,data,callback){
		$.ajax({
			url: url,
		    type: 'POST',
		    contentType:"application/json;charset=UTF-8",
		    data: JSON.stringify(data)
		}).done(function (data) {    
		    callback(data);
		}).fail(function(jqXHR, textStatus, errorThrown){
		    log.v(TAG,"Error en AJAX _postProfileUpdate " + textStatus);
		    callback(errorThrown);
		});     
	}




	function _createCanvasElement(){
		var canvas = document.createElement('canvas');
		var _container=document.getElementById(_config.layout.container);
		var d=new Date();
		var _ts=d.getTime();
		canvas.id     = "myGraph_"+_ts;
		canvas.width  = _config.layout.width;
		canvas.height = _config.layout.height;
		_container.appendChild(canvas);
		return document.getElementById("myGraph_"+_ts);
	}

	function _render(myData){
		var _myBar;
		var objDom=_createCanvasElement();
		var ctx = objDom.getContext("2d");
		var d=new Date();
		var _ts=d.getTime();		
		if (_config.layout.type==="Line"){
			_chart = new Chart(ctx).Line(myData, {
				responsive : false
			});		
		}
		if (_config.layout.type==="Bar"){
			_chart = new Chart(ctx).Bar(myData, {
				responsive : false
			});			
		}
		if (_config.layout.type==="Pie"){
			_chart = new Chart(ctx).Pie(myData, {
				responsive : false
			});			
		}		
		//then you just need to generate the legend
  		//var _legend = _chart.generateLegend();
  		//$('#'+_config.layout.container).append(_legend);
	}

	return {
		init : _init,
		render: _render,
		getChart: _getChart
	};
}

