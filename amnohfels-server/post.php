<?php
/**
 * Created by PhpStorm.
 * User: fengelmann
 * Date: 03/04/15
 * Time: 22:48
 */

function swapModules($connection, $upper){
    $lower = $upper + 1;
    try {
        $result = $connection->query("UPDATE pages SET y_index = -1 WHERE y_index = '$upper'");
        if (!$result) {
            throw new Exception($connection->error);
        }
        $result = $connection->query("UPDATE pages SET y_index = '$upper' WHERE y_index = '$lower'");
        if (!$result) {
            throw new Exception($connection->error);
        }
        $result = $connection->query("UPDATE pages SET y_index = '$lower' WHERE y_index = -1");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    return;
}

function createNewTextModule($connection, $title, $content){

}