<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoL\Models;

require_once APP_DATA . 'soundlib_connection.php';
/**
 * Description of Playlist
 *
 * @author David
 */
class Collection
{
    //put your code here
    public static function getAllTracks()
    {
        $result = [];
        $result['collection'] = [];
        
        $cnn = new \SoL\Data\SoundLibConnection();
        $stmt = $cnn->open();
        
        $sql = <<<SELECT
select trk_id as id, art_name as artist, trk_title as title, trk_duration as duration
from artist a
inner join track t on a.art_id = t.art_id
order by art_name, trk_title
SELECT;
        
        $res = $stmt->query($sql);
        
        while ($row = $res->fetch(\PDO::FETCH_OBJ)) {
            array_push($result['collection'], $row);
        }
        
        return $result;
    }

}
