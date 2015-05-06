<?php

/**
 * swaps y_index of upper with the module listed below it
 */
function swapWithLowerModule($upper, $topic){
    $connection = getConnection();
    $lower = $upper + 1;
    try {
        $result = $connection->query("UPDATE pages SET y_index = -1 WHERE y_index = '$upper' AND topic = '$topic'");
        if (!$result) {
            throw new Exception($connection->error);
        }
        $result = $connection->query("UPDATE pages SET y_index = '$upper' WHERE y_index = '$lower' AND topic = '$topic'");
        if (!$result) {
            throw new Exception($connection->error);
        }
        $result = $connection->query("UPDATE pages SET y_index = '$lower' WHERE y_index = -1 AND topic = '$topic'");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    $connection->close();
}