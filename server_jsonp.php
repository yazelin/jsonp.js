<?php
	$data = json_encode(array("example" => "jsonp"));
	 
	//json �^�� 
	if (empty($_GET['callback'])){
		header("Content-type: application/json; charset=utf-8"); 
		echo $data;
	//jsonp �榡�^��
	}else{
		header("text/javascript; charset=utf-8");
		echo $_GET['callback'].'('.$data.')';	
	}
?>