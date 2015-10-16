<?php
	$data = json_encode(array("example" => "jsonp"));
	 
	//json 回應 
	if (empty($_GET['callback'])){
		header("Content-type: application/json; charset=utf-8"); 
		echo $data;
	//jsonp 格式回傳
	}else{
		header("text/javascript; charset=utf-8");
		echo $_GET['callback'].'('.$data.')';	
	}
?>