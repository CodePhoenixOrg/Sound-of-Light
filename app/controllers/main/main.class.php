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
class Main extends \Phoenix\MVC\TController {
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
       
}
