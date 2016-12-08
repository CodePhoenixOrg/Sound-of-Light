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
class Track extends \Phink\Rest\TRestController
{
    //put your code here    
    public function get($trackId)
    {
        $track = \SoL\Models\Track::getTrackById($trackId);
        self::$logger->dump('TRACK', $track);
        $this->response->setData($track);
    }
}
