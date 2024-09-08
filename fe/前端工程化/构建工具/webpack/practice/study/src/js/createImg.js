const avatar = require('../img/18276045.jpg');

function createImg() {
    var img = new Image();
    img.src = avatar;
    img.classList.add('imgCss');

    var root = document.getElementById('root');
    root.append(img);
}

export default createImg;