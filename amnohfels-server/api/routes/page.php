<?php

/**
 * @description: returns an object containing data to render a page
 * @params:
 *  $topic: the pages topic (corr. to angular route)
 */
function getPage($topic)
{
    $connection = getConnection();
    $response = array();
    try {
        $result = $connection->query("SELECT module_type_id, module_id, name
                                      FROM (pages LEFT JOIN module_types ON (pages.module_type_id = module_types.id))
                                      WHERE topic = '$topic' ORDER BY y_index ASC");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                switch ($rs['module_type_id']) {
                    case "text":
                        $response[] = getTextModule($rs['module_id']);
                        break;
                    case "parallax":
                        $response[] = getParallaxModule($rs['module_id']);
                        break;
                    case "image":
                        $response[] = getImageModule($rs['module_id']);
                        break;
                    case "contact":
                        $response[] = getContactModule($rs['module_id']);
                        break;
                    case "instagram":
                        $response[] = getInstagramModule($rs['module_id']);
                        break;
                    case "staff":
                        $response[] = getStaffModule($rs['module_id']);
                        break;
                }
                $type = new stdClass();
                $type->name = $rs['name'];
                $type->id = $rs['module_type_id'];
                $response[sizeof($response) - 1]->type = $type;
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    $connection->close();
    return $response;
}

function getTopics()
{
    $connection = getConnection();
    $response = array();
    try {
        $result = $connection->query("SELECT id, name FROM topics ORDER BY position, name ASC");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $topic = new stdClass();
                $topic->name = $rs['name'];
                $topic->id = $rs['id'];
                $response[] = $topic;
                //TODO implement functionality for position and section table fields
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    $connection->close();
    return $response;
}