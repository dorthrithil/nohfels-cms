<?php

function sendContactMail($name, $email, $message){
    $mail = new PHPMailer;

    $mail->isSMTP();                                      // Set mailer to use SMTP
    $mail->Host = 'smtp.strato.de';  // Specify main and backup SMTP servers
    $mail->SMTPAuth = true;                               // Enable SMTP authentication
    $mail->Username = 'test@amnohfels.de';                 // SMTP username
    $mail->Password = 'konrad123!';                           // SMTP password
    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    $mail->Port = 587;                                    // TCP port to connect to

    $mail->From = $email;
    $mail->FromName = $name;
    $mail->addAddress('felix@feblog.de', 'Felix Engelmann');     // Add a recipient
    $mail->addReplyTo('info@example.com', 'Information');

    $mail->isHTML(true);                                  // Set email format to HTML

    $mail->Subject = 'Here is the subject';
    $mail->Body    = 'This is the HTML message body <b>in bold!</b>' . $message;
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients' . $message;

    if(!$mail->send()) {
//        $response = 'Message could not be sent.';
//        $response .= 'Mailer Error: ' . $mail->ErrorInfo;
        //TODO logging
        return 'Message could not be sent.';
    } else {
        header('HTTP/ 205 mail successfully sent');
        return 'Cheer up! The job is done!';
    }
}