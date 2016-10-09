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
class Playlist
{
    //put your code here
    public static function getUserFavorites($userId)
    {
        $result = [];
        $result['playlist'] = [];
        $result['pid'] = 0;
        
        $cnn = new \SoL\Data\SoundLibConnection();
        $stmt = $cnn->open();
        
        $sql = <<<SELECT
select p.pls_id as pid, plc_id as id, art_name as artist, trk_title as title, trk_duration as duration
from user u
left join playlist p on p.usr_id = u.usr_id
left join playlist_content c on c.pls_id = p.pls_id
left join track t on c.trk_id = t.trk_id
left join artist a on t.art_id = a.art_id
where u.usr_id = :userId
SELECT;
         
        $res = $stmt->prepare($sql);
        $res->execute([':userId' => $userId]);

        while ($row = $res->fetch(\PDO::FETCH_OBJ)) {
            $result['pid'] = $row->pid;
            array_push($result['playlist'], ['id' => $row->id,'artist' => $row->artist, 'title' => $row->title, 'duration' => $row->duration]);
        }
        
        return $result;
    }
    
    public static function addTrack($playlist, $trackId)
    {
        //\SoundLib\Lib\Log::debug('GOING TO ADD : ' . print_r(['playlist' => $playlist, 'trackId' => $trackId], true));

        $cnn = new Connection();
        $stmt = $cnn->open();
        
        $sql = <<<INSERT
insert into playlist_content (`pls_id`, `trk_id`) values(:playlist, :trackId)
INSERT;
        
        $res = $stmt->prepare($sql);
        $res->execute([':playlist' => $playlist, ':trackId' => $trackId]);
        
        $affectedRows = $res->rowCount();
        
        return ['inserted' => $affectedRows, 'playlist' => $playlist, 'trackId' => $trackId];
    }
    
    public static function removeTrack($trackId)
    {
        $cnn = new Connection();
        $stmt = $cnn->open();
        
        $sql = <<<DELETE
delete from playlist_content where plc_id = :trackId
DELETE;
        
        $res = $stmt->prepare($sql);
        $res->execute([':trackId' => $trackId]);
        
        $affectedRows = $res->rowCount();
        
        return ['deleted' => $affectedRows, 'trackId' => $trackId];
    }
}
