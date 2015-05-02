<?php

function sendContactMail($name, $email, $message, $topic)
{
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
        //TODO logging ($mail->ErrorInfo)
        return 'Message could not be sent.';
    } else {
        header('HTTP/ 205 mail successfully sent');
        return 'Cheer up! The job is done!';
    }
}