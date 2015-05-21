<?php
//TODO (32) broken pipe when file is larger than 4.048.218 bytes (max value that worked in the tests)

function fileupload()
{
    if (!empty($_FILES)) { //TODO distinguish error messages & include http status codes
        $tempPath = $_FILES['file']['tmp_name'];
        $type = '.' . explode('/',$_FILES['file']['type'])[1];
        $accessPath = 'uploads' . DIRECTORY_SEPARATOR . 'files' . DIRECTORY_SEPARATOR . uniqid() . $type; //TODO keep filename
        $uploadPath = dirname(dirname(dirname(__FILE__))) . DIRECTORY_SEPARATOR . $accessPath; //TODO solve that dirname rubbish with a global image upload function
        move_uploaded_file($tempPath, $uploadPath);

        $answer = array(
            'answer' => 'File transfer completed successfully',
            'path' => $accessPath
        );
        jsonResponse($answer);
    } else {
        echo 'No file provided';
    }
}