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

function validate_mime_type_image($file) //TODO don't rely on mime types as they are set by clients
{
    if (in_array($file['file']['type'], array('image/jpeg', 'image/gif', 'image/png', 'image/bmp'))) return true;
    return false;
}
