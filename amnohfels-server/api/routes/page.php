<?php
/**
 * Created by PhpStorm.
 * User: fengelmann
 * Date: 10/04/15
 * Time: 15:26
 */


function getPage($topic)
{
    $connection = getConnection();
    $response = array();
    try {
        $result = $connection->query("SELECT module_type, module_id, name
                                      FROM (pages LEFT JOIN module_types ON (pages.module_type = module_types.type))
                                      WHERE topic = '$topic' ORDER BY y_index ASC");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                switch ($rs['module_type']) {
                    case "text_module":
                        $response[] = getTextModule($rs['module_id'], $connection);
                        break;
                    case "parallax_module":
                        $response[] = getParallaxModule($rs['module_id'], $connection);
                        break;
                    case "image_module":
                        $response[] = getImageModule($rs['module_id'], $connection);
                        break;
                    case "contact_module":
                        $response[] = getContactModule($rs['module_id'], $connection);
                        break;
                    case "instagram_module":
                        $response[] = getInstagramModule($rs['module_id'], $connection);
                        break;
                    case "staff_module":
                        $response[] = getStaffModule($rs['module_id'], $connection);
                        break;
                }
                $type = new stdClass();
                $type->name = $rs['name'];
                $type->typeId = $rs['module_type']; //TODO change in db to typeId
                $response[sizeof($response) - 1]->type = $type;
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    $connection->close();
    return $response;
}