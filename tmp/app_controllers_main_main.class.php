<?php
namespace Phox\Controllers;
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of logme
 *
 * @author david
 */
class Main extends \Phoenix\Web\UI\TControl {
    //put your code here
    protected $hostname = SERVER_ROOT;

    public function load() {
        if(HTTP_HOST == 'localhost') {
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
<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title>Project Phoenix</title>
    <!--meta name="viewport" content="width=device-width, initial-scale=1.0" -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="css/jquery-ui.css" rel="stylesheet">
    <link href="css/jquery-ui.structure.css" rel="stylesheet">
    <link href="css/jquery-ui.theme.css" rel="stylesheet" />
    <!--link href="css/jquerysctipttop.css" rel="stylesheet"-->
    <!--link href="css/multiaccordion.jquery.css" rel="stylesheet"-->
    <link href="css/docs.css" rel="stylesheet">
    <link href="css/prettify.css" rel="stylesheet">
    <!--link href="css/jumbotron.css" rel="stylesheet" -->
    <link href="css/full-slider.css" rel="stylesheet">
    <!--link href="css/drag-and-drop.css" rel="stylesheet"-->

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="js/html5shiv.js"></script>
    <![endif]-->

    <style type="text/css" id="holderjs-style">.holderjs-fluid {font-size:16px;font-weight:bold;text-align:center;font-family:sans-serif;margin:0}</style>
    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script type="text/javascript" src="app/phox.js"></script>
    <script type="text/javascript" src='<?php echo $this->hostname; ?>/js/ladmin.js'></script>

</head>

<body data-twttr-rendered="true" data-spy="scroll" >
</body>
</html>
<?php	}}