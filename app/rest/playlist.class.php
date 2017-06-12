<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoL\Rest;

/**
 * Description of playlist
 *
 * @author David
 */
class Playlist extends \Phink\Rest\TRestController
{
    public $user = 1;
    public $track = 0;
    public $playlist = 1;
    
    //put your code here
    public function get()
    {
        $favorites = \SoL\Models\Playlist::getUserFavorites($this->user);
        $this->response->setData($favorites);
    }
 
    public function put()
    {
        $return = \SoL\Models\Playlist::addTrack($this->playlist, $this->track);
        self::getLogger()->debug("\SoL\Models\Playlist::addTrack($this->playlist, $this->track)");
        
        $this->response->setData($return);
    }
    
    public function delete()
    {
        $return = \SoL\Models\Playlist::removeTrack($this->track);
        $this->response->setData($return);
    }
}
