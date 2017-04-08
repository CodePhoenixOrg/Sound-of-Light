FROM ubuntu:16.04
RUN apt-get -y update && apt-get -y install apt-utils && apt-get -y install apache2 php7.0 libapache2-mod-php7.0 mysql-client php-sqlite3 php-mysql redis-server php-redis php-curl wget libterm-readline-perl-perl
RUN echo "set bell-style none" > /root/.inputrc; \
/etc/init.d/redis-server start; \
echo "ServerName localhost" >> /etc/apache2/apache2.conf; \
apachectl start; \
a2enmod rewrite
CMD apachectl restart; tail -f /var/log/apache2/error.log
