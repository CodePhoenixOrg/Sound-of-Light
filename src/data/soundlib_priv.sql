-- Create user credentials for SoundLight application
-- with compatibility for Docker containers

DROP USER IF EXISTS 'djay'@'localhost';
CREATE USER 'djay'@'localhost' IDENTIFIED WITH mysql_native_password BY 'demo';
GRANT USAGE ON *.* TO 'djay'@'localhost';
GRANT ALL PRIVILEGES ON `soundlib`.* TO 'djay'@'localhost' WITH GRANT OPTION;

DROP USER IF EXISTS 'djay'@'%';
CREATE USER 'djay'@'%' IDENTIFIED WITH mysql_native_password BY 'demo';
GRANT USAGE ON *.* TO 'djay'@'%';
GRANT ALL PRIVILEGES ON `soundlib`.* TO 'djay'@'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;
