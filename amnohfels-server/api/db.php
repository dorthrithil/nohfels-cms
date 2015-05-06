<?php
function getConnection()
{

    global $conf_mysql_host, $conf_mysql_username , $conf_mysql_password , $conf_mysql_database;

    /* connect DB */
    $connection = new mysqli($conf_mysql_host, $conf_mysql_username, $conf_mysql_password, $conf_mysql_database) or die("Error " . mysqli_error($connection));;

    /* change character set to utf8 */
    if (!$connection->set_charset("utf8")) {
        printf("Error loading character set utf8: %s\n", $connection->error);
    }

    return $connection;
}