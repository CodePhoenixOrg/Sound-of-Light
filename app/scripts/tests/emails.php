<?php

function checkmail($adresse)  
{  
   $Syntaxe='#^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$#';  
   if(preg_match($Syntaxe,$adresse))  
      return true;  
   else  
     return false;  
}

$adresse = 'contactvap@athloncarlease.fr';
$adresse = 'thezenas.lohe@gmail.com';

if(checkmail($adresse))  
  echo '<p>Votre adresse est valide.</p>';  
else  
  echo '<p>Votre adresse e-mail n\'est pas valide.</p>';

?>
