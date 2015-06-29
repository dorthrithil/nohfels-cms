<?php
//TODO (1.0.1) bug: (32) broken pipe when file is larger than 4.048.218 bytes (max value that worked in the tests)

function fileupload()
{
    if (empty($_FILES)) {
        header('HTTP/ 400 No file provided');
        echo 'No file provided!';
    } else {
        $tempPath = $_FILES['file']['tmp_name'];
        $path = $_FILES['file']['name'];
        $extension = pathinfo($path, PATHINFO_EXTENSION);
        $name = pathinfo($path, PATHINFO_FILENAME);
        $accessPath = 'uploads' . DIRECTORY_SEPARATOR . 'files' . DIRECTORY_SEPARATOR . $name .
            '_' . uniqid() . '.' . $extension;
        $uploadPath = dirname(dirname(dirname(__FILE__))) . DIRECTORY_SEPARATOR . $accessPath; //TODO (1.0.1) refactoring solve that dirname rubbish with a global image upload function
        move_uploaded_file($tempPath, $uploadPath);

        $answer = array(
            'answer' => 'File transfer completed successfully',
            'path' => $accessPath
        );
        jsonResponse($answer);
    }
}