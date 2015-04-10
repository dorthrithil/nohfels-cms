<?php
//TODO one try catch per function is enough

function createNewTextModule($page, $title, $content){
    $connection = getConnection();

    //create new text module
    try {
        $result = $connection->query("INSERT INTO text_modules (title, content) VALUES  ('$title', '$content')");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    //get id of created module
    $module_id = -1;
    try {
        $result = $connection->query("SELECT id FROM text_modules GROUP BY id HAVING MAX(id)");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $module_id = $rs['id'];
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    //get y_index of new module
    $y_index = -1;
    try {
        $result = $connection->query("SELECT y_index FROM pages WHERE topic = '$page' GROUP BY y_index HAVING MAX(y_index)");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $y_index = $rs['y_index'] + 1;
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    //register module for page
    try {
        $result = $connection->query("INSERT INTO pages (topic, module_type, module_id, y_index) VALUES  ('$page', 'text_module', '$module_id', '$y_index')"); //TODO topic should be renamed to page in db
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}



function editTextModule($id, $title, $content){
    $connection = getConnection();

    //edit module
    try {
        $result = $connection->query("UPDATE text_modules SET content = '$content', title = '$title' WHERE id = '$id'"); //TODO topic should be renamed to page in db
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}



function deleteTextModule($id){
    $connection = getConnection();

    //get y_index of old module
    $y_index = -1;
    try {
        $result = $connection->query("SELECT y_index FROM pages WHERE module_id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $y_index = $rs['y_index'];
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    //delete pages entry
    try {
        $result = $connection->query("DELETE FROM pages WHERE module_id = '$id' AND module_type = 'text_module'");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    //update y_indexes
    try {
        $result = $connection->query("UPDATE pages SET y_index = y_index - 1 WHERE y_index > '$y_index'");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    //TODO delete from text_modules! doesn't work?

    //delete module
    try {
        $result = $connection->query("DELETE FROM text_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}