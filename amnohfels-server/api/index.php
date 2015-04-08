<?php

require_once __DIR__. '/vendor/autoload.php';

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->get('/hello/:name', function ($name) {
    echo "Hello, $name";
});

$app->post('/test/', function () use ($app) {
    $json = $app->request->getBody();
    $data = json_decode($json, true);
    echo $data['name'];
});

$app->run();
