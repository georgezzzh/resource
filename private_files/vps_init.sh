systemctl stop firewalld.service
systemctl disable firewalld.service
yum -y install wget

wget -N --no-check-certificate https://raw.githubusercontent.com/ToyoDAdoubi/doubi/master/ssr.sh && chmod +x ssr.sh
./ssr.sh<<EOF
1
80
newworld
10
1
1



y
EOF
yum -y install wget

wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh

chmod +x bbr.sh

./bbr.sh<<EOF
y
EOF
