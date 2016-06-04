<?php
namespace SoL\Controllers;

//require_once 'phink/mvc/controller.php';
//require_once 'phink/core/log.php';
//require_once 'phink/crypto/crypto.php';

use Phink\MVC\TPartialController;
use Phink\Crypto\TCrypto;

/**
 * Description of logme
 *
 * @author david
 */

 class Token extends TPartialController {
   //put your code here
    
    protected $label = 'Token';
    protected $token = '';
    
    
    public function setLabel($value) {
        $this->label = $value;
    }
    
    public function getLabel() {
        return $this->label;
    }
    
    public function showToken() {
        $this->token = TCrypto::generateToken();
    }
    
}
