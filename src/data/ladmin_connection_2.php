<?php

namespace SoL\Data;

class LAdminConnection extends \Phink\Data\Client\PDO\TPdoConnection {
    public function __construct() {
        $dbname = APP_DATA . 'ladmin.db';
        $config = new \Phink\Data\Client\PDO\TPdoConfiguration(\Phink\Data\TServerType::SQLITE, $dbname);
        
        parent::__construct($config);
    }
}
