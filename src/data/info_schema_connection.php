<?php

namespace SoL\Data;

//require_once 'phink/data/client/pdo/pdo_connection.php';

class InfoSchemaConnection extends \Phink\Data\Client\PDO\TPdoConnection {
    public function __construct() {
        $config = new \Phink\Data\Client\PDO\TPdoConfiguration(\Phink\Data\TServerType::MYSQL, 'information_schema', 'localhost', 'root', '1p2+ar');
        
        parent::__construct($config);
    }
}
