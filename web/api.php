<?php
include 'phink/rest/rest_application.php';

\Phink\Rest\TRestApplication::create();

\Phink\Log\TLog::debug(date('Y-m-d:H:i:s') . '::' . REQUEST_METHOD . '::' . REQUEST_URI);