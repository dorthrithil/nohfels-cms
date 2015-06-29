<?php
/**
 * Created by PhpStorm.
 * User: fengelmann
 * Date: 10/04/15
 * Time: 20:25
 */

//TODO (1.0.1) refactoring: refactor image to gallery in database...

function createGalleryModule($page, $title, $images)
{
    $connection = getConnection();

    //create new image module
    try {
        $result = $connection->query("INSERT INTO image_modules (title) VALUES  ('$title')");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //get id of created module
        $module_id = -1;
        $result = $connection->query("SELECT id FROM image_modules GROUP BY id HAVING MAX(id)");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $module_id = $rs['id'];
            }
        }

        //write images
        foreach ($images as $key=>$image) {
            $image_src = $image['imageSrc'];
            $image_thumb_src = $image['imageThumbSrc'];
            $image_thumb_square_src = $image['imageThumbSquareSrc'];
            $image_size = $image['imageSize'];
            // based on flag, decide to save or discard caption
            $image_caption = ($image['hasImageCaption']) ? $image['imageCaption'] : '';
            $result = $connection->query("INSERT INTO image_module_images (image_src, image_thumb_src, image_thumb_square_src, image_size, image_module, image_position, image_caption) VALUES  ('$image_src', '$image_thumb_src', '$image_thumb_square_src', '$image_size', '$module_id', '$key', '$image_caption')");
            if (!$result) {
                throw new Exception($connection->error);
            }
        }

        //get y_index of new module
        $y_index = -1;
        $result = $connection->query("SELECT y_index FROM pages WHERE topic = '$page' GROUP BY y_index HAVING MAX(y_index)");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $y_index = $rs['y_index'] + 1;
            }
        }

        //register module for page
        $result = $connection->query("INSERT INTO pages (topic, module_type_id, module_id, y_index) VALUES  ('$page', 'image', '$module_id', '$y_index')");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function getGalleryModule($id)
{
    $connection = getConnection();
    $data = new stdClass();
    try {
        $result = $connection->query("SELECT id, title FROM image_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            if (mysqli_num_rows($result) == 0) return false;
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
        $result = $connection->query("SELECT image_size, image_src, image_thumb_src, image_thumb_square_src, image_caption FROM image_module_images WHERE image_module = '$data->id' ORDER BY image_position");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $image = new stdClass();
                $image->imageSize = $rs['image_size'];
                $image->imageSrc = $rs['image_src'];
                $image->imageThumbSrc = $rs['image_thumb_src'];
                $image->imageThumbSquareSrc = $rs['image_thumb_square_src'];
                $image->imageCaption = $rs['image_caption'];
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

function updateGalleryModule($id, $title, $images)
{
    $connection = getConnection();

    try {
        //update module
        $result = $connection->query("UPDATE image_modules SET title = '$title' WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //update images (lazy)
        $result = $connection->query("DELETE FROM image_module_images WHERE image_module = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //write images
        foreach ($images as $key=>$image) {
            $image_src = $image['imageSrc'];
            $image_thumb_src = $image['imageThumbSrc'];
            $image_thumb_square_src = $image['imageThumbSquareSrc'];
            $image_size = $image['imageSize'];
            // based on flag, decide to save or discard caption
            $image_caption = ($image['hasImageCaption']) ? $image['imageCaption'] : '';
            $result = $connection->query("INSERT INTO image_module_images (image_src, image_thumb_src, image_thumb_square_src, image_size, image_module, image_position, image_caption) VALUES  ('$image_src', '$image_thumb_src', '$image_thumb_square_src', '$image_size', '$id', '$key', '$image_caption')");
            if (!$result) {
                throw new Exception($connection->error);
            }
        }


    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function deleteGalleryModule($id)
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
        $result = $connection->query("DELETE FROM pages WHERE module_id = '$id' AND module_type_id = 'image'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //update y_indexes
        $result = $connection->query("UPDATE pages SET y_index = y_index - 1 WHERE y_index > '$y_index'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //delete module
        $result = $connection->query("DELETE FROM image_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //delete images
        $result = $connection->query("DELETE FROM image_module_images WHERE image_module = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //TODO delete now unused images from server
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function uploadGalleryImage()
{
    $image_typemap = array(
        'image/jpeg' => '.jpg',
        'image/gif' => '.gif',
        'image/png' => '.png',
        'image/bmp' => '.bmp'
    );

    if (empty($_FILES)) {
        header('HTTP/ 400 No file provided');
        echo 'No file provided!';
    } else if (!validate_mime_type_image($_FILES)) {
        header('HTTP/ 400 Invalid filetype');
        echo 'Invalid filetype!';
    } else {
        $tempPath = $_FILES['file']['tmp_name'];
        $accessPath = 'uploads' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'gallery' . DIRECTORY_SEPARATOR . 'gallery_' . uniqid() . $image_typemap[$_FILES['file']['type']];
        $uploadPath = dirname(dirname(dirname(dirname(__FILE__)))) . DIRECTORY_SEPARATOR . $accessPath; //TODO (1.0.1) refactoring: solve that dirname rubbish with a global image upload function
        move_uploaded_file($tempPath, $uploadPath);


        //imagine processing

        //create image with width 1000px
        $imagine = new Imagine\Gd\Imagine();
        $image = $imagine->open($uploadPath);
        $image->resize($image->getSize()->widen(1000))
            ->save($uploadPath);


        //create thumbnail with original proportions
        $uploadPathPieces = explode('.', $uploadPath);
        $thumbUploadPath = $uploadPathPieces[0] . '_thumb.' . $uploadPathPieces[1];
        $accessPathPieces = explode('.', $accessPath);
        $thumbAccessPath = $accessPathPieces[0] . '_thumb.' . $accessPathPieces[1];
        $size = new Imagine\Image\Box(300, 200);
        $mode = Imagine\Image\ImageInterface::THUMBNAIL_OUTBOUND;
        $image->thumbnail($size, $mode)
            ->save($thumbUploadPath);

        //create square thumbnail
        $uploadPathPieces = explode('.', $uploadPath);
        $thumbUploadPath = $uploadPathPieces[0] . '_q.' . $uploadPathPieces[1];
        $accessPathPieces = explode('.', $accessPath);
        $thumbSquareAccessPath = $accessPathPieces[0] . '_q.' . $accessPathPieces[1];
        $size = new Imagine\Image\Box(200, 200);
        $mode = Imagine\Image\ImageInterface::THUMBNAIL_OUTBOUND;
        $image->thumbnail($size, $mode)
            ->save($thumbUploadPath);


        $answer = array(
            'answer' => 'File transfer completed successfully',
            'path' => $accessPath,
            'thumbPath' => $thumbAccessPath,
            'thumbSquarePath' => $thumbSquareAccessPath
        );
        jsonResponse($answer);
    }
}