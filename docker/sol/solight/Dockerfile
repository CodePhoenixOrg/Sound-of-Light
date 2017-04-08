FROM ubuntu:16.04
RUN apt-get -y update && apt-get -y install apache2 php7.0 mysql-client php-sqlite3 php-mysql redis-server php-redis openssh-client openssh-server lynx
RUN /etc/init.d/ssh start
RUN echo "set bell-style none" > /root/.inputrc
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf
CMD apachectl start; tail -f /var/log/apache2/error.log
#CMD tail -f /var/www/html/index.html 
