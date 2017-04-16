<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

session_start();

$data = file_get_contents("code2.php");

ob_start();
echo "123<br/>";

include "code.php";
include "data://text/plain;base64," . base64_encode($data);

echo $_REQUEST['PHPSESSID'] . "<br>";

$html = ob_get_clean();

session_destroy();

echo  $html;