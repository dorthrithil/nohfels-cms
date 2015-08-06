# amnohfels
This project exists mainly for creating the new web appearance of Am Nohfels @[http://amnohfels.de](amnohfels.de)<br>
If it turns out good, the system may be maintained and documented. So if you like it and want to use the code, go for it. 

## Some resources

* Typecast project: [http://typecast.com/c7q4cn7NL9/amnohfels-de](http://typecast.com/c7q4cn7NL9/amnohfels-de)

## Used technologies, frameworks etc.

### Client

* Frontend: angular.js, bootstrap, velocity.js, yeoman (bower, grunt)
* Backend: angular.js, bootstrap, textAngular, angularBootstrapSlider, ngTagsInput, angularFileUpload, yeoman (bower, grunt)

### Server

* slim, imagine, composer, mySQL

## Config

Configuration goes into a simple yaml file which must be located in the server root directory. This is the config files markup:

 	#admin

 	admin-mail: YOUR_MAIL
  	admin-name: YOUR_NAME

  	#smtp server

  	smtp-host : YOUR_SMTP_HOST
  	smtp-username : YOUR_SMTP_USERNAME
  	smtp-password : YOUR_SMTP_PASSWORD
  	
	#mysql server

	mysql-host : YOUR_MYSQL_HOST
	mysql-username : YOUR_MYSQL_USERNAME
	mysql-password : YOUR_MYSQL_PASSWORD
	mysql-database : YOUR_MYSQL_DATABASE
  	
  	#ywt
  	
  	ywt-key : YOUR_PRIVATE_YWT_KEY  #used for encryption & decryption of JSON Web Tokens
  	
  	# filesize restrictions

	# set the maximal filesize of uploaded images and files in bytes. set to zero to allow any filesize.
	# !! make sure to set this on the client too to prevent inconsistencies !!

	max-filesize : 0
	max-image-filesize : 0
