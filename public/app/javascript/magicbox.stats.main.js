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
		
(function ($,config,log) { 
	"use strict";
	var _enviroment = "";
	var TAG = "main.js"; //TAG para el las trazas del log

	function _onLoad(){
		_bindEvent(document,"click");
		magicbox.stats.connects.load();
	}    
	
	function _bindEvent(container,evnt){
        try {
        	container.addEventListener(evnt, _eventFlow, false);
        } catch(e) {
        	log.e(TAG, "Error en _bindEvent " + e);
        }		
	}

	function _eventFlow(e){
	    var target = e && e.target || event.srcElement;
	    var _id = target.getAttribute('id')
		try {			
			switch (_id) {
				case "portalOpenings":
					magicbox.stats.connects.load();
					break;
				case "portalDownloads":
					magicbox.stats.downloads.load();
					break;			
				case "portalExecutions":
					magicbox.stats.executions.load();
					break;
				case "portalDevices":
					magicbox.stats.devices.load();
					break;					
			}
		} catch(e){
			log.e(TAG,"Error en _eventFlow "+ e);
		}
	}
	
	

	/**********************************
	 *
	 * Mï¿½todos publicos
	 *
	 **********************************/
	return {
		onLoad : _onLoad
		};
}($,magicbox.stats.config, magicbox.stats.log))
);