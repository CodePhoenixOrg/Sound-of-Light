<?php
include 'phink/phink_library.php';

class Pho extends \Phink\UI\TConsoleApplication {

    /**
     * Application starter
     * 
     * @param array $argv List of argunments of the command line
     * @param int $argc Count the number of these arguments
     */
    public static function main($args_v, $args_c = 0) {
        (new Pho($args_v, $args_c));
    }

    /**
     * Takes arguments of the command line in parameters.
     * The start make this job fine.
     * 
     * @param array $argv List of argunments of the command line
     * @param int $argc Count the number of these arguments
     */
    public function __construct($args_v, $args_c = 0)
    {
        $dir = dirname(__FILE__);
        parent::__construct($args_v, $args_c, $dir);
    }
    
    /**
     * Entrypoint of a TConsoleApplication
     */
    public function run()
    {
        if($this->canStop()) {
            return;
        }
        
        $this->schemaInfoTest();
    }

    public function modelTest() {
        require MODEL_ROOT . 'abcAlbums.class.php';

        try {
            $model = new \SoL\Models\AbcAlbums();
   
            //print_r($model);
            $cmd = $model->getLettrines();
            
            print_r($cmd->getSelectQuery());

            $stmt = $cmd->querySelect();
            
            $res = $stmt->fetchAll();
            print $stmt->getFieldCount() . PHP_EOL;

            print_r($res);

        } catch (\PDOException $ex) {
            var_dump($ex);
            self::$logger->exception($ex, __FILE__, __LINE__);
        }
    }
    
    public function schemaInfoTest() {
        require_once APP_DATA . 'info_schema_connection.php';

        try {
            $connector = new \SoL\Data\InfoSchemaConnection();
            $connector->open();

        } catch(Throwable $ex) {
            self::$logger->exception($ex, __FILE__, __LINE__);
        }
    }
    
    public function ladminTest() {
        require_once APP_DATA . 'ladmin_connection.php';

        $connector = new \SoL\Data\LAdminConnection();
        $connector->open();

        try {

            $cmd = new Phink\Data\Client\PDO\TPdoCommand($connector);
            $cmd->setCommandText('select * from members;');

            $stmt = $cmd->query();
            print $stmt->getFieldCount() . PHP_EOL;

            $res = $stmt->fetchAll();

            print_r($res);

        } catch (\PDOException $ex) {
            var_dump($ex);
            self::$logger->exception($ex, __FILE__, __LINE__);
        }
        
    }

    public function soundlibTest() {
        require_once APP_DATA . 'soundlib_connection.php';

        $connector = new \SoL\Data\SoundLibConnection();
        $connector->open();

        try {
  $sql = <<<SELECT
SELECT DISTINCT
CASE WHEN ((SUBSTR(s.alb_name, 1, 1))) < 'A' THEN  '#'
     WHEN ((SUBSTR(s.alb_name, 1, 1))) > 'Z' THEN  '#'
ELSE SUBSTR(s.alb_name, 1, 1) END
AS Lettrine	
FROM
    track t
        INNER JOIN
    album s ON t.alb_id = s.alb_id
        INNER JOIN
    artist a ON a.art_id = s.art_id
WHERE Lettrine IS NOT NULL
ORDER BY Lettrine
SELECT;
  
            $cmd = new Phink\Data\Client\PDO\TPdoCommand($connector);
            $cmd->setCommandText($sql);

            $stmt = $cmd->query();
            $res = $stmt->fetchAll();
            print $stmt->getFieldCount() . PHP_EOL;

            print_r($res);

        } catch (\PDOException $ex) {
            var_dump($ex);
            self::$logger->exception($ex, __FILE__, __LINE__);
        }
        
    }
    
}

 Pho::main($argv, $argc);
