<?php
namespace SoL\Models;

require_once APP_DATA . 'amarok_connection.php';
require_once APP_DATA . 'soundlib_connection.php';

class Player extends \Phink\MVC\TModel {

    public function init()
    {
        $this->connector = new \SoL\Data\SoundLibConnection();
        $this->connector->open();
    }

    public function getArtistRange()
    {
        $sql = <<<SELECT
SELECT DISTINCT
         y.name as year
    FROM
        tracks t
    INNER JOIN albums s ON t.album = s.id
    INNER JOIN years y ON t.year = y.id AND y.name > '0'
    INNER JOIN artists a ON a.id = s.artist
    ORDER BY y.name

SELECT;
        
        $cmd = new \Phink\Data\Client\PDO\TPdoCommand($this->connector);
        $cmd->setSelectQuery($sql);
        
        return $cmd;
    }
    
    public function getArtistAlbumTitle(array $artistRange = null)
    {
        //$sqlConfig = new TPdoConfiguration("pf8-mysql.online.net", "asphaltu", "1p2+ar", "asphaltu");
        //$sqlConfig = new TPdoConfiguration("192.168.1.1", "wfuser", "25643152", "asphaltu");
        $range = '';
        if($artistRange != null) {
            $range = 'AND y.name IN (' . implode(', ', $artistRange) . ')';
        }
        
        $sql = <<<SELECT
SELECT 
    trk_year AS 'Year',
    a.art_id AS 'ArtistId',
    art_name AS 'Artist',
    s.alb_id AS 'AlbumId',
    alb_title AS 'Album',
    trk_id AS 'TitleId',
    trk_title AS 'Title'
FROM
    track t
        INNER JOIN
    album s ON t.alb_id = s.alb_id
        INNER JOIN
    artists a ON a.art_id = s.art_id $range
ORDER BY trk_year, art_name, trk_id
SELECT;

        $cmd = new \Phink\Data\Client\PDO\TPdoCommand($this->connector);
        $cmd->setSelectQuery($sql);
//        $cmd->setSelectQuery($sql);
//        $cmd->setCommandText($cmd->getSelectQuery());
            
//        \Phink\Log\TLog::dump('getArtistAlbumTitle', $cmd);
                
        return $cmd;
    }    
}
