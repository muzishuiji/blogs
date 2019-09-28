import Header from './header.js';
import Sidebar from './sidebar.js';
import Content from './content.js';
import createImg from './createImg.js';
import es6Test from './es6-test.js';
const avatar = require('../img/18276045.jpg');
import '../css/index.scss'
import { add, minus } from './math'
// import _ from 'lodash';
new Header();
new Sidebar();
new Content();
add();
// console.log(_.join(['a', 'b', 'c'], '**'));
// var img = new Image();
// img.src = avatar;
// img.classList.add(style.imgCss);

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

document.addEventListener('click', () => {
    import(/* webpackPrefetch: true */'./click.js').then(({default: func}) => {
        func()
    })  
})
import _ from 'lodash';
import $ from 'jquery';
import '../css/test.css';

const dom = $('<div>');
dom.html(_.join(['li', 'jie'], '---'));
$('body').append(dom);
// 注册service-worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('service-worker registed', registration);
            }).catch((error) => {
                console.log('service-worker register error', error);
            });
    });
}
