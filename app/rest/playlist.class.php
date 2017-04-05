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
    //put your code here
    public function get($userId)
    {
        $favorites = \SoL\Models\Playlist::getUserFavorites($userId);
        $this->response->setData($favorites);
    }
 
    public function put($playlist, $trackId)
    {
        $return = \SoL\Models\Playlist::addTrack($playlist, $trackId);
        $this->response->setData($return);
    }
    
    public function delete($trackId)
    {
        $return = \SoL\Models\Playlist::removeTrack($trackId);
        $this->response->setData($return);
    }
}
