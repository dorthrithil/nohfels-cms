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