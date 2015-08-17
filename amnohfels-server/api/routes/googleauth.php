<?php

function googleauth(){

    global $conf_google_service_account_email;

    $token = array(
        "iss" => $conf_google_service_account_email, // email address of service account
        "scope" => "https://www.googleapis.com/auth/analytics.readonly", // permission scope
        "aud" => "https://www.googleapis.com/oauth2/v3/token", // asserted target
        "exp" => time() + 60 * 60, // time of expiration
        "iat" => time() // time of issue
    );

    $key = file_get_contents('resources/googleServiceAccKey.pem');
    $sslKey = openssl_pkey_get_private($key);
    $jwt = JWT::encode($token, $sslKey, 'RS256');

    $authInfo = new stdClass();
    $authInfo->jwt = $jwt;
    $authInfo->exp = $token["exp"];

    return $authInfo;

}