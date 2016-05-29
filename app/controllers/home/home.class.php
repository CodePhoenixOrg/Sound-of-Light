<?php
namespace SoL\Controllers;

/**
 * Description of logme
 *
 * @author david
 */

 class Home extends \Phink\MVC\TController {
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


}