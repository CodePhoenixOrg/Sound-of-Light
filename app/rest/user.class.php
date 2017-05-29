<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoL\Rest;

/**
 * Description of user
 *
 * @author David
 */
class User extends \Phink\Rest\TRestController
{
    public $userId;
    
    //put your code here
    public function get()
    {
        $info = \SoL\Models\User::getInfo($this->userId);
        $this->response->setData($info);
    }    

    public function head()
    {
        $info = \SoL\Models\User::getInfo($this->userId);
        $this->response->setData($info);
    } 
    
}
