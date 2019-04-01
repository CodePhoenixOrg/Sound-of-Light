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
class Main extends \Phink\Web\UI\TControl
{
    //put your code here
    protected $hostname = SERVER_ROOT;

    public function load()
    {
        if(strstr(HTTP_HOST, 'localhost')) {
            $this->hostname = 'http://localhost:8001';
        } else {
            $this->hostname = 'http://www.sodmin.loc';
        }
//        $token = $this->request->getToken();
//        $result = TAuthentication::getPermissionByToken($token);
//        if(!$result) {
//            $this->response->redirect(SERVER_ROOT);
//        }
    }
       

	public function createObjects() {

	}

	public function declareObjects() {

	}

	public function displayHtml() {
?>
<!DOCTYPE html>
<html lang="en" debug="true" >
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <title>Sound Of Light</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

        <meta name="description" content="">
        <meta name="author" content="">

        <link href="css/_3rdparty.css" rel="stylesheet">
        <link href="css/full-slider.css" rel="stylesheet">
        <link href="css/wikipedia.css" rel="stylesheet">
        <link href="css/sol.css" rel="stylesheet">

        <script type="text/javascript" 
                data-depends="js/_3rdparty.js;
                    http://ladmin.loc/js/access.js;
                    js/sol.js" 
                data-sources="js/sol_runtime.js;
                    js/debug.js" 
                src="/phink.js">
        </script>
    </head>
    <body data-twttr-rendered="true" data-spy="scroll" >
        <div id='body'></div>


    </body>
</html>
<?php
	}
}
