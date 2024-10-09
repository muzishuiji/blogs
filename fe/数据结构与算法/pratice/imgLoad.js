

// 方法一：朴素的递归
const imgs = [
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    
];
function loadRecursion(i) {
    let target = imgs.shift();
    if(target) {
        const img = new Image(200, 100);
        img.src = target;
        img.onload = function() {
            console.log('success', i);
            loadRecursion(++i);
        }
    } 
}
function loadImg(imgs, limit = 5) {
    for(let i = 0; i < limit; i++) {
        let target = imgs.shift();
        if(target) {
            loadRecursion(0);
        }
    }
}
loadImg(imgs);

// 方法二：图片加载
const imgs = [
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    'https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/1/4/16f6f35b3bad74e7~tplv-t2oaga2asx-jj-mark:72:72:0:0:q75.avis',
    
];
class ImageLoader {
    constructor(maxCount = 5) {
        this.maxCount = maxCount;
        this.queue =[];
        this.loadingCount = 0;
    }
    addImages(imageUrls) {
        this.queue =  this.queue.concat(imageUrls);
        this.processImage();
    }
    addImage(imgUrl) {
        this.queue.push(imgUrl);
    }

    loadImage(imageUrl) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imageUrl;
            img.onload = function() {
                console.log('image load success', Date().now())
                resolve(img);
            }
            img.onerror = function (error) {
                reject(error);
            }
        })
    }

    async processImage() {
        while(this.queue.length > 0 && this.loadingCount < this.maxCount) {
            const imageUrl = this.queue.shift();
            this.loadingCount++;
            try {
                await this.loadImage(imageUrl);
            } catch(err) {
                console.log('image batch load error')
            } finally {
                this.loadingCount--;
                this.processImage();
            }
        }
    }

}
let loader = new ImageLoader();
loader.addImages(imgs);


