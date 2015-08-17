<?php
//TODO (1.0.1) refactoring: make $config global, drop all these other lines

$config = $yaml->parse(file_get_contents('config.yaml'));

$conf_admin_mail = $config['admin-mail'];
$conf_admin_name = $config['admin-name'];

$conf_smtp_host = $config['smtp-host'];
$conf_smtp_username = $config['smtp-username'];
$conf_smtp_password = $config['smtp-password'];

$conf_mysql_host = $config['mysql-host'];
$conf_mysql_username = $config['mysql-username'];
$conf_mysql_password = $config['mysql-password'];
$conf_mysql_database = $config['mysql-database'];

$conf_jwt_key = $config['jwt-key'];

$conf_max_filesize = $config['max-filesize'];
$conf_max_image_filesize = $config['max-image-filesize'];

$conf_google_service_account_email = $config['google-service-account-email'];