<?php
namespace SoL\Models;

require_once APP_DATA . 'amarok_connection.php';

class Abc extends \Phink\MVC\TModel {

    public function init()
    {
        $this->connector = new \SoL\Data\AmarokConnection();
        $this->connector->open();
    }

    public function getYears()
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
    
    public function getLettrines()
    {
        $sql = <<<SELECT
SELECT DISTINCT
         SUBSTRING(a.name, 1, 1) as Lettrine
    FROM
        tracks t
    INNER JOIN albums s ON t.album = s.id
    INNER JOIN years y ON t.year = y.id AND y.name > '0'
    INNER JOIN artists a ON a.id = s.artist
    ORDER BY Lettrine

SELECT;
        
        $cmd = new \Phink\Data\Client\PDO\TPdoCommand($this->connector);
        $cmd->setSelectQuery($sql);
        
        return $cmd;
    }

}
