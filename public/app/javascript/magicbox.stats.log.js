/**
 * Rev 0.2 Discriminamos entre TV y PC. console.log rompe en 2k11
 *
 * Modulo logs
 *
 * SELECTORTV   Constante con el selector css donde pintarmos el mensaje
 *
 * NODEBUG		Constante para no modo debug
 * EMU
 * TV
 * PC 
 *
 * LOG_V        Indica nivel verbose
 * LOG_D        Indica nivel debug
 * LOG_I        Indica nivel info
 * LOG_W        Indica nivel warning
 * LOG_E        Indica nivel error
 * 
 * DebugDevice	Dispositivo donde hacer debug, NODEBUG elimina mensajes
 * DebugLevel	Nivel de debug, si es > al nivel lo muestra
 *
 *
 *  USO:
 *      log.v("TAG","MSG");
 *      log.d("TAG","MSG");
 *      log.i("TAG","MSG");
 *      log.w("TAG","MSG");
 *      log.e("TAG","MSG");
 *
 *  PARAMETROS:
 *      TAG Identifica donde estamos
 *      MSG Mensaje a mostrar
 */

if (typeof window.magicbox === "undefined") {
	window.magicbox = {};
}
if (!magicbox.stats){
	magicbox.stats = {};
}
if (!magicbox.stats.log) {
	magicbox.stats.log = {};
}

magicbox.stats.log=function () {
	"use strict";
	var tag="log.js";
	var _app="------------APLICACIÓN CLAN HBBTV------------";
	var _version="1.2.127";
    //Código para mostrar / ocultar el log
    var _waitTime=2000;
    var _code="555";	
    var _buffer=""; //Almacena el número de página para cambio por RC
    var _waitTimer;    
    
	
    //privado
    var SELECTORTV = "asd345hyhhhcasdyhyh5656dfg";

    //Debug device
    var   NODEBUG = -1,
            EMU = 0,
            TV = 1,
            PC = 2;

    var   LOG_V = 0,
            LOG_D = 1,
            LOG_I = 2,
            LOG_W = 3,
            LOG_E = 4; 
  
    var DebugDevice = TV,
        DebugLevel = LOG_V,
        divLogElement,
        count=0;
     
    NODEBUG=-1;


    
    function _init(){
    	logger(tag,_app,LOG_I);
    	logger(tag,"Versión: "+_version,LOG_I);
    }
    
    /*
    *
    * @tag tag que identifica donde estamos
    * @msg mensaje a mstrar
    * @logLevel Determina el tipo de log
    */
    function logger(tag, msg, logLevel) {    
        try {
            var log, logColor, logHtml;
            // Nivel de debug             
            if ((logLevel >= DebugLevel) && (DebugDevice >= EMU)) {
                logColor = _getLogColor(logLevel);
                log = count + " -- "+ tag + " ---- " + msg;
                //log = _.escape(log);
                count+=1;
                //Dispositivo
                switch (DebugDevice) {
                    case EMU:
                        //alerts para emulador samsung
                        alert(log);
                        break;
                        
                    case TV:
                        //añado elemento si no existe  
                        logHtml = '<p style="color:'+ logColor +'">'+log+'</p>';
                        _muestraLogEnPantalla(logHtml);                        
                        break;

                    case PC:
                        //en tv y consola js
                        switch(logLevel){
                        case LOG_V:
                            console.log(log);
                            break;
                        case LOG_D:
                            console.debug(log);
                            break;
                        case LOG_I:
                            console.info(log);
                            break;
                        case LOG_W:
                            console.warn(log);
                            break;
                        case LOG_E:
                            console.error(log);
                            break;
                        }
                        //en pc tb mostramos en pantalla
                        //logHtml = '<p style="color:'+ logColor +'">'+log+'</p>';
                        //_muestraLogEnPantalla(logHtml); 
                        break;

                    default:
                        break;
                }                
            }
        } catch (e) {
            //dos formatos
            alert("error en util.log " + e + ":"+log);
            console.log("error en util.log" + e + ":"+log);
        }
    }

    /*
    * Pinta el log en pantalla, crea div si no existe y pinta sobre el
    */
    function _muestraLogEnPantalla(log){
        if(!divLogElement){
            _creaElementoLog();                               
        }
        divLogElement.innerHTML=log+divLogElement.innerHTML;      
    }

    /*
    *    
    */
    function _creaElementoLog(){
        try{
            var div = document.createElement("div");
            div.id=SELECTORTV;
            div.style.position="absolute";
            div.style.overflow="hidden";            
            div.style.top="0";
            div.style.right="0";
            div.style.width="30%";
            div.style.height="40%";  
            div.style.fontWeight="bold"; 
            div.style.background="#000";
            div.style.zIndex="9999";
            document.body.appendChild(div);
            divLogElement=document.getElementById(SELECTORTV);
        }catch(e){

        }
    }

    /*
    *  Funcion que retorna un string con un color u otro para los logs
    * @logLevel el nivel de log
    * @return String con color
    */
    function _getLogColor(logLevel){
        var logColor = "green";
        
        switch(logLevel){
        case LOG_D:
            logColor="blue";
            break;
        case LOG_I:
            logColor="yellow";
            break;
        case LOG_W:
            logColor="orange";
            break;
        case LOG_E:
            logColor="red";
            break;        
        }
        return logColor;
    }
    
    function _switchVisibility(){
    	if (_code===_buffer){
    		if($('#'+SELECTORTV).is(':visible')) {
    			$('#'+SELECTORTV).hide();
    		}else{
    			$('#'+SELECTORTV).show();
    		}
    	}else if (_buffer==="666"){
    		document.location.href="http://streaming.dolby.com/cobalt/index.html";
    	}
    	clearTimeout(_waitTimer);
    	_buffer="";

    }

    function _numberPressed(keyCode){
    	var _result=_buffer;
    	switch (keyCode) {
    		case VK_0:
    			_result=_result+"0";
    			break;
    		case VK_1:
    			_result=_result+"1";
    			break;
    		case VK_2:
    			_result=_result+"2";
    			break;
    		case VK_3:
    			_result=_result+"3";
    			break;
    		case VK_4:
    			_result=_result+"4";
    			break;
    		case VK_5:
    			_result=_result+"5";
    			break;
    		case VK_6:
    			_result=_result+"6";
    			break;
    		case VK_7:
    			_result=_result+"7";
    			break;
    		case VK_8:
    			_result=_result+"8";
    			break;
    		case VK_9:
    			_result=_result+"9";
    			break;
    	}
    	return _result;
    }    
    
   
    function _keyDown(keyEvent){
    	var kc=keyEvent.keyCode;
		try {			
			switch (keyEvent.keyCode) {
			
			case VK_0:
			case VK_1:
			case VK_2:
			case VK_3:
			case VK_4:
			case VK_5:
			case VK_6:
			case VK_7:
			case VK_8:
			case VK_9:					
		    	if (_waitTimer){
		    		clearTimeout(_waitTimer);
		    	}					
				//En espera para una posible segunda pulsación de tecla
				_buffer= _numberPressed(kc);
				_waitTimer=setTimeout(_switchVisibility, _waitTime);
				break;			
			
			}
		}catch(e){
			logger(tag,"Error en _keyDown" + e,LOG_E);
		}
    }
    
    //publico
    return{     
    	init:_init(),
        v:function(tag, msg){
            logger(tag,msg,LOG_V);
        },
        d:function(tag, msg){
            logger(tag,msg,LOG_D);
        },
        i:function(tag, msg){
            logger(tag,msg,LOG_I);
        },
        w:function(tag, msg){
            logger(tag,msg,LOG_W);
        },
        e:function(tag, msg){
            logger(tag,msg,LOG_E);
        },
        hideLogs: function(){
            divLogElement.style.display="none";
        },
        showLogs: function(){
            divLogElement.style.display="block";
        },
        keyDown:_keyDown
    };
}();
