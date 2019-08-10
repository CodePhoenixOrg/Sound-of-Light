<?php
namespace SoL\Controllers;

use Phink\MVC\TPartialController;
use Phink\Crypto\TCrypto;

/**
 * Description of logme
 *
 * @author david
 */

 class Token extends TPartialController 
{
   //put your code here
    
    protected $label = 'Token';
    protected $token = '';
    
    public function setLabel(string $value) : void
    {
        $this->label = $value;
    }
    
    public function getLabel() : string
    {
        return $this->label;
    }
    
    public function showToken() : void
    {
        $this->token = TCrypto::generateToken();
    }
    
}
