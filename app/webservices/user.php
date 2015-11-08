<?php

require_once 'phoenix/core/application.php';

//namespace Detroit\App\Webservices;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

include APP_BUSINESS . 'user.php';

/**
 * Description of user
 *
 * @author david
 */
$options = ['uri' => 'http://www,detroit.loc'];
$server = new \SoapServer(null, $options);
$server->setClass('User');
$server->handle();



