<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "amnohfels");

/* change character set to utf8 */
if (!$conn->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $conn->error);
}

$result = $conn->query("SELECT content, title, position FROM sections WHERE topic = 'cafe' ORDER BY position ASC");

$outp = array();
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    $section = new stdClass();
    $section->title = $rs['title'];
    $section->content = $rs['content'];
    $outp[] = $section;
}

$conn->close();
echo json_encode($outp);
?>