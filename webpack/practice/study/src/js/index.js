import Header from './header.js';
import Sidebar from './sidebar.js';
import Content from './content.js';
import createImg from './createImg.js';
import es6Test from './es6-test.js';
const avatar = require('../img/18276045.jpg');
import style from '../css/index.scss'
import '../css/test.css'
new Header();
new Sidebar();
new Content();

var img = new Image();
img.src = avatar;
img.classList.add(style.imgCss);

// var root = document.getElementById('root');
// root.append(img);
// createImg();

// var btn = document.createElement('button')
// btn.innerHTML = '新增'
// document.body.appendChild(btn);
// btn.onclick = function() {
//     var div = document.createElement('div')
//     div.innerHTML = 'item';
//     document.body.appendChild(div);
// }
// console.log("前雾灯区文峰区违法")