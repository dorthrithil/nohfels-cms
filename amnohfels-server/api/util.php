<?php

/**
 * @description: converts mysql tinyInt to boolean
 */
function tinyIntToBoolean($int)
{
    if ($int == 1) return true;
    if ($int == 0) return false;
    throw new Exception('Invalid Argument: "' . $int . '" is not in tinyint format. (util.php / tinyIntToBoolean())');
}

function jsonResponse($input){
    header("Content-Type: application/json; charset=UTF-8");
    echo json_encode($input);
}

function htmlResponse($input){
    header("Content-type: text/html; charset=UTF-8");
    echo $input;
}

function validate_mime_type_image($file)
{
    $allowedTypes = array(IMAGETYPE_PNG, IMAGETYPE_JPEG, IMAGETYPE_GIF, IMAGETYPE_BMP);
    $detectedType = exif_imagetype($file['file']['tmp_name']);
    if (in_array($detectedType, $allowedTypes)) return true;
    return false;
}
