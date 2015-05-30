<?php

function getJWT()
{

    //check if credentials were provided
    if (!isset($_SERVER['HTTP_CREDENTIALS'])) {
        header('HTTP/1.0 401 Unauthorized');
        echo "No credentials provided";
        exit();
    }

    $credentialPieces = explode(':', $_SERVER['HTTP_CREDENTIALS']);
    $email = $credentialPieces[0];
    $passwordRequest = $credentialPieces[1];

    //get password for requested user from database
    $passwordCheck = '';
    $connection = getConnection();
    try {
        $result = $connection->query("SELECT password FROM users WHERE email = '$email'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            //if the user isn't found: quit
            if (mysqli_num_rows($result) == 0) {
                header('HTTP/1.0 401 Unauthorized');
                return 'badLoginCredentials';
            }
            while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
                $passwordCheck = $rs["password"];
            }
        }
    } catch (Exception $e) {
        echo $e->getMessage();
    }
    $connection->close();

    //if the user was found, but the password is incorrect: quit
    if (md5($passwordRequest) != $passwordCheck) {
        header('HTTP/1.0 401 Unauthorized');
        return 'badLoginCredentials';
    }

    return generateAuthInfo();
}


function authenticateUser()
{
    //check if a token was provided
    if (!isset($_SERVER['HTTP_JWT'])) {
        header('HTTP/1.0 401 Unauthorized');
        echo "No authentication token provided";
        exit();
    }

    //validate JWT
    validateJWT($_SERVER['HTTP_JWT']);
}

function refreshJWT($oldJWT)
{
    //first validate old JWT
    validateJWT($oldJWT);

    //then send a new one
    return generateAuthInfo();
}

function validateJWT($jwt)
{
    global $conf_jwt_key;

    //check if token was encoded with the right private key
    try {
        $decoded_token = JWT::decode($jwt, $conf_jwt_key, array('HS256'));
    } catch (UnexpectedValueException $ex) {
        header('HTTP/1.0 401 Unauthorized');
        echo "Invalid token (1)";
        exit();
    }

    //validate claims
    if ($decoded_token->sub != "amnohfels authentification"
        || $decoded_token->exp <= time()
        || $decoded_token->nbf > time()
    ) {
        header('HTTP/1.0 401 Unauthorized');
        echo "Invalid token (2)";
        exit();
    }
}

function generateAuthInfo()
{
    global $conf_jwt_key;

    $token = array(
        "sub" => "amnohfels authentification",
        "exp" => time() + 60 * 10,
        "nbf" => time()
    );
    $jwt = JWT::encode($token, $conf_jwt_key);

    $authInfo = new stdClass();
    $authInfo->jwt = $jwt;
    $authInfo->exp = $token["exp"];

    return $authInfo;
}