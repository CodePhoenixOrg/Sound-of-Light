<?php

namespace Phox\Data;

//require_once 'phink/data/client/pdo/pdo_connection.php';


class PhinkConnection extends \Phink\Data\Client\PDO\TPdoConnection {
    public function __construct() {
        $config = new \Phink\Data\Client\PDO\TPdoConfiguration(\Phink\Data\TServerType::MYSQL, 'ladmin', 'localhost', 'coder', '1p2+ar');
        //$config = new TPdoConfiguration(TServerType::SQLSERVER, 'Alphas', 'DELPHI', 'sa', '1p2+ar');
        parent::__construct($config);
    }
}
