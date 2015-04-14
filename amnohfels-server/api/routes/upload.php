<?php

//TODO (32) broken pipe when file is larger than 4.048.218 bytes (max value that worked in the tests)

function validate_mime_type_image($file) //TODO don't rely on mime types as they are set by clients
{
    if (in_array($file['file']['type'], array('image/jpeg', 'image/gif', 'image/png', 'image/bmp'))) return true;
    return false;
}

function upload()
{
    $image_typemap = array(
        'image/jpeg' => '.jpg',
        'image/gif' => '.gif',
        'image/png' => '.png',
        'image/bmp' => '.bmp'
    );

    if (!empty($_FILES) && validate_mime_type_image($_FILES)) { //TODO distinguish error messages & include http status codes
        $tempPath = $_FILES['file']['tmp_name'];
        $access_path = 'uploads' . DIRECTORY_SEPARATOR . 'images' . DIRECTORY_SEPARATOR . 'staff' . DIRECTORY_SEPARATOR . 'staff_' . time() . $image_typemap[$_FILES['file']['type']];
        $uploadPath = dirname(dirname(dirname(__FILE__))) . DIRECTORY_SEPARATOR . $access_path; //TODO solve that dirname rubbish with a global image upload function
        move_uploaded_file($tempPath, $uploadPath);


        //imagine processing

        $imagine = new Imagine\Gd\Imagine();
        $image = $imagine->open($uploadPath);
        $size = new Imagine\Image\Box(200, 200);
        $mode = Imagine\Image\ImageInterface::THUMBNAIL_OUTBOUND;
        $image->effects()
            ->grayscale();
        $image->effects()
            ->gamma(1.2); //grayscale makes it a little dark -> lighten it!
        $image->thumbnail($size, $mode)
            ->save($uploadPath);


        $answer = array(
            'answer' => 'File transfer completed successfully',
            'path' => $access_path
        );
        $json = json_encode($answer);
        echo $json;
    } else {
        echo 'No file or invalid type provided';
    }
}
