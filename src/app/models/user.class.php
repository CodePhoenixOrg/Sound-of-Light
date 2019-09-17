<?php

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
        $info = $result['info'];
        
        $cnn = new \SoL\Data\SoundLibConnection();
        $stmt = $cnn->open();
        
        $sql = <<<SQL
            select usr_id as id, usr_name as name, usr_email as email
            from user 
            where usr_id = :userId
            SQL;
        
        $res = $stmt->prepare($sql);
        $res->execute([':userId' => $userId]);
        
        while ($row = $res->fetch(\PDO::FETCH_OBJ)) {
            array_push($info, $row);
        }
        
        return $result;
    }

}
