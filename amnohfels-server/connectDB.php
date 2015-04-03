<?php
/* connect DB */
$connection = new mysqli("rdbms.strato.de", "U2089315", "konradfl123!", "DB2089315") or die("Error " . mysqli_error($connection));;

/* change character set to utf8 */
if (!$connection->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $connection->error);
}