<?php

function createCalendarModule($page, $title, $calendaritems)
{
    $connection = getConnection();

    //create new calendar module
    try {
        $result = $connection->query("INSERT INTO calendar_modules (title) VALUES  ('$title')");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //get id of created module
        $module_id = -1;
        $result = $connection->query("SELECT id FROM calendar_modules GROUP BY id HAVING MAX(id)");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $module_id = $rs['id'];
            }
        }

        //write infotiles
        foreach ($calendaritems as $key => $calendaritem) {
            $itemTitle = mysqli_real_escape_string($connection, $calendaritem['title']);
            $description = mysqli_real_escape_string($connection, $calendaritem['description']);
            $parsedDate = date_parse_from_format("Y.m.d H:i:s", $calendaritem['datetime']);
            $datetime = date("Y-m-d H:i:s", mktime($parsedDate['hour'], $parsedDate['minute'], 0, $parsedDate['month'], $parsedDate['day'], $parsedDate['year']));
            $result = $connection->query("INSERT INTO calendar_module_items (title, calendar_module, description, datetime)
                                            VALUES  ('$itemTitle', '$module_id', '$description', '$datetime')");
            if (!$result) {
                throw new Exception($connection->error);
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
            }
        }

        //register module for page
        $result = $connection->query("INSERT INTO pages (topic, module_type_id, module_id, y_index) VALUES  ('$page', 'calendar', '$module_id', '$y_index')");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function getCalendarModule($id)
{
    $connection = getConnection();
    $data = new stdClass();
    try {
        $result = $connection->query("SELECT id, title FROM calendar_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            if (mysqli_num_rows($result) == 0) return false;
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $data->id = $rs['id'];
                $data->title = $rs['title'];
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $calendaritems = array();
    try {
        $result = $connection->query("SELECT title, description, datetime
                                      FROM calendar_module_items
                                      WHERE calendar_module = '$id' AND datetime >= NOW()
                                      ORDER BY datetime ASC");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $item = new stdClass();
                $item->title = $rs['title'];
                $item->description = $rs['description'];
                $parsedDate = date_parse_from_format("Y-m-d H:i:s", $rs['datetime']);
                $item->datetime = date("Y.m.d H:i:s", mktime($parsedDate['hour'], $parsedDate['minute'], 0,
                    $parsedDate['month'], $parsedDate['day'], $parsedDate['year']));
                $calendaritems[] = $item;
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $data->calendaritems = $calendaritems;

    $response = new stdClass();
    $response->data = $data;
    $response->imagePreloadArray = array();
    $connection->close();
    return $response;
}

function updateCalendarModule($id, $title, $calendaritems)
{
    $connection = getConnection();

    try {
        //update module
        $result = $connection->query("UPDATE calendar_modules SET title = '$title' WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //update items (lazy)
        $result = $connection->query("DELETE FROM calendar_module_items WHERE calendar_module = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }
        //write tiles
        foreach ($calendaritems as $key => $calendaritem) {
            $itemTitle = mysqli_real_escape_string($connection, $calendaritem['title']);
            $description = mysqli_real_escape_string($connection, $calendaritem['description']);
            $parsedDate = date_parse_from_format("Y.m.d H:i:s", $calendaritem['datetime']);
            $datetime = date("Y-m-d H:i:s", mktime($parsedDate['hour'], $parsedDate['minute'], 0, $parsedDate['month'], $parsedDate['day'], $parsedDate['year']));
            $result = $connection->query("INSERT INTO calendar_module_items (title, calendar_module, description, datetime)
                                          VALUES  ('$itemTitle', '$id', '$description', '$datetime')");
            if (!$result) {
                throw new Exception($connection->error);
            }
        }


    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function deleteCalendarModule($id)
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
        $result = $connection->query("DELETE FROM pages WHERE module_id = '$id' AND module_type_id = 'calendar'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //update y_indexes
        $result = $connection->query("UPDATE pages SET y_index = y_index - 1 WHERE y_index > '$y_index'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //delete module
        $result = $connection->query("DELETE FROM calendar_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //delete items
        $result = $connection->query("DELETE FROM calendar_module_items WHERE calendar_module = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //TODO (1.0.1) housekeeping: delete now unused images from server
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

