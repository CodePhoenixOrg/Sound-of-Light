<?php
namespace SoL\Controllers;

/**
 * Description of logme
 *
 * @author david
 */

class Player extends \Phink\MVC\TController
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
        \Phink\Log\TLog::debug('LETTER::' . $letter);
        $this->playlist0->showPlaylist(1);
    }
    
    public function showPlayerByAlbum($letter)
    {
        $this->collection0->showAlbumsByLetter($letter);
        \Phink\Log\TLog::debug('LETTER::' . $letter);
        $this->playlist0->showPlaylist(1);

    }
    
    public function showPlayerByDate($year)
    {
        $this->collection0->showAlbumsByDate($year);
        \Phink\Log\TLog::debug('YEAR::' . $year);
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
        $this->request->addSubRequest('wiki', 'https://en.wikipedia.org/wiki/' . $artist);
        
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

}