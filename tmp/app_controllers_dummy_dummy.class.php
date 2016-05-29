<?php

namespace Something;

//require_once 'phink/mvc/partial_controller.php';

use Phink\Web\UI\TControl;

/**
 * Description of dummy
 *
 * @author david
 */


class Dummy extends TControl {

////put your code here
    protected $text = "Player";
    
    public function load() {
        //$this->text ;
    }
    
    public function setText($value) {
        $this->text = $value;
    }
    
    public function getText() {
        return $this->text;
    }
    
    public function getUserByName($userName) {
        
        //$options = ['location' => 'http://www.SoL.loc/app/webservices/user.php', 'uri' => 'http://www.SoL.loc'];
        $options = ['location' => 'http://localhost/webservice/user/soap-server.php', 'uri' => 'http://localhost'];
        
        try {
            $client = new \SoapClient(null, $options);
            //$client = new \SoapClient('http://localhost/webservice/user/wsdl');
            
            $user = $client->getUserByName($userName);  
            
            $this->text = json_encode($user);
            
        } catch (\SoapFault $ex) {
            $this->text = var_dump($ex, TRUE);
        }
    }	public function createObjects() {	}	public function declareObjects() {	}	public function afterBindingObjects() {	}	public function displayHtml() {?><div>
    <h1><?php echo $this->text; ?></h1>
    <h2 id="player">Choose your favorite song !</h2>
    <audio id="audio" src="" controls>
</div><?php	}}