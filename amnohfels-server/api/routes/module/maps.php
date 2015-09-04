<?php
/**
 * Created by PhpStorm.
 * User: fengelmann
 * Date: 10/04/15
 * Time: 20:28
 */

function createMapsModule($page, $title, $description, $centerLatitude, $centerLongitude, $marker, $markerLatitude,
                          $markerLongitude, $zoom, $mapTypeId, $mapTypeControl, $polyline, $polylinePath)
{
    $connection = getConnection();

    //create new maps module
    try {

        // remove all whitespace from polylinePath
        $polylinePath = preg_replace('/\s+/', '', $polylinePath);

        $result = $connection->query("INSERT INTO maps_modules (title, description, center_latitude, center_longitude,
                                                                marker, marker_latitude, marker_longitude, zoom,
                                                                map_type_id, map_type_control, polyline, polyline_path)
                                      VALUES  ('$title', '$description', '$centerLatitude', '$centerLongitude',
                                               '$marker', '$markerLatitude', '$markerLongitude', '$zoom',
                                               '$mapTypeId', '$mapTypeControl', '$polyline', '$polylinePath')");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //get id of created module
        $module_id = -1;
        $result = $connection->query("SELECT id FROM maps_modules GROUP BY id HAVING MAX(id)");
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
            }
        }

        //register module for page
        $result = $connection->query("INSERT INTO pages (topic, module_type_id, module_id, y_index)
                                      VALUES  ('$page', 'maps', '$module_id', '$y_index')");
        if (!$result) {
            throw new Exception($connection->error);
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}

function getMapsModule($id)
{
    $connection = getConnection();
    $data = new stdClass();
    try {
        $result = $connection->query("SELECT * FROM maps_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            if(mysqli_num_rows($result) == 0) return false;
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $data->id = $rs['id'];
                $data->title = $rs['title'];
                $data->description = $rs['description'];
                $data->centerLatitude = $rs['center_latitude'];
                $data->centerLongitude = $rs['center_longitude'];
                $data->marker = tinyIntToBoolean($rs['marker']);
                $data->markerLatitude = $rs['marker_latitude'];
                $data->markerLongitude = $rs['marker_longitude'];
                $data->zoom = intval($rs['zoom']);
                $data->mapTypeId = $rs['map_type_id'];
                $data->mapTypeControl = tinyIntToBoolean($rs['map_type_control']);
                $data->polyline = tinyIntToBoolean($rs['polyline']);
                $data->polylinePath = json_decode($rs['polyline_path']);
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

function updateMapsModule($id, $title, $description, $centerLatitude, $centerLongitude, $marker, $markerLatitude,
                          $markerLongitude, $zoom, $mapTypeId, $mapTypeControl, $polyline, $polylinePath)
{
    $connection = getConnection();

    try {

        // remove all whitespace from polylinePath
        $polylinePath = preg_replace('/\s+/', '', $polylinePath);

        //update module
        $result = $connection->query("UPDATE maps_modules SET
                                        title = '$title',
                                        description = '$description',
                                        center_latitude = '$centerLatitude',
                                        center_longitude = '$centerLongitude',
                                        marker = '$marker',
                                        marker_latitude = '$markerLatitude',
                                        marker_longitude = '$markerLongitude',
                                        zoom = '$zoom',
                                        map_type_id = '$mapTypeId',
                                        map_type_control = '$mapTypeControl',
                                        polyline = '$polyline',
                                        polyline_path = '$polylinePath'
                                      WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();

    echo 42;
}

function deleteMapsModule($id)
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
        $result = $connection->query("DELETE FROM pages WHERE module_id = '$id' AND module_type_id = 'maps'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //update y_indexes
        $result = $connection->query("UPDATE pages SET y_index = y_index - 1 WHERE y_index > '$y_index'");
        if (!$result) {
            throw new Exception($connection->error);
        }

        //delete module
        $result = $connection->query("DELETE FROM maps_modules WHERE id = '$id'");
        if (!$result) {
            throw new Exception($connection->error);
        }

    } catch (Exception $e) {
        echo $e->getMessage();
    }

    $connection->close();
}