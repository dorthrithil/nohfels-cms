<?php
header("Access-Control-Allow-Origin: *");

$image_typemap = array(
    'image/jpeg' => '.jpg',
    'image/gif'  => '.gif',
    'image/png'  => '.png',
    'image/bmp'  => '.bmp'
);

function validate_mime_type_image($file){
    if (in_array($file['file']['type'], array('image/jpeg', 'image/gif', 'image/png', 'image/bmp'))) return true;
    return false;
}

if (!empty($_FILES) && validate_mime_type_image($_FILES)) { //TODO distinguish error messages & include http status codes
    $tempPath = $_FILES['file']['tmp_name'];
    $access_path = 'uploads' . DIRECTORY_SEPARATOR . 'staff_' . time() . $image_typemap[$_FILES['file']['type']];
    $uploadPath = dirname(__FILE__) . DIRECTORY_SEPARATOR . $access_path;
    move_uploaded_file($tempPath, $uploadPath);
    $answer = array(
        'answer' => 'File transfer completed successfully',
        'path' => $access_path
    );
    $json = json_encode($answer);
    echo $json;
} else {
    echo 'No file or invalid type provided';
}
