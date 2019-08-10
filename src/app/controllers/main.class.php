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
class Main extends \Phink\MVC\TController
{
    //put your code here
    protected $hostname = SERVER_ROOT;

    public function load() : void
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
       
}
