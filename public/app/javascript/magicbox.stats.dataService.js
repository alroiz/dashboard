<<<<<<< HEAD
if (typeof window.magicbox === "undefined") {
  window.magicbox = {};
}
if (!magicbox.stats){
  magicbox.stats = {};
}
if (!magicbox.stats.dataService) {
  magicbox.stats.dataService = {};
}

magicbox.stats.dataService = $.extend(magicbox.stats.dataService,
(function ($,log) {
	"use strict";
    var TAG="dataService";
     
    function _getConnectsJSON(url,data,callback){
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
    return {
    	getConnectsJSON: _getConnectsJSON
    };

}($,magicbox.stats.log))
=======
if (typeof window.magicbox === "undefined") {
  window.magicbox = {};
}
if (!magicbox.stats){
  magicbox.stats = {};
}
if (!magicbox.stats.dataService) {
  magicbox.stats.dataService = {};
}

magicbox.stats.dataService = $.extend(magicbox.stats.dataService,
(function ($,log) {
	"use strict";
    var TAG="dataService";
     
    function _getConnectsJSON(url,data,callback){
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
    return {
    	getConnectsJSON: _getConnectsJSON
    };

}($,magicbox.stats.log))
>>>>>>> 4fc04d975638861ab64f66e829d1e4e96e75639e
);