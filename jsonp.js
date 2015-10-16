/*	jsonp.js 2015/10/16
	Author:		Yaze Lin 	 
	Email:		yaze.lin.j303@gmail.com , lin@yaze.tw
	Facebook:	https://fb.me/yaze.lin.gm
	Github:		http://yazelin.github.io
*/

var jsonp = (function(){
	var _jsonp = {};

	_jsonp.send = function(options) {
		var url = options.url ,
		get_token = options.token || 'callback',			//callbackName's $_GET['key']
		callback = options.callback || 'jsonpcallback' + Math.random().toString(36).substring(2) ,//hash callback function name
		on_success = options.onSuccess || function(){} ,	//onSuccess
		on_timeout = options.onTimeout || function(){} ,	//onTimeout
		timeout = options.timeout || 10 					// default timeout 10 sec

		var timeout_trigger = window.setTimeout(function(){
			window[callback] = function(){};				//unset callback
			on_timeout();
		}, timeout * 1000);

		//override callback function || temp callback function
		window[callback] = function(data){
			window.clearTimeout(timeout_trigger);			//clear timeout_trigger
			on_success(data);								//feed json data
		}

		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.async = true;
		script.src = url + (url.indexOf( '?' ) + 1 ? '&' : '?') + get_token + '=' + callback;;
		
		script.onload = function () {
			this.remove();// After the script is loaded remove itself
		};

		//load script
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	return _jsonp;
})();