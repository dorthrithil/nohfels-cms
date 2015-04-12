<?php
/**
 * Created by PhpStorm.
 * User: fengelmann
 * Date: 10/04/15
 * Time: 20:28
 */


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
        $tags = array();
        try {
            $result = $connection->query("SELECT tag FROM instagram_module_tags WHERE instagram_module = '$id'");
            if (!$result) {
                throw new Exception($connection->error);
            } else {
                while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                    $tags[] = $rs['tag'];
                }
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        }
        $data->filterForTags = $tags;
    }

    $response = new stdClass();
    $response->data = $data;
    $connection->close();
    return $response;
}