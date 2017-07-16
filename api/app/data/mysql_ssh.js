var mysql = require('mysql2');
var Client = require('ssh2').Client;

var ssh = new Client();
ssh.on('ready', function() {
  ssh.forwardOut(
    // source address, this can usually be any valid address
    '127.0.0.1',
    // source port, this can be any valid port number
    12345,
    // destination address (localhost here refers to the SSH server)
    '127.0.0.1',
    // destination port
    3306,
    function (err, stream) {
      if (err) throw err;
      var sql = mysql.createConnection({
        user: 'djay',
        password: 'demo',
        database: 'soundlib',
        stream: stream // <--- this is an important part
      });
      // use `sql` connection as usual

      console.log(sql);
  });
}).connect({
  // ssh connection config ...
});