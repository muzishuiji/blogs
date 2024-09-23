const xhrCreate = ({
    url,
    method,
    data,
    headers = {},
    onSuccess,
    onError
}) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    if(Object.keys(headers).length) {
        Object.keys(headers).forEach(key => {
            xhr.setRequestHeader(key, headers[key])
        })
    }
    xhr.send(data);
    xhr.onload = () => {
        if(xhr.status === 200) {
            onSuccess?.(xhr.responseText)
        } else {
            onError?.(xhr.responseText)
        }
    }
}

const xhrPost = xhrCreate({
    url: 'xxxx',
    method: 'POST',
    data: JSON.stringify({
        
    }),
    onSuccess: (res) =>{
        console.log(res)
    },
    onError: (err) => {
        console.log(err)
    }   
})

const xhrGet = xhrCreate({
    url: 'xxxx',
    method: 'GET',
    onSuccess: (res) =>{
        console.log(res)
    },
    onError: (err) => {
        console.log(err)
    }   
})