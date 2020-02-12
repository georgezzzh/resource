use miniprogram;
create table user(
openid varchar(32),
nickName varchar(32),
gender numeric(1,0),
country varchar(64),
province varchar(64),
city varchar(64),
language varchar(16),
avatarUrl varchar(128),
createTime date,
primary key(openid)
);

## 创建deal账单
create table deal(
deal_id int primary key auto_increment,
openid varchar(32),
bill_date date,
expense boolean,#是否是支出账单
amount numeric(10,2),
category varchar(16),
remark varchar(128),
create_date date,
create_time time,
foreign key (openid) references user(openid) 
on delete set null
);

## 登录信息表
use miniprogram;
create table login(
id int primary key auto_increment,
openid varchar(32),
date date,
time time,
ipAddr varchar(16),
foreign key (openid) references user(openid)
on delete set null
);