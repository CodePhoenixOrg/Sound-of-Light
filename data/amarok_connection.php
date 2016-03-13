<?php

namespace Phox\Data;

//require_once 'phoenix/data/client/pdo/pdo_connection.php';

class AmarokConnection extends \Phoenix\Data\Client\PDO\TPdoConnection {
    public function __construct() {
        $config = new \Phoenix\Data\Client\PDO\TPdoConfiguration(\Phoenix\Data\TServerType::MYSQL, 'amarokdb', 'localhost', 'amarokuser', '1p2+ar');
        //$config = new TPdoConfiguration(TServerType::SQLSERVER, 'Alphas', 'DELPHI', 'sa', '1p2+ar');
        parent::__construct($config);
    }
}
