<?php
include 'phink/rest/rest_application.php';

\Phink\Rest\TRestApplication::create();

self::$logger->debug(date('Y-m-d:H:i:s') . '::' . REQUEST_METHOD . '::' . REQUEST_URI);