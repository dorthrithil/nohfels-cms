<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "amnohfels");
$result = $conn->query("SELECT content, title, position FROM sections WHERE topic = 'cafe' ORDER BY position ASC");

$outp = array();
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    $section = new stdClass();
    $section->title = $rs['title'];
    $section->content = $rs['title'];
    $outp[] = $section;
}

$conn->close();

echo json_encode($outp);
?>