-- Create user credentials for nidus application
-- with compatibility for Docker containers

DROP USER IF EXISTS 'nidus'@'localhost';
CREATE USER 'nidus'@'localhost' IDENTIFIED WITH mysql_native_password BY 'demo';
GRANT USAGE ON *.* TO 'nidus'@'localhost';
GRANT ALL PRIVILEGES ON `nidus`.* TO 'nidus'@'localhost' WITH GRANT OPTION;

DROP USER IF EXISTS 'nidus'@'%';
CREATE USER 'nidus'@'%' IDENTIFIED WITH mysql_native_password BY 'demo';
GRANT USAGE ON *.* TO 'nidus'@'%';
GRANT ALL PRIVILEGES ON `nidus`.* TO 'nidus'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;
