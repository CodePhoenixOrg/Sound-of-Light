var Configuration = function() {};

Configuration.parameters = {
    host: 'localhost',
    port: 3306,
    user: 'user',
    password: 'password',
    database: 'database',
    charset: 'utf8mb4'
};

module.exports = Configuration;