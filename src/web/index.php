<?php
define('CUSTOM_NAMESPACE', 'SoL');
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

// require dirname(__DIR__).'/../vendor/autoload.php';
require dirname(__DIR__).'/../reload.php';

/**
 * Description of application
 *
 * @author david
 */
/*
class Index extends TWebApplication {
    //put your code here
    public static function main() {
        $app = new Index();
//        $app->setRedis(
//            ['host' => '192.168.1.8',
//            'port' => 6379,
//            'database' => 15]
//        );
        $app->run();
    }
}
*/
// Phink\Web\TWebApplication::create();
\Phink\Web\TStaticApplication::create();

