# DIGITAX (WEB)

DigiTax web is an online service designed to help individuals and/or companies prepare for and file income, corporate and similar tax returns. DigiTax streamlines the process of filing taxes by walking the user through tax forms and issues and also automatically calculates the individual's or company's tax obligations.  

[![GitHub issues](https://img.shields.io/github/issues/Leroyal/DT-DIGITAX-WEBSITE)](https://github.com/Leroyal/DT-DIGITAX-WEBSITE/issues) [![Build Status](https://github.com/Leroyal/DT-DIGITAX-WEBSITE/workflows/CI/badge.svg)](https://github.com/Leroyal/DT-DIGITAX-WEBSITE/workflows/CI/badge.svg)

## Table of Contents

* [Technical Information](#technical-information)
    * [Framework](#framework)
    * [Version](#version)
    * [Installation](#installation)
    * [Theme Integration](#theme-integration)
    * [Create Routing](#create-routing)
    * [Create Controllers](#create-controllers)
    * [Create View Pages](#create-view-pages)
    * [For Login](#login)    
    * [For Dashboard](#dashboard)
* [Error Handling](#error-handling)
* [CHANGELOG](#changelog)

<a name="technical-information"></a>
## Technical Information


### Framework	: Codeigniter

### Version	: 3.1.11

### Installation

1. 	Download Codeigniter current version(3.1.11) from the Codeigniter official site i.e. "https://codeigniter.com/en/download". Change the folder name to "<insert folder name>"
2. 	Keep your project within htdocs.
3. 	Go to config folder. Open config.php and change your configurations.
4. 	Under config folder open database.php and change database credentials like 'host','login', 'password','database' according to your local setup.
5. 	Run the project in browser like 'localhost/developer.tatumgames.com'. You can see codeigniter default page.
6. 	


### Theme Integration

1. Copy all the assets from theme and paste them under assets(path: public=>assets) folder.
2. Have a look in the Controller section. There is a Common Controller and others.

### Create Routing

Go to routes.php under Config folder and change the "default_controller" to login.

### Create Controllers

	1.	Create controller "Login" and "Dashboard" with extending Commoncontroller.
	2. 	Write functions in Controllers with common function index().

### Create View Pages

Controller name and view folder name will be same. In every view folder create index.ctp file for the page wise content. If controller name is Login, then view folder name will be "login"; If controller name is Dashboard, then view folder name will be "dashboard".

### For Login

 1. Paste the body content from auth-login.html to the path views=>login=>index.php.
 2. Create signup.php same as before.

### For Dashboard

The body content of index.html will be divided into different parts like "topnav.php", "leftpanel.php", "footer.php" and the main page content; These three pages will be created under "layout" of views Folder. The contents of "topnav.php", "leftpanel.php", "footer.php" are common for all pages after login, you have to call these three pages in every index.php.

 1. Paste the body content from index.html to the path views=>dashboard=>index.php.
 
 
<a name="error-handling"></a>
## Error Handling

If you are encountering a WordPress error, don't panic! Here is a list of common issues and how to solve them.

### The White Screen of Death

Both PHP errors and database errors can manifest as a white screen, a blank screen with no information, commonly known in the WordPress community as the WordPress White Screen of Death (WSOD).

There are a number of reasons for the WordPress white screen of death:

* A Plugin is causing compatibility issues. If you can access the Administration Screens try deactivating all of your Plugins and then reactivating them one by one. If you are unable to access your Screens, log in to your website via FTP. Locate the folder wp-content/plugins and rename the Plugin folder plugins_old. This will deactivate all of your Plugins.

* Your Theme may be causing the problem. This is especially likely if you are experiencing the white screen of death after you have just activated a new Theme, or created a New Site in a WordPress Network. Log in to the WordPress Administration Screens and activate the default WordPress Theme (e.g. Twenty Seventeen). If you can’t access your Administration Screens, access your website via FTP and navigate to the /wp-content/themes/ folder. Rename the folder for the active Theme.

### Error Establishing Database Connection

If you get a page featuring the message “Error Establishing Database Connection,” this means that there is a problem with the connection to your database and there could be a number of reasons for this. The following are possible reasons and solutions.

#### 1 - Incorrect wp-config.php Information
“Error establishing a database connection” is usually caused by an error in your wp-config.php file. Access your site in your FTP client. Open up wp-config.php and ensure that the following are correct:

* Database name
* Database username
* Database password
* Database host

#### 2 - Incorrect wp-config.php Information
The next step is to contact your web host. The following hosting issues may be causing the problem:

Your database has met its quota and has been shut down.
The server is down.
Contact your hosting provider to see if either of these issues is causing your problem.

#### 3 - Compromised Website
If you have checked wp-config.php for errors, and confirmed with your host for hosting issues, it is possible that your site has been hacked.

Scan your site with Sucuri SiteCheck to ensure that it hasn’t been compromised. If it has you should check out [My Site Was Hacked](https://wordpress.org/support/article/faq-my-site-was-hacked/).


### Connection Timed Out

The connection timed out error appears when your website is trying to do more than your server can manage. It is particularly common on shared hosting where your memory limit is restricted. Here are some things you can try:

* Deactivate all Plugins. If deactivating all the WordPress Plugins on your site resolves the issue, reactivate them one-by-one to see which plugin is causing the problem. 
* Switch to the default WordPress Theme. This should rule out any Theme-related problems.
* Increase your memory limit in wp-config.php. If you are on shared hosting you may have to ask your hosting provider to increase your memory limit for you.
* Increase the maximum execution time in your php.ini file. This is not a WordPress core file so if you are not sure how to edit it, contact your hosting provider to ask them to increase your maximum execution time. See below instructions for increasing maximum execution time.

<a name="changelog"></a>
## CHANGELOG

1. 2020-06-08: Initial release 1.0.0
