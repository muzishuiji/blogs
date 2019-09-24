function Header(params) {
    var dom = document.getElementById('root');
    var header = document.createElement('div');
    header.innerText = 'header';
    dom.append(header);
}

export default Header