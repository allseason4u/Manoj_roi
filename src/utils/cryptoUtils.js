import CryptoJS from "crypto-js";
const secretKey = "8056483646328763"; // 16 characters for AES-128
const iv = CryptoJS.enc.Utf8.parse(secretKey); // Initialization vector

export function encryptData(plainText) {
  const encrypted = CryptoJS.AES.encrypt(
    plainText,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return encrypted.toString(); // Base64 encrypted string
}

export function decryptData(encryptedText) {
  const decrypted = CryptoJS.AES.decrypt(
    encryptedText,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8); // Plain text
}
