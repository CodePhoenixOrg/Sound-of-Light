<?php
namespace SoL\Models;

require_once APP_DATA . 'soundlib_connection.php';

class AbcArtists extends \Phink\MVC\TModel
{

    public function init()
    {
        $this->connector = new \SoL\Data\SoundLibConnection();
        $this->connector->open();
    }

    public function getLettrines()
    {
        $sql = <<<SELECT
SELECT DISTINCT
CASE WHEN (SUBSTR(a.art_name, 1, 1)) BETWEEN 'A' AND 'Z' THEN  SUBSTR(a.art_name, 1, 1)
ELSE '#' END
AS Lettrine
FROM
    track t
        INNER JOIN
    album s ON t.alb_id = s.alb_id
        INNER JOIN
    artist a ON a.art_id = s.art_id
WHERE a.art_name IS NOT NULL
ORDER BY Lettrine
SELECT;
    
        $stmt = $this->connector->query($sql);
        
        return $stmt;
    }

}
