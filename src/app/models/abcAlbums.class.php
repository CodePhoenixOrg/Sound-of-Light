<?php
namespace SoL\Models;

require_once APP_DATA . 'soundlib_connection.php';

class AbcAlbums extends \Phink\MVC\TModel
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
    IF(ASCII(SUBSTRING(s.alb_name, 1, 1)) < 48,
        '#',
        SUBSTRING(s.alb_name, 1, 1)) AS Lettrine
FROM
    track t
        INNER JOIN
    album s ON t.alb_id = s.alb_id
        INNER JOIN
    artist a ON a.art_id = s.art_id
ORDER BY Lettrine

SELECT;
        
        $cmd = new \Phink\Data\Client\PDO\TPdoCommand($this->connector);
        $cmd->setSelectQuery($sql);
        
        return $cmd;
    }

}
