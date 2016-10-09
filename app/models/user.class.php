<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace SoL\Models;

require_once APP_DATA . 'soundlib_connection.php';
/**
 * Description of user
 *
 * @author David
 */
class User
{
    //put your code here
    public static function getInfo($userId)
    {
        $result = [];
        $result['info'] = [];
        
        $cnn = new \SoL\Data\SoundLibConnection();
        $stmt = $cnn->open();
        
        $sql = <<<SELECT
select usr_id as id, usr_name as name, usr_email as email
from user 
where usr_id = :userId
SELECT;
        
        $res = $stmt->prepare($sql);
        $res->execute([':userId' => $userId]);
        
        while ($row = $res->fetch(\PDO::FETCH_OBJ)) {
            array_push($result['info'], $row);
        }
        
        return $result;
    }

}
