<?php
header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");

include("connectDB.php");

//$result = $conn->query("SELECT content, title, position FROM sections WHERE topic = 'cafe' ORDER BY position ASC");

//$outp = array();
//while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
//    $section = new stdClass();
//    $section->title = $rs['title'];
//    $section->content = $rs['content'];
//    $outp[] = $section;
//}



$site = (isset($_GET['site'])) ? $_GET['site'] : "start";



include($site.".php");



include("disconnectDB.php");

//echo json_encode($outp);
