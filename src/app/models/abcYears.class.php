<?php
namespace SoL\Models;

require_once APP_DATA . 'soundlib_connection.php';

class AbcYears extends \Phink\MVC\TModel
{
    public function init()
    {
        $this->connector = new \SoL\Data\SoundLibConnection();
        $this->connector->open();
    }

    public function getYears()
    {
        $sql = <<<SELECT
SELECT DISTINCT
    trk_year AS Lettrine
FROM
    track t
        INNER JOIN
    album s ON t.alb_id = s.alb_id AND trk_year > '0'
        INNER JOIN
    artist a ON a.art_id = s.art_id
ORDER BY Lettrine
SELECT;
        
        $stmt = $this->connector->query($sql);
        
        return $stmt;
    }
}
