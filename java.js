function mod(m, n) {
    return m - n * Math.floor(m / n);
}

function powerMod(x, p, N) {
    let result = 1;
    let base = x % N;
    while (p > 0) {
        if (p % 2 === 1) {
            result = (result * base) % N;
        }
        base = (base * base) % N;
        p = Math.floor(p / 2);
    }
    return result;
}

function stringToAsciiArray(str) {
    return str.split('').map(char => char.charCodeAt(0) % 256); // Menggunakan ASCII hingga 255
}

function asciiArrayToString(asciiArray) {
    return asciiArray.map(code => String.fromCharCode(code % 256)).join('');
}

function computeNr() {
    let p = parseInt(document.getElementById('p').value);
    let q = parseInt(document.getElementById('q').value);

    if (!isPrime(p) || !isPrime(q)) {
        alert("Both p and q must be prime numbers.");
        return;
    }

    document.getElementById('N').value = p * q;
    document.getElementById('r').value = (p - 1) * (q - 1);
}

function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function validateE() {
    let e = parseInt(document.getElementById('e').value);
    let r = parseInt(document.getElementById('r').value);

    if (gcd(e, r) !== 1) {
        alert("e and r must be coprime. Please choose a different value for e.");
        return false;
    }
    return true;
}

function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

function encryptMessage() {
    if (!validateE()) return;

    let e = parseInt(document.getElementById('e').value);
    let N = parseInt(document.getElementById('N').value);
    let plaintext = document.getElementById('plaintext').value;

    if (!e || !N || plaintext === "") {
        alert("Please enter valid values for p, q, e, and plaintext.");
        return;
    }

    let asciiArray = stringToAsciiArray(plaintext); 
    let encryptedArray = asciiArray.map(ascii => powerMod(ascii, e, N)); 
    let encryptedChars = encryptedArray.map(code => String.fromCharCode(code % 256)); 

    document.getElementById('ciphertext').value = encryptedChars.join(""); 
}

function checkCode() {
    let d = parseInt(document.getElementById('d').value);
    let N = parseInt(document.getElementById('N').value);
    let ciphertext = document.getElementById('ciphertext').value.split("").map(char => char.charCodeAt(0)); 

    if (!d || !N || ciphertext.length === 0) {
        alert("Please enter valid values for d and ciphertext.");
        return;
    }

    let decryptedArray = ciphertext.map(c => powerMod(c, d, N)); 
    let decryptedMessage = asciiArrayToString(decryptedArray); 

    document.getElementById('plaintext').value = decryptedMessage;
}
