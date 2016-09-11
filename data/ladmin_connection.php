<?php

namespace SoL\Data;

class LAdminConnection extends \Phink\Data\Client\PDO\TPdoConnection {
    public function __construct() {
        $config = new \Phink\Data\Client\PDO\TPdoConfiguration(\Phink\Data\TServerType::MYSQL, 'ladmin', 'localhost', 'ladmin', '1p2+ar');
        
        parent::__construct($config);
    }
}
