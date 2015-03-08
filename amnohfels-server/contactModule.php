<?php

$errors = array();
$data = array();

$random = rand(0,3);
switch($random){
    case 0:
        header("HTTP/1.0 205 Reset Content");
        break;
    case 1:
        header("HTTP/1.0 400 Bad Request");
        break;
    case 2:
        header("HTTP/1.0 408 Request Timeout");
        break;
    case 3:
        header("HTTP/1.0 500 Internal Server Error");
        break;
}

echo json_encode($data);