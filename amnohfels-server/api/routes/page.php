<?php

/**
 * @description: returns an object containing data to render a page
 * @params:
 *  $topic: the pages topic (corr. to angular route)
 */
function getPage($topic)
{
    $connection = getConnection();
    $response = new stdClass();
    $modules = array();
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
                        $modules[] = getTextModule($rs['module_id']);
                        break;
                    case "parallax":
                        $modules[] = getParallaxModule($rs['module_id']);
                        break;
                    case "gallery":
                        $modules[] = getGalleryModule($rs['module_id']);
                        break;
                    case "contact":
                        $modules[] = getContactModule($rs['module_id']);
                        break;
                    case "instagram":
                        $modules[] = getInstagramModule($rs['module_id']);
                        break;
                    case "staff":
                        $modules[] = getStaffModule($rs['module_id']);
                        break;
                    case "youtube":
                        $modules[] = getYoutubeModule($rs['module_id']);
                        break;
                    case "maps":
                        $modules[] = getMapsModule($rs['module_id']);
                        break;
                    case "infotile":
                        $modules[] = getInfotileModule($rs['module_id']);
                        break;
                }
                $type = new stdClass();
                $type->name = $rs['name'];
                $type->id = $rs['module_type_id'];
                $modules[sizeof($modules) - 1]->type = $type;
            }
        }
        $result = $connection->query("SELECT name FROM topics WHERE id = '$topic'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $response->title = $rs['name'];
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    $connection->close();
    $response->modules = $modules;
    return $response;
}

function getTopics()
{
    $connection = getConnection();
    $response = new stdClass();
    $head = array();
    $foot = array();
    try {
        $result = $connection->query("SELECT id, name, position FROM topics WHERE section = 'head' ORDER BY position ASC");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $topic = new stdClass();
                $topic->name = $rs['name'];
                $topic->id = $rs['id'];
                $topic->position = $rs['position'];
                $head[] = $topic;
            }
        }
        $result = $connection->query("SELECT id, name, position FROM topics WHERE section = 'foot' ORDER BY position ASC");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $topic = new stdClass();
                $topic->name = $rs['name'];
                $topic->id = $rs['id'];
                $topic->position = $rs['position'];
                $foot[] = $topic;
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    $response->head = $head;
    $response->foot = $foot;
    $connection->close();
    return $response;
}