<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//require_once 'phoenix/core/console.php';

class Program extends TConsole {
    
    public static function main($argv) {
        new Program($argv);
        
    }	

    public function init() {
        //$b64 = "aHR0cDovL3d3dy5jbHViYXV0by1tZXRyby5jb20vbGlic192Mi9kZXZpc19saWduZV92Mi9saXZlX2RlbF9yZXNlcnZlci5waHA/ZGVsX29wdGlvbnM9JmRlbF9uYXRjb2RlPTE1Mjc0MiZkZWxfbWFyY2hlPUZSJmRlbF9yZWM9MCZnb19tb2RpZj0mZGVsX2VtYWlsPSZlbWFpbD1kcGpiNzhAZ21haWwuY29tJmNpdmlsaXRlPSZub209JnByZW5vbT0mdGVsZXBob25lPSZjb2RlcHR0PSZjb25maXJtPTE=";
    
    }
    
    public function run() {
        $b64 = "aHR0cDovL3d3dy5jbHViYXV0by1jZ29zLmNvbS9saWJzX3YyL2RldmlzX2xpZ25lX3YyL2xpdmVfZGVsX3Jlc2VydmVyLnBocD9kZWxfb3B0aW9ucz0xNTIyMjcwNjk7JmRlbF9uYXRjb2RlPTEzNDUzMCZkZWxfbWFyY2hlPUZSJmRlbF9yZWM9MCZnb19tb2RpZj0mZGVsX2VtYWlsPSZlbWFpbD1hbm5lNzZAbmV1Zi5mciZjaXZpbGl0ZT1NYWRhbWUmbm9tPUJSRVRPTiZwcmVub209QW5uZSZ0ZWxlcGhvbmU9MDYyMTk3MTE1MyZjb2RlcHR0PTc2NjYwJmNvbmZpcm09MQ";
        //http://www.clubauto-metro.com/modele.php?marque=RENAULT&gamme=LAGUNA&mod=152742|FR|0&confirm=1&location=aHR0cDovL3d3dy5jbHViYXV0by1tZXRyby5jb20vbGlic192Mi9kZXZpc19saWduZV92Mi9saXZlX2RlbF9yZXNlcnZlci5waHA/ZGVsX29wdGlvbnM9JmRlbF9uYXRjb2RlPTE1Mjc0MiZkZWxfbWFyY2hlPUZSJmRlbF9yZWM9MCZnb19tb2RpZj0mZW1haWw9ZHBqYjc4QGdtYWlsLmNvbSZlbmNvcmU9MQ==
        //http://www.clubauto-metro.com/modele.php?marque=RENAULT&gamme=LAGUNA&mod=152742|FR|0&confirm=1&location=aHR0cDovL3d3dy5jbHViYXV0by1tZXRyby5jb20vbGlic192Mi9kZXZpc19saWduZV92Mi9saXZlX2RlbF9yZXNlcnZlci5waHA/ZGVsX29wdGlvbnM9JmRlbF9uYXRjb2RlPTE1Mjc0MiZkZWxfbWFyY2hlPUZSJmRlbF9yZWM9MCZnb19tb2RpZj0mZW1haWw9ZHBqYjc4QGdtYWlsLmNvbSZlbmNvcmU9MQ==

//$location = "http://www.clubauto-metro.com/libs_v2/devis_ligne_v2/live_del_reserver.php?unsubscribe=dpjb78@gmail.com";
//echo "http://www.clubauto-metro.com/contact.php?location=" . base64_encode($location);
        
        
        TConsole::log('Toto');
        TConsole::log($b64);
        $b64 = base64_decode($b64);
        TConsole::log($b64);
        
    }
    
}

Program::main($argv);