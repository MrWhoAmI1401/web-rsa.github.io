// Fungsi bantu untuk menghitung modulus
function mod(m, n) {
    return m - n * Math.floor(m / n);
}

// Fungsi bantu untuk eksponensiasi modular
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

// Konversi string ke array ASCII
function stringToAsciiArray(str) {
    return str.split('').map(char => char.charCodeAt(0));
}

// Konversi array ASCII ke string
function asciiArrayToString(asciiArray) {
    return asciiArray.map(code => String.fromCharCode(code)).join('');
}

// Fungsi untuk mengonversi angka menjadi hex
function toHex(num) {
    return num.toString(16);
}

// Fungsi untuk mengonversi array angka menjadi hex
function toHexArray(array) {
    return array.map(num => num.toString(16).padStart(2, '0')).join(" ");
}

// Hitung nilai N dan r
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

// Cek apakah angka adalah bilangan prima
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Verifikasi apakah 'e' adalah coprime dengan 'r'
function validateE() {
    let e = parseInt(document.getElementById('e').value);
    let r = parseInt(document.getElementById('r').value);

    if (gcd(e, r) !== 1) {
        alert("e and r must be coprime. Please choose a different value for e.");
        return false;
    }
    return true;
}

// Menghitung GCD
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Enkripsi pesan plaintext
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

    // Konversi ciphertext ke hex dan tampilkan di kolom ciphertext
    let hexCiphertext = toHexArray(encryptedArray);
    document.getElementById('ciphertext').value = hexCiphertext;
}

// Dekripsi ciphertext
function checkCode() {
    let d = parseInt(document.getElementById('d').value);
    let N = parseInt(document.getElementById('N').value); // Pastikan N sudah dihitung dan diambil dari input
    let ciphertextHex = document.getElementById('ciphertext').value.split(" ");
    
    if (!d || !N || ciphertextHex.length === 0) {
        alert("Please enter valid values for d and ciphertext.");
        return;
    }

    // Mengubah hex kembali ke angka (ciphertext)
    let ciphertext = ciphertextHex.map(hex => parseInt(hex, 16));

    // Mendekripsi setiap ciphertext
    let decryptedArray = ciphertext.map(c => powerMod(c, d, N));

    // Menampilkan hasil dekripsi di kolom plaintext
    document.getElementById('plaintext').value = asciiArrayToString(decryptedArray);
}
