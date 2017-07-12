<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define('DOCUMENT_ROOT', $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR);

define('CURRENT_DIR', dirname(__FILE__) . DIRECTORY_SEPARATOR);

class Program {
	public static function main() {
		$prg = new Program();
		$prg->plusPlus();
	}
	
	public function plusPlus() {
		$plus = "+";
		$scriptJS = <<< SCRIPT_JS
	var index = 1;
			
	function goRight() {
		index$plus$plus;
		window['index'] = index;
   }
SCRIPT_JS;
		echo "j'écris le script dans " . CURRENT_DIR . "script.js<br />";
		echo "<br />" . $scriptJS . "<br />";
		
		file_put_contents(CURRENT_DIR . 'script.js', $scriptJS);
	}
}

header("Content-Type: text/html; charset=UTF-8");
Program::main();