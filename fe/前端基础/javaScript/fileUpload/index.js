/**
 * 大文件上传涉及网络传输、内存占用、用户体验等问题，需要采用一些特定的技术策略来确保上传的稳定性和效率
 * 1. 分片上传：
 * - 策略描述：将大文件分割成多个小片段，然后逐个上传这些片段，服务器再将这些片段合并成完整的文件。
 * - 优点：
 *  - 提高上传成功率：即使某个片段上传失败，只需重新上传该片段，而不需要重新上传整个文件；
 *  - 减少内存占用：每个片段较小，上传时占用的内存较少；
 *  - 可以实现断点续传，用户可以在上传过程中暂停或恢复上传
 *  
 * 2. 断点续传
 * 
 */

const chunkSize = 1024 * 1024;
let uploadChunks = [];
// 1. 基础的分片上传的代码，
// 2. 上传过程中，记录已上传的片段，上传过程中断，则从上次中断的片段继续上传
function uploadFile(file) {
    const totalChunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0;
    
    // 分片上传
    function uploadChunk() {
        const start = currentChunk * chunkSize;
        const end = Math.min(file.size, start + chunkSize);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('chunkIndex', currentChunk);
        formData.append('totalChunks', totalChunks);

        fetch('/upload', {
            method: 'POST',
            body: formData,
        }).then(response => {
            if(response.ok) {
                uploadChunks.push(currentChunk)
                currentChunk++
                if(currentChunk < totalChunks) {
                    uploadChunk();
                } else {
                    console.log('upload complete')
                }
            } else {
                console.error('chunk upload failed');
            }
        });
    }

    uploadChunk();

    // 检查已上传的片段
    fetch('/checkUploadStatus', {
        method: 'POST',
        body: JSON.stringify({ fileName: file.name })
    }).then(response => response.json()).then(data => {
        uploadChunks = data.uploadChunks
        // 要续传片段的索引
        currentChunk = uploadChunks.length;
        uploadChunk();
    })
}

// 另一种实现
// - 记录一些已经上传的，并在上传时过滤已经上传的
function uploadFile() {
    const input = document.getElementById('fileInput');
    const file = input.files[0];
    if(!file) return;

    // 设置分块大小
    const chunkSize = 1 * 1024 * 1024; // 1MB
    const chunks = Math.ceil(file.size / chunkSize)

    // 检查已经上传的块
    let uploadedChunks = []
    checkUploadedChunks(chunks)
    .then(() => {
        // 上传未上传的块
        for(let i = 0; i < chunks; i++) {
            if(!uploadedChunks.includes(i)) {
                const start = i * chunkSize;
                const end = Math.min(start + chunkSize, file.size)
                uploadChunks(file.slice(start, end), i)
            }
        }
    });

}

function checkUploadedChunks(totalChunks) {
    return new Promise((resolve, reject) => {
        fetch('/api/check-uploaded-chunks', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ totalChunks })
        })
        .then(res => res.json())
        .then(data => {
            uploadChunks = data.uploadChunks;
            resolve();
        })
        .catch(error => reject(error))
    });
}

function uploadChunk(chunk, index) {
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('index', index);

    fetch('/api/upload-chunk', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        console.log(`Chunk ${index} uploaded successfully`);
        document.getElementById('status').innerText += `Chunk ${index} uploaded successfully\n`;
    })
    .catch(error => console.error(`Error uploading chunk ${index}:`, error));
}



/**
 * 如何防止文件重复上传
 * 1. 文件指纹（哈希值）
 * 最常用的方法是计算文件的哈希值，如果文件已经存在，则可以通过比较哈希值来识别它。这种方法的好处是能够精确匹配文件内容，即使文件名不同也能识别出来。
 * 实现步骤：
 * - 前端：计算文件的哈希值，并将其发送到服务器；
 * - 后端：存储文件的哈希值，并在接收到新的文件时进行比较；
 * 2. 文件元数据比较
 * 除了哈希值外，还可以比较文件的元数据，如文件大小、最后修改时间等，这种方法不如哈希值精确，但如果文件系统中的文件不会被修改，则可以作为一种辅助手段。
 */

// 方式一：文件指纹
// 前端代码
function getFileHash(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const arrayBuffer = e.target.result;
            const unit8Array = new unit8Array(arrayBuffer);
            crypto.subtle.digest('SHA-256', unit8Array)
            .then(hashBuffer => {
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                resolve(hashHex);
            }).catch(reject)
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

async function checkFileExistence(file) {
    try {
        const fileHash = await getFileHash(file);
        const response = await fetch('/api/check-file-existence', {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ fileHash })
        })
        if(response.ok) {
            const result = await response.json()
            return result.exists
        } else {
            throw new Error('Failed to check file existence.');
        
        }
    } catch(err) {
        console.log(error)
        return false;
    }
}