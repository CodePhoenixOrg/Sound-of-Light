<?php
namespace SoL\Models;

require_once APP_DATA . 'soundlib_connection.php';

class Player extends \Phink\MVC\TModel
{
    public function init()
    {
        $this->connector = new \SoL\Data\SoundLibConnection();
        $this->connector->open();
    }

    public function getArtistAlbumTitle()
    {
        $sql = <<<SQL
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
                artists a ON a.art_id = s.art_id
            ORDER BY trk_year, art_name, trk_id
            SQL;

        $stmt = $this->connector->query($sql);
        
        return $stmt;
    }
}
