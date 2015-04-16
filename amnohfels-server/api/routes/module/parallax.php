<?php
/**
 * Created by PhpStorm.
 * User: fengelmann
 * Date: 10/04/15
 * Time: 20:21
 */


function getParallaxModule($id)
{
    $connection = getConnection();
    $data = new stdClass();
    try {
        $result = $connection->query("SELECT id, title, caption, height_num, height_unit, bg_img_src FROM parallax_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            if(mysqli_num_rows($result) == 0) return false;
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $data->id = $rs['id'];
                $data->title = $rs['title'];
                $data->caption = $rs['caption'];
                $data->heightNum = $rs['height_num'];
                $data->heightUnit = $rs['height_unit'];
                $data->bgImgSrc = $rs['bg_img_src'];
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

//TODO (32) broken pipe when file is larger than 4.048.218 bytes (max value that worked in the tests)

function uploadParallaxImage()
{
    $image_typemap = array(
        'image/jpeg' => '.jpg',
        'image/gif' => '.gif',
        'image/png' => '.png',
        'image/bmp' => '.bmp'
    );

    if (!empty($_FILES) && validate_mime_type_image($_FILES)) { //TODO distinguish error messages & include http status codes
        $tempPath = $_FILES['file']['tmp_name'];
        $accessPath = 'uploads' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'parallax' . DIRECTORY_SEPARATOR . 'parallax_' . time() . $image_typemap[$_FILES['file']['type']];
        $uploadPath = dirname(dirname(dirname(dirname(__FILE__)))) . DIRECTORY_SEPARATOR . $accessPath; //TODO solve that dirname rubbish with a global image upload function
        move_uploaded_file($tempPath, $uploadPath);


        //imagine processing

        //create image with width 1000px
        $imagine = new Imagine\Gd\Imagine();
        $image = $imagine->open($uploadPath);
        $image->resize($image->getSize()->widen(1000))
            ->save($uploadPath);


        //create thumbnail
//        $uploadPathPieces = explode('.', $uploadPath);
//        $thumbUploadPath = $uploadPathPieces[0] . '_thumb.' . $uploadPathPieces[1];
//        $accessPathPieces = explode('.', $accessPath);
//        $thumbAccessPath = $accessPathPieces[0] . '_thumb.' . $accessPathPieces[1];
//        $size = new Imagine\Image\Box(300, 200);
//        $mode = Imagine\Image\ImageInterface::THUMBNAIL_OUTBOUND;
//        $image->thumbnail($size, $mode)
//            ->save($thumbUploadPath);


        $answer = array(
            'answer' => 'File transfer completed successfully',
            'path' => $accessPath,
            'thumbPath' => ''//$thumbAccessPath
        );
        jsonResponse($answer);
    } else {
        echo 'No file or invalid type provided';
    }
}