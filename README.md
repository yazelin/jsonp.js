#jsonp.js

jsonp輕量級函式套件
JSONP cross-domain ajax call.

###使用方式
####Client

	//client.html
	//call jsonp
	jsonp.send({
		url:'http://localhost/server_jsonp.php',
		onSuccess: callbacklog
	});
	
	//Callback Here
	function callbacklog(json){
		console.log(json);
	}

####Server

	//Server_jsonp.php
	//一些處理程式後取得的資料
	$somedata = json_encode(array("example" => "jsonp"));
	//預設是$_GET['callback'])取得callback的Function名稱
	//判斷json 回應 
	if (empty($_GET['callback'])){
		header("Content-type: application/json; charset=utf-8"); 
		echo $somedata;
	//jsonp 格式回傳
	}else{
		header("text/javascript; charset=utf-8");
		echo $_GET['callback'].'('.$somedata.')';	
	}	
	
----
###其他參數
####Client

	//call jsonp
	jsonp.send({
		url : 'http://localhost/server_jsonp.php' ,	//server_jsonp.php
		token : 'foo' ,								//php can $_GET['foo']
		callback : 'sometext',						//this is a temp callbackName, default random hash word
		onSuccess : successHandle ,				//onSuccess trigger this function
		onTimeout : timeoutHandle ,				//onTimeout trigger this function
		timeout : 5									// settimout 5 sec ,default timeout 10 sec
	});
	
####Server

	//Server_jsonp.php
	//一些處理程式後取得的資料
	$somedata = json_encode(array("example" => "jsonp"));
	//預設是$_GET['callback'])取得callback的Function名稱若有修改了token，則依token修改
	//上例是 $_GET['foo'])
	//json 回應 
	if (empty($_GET['foo'])){
		header("Content-type: application/json; charset=utf-8"); 
		echo $somedata;
	//jsonp 格式回傳
	}else{
		header("text/javascript; charset=utf-8");
		echo $_GET['foo'].'('.$somedata.')';	
	}


###注意事項
* 不建議修改token，使用預設的"callback"名即可
* url上可帶其他參數，在server端仍可用GET方式取得，不會影響jsonp的callback
* 目前不支援Post
