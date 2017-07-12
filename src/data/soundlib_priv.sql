-- Create user credentials for SoundLight application
-- with compatibility for Docker containers

-- DROP USER IF EXISTS 'djay'@'localhost';
CREATE USER 'djay'@'localhost' IDENTIFIED WITH mysql_native_password;
GRANT USAGE ON *.* TO 'djay'@'localhost' REQUIRE NONE;
SET PASSWORD FOR 'djay'@'localhost' = PASSWORD('demo');
GRANT ALL PRIVILEGES ON `soundlib`.* TO 'djay'@'localhost' WITH GRANT OPTION;

-- DROP USER IF EXISTS 'djay'@'%';
CREATE USER 'djay'@'%' IDENTIFIED WITH mysql_native_password;
GRANT USAGE ON *.* TO 'djay'@'%' REQUIRE NONE;
SET PASSWORD FOR 'djay'@'%' = PASSWORD('demo');
GRANT ALL PRIVILEGES ON `soundlib`.* TO 'djay'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;
