<?php

namespace Phox\Models;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//require_once 'phoenix/mvc/model.php';
//require_once 'phoenix/auth/authentication.php';
require_once APP_DATA . 'phoenix_connection.php';

/**
 * Description of login
 *
 * @author davidbl
 */
class Login extends \Phoenix\MVC\TModel {
    
    public function init() {
        $this->connector = new \Phox\Data\PhoenixConnection();
        $this->connector->open();
        \Phoenix\Log\TLog::dump('OPEN PhoenixConnection', $this->connector);        
    }

    public function getPermission($login, $password) {
        
        $result = FALSE;
        if($login != '' && $password != '') {
            $cmd = new \Phoenix\Data\Client\PDO\TPdoCommand($this->connector);
            //"SELECT usr_id FROM Alphas.dbo.t_user with (nolock) WHERE usr_login=:login and usr_password=:password"
            //"SELECT User FROM user WHERE User=:login and Password=PASSWORD(:password)"
            $stmt = $cmd->query(
                "SELECT mbr_name FROM members WHERE mbr_login=:login and mbr_password=:password"
                , ['login' => $login, 'password' => $password]
            );
            if ($row = $stmt->fetch()) {
                $cmd->closeCursor();
                $result = \Phoenix\Auth\TAuthentication::setUserToken($row[0], $login);
            }
        }
        
        \Phoenix\Log\TLog::debug('getPermission' . ' : ' . $result);
        
        return $result;
    }
    
    public function __destruct() {
        $this->connector->close();
    }

}
