<?php

function getJWT($email, $passwordRequest)
{
    //response message for unauthorized requests
    $unauthorizedMessage = "Diese Kombination aus Passwort und E-Mail Adresse existiert nicht!";

    //get password for requested user from database
    $passwordCheck = '';
    $connection = getConnection();
    try {
        $result = $connection->query("SELECT password FROM users WHERE email = '$email'");
        if (!$result) {
            throw new Exception($connection->error);
        } else {
            //if the user isn't found: quit
            if (mysqli_num_rows($result) == 0){
                header('HTTP/1.0 401 Unauthorized');
                return $unauthorizedMessage;
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
    if(md5($passwordRequest) != $passwordCheck){
        header('HTTP/1.0 401 Unauthorized');
        return $unauthorizedMessage;
    }

    //otherwise: send jwt
    $key = "encodeme";
    $token = array(
        "iss" => $email,
        "sub" => "amnohfels authentification",
        "exp" => time() + 10,
        "iat" => time(),
        "nbf" => time()
    );
    $jwt = JWT::encode($token, $key);
    return $jwt;
}