<?php
// require dirname(__DIR__).'/../../../../vendor/autoload.php';
require __DIR__.'/../../../../../reload.php';

class Pho extends \Phink\UI\TConsoleApplication
{

    /**
     * Application starter
     *
     * @param array $argv List of argunments of the command line
     * @param int $argc Count the number of these arguments
     */
    public static function main($args_v, $args_c)
    {
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
    
    public function ignite() : void
    {
        parent::ignite();

        $this->setCommand(
            'test-schema',
            '',
            'Test Schema Information',
            function ($schema) {
                $this->schemaInfoTest($schema);
            }
        );
    }
    /**
     * Entrypoint of a TConsoleApplication
     */
    public function run() : bool
    {
        // if($this->canStop()) {
        //     return;
        // }

        return true;
    }

    public function modelTest() : void
    {
        require MODEL_ROOT . 'abcAlbums.class.php';

        try {
            $model = new \SoL\Models\AbcAlbums();
   
            //print_r($model);
            $stmt = $model->getLettrines();
            
            $res = $stmt->fetchAll();
            print $stmt->getFieldCount() . PHP_EOL;

            print_r($res);
        } catch (\PDOException $ex) {
            var_dump($ex);
            self::$logger->exception($ex, __FILE__, __LINE__);
        }
    }
    
    public function schemaInfoTest($schema) : void
    {
        require_once APP_DATA . 'info_schema_connection.php';

        try {
            $connector = new \SoL\Data\InfoSchemaConnection();
            $conn = $connector->open();

            $sql = <<<SELECT
            SELECT 
                `table_schema` as `Database`, `table_name` as `Table`, `column_name` as `Column`
            FROM
                `columns`
            WHERE
                table_schema = :schema;
SELECT;
            
            $stmt = $connector->query($sql, ['schema' => $schema]);
            $res = $stmt->fetchAll();
        
            print_r($res);
        } catch (Throwable $ex) {
            $this->writeException($ex);
        }
    }
    
    public function ladminTest() : void
    {
        require_once APP_DATA . 'ladmin_connection.php';

        $connector = new \SoL\Data\LAdminConnection();
        $connector->open();

        try {
            $stmt = $connector->query('select * from members;');
            print $stmt->getFieldCount() . PHP_EOL;

            $res = $stmt->fetchAll();

            print_r($res);
        } catch (\PDOException $ex) {
            var_dump($ex);
            self::$logger->exception($ex, __FILE__, __LINE__);
        }
    }

    public function soundlibTest() : void
    {
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

            $stmt = $connector->query($sql);
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
