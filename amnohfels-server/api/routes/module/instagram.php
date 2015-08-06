<?php
/**
 * Created by PhpStorm.
 * User: fengelmann
 * Date: 10/04/15
 * Time: 20:28
 */

function createInstagramModule($page, $max_photos, $title, $filter_out_tags, $filter_for_tags, $tags)
{
    $connection = getConnection();

    //create new intstagram module
    try {
        $result = $connection->query("INSERT INTO instagram_modules (max_photos, title, filter_out_tags, filter_for_tags)
                                      VALUES  ('$max_photos', '$title', '$filter_out_tags', '$filter_for_tags')");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //get id of created module
        $module_id = -1;
        $result = $connection->query("SELECT id FROM instagram_modules GROUP BY id HAVING MAX(id)");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $module_id = $rs['id'];
            }
        }

        //write tags
        foreach($tags as $tag){
            $result = $connection->query("INSERT INTO instagram_module_tags (instagram_module, tag) VALUES  ('$module_id', '$tag')");
            if (!$result) {
                throw new Exception($connection->error);
            }
        }

        //get y_index of new module
        $y_index = -1;
        $result = $connection->query("SELECT y_index FROM pages WHERE topic = '$page' ORDER BY y_index DESC LIMIT 1");
        if (!$result) {
            throw new Exception($connection->error);
        } else if (mysqli_num_rows($result) == 0) {
            $y_index = 0;
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $y_index = $rs['y_index'] + 1;
            }
        }

        //register module for page
        $result = $connection->query("INSERT INTO pages (topic, module_type_id, module_id, y_index) VALUES  ('$page', 'instagram', '$module_id', '$y_index')");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function getInstagramModule($id)
{
    $connection = getConnection();
    $data = new stdClass();
    try {
        $result = $connection->query("SELECT id, max_photos, filter_out_tags, filter_for_tags, title FROM instagram_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            if(mysqli_num_rows($result) == 0) return false;
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $data->id = $rs['id'];
                $data->maxPhotos = $rs['max_photos'];
                $data->filterOutTags = tinyIntToBoolean($rs['filter_out_tags']);
                $data->filterForTags = tinyIntToBoolean($rs['filter_for_tags']);
                $data->title = $rs['title'];
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    if ($data->filterForTags) {
        $data->tags = array();
        try {
            $result = $connection->query("SELECT tag FROM instagram_module_tags WHERE instagram_module = '$id'");
            if (!$result) {
                throw new Exception($connection->error);
            } else {
                while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                    $data->tags[] = $rs['tag'];
                }
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    $response = new stdClass();
    $response->data = $data;
    $connection->close();
    return $response;
}

function updateInstagramModule($id, $title, $max_photos, $filter_out_tags, $filter_for_tags, $tags)
{
    $connection = getConnection();

    try {
        //update module
        $result = $connection->query("UPDATE instagram_modules SET title = '$title', max_photos = '$max_photos', filter_out_tags = '$filter_out_tags', filter_for_tags = '$filter_for_tags' WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //update tags (lazy)
        $result = $connection->query("DELETE FROM instagram_module_tags WHERE instagram_module = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }
        foreach($tags as $tag){
            $result = $connection->query("INSERT INTO instagram_module_tags (instagram_module, tag) VALUES  ('$id', '$tag')");
            if (!$result) {
                throw new Exception($connection->error);
            }
        }


    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function deleteInstagramModule($id)
{
    $connection = getConnection();

    try {
        //get y_index of old module
        $y_index = -1;
        $result = $connection->query("SELECT y_index FROM pages WHERE module_id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $y_index = $rs['y_index'];
            }
        }

        //delete pages entry
        $result = $connection->query("DELETE FROM pages WHERE module_id = '$id' AND module_type_id = 'instagram'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //update y_indexes
        $result = $connection->query("UPDATE pages SET y_index = y_index - 1 WHERE y_index > '$y_index'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //delete module
        $result = $connection->query("DELETE FROM instagram_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //delete tags
        $result = $connection->query("DELETE FROM instagram_module_tags WHERE instagram_module = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}