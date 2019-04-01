<?php

namespace SoL\Controllers;

//require_once 'phink/mvc/partial_controller.php';

use Phink\Web\UI\TControl;

/**
 * Description of dummy
 *
 * @author david
 */


class Dummy extends TControl {

////put your code here
    protected $text = "Sound of Light";
    protected $anchor = '';

    public function setAnchor($value)
    {
        $this->anchor = $value;
    }
 
    public function load()
    {
        //$this->text ;
    }
    
    public function setText($value)
    {
        $this->text = $value;
    }
    
    public function getText()
    {
        return $this->text;
    }
    
    public function getUserByName($userName)
    {
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
    }

	public function createObjects() {

	}

	public function declareObjects() {

	}

	public function displayHtml() {
?>
<div class="center-height">
    <div id="logo">
        <a href="javascript:solDummy.goHome();">
            <img src="/media/images/wmap.png" height="100%" width="100%"/>
        </a>
    </div>
    <div id="audioControl" >
        <audio id="playerControl" src="" controls ontimeupdate="solDummy.update(this)" />
        <a class="audio-control" href="#" onclick="solDummy.play(this)">
            <span class="fa-stack fa-4x center-height">
                <i class="fa fa-circle fa-stack-2x text-primary"></i>
                <i id="playButton" class="fa fa-play fa-stack-1x fa-inverse"></i>
            </span>
        </a>
        <a class="audio-control" href="#" onclick="solDummy.resume()">
            <span class="fa-stack fa-4x center-height">
                <i class="fa fa-circle fa-stack-2x text-primary"></i>
                <i class="fa fa-forward fa-stack-1x fa-inverse"></i>
            </span>           
        </a>
        <div class="audio-control">
            <div id="progressBarControl">
                <div id="progressBar">Pas de lecture</div>
            </div>
        </div>
        <div class="audio-control">
            <span id="progressTime">00:00</span>
        </div>
    </div>
</div>
<div  class="clearBlock"></div>

<?php
	}
}
