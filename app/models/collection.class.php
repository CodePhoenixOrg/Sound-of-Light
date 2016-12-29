<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoL\Models;

require_once APP_DATA . 'soundlib_connection.php';

/**
 * Description of Collection
 *
 * @author David
 */
class Collection extends \Phink\MVC\TModel 
{
    //put your code here
    public function init()
    {
        $this->connector = new \SoL\Data\SoundLibConnection();
        $this->connector->open();
    }

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
    
    public function getArtistAlbumTitle()
    {
    
        $sql = <<<SELECT
SELECT 
    y.name AS 'Year',
    a.id AS 'ArtistId',
    a.name AS 'Artist',
    s.id AS 'AlbumId',
    s.name AS 'Album',
    t.id AS 'TitleId',
    t.title AS 'Title',
    u.rpath AS 'TrackPath'
    
FROM
    tracks t
        INNER JOIN
    urls u ON t.url = u.id
        INNER JOIN
    albums s ON t.album = s.id
        INNER JOIN
    years y ON t.year = y.id 
        INNER JOIN
    artists a ON a.id = s.artist $range
ORDER BY y.name, a.name, t.year, t.id
SELECT;

        $cmd = new \Phink\Data\Client\PDO\TPdoCommand($this->connector);
        $cmd->setSelectQuery($sql);
                
        return $cmd;
    }

    public function getArtistAlbumTitleByLetter($letter)
    {
      
        $sql = <<<SELECT
SELECT 
    trk_year AS 'Year',
    a.art_id AS 'ArtistId',
    art_name AS 'Artist',
    s.alb_id AS 'AlbumId',
    alb_name AS 'Album',
    t.trk_id AS 'TitleId',
    trk_title AS 'Title',
    trk_path AS 'TrackPath'
    
FROM
    track t
        INNER JOIN
    album s ON t.alb_id = s.alb_id
        INNER JOIN
    artist a ON t.art_id = a.art_id
WHERE SUBSTRING(art_name, 1, 1) = '$letter' AND trk_year > '0'
ORDER BY trk_year, art_name, t.trk_id
SELECT;

        $cmd = new \Phink\Data\Client\PDO\TPdoCommand($this->connector);
        $cmd->setSelectQuery($sql);
                
        return $cmd;
    }

    public function getAlbumTitleByLetter($letter)
    {
      
        $sql = <<<SELECT
SELECT 
    trk_year AS 'Year',
    a.art_id AS 'ArtistId',
    art_name AS 'Artist',
    s.alb_id AS 'AlbumId',
    alb_name AS 'Album',
    t.trk_id AS 'TitleId',
    trk_title AS 'Title',
    trk_path AS 'TrackPath'
    
FROM
    track t
        INNER JOIN
    album s ON t.alb_id = s.alb_id
        INNER JOIN
    artist a ON t.art_id = a.art_id
WHERE SUBSTRING(alb_name, 1, 1) = '$letter' AND trk_year > '0'
ORDER BY trk_year, art_name, t.trk_id
SELECT;

        $cmd = new \Phink\Data\Client\PDO\TPdoCommand($this->connector);
        $cmd->setSelectQuery($sql);
                
        return $cmd;
    }

    public function getAlbumTitleByYear($year)
    {
      
        $sql = <<<SELECT
SELECT 
    trk_year AS 'Year',
    a.art_id AS 'ArtistId',
    art_name AS 'Artist',
    s.alb_id AS 'AlbumId',
    alb_name AS 'Album',
    t.trk_id AS 'TitleId',
    trk_title AS 'Title',
    trk_path AS 'TrackPath'
    
FROM
    track t
        INNER JOIN
    album s ON t.alb_id = s.alb_id
        INNER JOIN
    artist a ON t.art_id = a.art_id
WHERE trk_year = '$year'
ORDER BY trk_year, art_name, t.trk_id
SELECT;

        $cmd = new \Phink\Data\Client\PDO\TPdoCommand($this->connector);
        $cmd->setSelectQuery($sql);
                
        return $cmd;
    }

    public function __destruct() {
        $this->connector->close();
    }    

}
