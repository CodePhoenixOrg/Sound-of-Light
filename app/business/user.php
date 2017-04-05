<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//namespace Something;

use Phink\MVC\TModel;
use Phink\Data\Client\PDO\TPdoCommand;

require_once APP_DATA . 'connection.php';

use SoL\Data\Connection;

/**
 * Description of user
 *
 * @author david
 */
class User extends TModel {
    //put your code here
    private $_name = '';
    
    public function init() {
        $this->connector = new Connection();
        $this->connector->open();
    }
    
    public function getName () {
        return $this->_name;
    }

    public function setName ($value = '') {
        $this->_name = $value;
    }
    
    public function getSelectQuery() {
        $result = "select * from t_user";
    }
    
    public function select() {
        $result = null;
        $this->_name = 'David';
        $sql = $this->getSelectQuery();

        $cmd = new TPdoCommand($this->connector);
        //"SELECT usr_id FROM Alphas.dbo.t_user with (nolock) WHERE usr_login=:login and usr_password=:password"
        //"SELECT User FROM user WHERE User=:login and Password=PASSWORD(:password)"
        $stmt = $cmd->query($sql . " WHERE usr_name=:name", ['name' => $this->_name]);
        if ($result = $stmt->fetch()) {
            $cmd->closeCursor();
        }        
        
        return $result;
    }
    
}
