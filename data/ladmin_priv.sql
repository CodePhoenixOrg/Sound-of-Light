-- Create user credentials for LAdmin application
-- with compatibility for Docker containers

DROP USER IF EXISTS 'ladmin'@'localhost';
CREATE USER 'ladmin'@'localhost' IDENTIFIED WITH mysql_native_password;
GRANT USAGE ON *.* TO 'ladmin'@'localhost' REQUIRE NONE;
SET PASSWORD FOR 'ladmin'@'localhost' = PASSWORD('demo');
GRANT ALL PRIVILEGES ON `soundlib`.* TO 'ladmin'@'localhost' WITH GRANT OPTION;

DROP USER IF EXISTS 'ladmin'@'%';
CREATE USER 'ladmin'@'%' IDENTIFIED WITH mysql_native_password;
GRANT USAGE ON *.* TO 'ladmin'@'%' REQUIRE NONE;
SET PASSWORD FOR 'ladmin'@'%' = PASSWORD('demo');
GRANT ALL PRIVILEGES ON `soundlib`.* TO 'ladmin'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;
