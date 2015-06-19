<<<<<<< HEAD
if (typeof window.magicbox === "undefined") {
  window.magicbox = {};
}
if (!magicbox.stats){
  magicbox.stats = {};
}
if (!magicbox.stats.domainTransformer){
  magicbox.stats.domainTransformer = {};
}
magicbox.stats.domainTransformer = $.extend(magicbox.stats.domainTransformer,
(function (config,dataService,log) {
	"use strict";
	var TAG="domainTransformer";
	
	function _getConnects(url, data, callback) {
		dataService.getConnectsJSON(
    			url,
				data,
				_parserConnects(callback)
				);
	}
	
    function _parserConnects(callback) {
    	return function (json){
    		callback(json);
    	};
    } 	
    
    return {
    	getConnects: _getConnects
    };
}(magicbox.stats.config,magicbox.stats.dataService,magicbox.stats.log))
=======
if (typeof window.magicbox === "undefined") {
  window.magicbox = {};
}
if (!magicbox.stats){
  magicbox.stats = {};
}
if (!magicbox.stats.domainTransformer){
  magicbox.stats.domainTransformer = {};
}
magicbox.stats.domainTransformer = $.extend(magicbox.stats.domainTransformer,
(function (config,dataService,log) {
	"use strict";
	var TAG="domainTransformer";
	
	function _getConnects(url, data, callback) {
		dataService.getConnectsJSON(
    			url,
				data,
				_parserConnects(callback)
				);
	}
	
    function _parserConnects(callback) {
    	return function (json){
    		callback(json);
    	};
    } 	
    
    return {
    	getConnects: _getConnects
    };
}(magicbox.stats.config,magicbox.stats.dataService,magicbox.stats.log))
>>>>>>> 4fc04d975638861ab64f66e829d1e4e96e75639e
);