<?php

//TODO comment

function getTextModule($id, $connection){
    $data = new stdClass();
    try {
        $result = $connection->query("SELECT title, content FROM text_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $data->title = $rs['title'];
                $data->content = $rs['content'];
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    $response = new stdClass();
    $response->type = "text-module";
    $response->data = $data;
    return $response;
}

function getParallaxModule($id, $connection){
    $data = new stdClass();
    try {
        $result = $connection->query("SELECT title, caption, height, bg_img_src FROM parallax_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $data->title = $rs['title'];
                $data->caption = $rs['caption'];
                $data->height = $rs['height'];
                $data->bgImgSrc = $rs['bg_img_src'];
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    $response = new stdClass();
    $response->type = "parallax-module";
    $response->data = $data;
    return $response;
}

function getImageModule($id, $connection){
    $data = new stdClass();
    try {
        $result = $connection->query("SELECT id FROM image_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $image_module_id = $rs['id'];
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $images = [];
    try {
        $result = $connection->query("SELECT image_size, image_src, image_thumb_src FROM image_module_images WHERE image_module = '$image_module_id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $image = new stdClass();
                $image->imageSize = $rs['image_size'];
                $image->imageSrc = $rs['image_src'];
                $image->imageThumbSrc = $rs['image_thumb_src'];
                $images[] = $image;
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $data->images = $images;

    $response = new stdClass();
    $response->type = "image-module";
    $response->data = $data;
    return $response;
}








function scaffoldPage($topic, $connection){
    $response = [];
    try {
        $result = $connection->query("SELECT module_type, module_id FROM pages WHERE topic = '$topic' ORDER BY 'y-index' ASC");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                switch ($rs['module_type']){
                    case "text_module":
                        $response[] = getTextModule($rs['module_id'], $connection);
                        break;
                    case "parallax_module":
                        $response[] = getParallaxModule($rs['module_id'], $connection);
                        break;
                    case "image_module":
                        $response[] = getImageModule($rs['module_id'], $connection);
                        break;
                }
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    return $response;
}