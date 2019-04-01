<?php
namespace SoL\Controllers;

/**
 * Description of logme
 *
 * @author david
 */

class Player extends \Phink\Web\UI\TControl
{
    //put your code here

    protected $dummy = null;
    protected $collection0 = null;
    protected $playlist0 = null;
    private $_cacheFilename = '';

    public function init()
    {
    }

    public function showPlayerByArtist($letter)
    {
        $this->collection0->showArtistsByLetter($letter);
        self::$logger->debug('LETTER::' . $letter);
        $this->playlist0->showPlaylist(1);
    }
    
    public function showPlayerByAlbum($letter)
    {
        $this->collection0->showAlbumsByLetter($letter);
        self::$logger->debug('LETTER::' . $letter);
        $this->playlist0->showPlaylist(1);

    }
    
    public function showPlayerByDate($year)
    {
        $this->collection0->showAlbumsByDate($year);
        self::$logger->debug('YEAR::' . $year);
        $this->playlist0->showPlaylist(1);
    }
    
    public function wikiArtist($artist)
    {
        
        $res = $this->_getWikiCache($artist . '_(band)');
        if($res[0] === 202) {
            $res = $this->_getWikiCache($artist);
        }
        
        if($res[0] === 200) {
            $this->response->setData('view', $res[1]);
            $this->response->setReturn(200);
        } elseif($res[0] === 202) {
            $res = $this->_getWiki($artist . '_(band)');
            //$res = $this->_getYoutube($artist);
            
            if($res[0] !== 1 && $res[0] !== 200) {
                if(file_exists($this->_cacheFilename)) {
                    unlink($this->_cacheFilename);
                }

                $res = $this->_getWiki($artist); 
            }

            if($res[0] === 200) {
                $this->response->setData('view', $res[1]);
                $this->response->setReturn(200);
            } elseif($res[0] === 1) {
                $this->response->setData('view', $res[1]);
                $this->response->setReturn(202);

            }
        }
        
    }
    
    private function _getWikiCache($artist)
    {
        $this->_cacheFilename = CACHE_DIR . 'wikipedia_' . str_replace(' ', '_', $artist) . '.html';
        if(file_exists($this->_cacheFilename)) {
            $view = file_get_contents($this->_cacheFilename);
            return [200, $view];
        } else {
            return [202, ''];
        }
    }
    
    private function _getWiki($artist)
    {
        $this->_cacheFilename = CACHE_DIR . 'wikipedia_' . str_replace(' ', '_', $artist) . '.html';
        $this->request->addSubRequest('wiki', 'GET', 'https://en.wikipedia.org/wiki/' . $artist);
        
        try {
            $result = $this->request->execSubRequests();
            $wiki = $result['wiki'];

            $view = '<div>NOTHING</div>';
            if($wiki->html != '') {
                $a = strpos($wiki->html, '<div id="bodyContent"');
                $b = strpos($wiki->html, '<div id="mw-navigation"');
                
                $view = substr($wiki->html, $a, $b - $a);
                $view = str_replace('a href="/', 'a target="_new" href="https://en.wikipedia.org/', $view);
                
            }
            
            file_put_contents($this->_cacheFilename, $view);

            return [$wiki->code, $view];
        } catch (\Exception $ex) {
            return [1, print_r($ex, true)];
        }        
    }
//
//    private function _getYoutube($artist) {
//        $artist = strtolower(str_replace(' ', '', str_replace('_', '', $artist)));
//        
//        $this->request->addSubRequest('youtube', 'https://www.youtube.com/user/' . $artist);
//        
//        try {
//            $result = $this->request->execSubRequests();
//            $youtube = $result['youtube'];
//
//            $view = '<div>NOTHING</div>';
//            if($youtube->html != '') {
//                $a = strpos($youtube->html, '<div id="content"');
//                $b = strpos($youtube->html, '<div id="footer-container"');
//                
//                $view = substr($youtube->html, $a, $b - $a - 18);
//                $view = str_replace('a href="/', 'a target="_new" href="https://www.youtube.com/', $view);
//                
//            }
//            
//            file_put_contents(TMP_DIR . DIRECTORY_SEPARATOR . 'youtube_' . str_replace(' ', '_', $artist) . '.html', $view);
//
//            return [$youtube->code, $view];
//        } catch (\Exception $ex) {
//            return [1, print_r($ex, true)];
//        }        
//       
//
//
//
//    }


	public function createObjects() {

\Phink\TAutoloader::import($this, "Dummy");
\Phink\TAutoloader::import($this, "Collection");
\Phink\TAutoloader::import($this, "Playlist");

$this->setId("player"); 
$this->dummy = new \SoL\Controllers\Dummy($this); 
$this->dummy->setId("dummy"); 
$this->collection0 = new \SoL\Controllers\Collection($this); 
$this->collection0->setId("collection0"); 
$this->playlist0 = new \SoL\Controllers\Playlist($this); 
$this->playlist0->setId("playlist0"); 

	}

	public function declareObjects() {

$this->addChild($this->dummy);
$this->collection0->setAnchor("#collection"); 
$this->addChild($this->collection0);
$this->playlist0->setAnchor("#playlist"); 
$this->addChild($this->playlist0);

	}

	public function displayHtml() {
?>
<div class="playerspace container-fluid">
    <header class="playerheader row-fluid">
        <div class=" player">
            <?php $this->dummy->render(); ?>
        </div>
    </header>
    <!--left-->
    <main class="playermain row-fluid">
        <div class="col-sm-3 scroll_container collection" >
            <div class="decoration">
                <?php $this->collection0->render(); ?>
            </div>
        </div><!--/left-->

        <!--center-->
        <div class="col-sm-6 scroll_container mediaspace">
            <div id="wikipedia" frameborder="0" class="scroll_mediaspace">
            </div>
        </div><!--/center-->

        <!--right-->
        <div class="col-sm-3 playlist scroll_container" >
            <span>&nbsp;&nbsp;&nbsp;Playlist</span>
            <div id="dropper" >
                <?php $this->playlist0->render(); ?>
            </div>
        </div><!--/right-->
    </main>
    <footer id="token" class="playerfooter row-fluid">
    </footer>
</div>
<?php
	}
}
