<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
namespace SoL\Data;

/**
 * Description of connection
 *
 * @author david
 */
class SoundLibConnection extends \Phink\Data\Client\PDO\TPdoConnection {
    public function __construct() {
        $config = new \Phink\Data\Client\PDO\TPdoConfiguration();
        $config->loadConfiguration(APP_DATA . 'soundlib_conf.json');

        parent::__construct($config);
    }
}
