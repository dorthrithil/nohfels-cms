<?php

function createStaffModule($page, $title, $employees)
{
    $connection = getConnection();

    //create new staff module
    try {
        $result = $connection->query("INSERT INTO staff_modules (title) VALUES  ('$title')");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //get id of created module
        $module_id = -1;
        $result = $connection->query("SELECT id FROM staff_modules GROUP BY id HAVING MAX(id)");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $module_id = $rs['id'];
            }
        }

        //write employees
        $i = 0; //TODO will be part of employee object later
        foreach($employees as $employee){
            $image_src = $employee['imageSrc'];
            $name = $employee['name'];
            $result = $connection->query("INSERT INTO staff_module_employees (image_src, name, staff_module, position) VALUES  ('$image_src', '$name', '$module_id', '$i')");
            if (!$result) {
                throw new Exception($connection->error);
            }
            $i++; //TODO will be part of employee object later
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
        $result = $connection->query("INSERT INTO pages (topic, module_type_id, module_id, y_index) VALUES  ('$page', 'staff', '$module_id', '$y_index')");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function getStaffModule($id)
{
    $connection = getConnection();
    $data = new stdClass();
    try {
        $result = $connection->query("SELECT id, title FROM staff_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            if(mysqli_num_rows($result) == 0) return false;
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $data->id = $rs['id'];
                $data->title = $rs['title'];
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $employees = array();
    try {
        $result = $connection->query("SELECT image_src, name FROM staff_module_employees WHERE staff_module = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $employee = new stdClass();
                $employee->name = $rs['name'];
                $employee->imageSrc = $rs['image_src'];
                $employees[] = $employee;
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $data->employees = $employees;

    $response = new stdClass();
    $response->data = $data;
    $connection->close();
    return $response;
}

function updateStaffModule($id, $title, $employees)
{
    $connection = getConnection();

    try {
        //update module
        $result = $connection->query("UPDATE staff_modules SET title = '$title' WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //update employees (lazy)
        $result = $connection->query("DELETE FROM staff_module_employees WHERE staff_module = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }
        //write employees
        $i = 0; //TODO will be part of employee object later
        foreach($employees as $employee){
            $image_src = $employee['imageSrc'];
            $name = $employee['name'];
            $result = $connection->query("INSERT INTO staff_module_employees (image_src, name, staff_module, position) VALUES  ('$image_src', '$name', '$id', '$i')");
            if (!$result) {
                throw new Exception($connection->error);
            }
            $i++; //TODO will be part of employee object later
        }


    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function deleteStaffModule($id)
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
        $result = $connection->query("DELETE FROM pages WHERE module_id = '$id' AND module_type_id = 'staff'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //update y_indexes
        $result = $connection->query("UPDATE pages SET y_index = y_index - 1 WHERE y_index > '$y_index'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //delete module
        $result = $connection->query("DELETE FROM staff_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //delete employees
        $result = $connection->query("DELETE FROM staff_module_employees WHERE staff_module = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //TODO delete now unused images from server
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}


//TODO (32) broken pipe when file is larger than 4.048.218 bytes (max value that worked in the tests)

function uploadEmployeeImage()
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
        $uploadPath = dirname(dirname(dirname(dirname(__FILE__)))) . DIRECTORY_SEPARATOR . $access_path; //TODO solve that dirname rubbish with a global image upload function
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
        //jsonResponse($answer);
        $json = json_encode($answer);
        echo $json;
    } else {
        echo 'No file or invalid type provided';
    }
}