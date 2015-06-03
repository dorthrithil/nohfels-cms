<?php

//TODO security: authentification for post & delete routes

//TODO enhancement: (1.0.1) check for resource existence on update-post & delete routes (swap, text edit update delete)
//TODO documentation (1.0.1) function descriptions
//TODO refactoring (1.0.1) camelCaseize everything
//TODO enhancement (1.0.1): correct error responses for client
//TODO enhancement (1.0.1): use slims response object for returning content and setting the status

//TODO enhancement (1.0.2): database health checks

//set headers

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, JWT, CREDENTIALS');
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) && (
            $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'POST' ||
            $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'DELETE' ||
            $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'PUT')
    ) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, JWT, CREDENTIALS');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT');
        header('Access-Control-Max-Age: 86400');
    }
    exit;
}

//load dependencies
require_once __DIR__ . '/vendor/autoload.php';

//instantiate slim
$app = new \Slim\Slim();

//instantiate imagine
$imagine = new Imagine\Gd\Imagine();

//instatiate yaml parser
use Symfony\Component\Yaml\Parser;

$yaml = new Parser();

//load config
require_once __DIR__ . '/config.php';

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
    $app->post('/swapwithlower', 'authenticateUser', function () use ($app) {
        $json = $app->request->getBody();
        $data = json_decode($json, true);
        swapWithLowerModule($data['upper'], $data['topic']);
    });

    //get module types
    $app->get('/types', function () use ($app) {
        $response = getModuleTypes();
        if ($response == false) $app->notFound();
        jsonResponse($response);
    });

    //group for text modules
    $app->group('/text', function () use ($app) {

        //create text module
        $app->post('', 'authenticateUser', function () use ($app) {
            $json = $app->request->getBody();
            $data = json_decode($json, true);
            createTextModule($data['pageTopic'], $data['title'], $data['content']);
        });

        //get text module
        $app->get('/:id', function ($id) use ($app) {
            $response = getTextModule($id);
            if ($response == false) $app->notFound();
            jsonResponse($response);
        });

        //update text module
        $app->post('/:id', 'authenticateUser', function ($id) use ($app) {
            $json = $app->request->getBody();
            $data = json_decode($json, true);
            updateTextModule($id, $data['title'], $data['content']);
        });

        //delete text module
        $app->delete('/:id', 'authenticateUser', 'authenticateUser', function ($id) {
            deleteTextModule($id);
        });

    });

    //group for parallax modules
    $app->group('/parallax', function () use ($app) {

        //create parallax module
        $app->post('', 'authenticateUser', function () use ($app) {
            $json = $app->request->getBody();
            $data = json_decode($json, true);
            createParallaxModule($data['pageTopic'], $data['title'], $data['caption'], $data['heightNum'], $data['heightUnit'], $data['bgImgSrc'], $data['bgImgThumbSrc']);
        });

        //get parallax module
        $app->get('/:id', function ($id) use ($app) {
            $response = getParallaxModule($id);
            if ($response == false) $app->notFound();
            jsonResponse($response);
        });

        //update parallax module
        $app->post('/:id', 'authenticateUser', function ($id) use ($app) {
            $json = $app->request->getBody();
            $data = json_decode($json, true);
            updateParallaxModule($id, $data['title'], $data['caption'], $data['heightNum'], $data['heightUnit'], $data['bgImgSrc'], $data['bgImgThumbSrc']);
        });

        //delete parallax module
        $app->delete('/:id', 'authenticateUser', function ($id) {
            echo($id);
            deleteParallaxModule($id);
        });

        //upload parallax image
        $app->post('/image/upload', 'authenticateUser', function () use ($app) { //TODO uniform employee route
            uploadParallaxImage();
        });

    });

    //group for image modules
    $app->group('/image', function () use ($app) {

        //create image module
        $app->post('', 'authenticateUser', function () use ($app) {
            $json = $app->request->getBody();
            $data = json_decode($json, true);
            createImageModule($data['pageTopic'], $data['title'], $data['images']);
        });

        //get image module
        $app->get('/:id', function ($id) use ($app) {
            $response = getImageModule($id);
            if ($response == false) $app->notFound();
            jsonResponse($response);
        });

        //update image module
        $app->post('/:id', 'authenticateUser', function ($id) use ($app) {
            $json = $app->request->getBody();
            $data = json_decode($json, true);
            updateImageModule($id, $data['title'], $data['images']);
        });

        //delete image module
        $app->delete('/:id', 'authenticateUser', function ($id) {
            deleteImageModule($id);
        });

        //upload gallery image
        $app->post('/image/upload', 'authenticateUser', function () use ($app) { //TODO uniform image route
            uploadImageImage();
        });

    });

    //group for contact modules
    $app->group('/contact', function () use ($app) {

        //create contact module
        $app->post('', 'authenticateUser', function () use ($app) {
            $json = $app->request->getBody();
            $data = json_decode($json, true);
            createContactModule($data['pageTopic'], $data['title'], $data['topic']);
        });

        //get contact module
        $app->get('/:id', function ($id) use ($app) {
            $response = getContactModule($id);
            if ($response == false) $app->notFound();
            jsonResponse($response);
        });

        //update contact module
        $app->post('/:id', 'authenticateUser', function ($id) use ($app) {
            $json = $app->request->getBody();
            $data = json_decode($json, true);
            updateContactModule($id, $data['title'], $data['topic']);
        });

        //delete contact module
        $app->delete('/:id', 'authenticateUser', function ($id) {
            deleteContactModule($id);
        });

    });

    //group for instagram modules
    $app->group('/instagram', function () use ($app) {

        //create instagram module
        $app->post('', 'authenticateUser', function () use ($app) {
            $json = $app->request->getBody();
            $data = json_decode($json, true);
            createInstagramModule($data['pageTopic'], $data['maxPhotos'], $data['title'], $data['filterOutTags'], $data['filterForTags'], $data['tags']);
        });

        //get instagram module
        $app->get('/:id', function ($id) use ($app) {
            $response = getInstagramModule($id);
            if ($response == false) $app->notFound();
            jsonResponse($response);
        });

        //update instagram module
        $app->post('/:id', 'authenticateUser', function ($id) use ($app) {
            $json = $app->request->getBody();
            $data = json_decode($json, true);
            updateInstagramModule($id, $data['title'], $data['maxPhotos'], $data['filterOutTags'], $data['filterForTags'], $data['tags']);
        });

        //delete instagram module
        $app->delete('/:id', 'authenticateUser', function ($id) {
            deleteInstagramModule($id);
        });

    });

    //group for staff modules
    $app->group('/staff', function () use ($app) {

        //create staff module
        $app->post('', 'authenticateUser', function () use ($app) {
            $json = $app->request->getBody();
            $data = json_decode($json, true);
            createStaffModule($data['pageTopic'], $data['title'], $data['employees']);
        });

        //get staff module
        $app->get('/:id', function ($id) use ($app) {
            $response = getStaffModule($id);
            if ($response == false) $app->notFound();
            jsonResponse($response);
        });

        //update staff module
        $app->post('/:id', 'authenticateUser', function ($id) use ($app) {
            $json = $app->request->getBody();
            $data = json_decode($json, true);
            updateStaffModule($id, $data['title'], $data['employees']);
        });

        //delete staff module
        $app->delete('/:id', 'authenticateUser', function ($id) {
            deleteStaffModule($id);
        });

        //upload employee image
        $app->post('/employee/image', 'authenticateUser', function () use ($app) {
            uploadEmployeeImage();
        });

    });

});

//group for pages (requires module group loaded before)
$app->group('/page', function () use ($app) {

    //get page
    $app->get('/:topic', function ($topic) use ($app) {

        //first check if topic exists
        $topics = getTopics();
        $inArray = false;
        foreach($topics as $topicsSection){
            foreach($topicsSection as $topicObj){
                if($topicObj->id == $topic) $inArray = true;
            }
        }
        if(!$inArray) $app->notFound(); //TODO deep search in object structure

        //then process actual request
        $response = getPage($topic);

        //204 if there is an empty but valid result
        if (sizeOf($response->modules) == 0) header('HTTP/1.1 204 No Content', true, 204);

        jsonResponse($response);
    });

});

//group for topics
$app->group('/topic', function () use ($app) {

    //get all topics
    $app->get('', function () {
        $response = getTopics();
        jsonResponse($response);
    });

});

//TODO (1.0.1) find a way to secure this (jwt's are no option, i think?)
//send mail
$app->post('/mail', function () use ($app) {
    $json = $app->request->getBody();
    $data = json_decode($json, true);
    $response = sendContactMail($data['name'], $data['email'], $data['message'], $data['topic']);
    jsonResponse($response);
});

//group for authentication
$app->group('/auth', function () use ($app) {

    //get jwt
    $app->get('/request', function () use ($app) {
        $response = getJWT();
        jsonResponse($response);
    });

    //refresh jwt
    $app->post('/refresh', function () use ($app) {
        $json = $app->request->getBody();
        $data = json_decode($json, true);
        $response = refreshJWT($data['jwt']);
        jsonResponse($response);
    });

});


//group for utility functions
$app->group('/util', function () use ($app) {

    //upload file
    $app->post('/fileupload', 'authenticateUser', function () use ($app) {
        fileupload();
    });

});

//run app
$app->run();