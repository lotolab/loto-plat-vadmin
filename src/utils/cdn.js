export function convertImgPath(path) {
    const isDevMode = import.meta.env.NODE_ENV
    globalThis.console.log('>>>>>>isDevMode>>>>>>>>',isDevMode)
    if(/^http(s)?.*$/.test(path))return path;
    return import.meta.env.VITE_APP_BASE_API + path;
}