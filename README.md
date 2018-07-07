# Nohfels CMS

This project exists mainly for creating the new web appearance of Am Nohfels @https://amnohfels.de<br>

## See it in action

See the system working here https://amnohfels.de. 

## Used technologies

### Client

* Frontend: angular.js
* Backend: angular.js

### Server

* Slim server with mySQL database

## Config

Configuration goes into a simple yaml file which must be located in the server root directory. This is the config files markup:

 	# -- admin --

 	admin-mail: YOUR_MAIL
  	admin-name: YOUR_NAME

  	# -- smtp server --

  	smtp-host : YOUR_SMTP_HOST
  	smtp-username : YOUR_SMTP_USERNAME
  	smtp-password : YOUR_SMTP_PASSWORD
  	
	# -- mysql server --

	mysql-host : YOUR_MYSQL_HOST
	mysql-username : YOUR_MYSQL_USERNAME
	mysql-password : YOUR_MYSQL_PASSWORD
	mysql-database : YOUR_MYSQL_DATABASE
  	
  	# -- ywt --
  	
  	ywt-key : YOUR_PRIVATE_YWT_KEY  #used for encryption & decryption of JSON Web Tokens
  	
  	#  -- filesize restrictions --

	# set the maximal filesize of uploaded images and files in bytes. set to zero to allow any filesize.
	# make sure to set this on the client too to prevent inconsistencies

	max-filesize : 0
	max-image-filesize : 0
	
	# -- google api auth --

    # please follow the github wiki to fully setup the api authentication

    google-service-account-email : YOUR_SERVICE_ACC_EMAIL
