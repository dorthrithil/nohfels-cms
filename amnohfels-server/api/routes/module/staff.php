<?php
/**
 * Created by PhpStorm.
 * User: fengelmann
 * Date: 10/04/15
 * Time: 20:37
 */


function getStaffModule($id)
{
    $connection = getConnection();
    $data = new stdClass();
    try {
        $result = $connection->query("SELECT id, title FROM staff_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            if(mysqli_num_rows($result) == 0) return false;
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $data->id = $rs['id'];
                $data->title = $rs['title'];
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $images = array();
    try {
        $result = $connection->query("SELECT image_src, caption FROM staff_module_images WHERE staff_module = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $image = new stdClass();
                $image->caption = $rs['caption'];
                $image->imageSrc = $rs['image_src'];
                $images[] = $image;
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $data->images = $images;

    $response = new stdClass();
    $response->data = $data;
    $connection->close();
    return $response;
}