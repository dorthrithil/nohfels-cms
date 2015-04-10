<?php
/**
 * Created by PhpStorm.
 * User: fengelmann
 * Date: 10/04/15
 * Time: 15:54
 */

function getModuleTypes()
{
    $connection = getConnection();
    $response = array();
    try {
        $result = $connection->query("SELECT name, type FROM module_types ORDER BY name ASC");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $type = new stdClass();
                $type->name = $rs['name'];
                $type->typeId = $rs['type']; //TODO change in db to typeId
                $response[] = $type;
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    $connection->close();
    return $response;
}