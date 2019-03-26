-- Create user credentials for LAdmin application
-- with compatibility for Docker containers

DROP USER IF EXISTS 'ladmin'@'localhost';
CREATE USER 'ladmin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'demo';
GRANT USAGE ON *.* TO 'ladmin'@'localhost';
GRANT ALL PRIVILEGES ON `ladmin`.* TO 'ladmin'@'localhost' WITH GRANT OPTION;

DROP USER IF EXISTS 'ladmin'@'%';
CREATE USER 'ladmin'@'%' IDENTIFIED WITH mysql_native_password BY 'demo';
GRANT USAGE ON *.* TO 'ladmin'@'%';
GRANT ALL PRIVILEGES ON `ladmin`.* TO 'ladmin'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;
