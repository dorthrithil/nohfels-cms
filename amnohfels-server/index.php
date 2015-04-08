<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include("util.php");

include("connectDB.php");

include("get.php");

include("post.php");

$q = $_GET['q'];
if (!isset($q)) $q = $_POST['q'];

switch($q){
    case "page":
        $topic = $_GET['topic'];
        $response = getPage($connection, $topic);
        break;
    case "module_types":
        $response = getModuleTypes($connection);
        break;
    case "swap_modules":
        $upper = $_GET['upper'];
        $response = swapModules($connection, $upper);
        break;
    default:
        $response = "";
}

include("disconnectDB.php");

echo json_encode($response);