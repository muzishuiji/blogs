function getBrowserFingerprint() {
    // 1. 用户代理（User Agent）
    const userAgent = navigator.userAgent;
    // 2. 屏幕分辨率和颜色深度
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const colorDepth = window.screen.colorDepth;
    // 3. 时区
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // 4. 语言设置
    const language = navigator.language;
    // 5. 硬件并发数（CPU核心数）
    const hardwareConcurrency = navigator.hardwareConcurrency;
    // 6. 触摸支持
    const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    // 7. canvas指纹
    function getCanvasFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 50;
        ctx.fillStyle = 'rgb(128, 128, 128)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.font = '18px Arial';
        ctx.fillText('Browser Fingerprint', 10, 30);
        return canvas.toDataURL();
    }
    const canvasFingerprint = getCanvasFingerprint();
    // 8. WebGL信息
    function getWebGLInfo() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if(gl) {
            const debugInfo = gl.getExtension('webgl_debug_renderer_info');
            if(debugInfo) {
                return {
                    vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
                    renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
                }
            }
        }
        return null;
    }
    const webglInfo = getWebGLInfo();
    // 9. 插件和MIME类型
    const plugins = Array.from(navigator.plugins).map(plugin => plugin.name);
    const mimeTypes = Array.from(navigator.mimeTypes).map(mimeType => mimeType.type);

    // 10. 组合所有信息
    const fingerprint = {
        userAgent,
        screenResolution,
        colorDepth,
        language,
        hardwareConcurrency,
        touchSupport,
        canvasFingerprint,
        webglInfo,
        plugins,
        mimeTypes,
    }
    // 11. 返回指纹（可以将其hash化生成唯一标识符）
    return JSON.stringify(fingerprint);
}

const fingerprint = getBrowserFingerprint();
console.log('Browser Fingerprint', fingerprint);