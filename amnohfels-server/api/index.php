<?php

//TODO security: authentification for post & delete routes
//TODO enhancement: check for resource existence on update-post & delete routes
//TODO enhancement (1.0.2): database health checks

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && (
            $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'POST' ||
            $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'DELETE' ||
            $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'PUT' )) {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Credentials: true");
        header('Access-Control-Allow-Headers: X-Requested-With');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
        header('Access-Control-Max-Age: 86400');
    }
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';

$app = new \Slim\Slim();

require_once __DIR__ . '/db.php';

require_once __DIR__ . '/routes/routes.php';

//group for modules
$app->group('/module', function () use ($app) {

    //create new text module
    $app->post('/text', function () use ($app) {
        $json = $app->request->getBody();
        $data = json_decode($json, true);
        createNewTextModule($data['page'], $data['title'], $data['content']);
    });

    //delete text module
    $app->delete('/text/:id', function ($id){
        deleteTextModule($id);
    });

});

$app->run();