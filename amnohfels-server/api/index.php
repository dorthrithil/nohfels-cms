<?php

//TODO best practices: change route names to create/get/update/delete and order functions in this order
//TODO security: authentification for post & delete routes
//TODO enhancement: check for resource existence on update-post & delete routes
//TODO function descriptions

//TODO enhancement (1.0.1): correct error responses for client

//TODO enhancement (1.0.2): database health checks

//set headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && (
            $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'POST' ||
            $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'DELETE' ||
            $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'PUT')
    ) {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Credentials: true");
        header('Access-Control-Allow-Headers: X-Requested-With');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
        header('Access-Control-Max-Age: 86400');
    }
    exit;
}

//instantiate slim
require_once __DIR__ . '/vendor/autoload.php';
$app = new \Slim\Slim();

//load utility functions
require_once __DIR__ . '/util.php';

//load database functionality
require_once __DIR__ . '/db.php';

//load routing functions
require_once __DIR__ . '/routes.php';

//set up routes

//group for modules
$app->group('/module', function () use ($app) {

    //swap module position
    $app->post('/swap/:upper', function ($upper) use ($app) {
        swapModules($upper);
    });

    //get module types
    $app->get('/types', function () {
        echo json_encode(getModuleTypes());
    });

    //group for text modules
    $app->group('/text', function () use ($app) {

        //get text module
        $app->get('/:id', function ($id) {
            echo json_encode(getTextModule($id));
        });

        //create new text module
        $app->post('', function () use ($app) {
            $json = $app->request->getBody();
            $data = json_decode($json, true);
            createNewTextModule($data['page'], $data['title'], $data['content']);
        });

        //edit text module
        $app->post('/:id', function ($id) use ($app) {
            $json = $app->request->getBody();
            $data = json_decode($json, true);
            editTextModule($id, $data['title'], $data['content']);
        });

        //delete text module
        $app->delete('/:id', function ($id) {
            deleteTextModule($id);
        });

    });

    //group for parallax modules
    $app->group('/parallax', function () use ($app) {

        //get text module
        $app->get('/:id', function ($id) {
            echo json_encode(getParallaxModule($id));
        });

    });

    //group for image modules
    $app->group('/image', function () use ($app) {

        //get image module
        $app->get('/:id', function ($id) {
            echo json_encode(getImageModule($id));
        });

    });

    //group for contact modules
    $app->group('/contact', function () use ($app) {

        //get contact module
        $app->get('/:id', function ($id) {
            echo json_encode(getContactModule($id));
        });

    });

    //group for instagram modules
    $app->group('/instagram', function () use ($app) {

        //get instagram module
        $app->get('/:id', function ($id) {
            echo json_encode(getInstagramModule($id));
        });

    });

    //group for staff modules
    $app->group('/staff', function () use ($app) {

        //get staff module
        $app->get('/:id', function ($id) {
            echo json_encode(getStaffModule($id));
        });

    });

});

//group for pages (requires module group loaded before)
$app->group('/page', function () use ($app) {

    //get page
    $app->get('/:topic', function ($topic) {
        echo json_encode(getPage($topic));
    });

});


//run app
$app->run();