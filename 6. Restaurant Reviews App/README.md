# Mobile Web Specialist Certification Course
---
#### _Three Stage Course Material Project - Restaurant Reviews_

## Install

Choose the folder in which you want to place the game and run the command in the console

```
git clone git@github.com:Divan4ik/udacity-fend.git
```


### Setup express web-server

to use this app you need to install all requirments from package.json

```
npm i

npm run serve
```

then just open  `http://localhost:8000` in your browser

### Browse app on other devices

if you have local network find your local ip


#### 1. Windows

use `win + r`  shortcut to run `cmd` command;
type `ipconfig /all`;
find ipv4-address

#### 2. Linux/Macos

run terminal
type ifconfig or ip
find ipv4-address

then update file public/js/dbhelper.js on line 12 - insert your ip
Start app with `npm run serve`
finaly you can open the app on any device in your network (i.e. home WiFi network)