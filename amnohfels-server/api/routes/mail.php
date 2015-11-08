<?php

//TODO when the passwor is wrong, clients dosen't display an error page

function sendContactMail($name, $email, $message, $topic, $termsOfService, $homepage)
{
    // check for filled out bot trap fields
    if($termsOfService != false || $homepage != ''){
        // spoof successful try
        return '205 Reset Content';
    }

    global $conf_admin_name,
           $conf_admin_mail,
           $conf_smtp_host,
           $conf_smtp_username,
           $conf_smtp_password;

    $mail = new PHPMailer;

    $mail->isSMTP(); // Set mailer to use SMTP
    $mail->Host = $conf_smtp_host; // Specify main and backup SMTP servers
    $mail->SMTPAuth = true; // Enable SMTP authentication
    $mail->Username = $conf_smtp_username; // SMTP username
    $mail->Password = $conf_smtp_password; // SMTP password
    $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587; // TCP port to connect to

    $mail->From = $email;
    $mail->FromName = $name;
    $mail->addAddress($conf_admin_mail, $conf_admin_name); // Add a recipient
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true); // Set email format to HTML

    $mail->Subject = "Neue Nachricht von $name aus dem Kontaktforumlar zum Thema \"$topic\"";
    $mail->Body = $message;
    $mail->AltBody = $message;

    if (!$mail->send()) {
        //TODO (1.0.1) logs: logging ($mail->ErrorInfo)
        return 'Message could not be sent.';
    } else {
        return '205 Reset Content'; //ugly workaround for safaris unability to handle status 205??
    }
}