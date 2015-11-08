<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

require_once 'Predis/Autoloader.php';

Predis\Autoloader::register();

use Predis\Client;
use Predis\Command\ScriptedCommand;

$single_server = array(
    'host' => '192.168.1.8',
    'port' => 6379,
    'database' => 15
);

class IncrementExistingKeysBy extends ScriptedCommand
{
    public function getKeysCount()
    {
        // Tell Predis to use all the arguments but the last one as arguments
        // for KEYS. The last one will be used to populate ARGV.
        return -1;
    }

    public function getScript()
    {
        return
<<<LUA
local cmd, insert = redis.call, table.insert
local increment, results = ARGV[1], { }

for idx, key in ipairs(KEYS) do
if cmd('exists', key) == 1 then
insert(results, idx, cmd('incrby', key, increment))
else
insert(results, idx, false)
end
end

return results
LUA;
    }
}

$client = new Client($single_server);

$client->getProfile()->defineCommand('increxby', 'IncrementExistingKeysBy');

$client->mset('foo', 10, 'foobar', 100);

var_export($client->increxby('foo', 'foofoo', 'foobar', 50));
echo "<br>";
echo "Tout va bien";