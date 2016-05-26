<?php

namespace Phox\Models;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//require_once 'phink/mvc/model.php';
//require_once 'phink/auth/authentication.php';
require_once DOCUMENT_ROOT . 'data/connection.php';


use Phink\Log\TLog;
use Phink\MVC\TModel;
use Phink\Auth\TAuthentication;
use Phink\Data\Client\PDO\TPdoCommand;

use Phox\Data\Connection;
/**
 * Description of login
 *
 * @author davidbl
 */
class User extends TModel {
    
    public function init() {
        $this->connector = new Connection();
        $this->connector->open();
    }
    
    public function getSelectQuery() {
        $result = "SELECT [usr_id]
      ,[usr_name]
      ,[usr_adr1]
      ,[usr_adr2]
      ,[usr_cp]
      ,[usr_email]
      ,[usr_login]
      ,[usr_password]
  FROM [dbo].[t_user]";
        
        return $result;
    }

    public function select($params) {
        
    }


    public function getPermission($login, $password) {
        
        $result = FALSE;
       
        if($login != '' && $password != '') {
            $cmd = new TPdoCommand($this->connector);
            //"SELECT usr_id FROM Alphas.dbo.t_user with (nolock) WHERE usr_login=:login and usr_password=:password"
            //"SELECT User FROM user WHERE User=:login and Password=PASSWORD(:password)"
            $stmt = $cmd->query(
                "SELECT User FROM user WHERE User=:login and Password=PASSWORD(:password)"
                , ['login' => $login, 'password' => $password]
            );
            if ($row = $stmt->fetch()) {
                $cmd->closeCursor();
                $result = TAuthentication::setUserToken($row[0], $login);
            }
        }
        
        //TLog::debug(__METHOD__ . ':' . $result);
        
        return $result;
    }
    
    public function __destruct() {
        $this->connector->close();
    }

}
