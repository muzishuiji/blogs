# OSI 七层模型

OSI 七层模型（英语：Open System Interconnection Reference Model，缩写为 OSI）

物理层 -> 数据链路层 -> 网络层 -> 传输层 -> 会话层 -> 表示层 ->  应用层

## 物理层
  - TODO: 补充、背诵

## TCP/IP协议有四层

* 应用层： 应用层是TCP/IP协议的第一层，是直接为应用进程提供服务的；
* 运输层： 作为TCP/IP协议的第二层，运输层在整个TCP/IP协议中起到了中流砥柱的作用，且在传输层中，TCP和UDP也同样起到了中流砥柱的作用。
* 网络层：网络层在TCP/IP协议中位于第三层，在TCP/IP协议中可以进行网络连接的建立以及IP地址的寻找等功能
* 网络接口层：在TCP/IP协议中，网络接口层位于第四层。由于网络接口层兼并了物理层和数据链路层，所以，网络接口层是传输数据的物理媒介，也可以作为网络层提供一条准确无误的线路。

## 应用层的协议

1. HTTP
缺省端口80，用于浏览器网页，但网页内容为明文，容易篡改，容易劫持，网页内容容易泄漏。

2. HTTPS
HTTPS里的s代表security，缺省工作于TCP 443端口，在http的接触上加了一层SSL/TLS加密协议，对请求数据进行加密，不容易被篡改，劫持，但也有中间人攻击的风险。

3. SMTP
用于邮件发送的基于TCP的应用层协议

4. POP3

用于邮件接受的基于TCP的应用层协议

5. DNS
用于域名解析的基于UDP/TCP的应用层协议

6. DHCP

用于动态获取IP地址，缺省网关，DNS服务器等参数的基于UDP应用层协议。


## DHCP

DHCP， DNS， HTTP是三种常见的高层协议

DHCP简介

DHCP（dynamic host configuration protocol），动态主机配置协议，是一个应用层协议。当我们将客户主机ip地址设置为动态获取方式时，DHCP服务器就会根据DHCP协议给客户端分配ip，实际的客户机能够利用这个ip上网。

DHCP的前身是BOOTP协议（bootstrap protocol），BOOTOP被创建出来为连接到网络中的设备自动分配地址，后来被DHCP取代了，DHCP比BOOTP更复杂，功能更强大。