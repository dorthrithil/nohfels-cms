<?php

function createInfotileModule($page, $title, $infotiles)
{
    $connection = getConnection();

    //create new infotile module
    try {
        $result = $connection->query("INSERT INTO infotile_modules (title) VALUES  ('$title')");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //get id of created module
        $module_id = -1;
        $result = $connection->query("SELECT id FROM infotile_modules GROUP BY id HAVING MAX(id)");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $module_id = $rs['id'];
            }
        }

        //TODO i am nit using the square image src's in db, am i?

        //write infotiles
        foreach ($infotiles as $key => $infotile) {
            $image_src = $infotile['imageSrc'];
            $tileTitle = $infotile['title'];
            $text = $infotile['text'];
            $url = $infotile['url'];
            $urlEnabled = $infotile['urlEnabled'];
            if(!$urlEnabled) $url = '';
            $result = $connection->query("INSERT INTO infotile_module_tiles (image_src, title, infotile_module, position, text, url, url_enabled) VALUES  ('$image_src', '$tileTitle', '$module_id', '$key', '$text', '$url', '$urlEnabled')");
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
        $result = $connection->query("INSERT INTO pages (topic, module_type_id, module_id, y_index) VALUES  ('$page', 'infotile', '$module_id', '$y_index')");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function getInfotileModule($id)
{
    $connection = getConnection();
    $data = new stdClass();
    try {
        $result = $connection->query("SELECT id, title FROM infotile_modules WHERE id = '$id'");
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

    $infotiles = array();
    try {
        $result = $connection->query("SELECT image_src, title, text, url, url_enabled FROM infotile_module_tiles WHERE infotile_module = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $tile = new stdClass();
                $tile->title = $rs['title'];
                $tile->imageSrc = $rs['image_src'];
                $tile->text = $rs['text'];
                $tile->url = $rs['url'];
                $tile->urlEnabled = tinyIntToBoolean($rs['url_enabled']);
                $infotiles[] = $tile;
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $data->infotiles = $infotiles;

    $response = new stdClass();
    $response->data = $data;
    $connection->close();
    return $response;
}

function updateInfotileModule($id, $title, $infotiles)
{
    $connection = getConnection();

    try {
        //update module
        $result = $connection->query("UPDATE infotile_modules SET title = '$title' WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //update tiles (lazy)
        $result = $connection->query("DELETE FROM infotile_module_tiles WHERE infotile_module = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }
        //write tiles
        foreach ($infotiles as $key => $infotile) {
            $image_src = $infotile['imageSrc'];
            $infotileTitle = $infotile['title'];
            $text = $infotile['text'];
            $url = $infotile['url'];
            $urlEnabled = $infotile['urlEnabled'];
            if(!$urlEnabled) $url = '';
            $result = $connection->query("INSERT INTO infotile_module_tiles (image_src, title, infotile_module, position, text, url, url_enabled) VALUES  ('$image_src', '$infotileTitle', '$id', '$key', '$text', '$url', '$urlEnabled')");
            if (!$result) {
                throw new Exception($connection->error);
            }
        }


    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function deleteInfotileModule($id)
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
        $result = $connection->query("DELETE FROM pages WHERE module_id = '$id' AND module_type_id = 'infotile'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //update y_indexes
        $result = $connection->query("UPDATE pages SET y_index = y_index - 1 WHERE y_index > '$y_index'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //delete module
        $result = $connection->query("DELETE FROM infotile_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //delete tiles
        $result = $connection->query("DELETE FROM infotile_module_tiles WHERE infotile_module = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //TODO (1.0.1) housekeeping: delete now unused images from server
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function uploadInfotileImage()
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
        $access_path = 'uploads' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'infotile' . DIRECTORY_SEPARATOR . 'infotile_' . uniqid() . $image_typemap[$_FILES['file']['type']];
        $uploadPath = dirname(dirname(dirname(dirname(__FILE__)))) . DIRECTORY_SEPARATOR . $access_path; //TODO (1.0.1) refactoring: solve that dirname rubbish with a global image upload function
        move_uploaded_file($tempPath, $uploadPath);


        //imagine processing TODO make this fit to the tiles needs

        $imagine = new Imagine\Gd\Imagine();
        $image = $imagine->open($uploadPath);
        $size = new Imagine\Image\Box(300, 200);
        $mode = Imagine\Image\ImageInterface::THUMBNAIL_OUTBOUND;
        $image->thumbnail($size, $mode)
            ->save($uploadPath);


        $answer = array(
            'answer' => 'File transfer completed successfully',
            'path' => $access_path
        );
        //jsonResponse($answer);
        $json = json_encode($answer);
        echo $json;
    }
}