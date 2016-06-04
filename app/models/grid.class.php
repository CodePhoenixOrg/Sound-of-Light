<?php


namespace SoL\Models;
//require_once 'phink/mvc/model.php';
//require_once 'phink/auth/authentication.php';
require_once APP_DATA . 'amarok_connection.php';


class Grid extends \Phink\MVC\TModel
{

    public function init()
    {
        $this->connector = new \SoL\Data\AmarokConnection();
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
//        $cmd->setSelectQuery($sql);
//        $cmd->setCommandText($cmd->getSelectQuery());
            
//        \Phink\Log\TLog::dump('getArtistAlbumTitle', $cmd);
                
        return $cmd;
    }

//    function connectSQLServer() {
//        $sqlConfig = new TSqlServerConfiguration('192.168.1.3', 'david', '25643152', 'Asphaltu');
//        $this->cn = new TSqlServerConnection($sqlConfig);
//
//        $this->cn->open();
//        $this->cmd = new TSqlServerCommand($this->cn);
//        $this->cmd->queries->setSelect("SELECT [EmployeeID]
//          ,[NationalIDNumber]
//          ,[ContactID]
//          ,[LoginID]
//          ,[ManagerID]
//          ,[Title]
//          ,[BirthDate] 
//          ,[MaritalStatus]
//          ,[Gender]
//          ,[HireDate]
//          ,[SalariedFlag]
//          ,[VacationHours]
//          ,[SickLeaveHours]
//          ,[CurrentFlag]
//          ,[ModifiedDate]
//        FROM [AdventureWorks].[HumanResources].[Employee]");
//    }
//
//    function connectSQLite() {
//        $sqlConfig = new TSqliteConfiguration(DOCUMENT_ROOT . 'asphaltu.db');
//        $this->cn = new TSqliteConnection($sqlConfig);
//
//        $this->cn->open();
//        $this->cmd = new TSqliteCommand($this->cn);
//        $this->cmd->getQueries()->setSelect('select * from menus');
//
//    }

    public function __destruct() {
        $this->connector->close();
    }
}