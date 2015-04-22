<?php
$config = $yaml->parse(file_get_contents('config.yaml'));

$conf_admin_mail = $config['admin-mail'];
$conf_admin_name = $config['admin-name'];

$conf_smtp_host = $config['smtp-host'];
$conf_smtp_username = $config['smtp-username'];
$conf_smtp_password = $config['smtp-password'];