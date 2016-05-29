<?php
namespace SoL\Controllers;

/**
 * Description of logme
 *
 * @author david
 */

 class Home extends \Phink\Web\UI\TControl {
    //put your code here

    protected $dummy;
    protected $grid0;
    
    public function wikiArtist($artist)
    {
        $this->request->addSubRequest('wiki', 'https://en.wikipedia.org/wiki/' . $artist);
        
        try {
            $result = $this->request->execSubRequests();
            $wiki = $result['wiki'];
            $wikiHtml = ($wiki['html']) ? $wiki['html'] : '';

            $view = '<div>NOTHING</div>';
            if($wikiHtml != '') {
                $a = strpos($wikiHtml, '<div id="bodyContent"');
                $b = strpos($wikiHtml, '<div id="mw-navigation"');
                
                $view = substr($wikiHtml, $a, $b - $a);
                
            }
            
            file_put_contents(TMP_DIR . DIRECTORY_SEPARATOR . str_replace(' ', '_', $artist) . '.html', $view);

            $this->response->setData('view', $view);
            $this->response->setReturn(200);
        } catch (\Exception $ex) {
            $this->response->setData('view', print_r($ex, true));
            $this->response->setReturn(202);
        }
            
        
    }

	public function createObjects() {\Phink\TAutoloader::import("dummy");\Phink\TAutoloader::import("grid");$this->setId("home"); $this->dummy = new \Something\Dummy($this); $this->dummy->setId("dummy"); $this->grid0 = new \SoL\Controllers\Grid($this); $this->grid0->setId("grid0"); 	}	public function declareObjects() {$this->addChild($this->dummy);$this->grid0->setAnchor("#grid"); $this->grid0->setPageCount(10); $this->addChild($this->grid0);	}	public function afterBindingObjects() {	}	public function displayHtml() {?><script>TWebObject.getCSS('http://www.sound-of-light.loc/app/views/home/home.css');</script><script data-getscript='itsme' src='http://www.sound-of-light.loc/app/controllers/home/home.js'></script><div class="container-fluid">
    <div class="row-fluid">
        <div class="page-header">
            <?php $this->dummy->render(); ?>
        </div>
    </div>
        <!--left-->
        <div class="col-sm-3">
            <?php $this->grid0->render(); ?>
        </div><!--/left-->

        <!--center-->
        <div class="col-sm-6">
            <div id="wikipedia" width="100%" height="100%" frameborder="0" 
                    style="overflow: visible; height: 960px; width: 100%; position: relative;">
            </div>
            <!--onload="TUtils.resizeIframe(this)"-->
        </div><!--/center-->

        <!--right-->
        <div class="col-sm-3 ">
            <h2>Playlist</h2>
            <div id="dropper" >
                <h1> DROP HERE </h1>
            </div>
            <hr>
        </div><!--/right-->
        <hr>        
</div>
<div id="token" class="panel panel-default">
</div>
<?php	}}