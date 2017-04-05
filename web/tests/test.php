<?php
include 'phink/core/core.php';

echo APP_DATA . BR;

//require_once APP_DATA . 'ladmin_connection.php';

//$connector = new \LAdmin\Data\LAdminConnection();
//$connector->open();

$connector = new PDO('mysql:host=localhost;dbname=ladmin', 'ladmin', '1p2+ar');
print_r($connector->errorInfo());

try {
	$connector->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	var_dump($connector);

	$res = $connector->exec('select * from members;');

	print_r($res);


} catch (\PDOException $ex) {
	var_dump($ex);
        self::$logger->exception($ex, __FILE__, __LINE__);
}

