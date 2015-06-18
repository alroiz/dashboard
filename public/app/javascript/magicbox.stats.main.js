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
	var d = new Date();
    
	/**
	 * Función privada para inicializar la aplicación 
	 * @method _onLoad
	 */	
	function _onLoad() {		
		try {			
					    
			magicbox.stats.main.viewChartsConnectsDays();
			magicbox.stats.main.viewChartsConnectsMonth();
			magicbox.stats.main.viewChartsConnectsYear();    		
    		
			//domainTransformer.getConnects(config.URL_CONNECTS, data, magicbox.stats.main.onLoadConnects);
		} catch (e) {
			log.e(TAG, "Error en _onLoad " + e);
		}
	}
	
	 function _onLoadDownloads() {
	        try {
	        	magicbox.stats.main.viewChartsDownloadsDays();
				magicbox.stats.main.viewChartsDownloadsMonth();
				magicbox.stats.main.viewChartsDownloadsYear();   
	        } catch(e) {
	        	log.e(TAG, "Error en _onLoadDownloads " + e);
	        }
	    }
	 
	 function _viewChartsConnectsDays() {
	        try {
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
	        	//Pintar Connects
	        	var myChart=new magicbox.magicChart();
        		myChart.init(myConfig);
        		
	        } catch(e) {
	        	log.e(TAG, "Error en _viewChartsConnectsDays " + e);
	        }
	    }
	 
	 function _viewChartsConnectsMonth() {
	        try {
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
	        	//Pintar Connects Month
	        	var myChart2=new magicbox.magicChart();
        		myChart2.init(myConfig2);
        		
	        } catch(e) {
	        	log.e(TAG, "Error en _viewChartsConnectsMonth " + e);
	        }
	    }
	 
	 function _viewChartsConnectsYear() {
	        try {
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
	        	//Pintar Connects Year
	        	var myChart3=new magicbox.magicChart();
        		myChart3.init(myConfig3);
        		
	        } catch(e) {
	        	log.e(TAG, "Error en _viewChartsConnectsYear " + e);
	        }
	    }
	    
	 
	 
	 function _viewChartsDownloadsDays() {
	        try {
	        	var myConfig={
	    		    	"conn":{
	    		    		"url":"http://192.168.1.146:3002/api/v1/getDownloads",
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
	        	//Pintar Connects
	        	var myChart=new magicbox.magicChart();
	        	myChart.init(myConfig);
     		
	        } catch(e) {
	        	log.e(TAG, "Error en _viewChartsConnectsDays " + e);
	        }
	    }
	 
	 function _viewChartsDownloadsMonth() {
	        try {
	        	var myConfig2={
	    		    	"conn":{
	    		    		"url":"http://192.168.1.146:3002/api/v1/getDownloads",
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
	        	//Pintar Connects Month
	        	var myChart2=new magicbox.magicChart();
	        	myChart2.init(myConfig2);
     		
	        } catch(e) {
	        	log.e(TAG, "Error en _viewChartsConnectsMonth " + e);
	        }
	    }
	 
	 function _viewChartsDownloadsYear() {
	        try {
	        	var myConfig3={
	    		    	"conn":{
	    		    		"url":"http://192.168.1.146:3002/api/v1/getDownloads",
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
	        	//Pintar Connects Year
	        	var myChart3=new magicbox.magicChart();
	        	myChart3.init(myConfig3);
     		
	        } catch(e) {
	        	log.e(TAG, "Error en _viewChartsConnectsYear " + e);
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
		viewChartsConnectsDays: _viewChartsConnectsDays,
		viewChartsConnectsMonth: _viewChartsConnectsMonth,
		viewChartsConnectsYear: _viewChartsConnectsYear,
		viewChartsDownloadsDays: _viewChartsDownloadsDays,
		viewChartsDownloadsMonth: _viewChartsDownloadsMonth,
		viewChartsDownloadsYear: _viewChartsDownloadsYear
		};
}($,magicbox.stats.config,magicbox.stats.domainTransformer, magicbox.stats.log))
);