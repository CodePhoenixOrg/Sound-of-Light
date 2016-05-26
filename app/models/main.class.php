<?php

namespace Phox\Models;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once APP_DATA . 'phink_connection.php';

/**
 * Description of login
 *
 * @author davidbl
 */
class Main extends \Phink\MVC\TModel {
    
    public function init() {
        $this->connector = new \Phox\Data\PhinkConnection();
        $this->connector->open();
    }

    public function getPermission($login, $password) {
        
        $result = FALSE;
        if($login != '' && $password != '') {
            $cmd = new \Phink\Data\Client\PDO\TPdoCommand($this->connector);
            //"SELECT usr_id FROM Alphas.dbo.t_user with (nolock) WHERE usr_login=:login and usr_password=:password"
            //"SELECT User FROM user WHERE User=:login and Password=PASSWORD(:password)"
            $stmt = $cmd->query(
                "SELECT mbr_name FROM members WHERE mbr_login=:login and mbr_password=:password"
                , ['login' => $login, 'password' => $password]
            );
            if ($row = $stmt->fetch()) {
                $cmd->closeCursor();
                $result = \Phink\Auth\TAuthentication::setUserToken($row[0], $login);
            }
        }
        
//        \Phink\Log\TLog::debug(__METHOD__ . ':' . $result, __FILE__, __LINE__);
        
        return $result;
    }
    
    public function __destruct() {
        $this->connector->close();
    }

}
