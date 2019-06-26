<?php

namespace SoL\Data;

//require_once 'phink/data/client/pdo/pdo_connection.php';

class InfoSchemaConnection extends \Phink\Data\Client\PDO\TPdoConnection {
    public function __construct() {
        $config = new \Phink\Data\Client\PDO\TPdoConfiguration();
        $config->loadConfiguration(APP_DATA . 'info_schema_conf.json');
        
        parent::__construct($config);
    }
}
