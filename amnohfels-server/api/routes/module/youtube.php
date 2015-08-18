<?php

function createYoutubeModule($page, $title, $url)
{
    $connection = getConnection();

    //create new text module
    try {
        $result = $connection->query("INSERT INTO youtube_modules (title, url) VALUES  ('$title', '$url')");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //get id of created module
        $module_id = -1;
        $result = $connection->query("SELECT id FROM youtube_modules GROUP BY id HAVING MAX(id)");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $module_id = $rs['id'];
            }
        }

        //get y_index of new module
        $y_index = -1;
        $result = $connection->query("SELECT y_index FROM pages WHERE topic = '$page' ORDER BY y_index DESC LIMIT 1");
        if (!$result) {
            throw new Exception($connection->error);
        } else if (mysqli_num_rows($result) == 0) {
            $y_index = 0;
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $y_index = $rs['y_index'] + 1;
                echo($y_index);
            }
        }

        //register module for page
        $result = $connection->query("INSERT INTO pages (topic, module_type_id, module_id, y_index) VALUES  ('$page', 'youtube', '$module_id', '$y_index')");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function getYoutubeModule($id)
{
    $connection = getConnection();
    $data = new stdClass();
    try {
        $result = $connection->query("SELECT id, title, url FROM youtube_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            if(mysqli_num_rows($result) == 0) return false;
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $data->id = $rs['id'];
                $data->title = $rs['title'];
                $data->url = $rs['url'];
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


function updateYoutubeModule($id, $title, $url)
{
    $connection = getConnection();

    //update module
    try {
        $result = $connection->query("UPDATE youtube_modules SET url = '$url', title = '$title' WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}


function deleteYoutubeModule($id)
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
        $result = $connection->query("DELETE FROM pages WHERE module_id = '$id' AND module_type_id = 'youtube'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //update y_indexes
        $result = $connection->query("UPDATE pages SET y_index = y_index - 1 WHERE y_index > '$y_index'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //delete module
        $result = $connection->query("DELETE FROM youtube_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}