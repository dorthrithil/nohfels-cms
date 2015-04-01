<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("connectDB.php");

include("queryProcessers.php");

$topic = $_GET['topic'];

$response = scaffoldPage($topic, $connection);

include("disconnectDB.php");

echo json_encode($response);













































//
//$site = (isset($_GET['site'])) ? $_GET['site'] : "start";
//
//
//
//include($site.".php");