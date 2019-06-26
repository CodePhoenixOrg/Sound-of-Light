<?php

namespace SoL\Data;

class LAdminConnection extends \Phink\Data\Client\PDO\TPdoConnection {
    public function __construct() {
        $config = new \Phink\Data\Client\PDO\TPdoConfiguration();
        $config->loadConfiguration(APP_DATA . 'ladmin_conf.json');
        
        parent::__construct($config);
    }
}
