<?php

namespace SoL\Models;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//require_once 'phink/mvc/model.php';
//require_once 'phink/auth/authentication.php';
require_once APP_DATA . 'ladmin_connection.php';

/**
 * Description of login
 *
 * @author davidbl
 */
class Login extends \Phink\MVC\TModel {
    
    public function init() {
        $this->connector = new \SoL\Data\LAdminConnection();
        $this->connector->open();
        //self::$logger->dump('OPEN LAdminConnection', $this->connector);        
    }

    public function getPermission($login, $password) {
        
        $result = FALSE;
        try {
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

            //self::$logger->debug('getPermission' . ' : ' . $result);
        } catch(\Exception $ex) {
            self::$logger->exception($ex);
        }
        
        return $result;
    }
    
    public function __destruct() {
        $this->connector->close();
    }

}
