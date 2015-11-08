<?php

/**
 * Description of parser
 *
 * @author David
 */
include 'phoenix/core/application.php';

class Parser {
    //put your code here
    
    public static function main() {
        (new Parser())->run();
    }
    
    public function run() {
        $contents = file_get_contents('home.phtml');
        $this->parse($contents);
        $contents = file_get_contents('grid.phtml');
        $this->parse($contents);
        $contents = file_get_contents('phoenix/web/ui/grid.pattern.phtml', FILE_USE_INCLUDE_PATH);
        $this->parse($contents);
        

    }
    
    public function parse($contents) {
        $doc = new \Phoenix\Xml\TXmlDocument($contents);
        $doc->matchAll();
        $elements = $doc->getList();
                
        Phoenix\Log\TLog::dump('ELEMENTS', $elements);
        
    }
}

Parser::main();
