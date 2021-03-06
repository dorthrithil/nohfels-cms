<?php

function createBlogModule($page, $title, $maxEntries)
{
    $connection = getConnection();

    //create new blog module
    try {
        $result = $connection->query("INSERT INTO blog_modules (title, max_entries) VALUES  ('$title', '$maxEntries')");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //get id of created module
        $module_id = -1;
        $result = $connection->query("SELECT id FROM blog_modules GROUP BY id HAVING MAX(id)");
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
        $result = $connection->query("INSERT INTO pages (topic, module_type_id, module_id, y_index) VALUES  ('$page', 'blog', '$module_id', '$y_index')");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function getBlogModule($id)
{
    $connection = getConnection();
    $data = new stdClass();
    $imagePreloadArray = array();
    try {
        $result = $connection->query("SELECT id, title, max_entries FROM blog_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            if (mysqli_num_rows($result) == 0) return false;
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $data->id = $rs['id'];
                $data->title = $rs['title'];
                $data->maxEntries = $rs['max_entries'];
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    // Get number of entries
    try {
        $result = $connection->query("SELECT id
                                      FROM blog_module_entries
                                      WHERE blog_module = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            $data->entryCount = mysqli_num_rows($result);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $response = new stdClass();
    $response->data = $data;
    $response->imagePreloadArray = $imagePreloadArray;
    $connection->close();
    return $response;
}


function updateBlogModule($id, $title, $maxEntries)
{
    $connection = getConnection();

    //update module
    try {
        $result = $connection->query("UPDATE blog_modules SET max_entries = '$maxEntries', title = '$title' WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}


function deleteBlogModule($id)
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
        $result = $connection->query("DELETE FROM pages WHERE module_id = '$id' AND module_type_id = 'blog'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //update y_indexes
        $result = $connection->query("UPDATE pages SET y_index = y_index - 1 WHERE y_index > '$y_index'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //delete module
        $result = $connection->query("DELETE FROM blog_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}


function createBlogEntry($blogModule, $title, $text, $datetime)
{
    $connection = getConnection();

    //create new blog entry
    try {
        $parsedDate = date_parse_from_format("Y.m.d H:i:s", $datetime);
        $datetime = date("Y-m-d H:i:s", mktime($parsedDate['hour'], $parsedDate['minute'], 0, $parsedDate['month'], $parsedDate['day'], $parsedDate['year']));
        $result = $connection->query("INSERT INTO blog_module_entries (blog_module, title, text, datetime) VALUES  ('$blogModule','$title', '$text', '$datetime')");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function getBlogEntries($blogModule, $page, $maxEntries)
{
    $connection = getConnection();

    // Get maxEntries
    if ($maxEntries == 0) {
        try {
            $result = $connection->query("SELECT max_entries FROM blog_modules WHERE id = '$blogModule'");
            if (!$result) {
                throw new Exception($connection->error);
            } else {
                if (mysqli_num_rows($result) == 0) return false;
                while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                    $maxEntries = $rs['max_entries'];
                }
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    $data = array();
    $imagePreloadArray = array();
    try {
        $offset = $page * $maxEntries;
        $result = $connection->query("SELECT id, title, text, datetime
                                      FROM blog_module_entries
                                      WHERE blog_module = '$blogModule'
                                      ORDER BY datetime DESC
                                      LIMIT $offset, $maxEntries");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            if (mysqli_num_rows($result) == 0) return false;
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {

                $entry = new stdClass();
                $entry->id = $rs['id'];
                $entry->title = $rs['title'];
                $entry->text = $rs['text'];
                $parsedDate = date_parse_from_format("Y-m-d H:i:s", $rs['datetime']);
                $entry->datetime = date("Y.m.d H:i:s", mktime($parsedDate['hour'], $parsedDate['minute'], 0,
                    $parsedDate['month'], $parsedDate['day'], $parsedDate['year']));
                $data[] = $entry;
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    $response = new stdClass();
    $response->data = $data;
    $response->imagePreloadArray = $imagePreloadArray;
    $connection->close();
    return $response;
}


function updateBlogEntry($id, $title, $text, $datetime)
{
    $connection = getConnection();

    //update entry
    try {
        $parsedDate = date_parse_from_format("Y.m.d H:i:s", $datetime);
        $datetime = date("Y-m-d H:i:s", mktime($parsedDate['hour'], $parsedDate['minute'], 0, $parsedDate['month'], $parsedDate['day'], $parsedDate['year']));
        $result = $connection->query("UPDATE blog_module_entries
                                      SET title = '$title', text = '$text', datetime = '$datetime'
                                      WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}


function deleteBlogEntry($id)
{

    $connection = getConnection();

    try {
        $result = $connection->query("DELETE FROM blog_module_entries WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}