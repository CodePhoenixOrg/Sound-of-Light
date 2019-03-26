<?php

include 'phink/phink_library.php';

$code = <<<CODE
curl = new TCurl();
result = curl->request('http://soundlib.loc:1234/api/playlist/1');
echo result->content;
CODE;

    $host = 'localhost';
    $port = 1234;
    
$header[0] = "Accept: text/xml,application/xml,application/xhtml+xml,";
$header[0] .= "text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5";
$header[] = "Cache-Control: max-age=0";
$header[] = "Connection: keep-alive";
$header[] = "Keep-Alive: 300";
$header[] = "Host: $host";
$header[] = "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7";
$header[] = "Accept-Language: en-us,en;q=0.5";
$header[] = "Pragma: ";

try {

    $curl = new \Phink\Web\TCurl();
    $result = $curl->request('http://' . $host . ':' . $port . '/api/playlist/1', $header, $port);

    echo $result->content . PHP_EOL;

} catch (\Throwable $ex) {
    echo $ex->getFile() . PHP_EOL;
    echo $ex->getLine() . PHP_EOL;
    echo $ex->getTrace() . PHP_EOL;
    echo $ex->getMessage() . PHP_EOL;
} catch (\Exception $ex) {
    echo $ex->getTraceAsString();
}

