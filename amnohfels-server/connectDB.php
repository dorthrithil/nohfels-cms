<?php
/* connect DB */
$connection = new mysqli("localhost", "root", "", "amnohfels");

/* change character set to utf8 */
if (!$connection->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $connection->error);
}