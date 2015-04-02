<?php

//TODO comment

function getTextModule($id, $connection)
{
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

function getParallaxModule($id, $connection)
{
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

function getImageModule($id, $connection)
{
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

function getContactModule($id, $connection)
{
    $data = new stdClass();
    try {
        $result = $connection->query("SELECT topic FROM contact_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $data->topic = $rs['topic'];
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    $response = new stdClass();
    $response->type = "contact-module";
    $response->data = $data;
    return $response;
}

function getInstagramModule($id, $connection)
{
    $data = new stdClass();
    try {
        $result = $connection->query("SELECT max_photos, filter_out_tags, filter_for_tags FROM instagram_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $data->maxPhotos = $rs['max_photos'];
                $data->filterOutTags = tinyIntToBoolean($rs['filter_out_tags']);
                $data->filterForTags = tinyIntToBoolean($rs['filter_for_tags']);
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    if ($data->filterForTags) {
        $tags = [];
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
    $response->type = "instagram-module";
    $response->data = $data;
    return $response;
}

function getStaffModule($id, $connection)
{
    $data = new stdClass();
    try {
        $result = $connection->query("SELECT title FROM staff_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $data->title = $rs['title'];
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $images = [];
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
    $response->type = "staff-module";
    $response->data = $data;
    return $response;
}

function scaffoldPage($topic, $connection)
{
    $response = [];
    try {
        $result = $connection->query("SELECT module_type, module_id FROM pages WHERE topic = '$topic' ORDER BY 'y-index' ASC");
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
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    return $response;
}