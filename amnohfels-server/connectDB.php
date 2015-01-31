<?php
/* connect DB */
$conn = new mysqli("localhost", "root", "", "amnohfels");

/* change character set to utf8 */
if (!$conn->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $conn->error);
}
?>