<?php

function createParallaxModule($page, $title, $caption, $heightNum, $heightUnit, $bgImgSrc, $bgImgThumbSrc)
{
    $connection = getConnection();

    //create new staff module
    try {
        $result = $connection->query("INSERT INTO parallax_modules (title, caption, height_num, height_unit, bg_img_src, bg_img_thumb_src)
                                      VALUES  ('$title', '$caption', '$heightNum', '$heightUnit', '$bgImgSrc', '$bgImgThumbSrc')");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //get id of created module
        $module_id = -1;
        $result = $connection->query("SELECT id FROM parallax_modules GROUP BY id HAVING MAX(id)");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $module_id = $rs['id'];
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
        $result = $connection->query("INSERT INTO pages (topic, module_type_id, module_id, y_index) VALUES  ('$page', 'parallax', '$module_id', '$y_index')");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function getParallaxModule($id)
{
    $connection = getConnection();
    $data = new stdClass();
    try {
        $result = $connection->query("SELECT id, title, caption, height_num, height_unit, bg_img_src, bg_img_thumb_src FROM parallax_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            if (mysqli_num_rows($result) == 0) return false;
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $data->id = $rs['id'];
                $data->title = $rs['title'];
                $data->caption = $rs['caption'];
                $data->heightNum = $rs['height_num'];
                $data->heightUnit = $rs['height_unit'];
                $data->bgImgSrc = $rs['bg_img_src'];
                $data->bgImgThumbSrc = $rs['bg_img_thumb_src'];
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    $response = new stdClass();
    $response->data = $data;
    $connection->close();
    return $response;
}

function updateParallaxModule($id, $title, $caption, $heightNum, $heightUnit, $bgImgSrc, $bgImgThumbSrc)
{
    $connection = getConnection();

    try {
        //update module
        $result = $connection->query("UPDATE parallax_modules SET title = '$title', caption = '$caption', height_num = '$heightNum', height_unit = '$heightUnit', bg_img_src = '$bgImgSrc', bg_img_thumb_src = '$bgImgThumbSrc' WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function deleteParallaxModule($id)
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
        $result = $connection->query("DELETE FROM pages WHERE module_id = '$id' AND module_type_id = 'parallax'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //update y_indexes
        $result = $connection->query("UPDATE pages SET y_index = y_index - 1 WHERE y_index > '$y_index'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //delete module
        $result = $connection->query("DELETE FROM parallax_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //TODO (1.0.1) housekeeping: delete now unused images from server
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function uploadParallaxImage()
{
    global $conf_max_image_filesize;

    $image_typemap = array(
        'image/jpeg' => '.jpg',
        'image/gif' => '.gif',
        'image/png' => '.png',
        'image/bmp' => '.bmp'
    );

    if (empty($_FILES)) {
        header('HTTP/ 400 No file provided');
        echo 'No file provided!';
    } elseif (!validate_mime_type_image($_FILES)) {
        header('HTTP/ 400 Invalid filetype');
        echo 'Invalid filetype!';
    } elseif ($conf_max_image_filesize != 0 && $_FILES['file']['size'] > $conf_max_image_filesize) {
        header('HTTP/ 400 Filesize too high');
        echo 'Filesize too high!';
    } else {
        $tempPath = $_FILES['file']['tmp_name'];
        $accessPath = 'uploads' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'parallax' . DIRECTORY_SEPARATOR . 'parallax_' . uniqid() . $image_typemap[$_FILES['file']['type']];
        $uploadPath = dirname(dirname(dirname(dirname(__FILE__)))) . DIRECTORY_SEPARATOR . $accessPath; //TODO (1.0.1) refactoring: solve that dirname rubbish with a global image upload function
        move_uploaded_file($tempPath, $uploadPath);


        //imagine processing

        //create image with width 1000px
        $imagine = new Imagine\Gd\Imagine();
        $image = $imagine->open($uploadPath);
        $image->resize($image->getSize()->widen(1000))
            ->save($uploadPath);


        //create thumbnail
        $uploadPathPieces = explode('.', $uploadPath);
        $thumbUploadPath = $uploadPathPieces[0] . '_thumb.' . $uploadPathPieces[1];
        $accessPathPieces = explode('.', $accessPath);
        $thumbAccessPath = $accessPathPieces[0] . '_thumb.' . $accessPathPieces[1];
        $size = new Imagine\Image\Box(300, 200);
        $mode = Imagine\Image\ImageInterface::THUMBNAIL_OUTBOUND;
        $image->thumbnail($size, $mode)
            ->save($thumbUploadPath);


        $answer = array(
            'answer' => 'File transfer completed successfully',
            'path' => $accessPath,
            'thumbPath' => $thumbAccessPath
        );
        jsonResponse($answer);
    }
}