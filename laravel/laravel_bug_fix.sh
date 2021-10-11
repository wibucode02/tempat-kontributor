#laravel for linux
#!/bin/sh
echo "install composer";
apt install wget php-cli php-zip unzip
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
HASH="$(wget -q -O - https://composer.github.io/installer.sig)"
php -r "if (hash_file('SHA384', 'composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php --install-dir=/usr/local/bin --filename=composer

composer global require laravel/installer
composer create-project --prefer-dist laravel/laravel blog "5.8.*"

apt-get install phpunit
apt-get install php-mbstring
apt-get install unzip
#sesuaikan dengan versi PHP
apt-get install php-gd
apt-get install php-intl
apt-get install php-xsl
apt-get install php-gd php-xml php7.3-mbstring
a2enmod rewrite
echo "selesai";
