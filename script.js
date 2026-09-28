// Grab HTML elements
const inputUrl = document.getElementById('inputUrl');
const outputUrl = document.getElementById('outputUrl');
const btnDefang = document.getElementById('btnDefang');
const btnRefang = document.getElementById('btnRefang');
const btnCopy = document.getElementById('btnCopy');

// Defang & Decode Logic
function decodeAndDefang(url) {
    if (!url) return "";
    
    // 1. Decode infinitely to catch double/triple encoding
    let decoded = decodeURIComponent(url);
    while (decoded !== decodeURIComponent(decoded)) {
        decoded = decodeURIComponent(decoded);
    }
    
    // 2. Defang
    return decoded
        .replace(/\b(http)(s?)\b/ig, 'hxxp$2') // http/https -> hxxp/hxxps
        .replace(/:\/\//g, '[://]')            // :// -> [://]
        .replace(/\./g, '[.]')                 // . -> [.]
        .replace(/@/g, '[@]');                 // @ -> [@]
}

// Refang Logic
function refang(url) {
    if (!url) return "";
    
    return url
        .replace(/\[\.\]/g, '.')                 // [.] -> .
        .replace(/\[@\]/g, '@')                  // [@] -> @
        .replace(/\[:\/\/\]/g, '://')            // [://] -> ://
        .replace(/\bhxxp(s?)\b/ig, 'http$1');    // hxxp/hxxps -> http/https
}

// Event Listeners
btnDefang.addEventListener('click', () => {
    outputUrl.value = decodeAndDefang(inputUrl.value.trim());
});

btnRefang.addEventListener('click', () => {
    outputUrl.value = refang(inputUrl.value.trim());
});

// Copy to Clipboard feature
btnCopy.addEventListener('click', () => {
    if (!outputUrl.value) return;
    
    navigator.clipboard.writeText(outputUrl.value).then(() => {
        const originalText = btnCopy.innerText;
        btnCopy.innerText = "Copied!";
        setTimeout(() => {
            btnCopy.innerText = originalText;
        }, 2000);
    });
});
