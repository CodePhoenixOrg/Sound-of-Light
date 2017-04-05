<?php
include 'phink/rest/rest_application.php';

\Phink\Rest\TRestApplication::create();

\Phink\Rest\TRestApplication::getLogger()->debug(date('Y-m-d:H:i:s') . '::' . REQUEST_METHOD . '::' . REQUEST_URI);