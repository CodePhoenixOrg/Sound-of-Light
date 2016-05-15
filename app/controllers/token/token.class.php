<?php
namespace Phox\Controllers;

//require_once 'phoenix/mvc/controller.php';
//require_once 'phoenix/core/log.php';
//require_once 'phoenix/crypto/crypto.php';

use Phoenix\MVC\TPartialController;
use Phoenix\Crypto\TCrypto;

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
