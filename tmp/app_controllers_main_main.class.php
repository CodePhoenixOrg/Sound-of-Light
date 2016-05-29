<?php
namespace SoL\Controllers;
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of logme
 *
 * @author david
 */
class Main extends \Phink\Web\UI\TControl {
    //put your code here
    protected $hostname = SERVER_ROOT;

    public function load() {
        if(strstr(HTTP_HOST, 'localhost')) {
            $this->hostname = 'http://localhost:8001';
        } else {
            $this->hostname = 'http://www.ladmin.loc';
        }
//        $token = $this->request->getToken();
//        $result = TAuthentication::getPermissionByToken($token);
//        if(!$result) {
//            $this->response->redirect(SERVER_ROOT);
//        }
    }
       	public function createObjects() {	}	public function declareObjects() {	}	public function afterBindingObjects() {	}	public function displayHtml() {?><!DOCTYPE html>
<html lang="en" debug="true" >
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title>Project Phink</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="css/_3rdparty.css" rel="stylesheet">
    <link href="css/full-slider.css" rel="stylesheet">

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script type="text/javascript" src="js/_3rdparty.js"></script>
    <script type="text/javascript" src="js/code_phink.js"></script>
    <!--script type="text/javascript" src="app/controllers/main/main.js"></script-->
    <script type="text/javascript" src="js/sol.js"></script>
    <script type="text/javascript" src='<?php echo $this->hostname; ?>/js/ladmin.js'></script>

</head>
<body data-twttr-rendered="true" data-spy="scroll" >
    <div id='body'></div>
    <script type="text/javascript" src="js/debug.js"></script>
</body>
</html><?php	}}