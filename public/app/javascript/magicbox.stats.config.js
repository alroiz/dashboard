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
if (!magicbox.stats){
	magicbox.stats = {};
}
if (!magicbox.stats.config) {
	magicbox.stats.config = {};
}

magicbox.stats.config=function () {

"use strict";
	
	var _URL_CONNECTS="http://dashboardcvte.herokuapp.com/api/v1/getConnects";

	return {
		URL_CONNECTS : _URL_CONNECTS
	};
}()
